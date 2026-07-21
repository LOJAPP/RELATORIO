/**
 * ⚓ LOG-IN JACARANDÁ — Web App de Backup no Google Drive (v2 — suporte a chunks)
 * Cole este arquivo inteiro no Apps Script, substituindo o anterior.
 * Reimplante com acesso "Qualquer pessoa" (veja PASSO_A_PASSO_DRIVE.md).
 *
 * Arquivo oficial de backup:
 * https://drive.google.com/file/d/1O2EOSHlRyFbZrfq4r5JpOFW_AwDZMTth/view
 */

const FILE_ID   = '1O2EOSHlRyFbZrfq4r5JpOFW_AwDZMTth';
const FILE_NAME = 'jacaranda_backup.json';
const CHUNK_FILE = 'jacaranda_chunk_temp.json'; // acumulador temporário de fotos

function _getFile(name) {
  if (!name || name === FILE_NAME) {
    try { return DriveApp.getFileById(FILE_ID); } catch (e) {}
  }
  const it = DriveApp.getFilesByName(name || FILE_NAME);
  if (it.hasNext()) return it.next();
  return DriveApp.createFile(name || FILE_NAME, '{}', MimeType.PLAIN_TEXT);
}

/** GET — devolve o backup principal */
function doGet() {
  try {
    const conteudo = _getFile().getBlob().getDataAsString() || '{}';
    return ContentService
      .createTextOutput(conteudo)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(e) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST — aceita três tipos:
 *   1) Backup completo direto          (_chunked ausente)
 *   2) Dados sem fotos                 (_chunked: true)
 *   3) Lote de fotos                   (_chunk: N, _last: bool)
 */
function doPost(e) {
  try {
    const body = (e && e.postData && e.postData.contents) || '';
    if (!body) throw new Error('Corpo vazio');
    const dados = JSON.parse(body);

    if (dados._chunk !== undefined) return _processarChunk(dados);
    if (dados._chunked)            return _salvarBase(body, dados);

    _getFile().setContent(body);
    return ok({ exp: dados.exp, bytes: body.length });
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function _salvarBase(body, dados) {
  _getFile(CHUNK_FILE).setContent(body);
  return ok({ tipo: 'base', fotoLen: dados._fotoLen });
}

function _processarChunk(chunk) {
  const tf = _getFile(CHUNK_FILE);
  let acum;
  try { acum = JSON.parse(tf.getBlob().getDataAsString()); } catch (e) { acum = {}; }
  if (!acum._acc) acum._acc = [];
  (chunk.fotos || []).forEach(function(f) { acum._acc.push(f); });
  acum._n = (acum._n || 0) + 1;
  acum._exp = chunk._exp || acum._exp;

  if (!chunk._last) {
    tf.setContent(JSON.stringify(acum));
    return ok({ tipo: 'chunk', n: chunk._chunk, total: acum._acc.length });
  }

  // Último lote — remonta e grava
  const final = Object.assign({}, acum, {
    fotos: acum._acc || [],
    exp: acum._exp || new Date().toISOString()
  });
  delete final._acc; delete final._n; delete final._chunked;
  delete final._fotoLen; delete final._chunked;
  const str = JSON.stringify(final);
  _getFile().setContent(str);
  try { tf.setContent('{}'); } catch (x) {}
  return ok({ exp: final.exp, totalFotos: final.fotos.length, bytes: str.length, chunks: acum._n });
}

function ok(extra) {
  return ContentService
    .createTextOutput(JSON.stringify(Object.assign({ ok: true }, extra || {})))
    .setMimeType(ContentService.MimeType.JSON);
}
