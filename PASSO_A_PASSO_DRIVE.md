# ⚓ PASSO A PASSO — Corrigir o salvamento no Google Drive
### M/V LOG-IN Jacarandá · App de Relatórios a Bordo

O app salva o backup num arquivo do seu Drive através de um "Web App" do
Google Apps Script. Quando o salvamento para de funcionar, a causa é quase
sempre uma destas: o script está desatualizado, a implantação não está com
acesso "Qualquer pessoa", ou a URL da implantação mudou. Siga os passos na
ordem — leva uns 5 minutos.

---

## PARTE 1 — Atualizar o código do script

1. No computador, entre em **script.google.com** com a MESMA conta Google
   dona do arquivo de backup no Drive.
2. Abra o seu projeto existente do Jacarandá (ou crie: **+ Novo projeto**).
3. Apague TODO o código que estiver no editor.
4. Abra o arquivo **`Code_AppsScript.gs`** (enviado junto) no Bloco de Notas,
   copie tudo (Ctrl+A → Ctrl+C) e cole no editor do Apps Script.
5. Clique no ícone de **disquete 💾 (Salvar projeto)**.

> O código já aponta para o seu arquivo oficial de backup:
> `https://drive.google.com/file/d/1O2EOSHlRyFbZrfq4r5JpOFW_AwDZMTth/view`
> Se esse arquivo um dia for excluído, o script cria sozinho um
> `jacaranda_backup.json` novo no Drive.

## PARTE 2 — Reimplantar como App da Web (o passo que mais falha!)

6. Clique em **Implantar → Gerenciar implantações**.
7. Se já existir uma implantação: clique no **lápis ✏️ (Editar)**.
   Se não existir: **Implantar → Nova implantação → ⚙️ tipo: App da Web**.
8. Configure EXATAMENTE assim:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** **QUALQUER PESSOA**  ← ⚠️ atenção:
     tem que ser "Qualquer pessoa", e NÃO "Qualquer pessoa com conta Google".
9. Clique em **Implantar**.
10. Se o Google pedir autorização: **Autorizar acesso** → escolha sua conta →
    "O Google não verificou este app" → **Avançado** → **Acessar (projeto)…**
    → **Permitir**. (Isso é normal — o app é seu.)
11. Copie a **URL do app da Web** que aparece (termina em `/exec`).

## PARTE 3 — Conferir a URL no app do navio

12. A URL oficial já vem FIXA dentro do app:
    `https://script.google.com/macros/s/AKfycbzU64I5qshFkmng772VAhVAGdMYmPVrnUCD0HBQdiFSBEMsNXRjmfWoyx_aX_2uN5-3/exec`
    - Se a URL copiada no passo 11 for **igual** → não precisa fazer nada.
    - Se for **diferente** (o Google gera URL nova quando se cria NOVA
      implantação em vez de editar a existente): cole a nova em
      **⚙️ Configurações → Google Drive → URL do Web App → Salvar**,
      e me envie a URL nova para eu fixá-la no código do app.

## PARTE 4 — Testar

13. No app: **Arquivos & Backups → 🩺 Diagnóstico**. Ele diz exatamente o
    estado: sem internet / exigindo login (voltar à Parte 2, passo 8) /
    script errado (voltar à Parte 1) / ✅ conexão OK.
14. Toque em **☁️ Salvar**. O status deve mostrar:
    **"✅ Salvo e VERIFICADO no Drive (x MB)"** — só com essa mensagem a
    gravação está garantida (o app lê de volta e confere).
15. Abra o link do arquivo no Drive e confira a data de modificação.

---

## Os links ficam fixos? SIM — em todas as situações:

- **Atualização pelo GitHub:** as duas URLs (Web App e arquivo do Drive)
  estão gravadas DENTRO do código do app; toda atualização publicada no
  GitHub já as carrega. Ao abrir, o app corrige sozinho aparelhos sem
  configuração ou com URL de implantação antiga.
- **App compartilhado (📦 Compartilhar App):** o arquivo gerado leva a
  configuração embutida — quem recebe abre com os links já aplicados.
- **Sincronização online:** os links fixos das pastas também viajam no
  backup do Drive para todos os dispositivos conectados.
- Só uma URL digitada MANUALMENTE na Configuração tem prioridade sobre a
  oficial (para casos de troca de implantação).

## Se ainda não salvar

- Backup acima de **45 MB** (muitas fotos): o app avisa. Use o backup por
  escopo (CVS/MAQ/…) ou limpe fotos antigas.
- Internet do navio bloqueando `script.google.com`: o diagnóstico acusa
  "SEM CONEXÃO". Nesse caso use o salvamento na pasta de rede (que não
  depende do Google) até haver internet.
