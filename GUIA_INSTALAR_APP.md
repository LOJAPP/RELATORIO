# 📱 Guia — Instalar o App Jacarandá no Celular

## O que você precisa

Os seguintes arquivos (todos na mesma pasta):
- `jacaranda_manutencao.html` — o app principal
- `manifest.json` — configuração do app
- `service-worker.js` — suporte offline
- `icon.svg` — ícone do app
- `index.html` — página de entrada

---

## Opção A — Google Drive (mais fácil, sem custo)

### Passo 1 — Subir os arquivos
1. Acesse **drive.google.com**
2. Crie uma pasta chamada `JacarandaApp`
3. Faça upload de **todos os 5 arquivos** para essa pasta

### Passo 2 — Publicar com Google Sites
1. Acesse **sites.google.com** → **Criar novo site**
2. Clique em **Incorporar** → **Incorporar código**
3. Não funciona direto — use o método abaixo

### Passo 2 (alternativa) — GitHub Pages (grátis)
Ver **Opção B** abaixo.

---

## Opção B — GitHub Pages (Recomendado — grátis, fácil)

### Passo 1 — Criar conta no GitHub
1. Acesse **github.com** → **Sign up** (gratuito)
2. Crie uma conta com seu email

### Passo 2 — Criar repositório
1. Clique em **New repository** (botão verde)
2. Nome: `jacaranda-app`
3. Marque **Public**
4. Marque **Add a README file**
5. Clique **Create repository**

### Passo 3 — Fazer upload dos arquivos
1. Na página do repositório, clique **Add file → Upload files**
2. Arraste todos os 5 arquivos de uma vez
3. Clique **Commit changes**

### Passo 4 — Ativar GitHub Pages
1. Vá em **Settings** (engrenagem) → **Pages**
2. Em **Source**: selecione `main` branch, pasta `/ (root)`
3. Clique **Save**
4. Aguarde ~2 minutos
5. Aparece a URL: `https://SEU_USUARIO.github.io/jacaranda-app/`

### Passo 5 — Instalar no celular

**Android (Chrome):**
1. Abra a URL no Chrome do celular
2. Aparece banner "Adicionar à tela inicial" → toque nele
3. OU toque nos 3 pontos (⋮) → **Adicionar à tela inicial**
4. Confirme → ícone aparece na tela inicial ✅

**iPhone (Safari):**
1. Abra a URL no Safari
2. Toque no ícone de **Compartilhar** (□↑)
3. Role para baixo → **Adicionar à Tela de Início**
4. Confirme → ícone aparece na tela inicial ✅

---

## Opção C — Servidor local na rede do navio

Se o navio tiver um servidor ou computador na rede local:

### Usando Python (se tiver Python instalado)
```bash
# Na pasta com os 5 arquivos:
python -m http.server 8080
```
Acesse pelo celular: `http://IP_DO_COMPUTADOR:8080`

### Usando Node.js
```bash
npx serve .
```

---

## Opção D — Netlify Drop (mais fácil de todos)

1. Acesse **app.netlify.com/drop**
2. **Arraste a pasta inteira** com os 5 arquivos para a área indicada
3. Em segundos você recebe uma URL como `https://nome-aleatorio.netlify.app`
4. Instale no celular pelo método do Passo 5 acima

**Netlify é gratuito para uso pessoal.**

---

## Funcionamento offline

Após a primeira abertura com internet, o app funciona **100% offline** graças ao Service Worker. Todos os dados ficam salvos no celular.

---

## URL do Web App para Drive (sincronização)

Depois de instalar, configure em **⚙️ Configurações**:
- Cole a URL do Google Apps Script para sincronizar dados entre dispositivos
- Todos na equipe com o mesmo URL compartilham os mesmos dados

