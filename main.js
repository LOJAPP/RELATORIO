const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');

const APP_URL = 'https://lojapp.github.io/RELATORIO/jacaranda_manutencao.html';

let win = null;

function createWindow(){
  win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.ico'),
    backgroundColor: '#0d2a52',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  Menu.setApplicationMenu(null);

  // Carrega o app hospedado (sempre a versão mais recente; o service worker
  // mantém o funcionamento offline após a primeira abertura)
  win.loadURL(APP_URL).catch(() => {
    win.loadFile(path.join(__dirname, 'offline.html'));
  });

  win.webContents.on('did-fail-load', (_e, code) => {
    if (code === -106 || code === -105 || code === -118) { // sem internet / DNS
      win.loadFile(path.join(__dirname, 'offline.html'));
    }
  });

  // Links externos (Drive, CHM, GitHub...) abrem no navegador padrão.
  // Janelas internas de impressão/PDF (about:blank, blob:) são permitidas.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (
      !url ||
      url === 'about:blank' ||
      url.startsWith('about:') ||
      url.startsWith('blob:') ||
      url.startsWith('data:') ||
      url.startsWith('https://lojapp.github.io/')
    ) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          autoHideMenuBar: true,
          icon: path.join(__dirname, 'icon.ico'),
          webPreferences: { contextIsolation: true, nodeIntegration: false }
        }
      };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Impressão/PDF dos relatórios usa as janelas internas normalmente (allow acima)

  // Downloads: pergunta onde salvar (permite salvar direto em pasta de rede)
  win.webContents.session.on('will-download', (_event, item) => {
    // deixa o diálogo padrão "Salvar como" do Windows
    item.setSaveDialogOptions({ title: 'Salvar arquivo do Jacarandá' });
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { app.quit(); });
