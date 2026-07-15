@echo off
:: ============================================================
::  LOG-IN JACARANDA - Lancador Desktop (modo aplicativo)
::  Abre o app em janela propria, sem barra do navegador.
::  Funciona offline apos a primeira abertura (PWA + cache).
:: ============================================================
set URL=https://lojapp.github.io/RELATORIO/jacaranda_manutencao.html

:: 1) Tenta Microsoft Edge
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=%URL%
  exit
)
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app=%URL%
  exit
)

:: 2) Tenta Google Chrome
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=%URL%
  exit
)
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app=%URL%
  exit
)
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
  start "" "%LocalAppData%\Google\Chrome\Application\chrome.exe" --app=%URL%
  exit
)

:: 3) Fallback: navegador padrao
start "" %URL%
exit
