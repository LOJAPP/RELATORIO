<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- PWA -->
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#1A5FA8">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Jacarandá">
  <link rel="apple-touch-icon" href="icon.svg">

  <title>Log-In Jacarandá — Sistema de Relatórios de Trabalhos a Bordo</title>
<style>
  :root{
    /* Brand */
    --login-blue:      #1A5FA8;
    --login-blue-dk:   #0E3D72;
    --login-blue-lt:   #2478C8;
    --login-blue-xlt:  #EBF3FB;
    --login-green:     #4E9A2E;
    --login-green-dk:  #2D6B1A;
    --login-green-xlt: #EDF7E6;
    --login-gold:      #F59E0B;
    /* Surface */
    --bg:       #EFF5FB;
    --surface:  #FFFFFF;
    --surface2: #F7FAFE;
    /* Border */
    --border:   #C8D9ED;
    --border2:  #9DBDE0;
    /* Text */
    --text:     #0F1E2E;
    --text-dim: #4A6880;
    --muted:    #8AACD0;
    /* Status */
    --danger:   #DC2626;
    --warn:     #D97706;
    --gold:     #B45309;
    --gray:     #6B7280;
    --login-green-lt: #7BC356;
    --shadow-card: 0 2px 8px rgba(14,61,114,.08);
    /* Shadow */
    --shadow-xs: 0 1px 3px rgba(14,61,114,.06);
    --shadow-sm: 0 2px 8px rgba(14,61,114,.08);
    --shadow-md: 0 4px 16px rgba(14,61,114,.10);
    --shadow-lg: 0 8px 32px rgba(14,61,114,.14);
    /* Radius */
    --radius:   10px;
    --radius-lg:14px;
    --radius-sm:6px;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{height:100%;overflow:hidden;font-family:'Barlow',system-ui,sans-serif;font-size:14px;background:var(--bg);color:var(--text);}
  #app{display:flex;height:100vh;overflow:hidden;}

  /* ══ SIDEBAR — Desktop fixed, Mobile drawer ══ */
  #sidebar{width:240px;min-width:240px;background:var(--login-blue-dk);display:flex;flex-direction:column;overflow-y:auto;border-right:1px solid rgba(0,0,0,.2);transition:transform .28s cubic-bezier(.4,0,.2,1);z-index:500;flex-shrink:0;}
  #main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
  .sidebar-logo{padding:18px 16px 14px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;}
  .logo-mark{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;line-height:1;letter-spacing:-1px;}
  .logo-mark .lo{color:#fff;} .logo-mark .gi{color:var(--login-green);} .logo-mark .dot{color:var(--gold);}
  .logo-tagline{font-size:9px;color:rgba(255,255,255,.4);letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
  .vessel-badge{font-size:10px;color:rgba(255,255,255,.6);margin-top:6px;font-weight:600;}
  .nav-section{padding:10px 0 4px;}
  .nav-label{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.28);padding:4px 16px 6px;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;border-left:3px solid transparent;font-size:13px;color:rgba(255,255,255,.75);transition:background .15s,border-color .15s,color .15s;font-weight:500;}
  .nav-item:hover{background:rgba(255,255,255,.07);color:#fff;}
  .nav-item.active{background:rgba(255,255,255,.12);border-left-color:var(--login-green);color:#fff;font-weight:600;}
  .nav-item .ico{font-size:15px;width:20px;text-align:center;flex-shrink:0;}

  /* ══ HAMBURGER (mobile) ══ */
  #hamburger{display:none;align-items:center;justify-content:center;width:40px;height:40px;background:transparent;border:none;cursor:pointer;border-radius:8px;padding:4px;flex-shrink:0;}
  #hamburger:hover{background:rgba(255,255,255,.1);}
  .hbg{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all .25s;margin:4px 0;}

  /* ══ OVERLAY ══ */
  #sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(5,20,50,.65);z-index:498;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);}

  /* ══ BOTTOM NAV (mobile) ══ */
  #bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:400;background:#0a2547;border-top:1px solid rgba(255,255,255,.1);padding-bottom:env(safe-area-inset-bottom,0px);}
  .bnav-row{display:flex;}
  .bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7px 2px 5px;cursor:pointer;color:rgba(255,255,255,.55);font-size:9px;font-weight:700;gap:2px;border-top:2px solid transparent;transition:all .15s;letter-spacing:.3px;text-transform:uppercase;min-width:0;}
  .bnav-item .bi{font-size:19px;line-height:1;}
  .bnav-item:active,.bnav-item.active{color:#fff;background:rgba(255,255,255,.1);border-top-color:var(--login-green);}
  .bnav-more{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7px 2px 5px;cursor:pointer;color:rgba(255,255,255,.55);font-size:9px;font-weight:700;gap:2px;border-top:2px solid transparent;transition:all .15s;text-transform:uppercase;letter-spacing:.3px;}
  .bnav-more:active,.bnav-more.active{color:#fff;background:rgba(255,255,255,.1);border-top-color:var(--gold);}
  .bnav-more .bi{font-size:19px;}

  /* ══ DRAWER MENU (tray above bottom nav) ══ */
  #mobile-drawer{position:fixed;bottom:0;left:0;right:0;z-index:499;background:#0d2f5e;border-top:1px solid rgba(255,255,255,.12);border-radius:16px 16px 0 0;transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);padding:0 0 env(safe-area-inset-bottom,0px);}
  #mobile-drawer.open{transform:translateY(0);}
  #mobile-drawer-handle{width:36px;height:4px;background:rgba(255,255,255,.3);border-radius:2px;margin:10px auto 8px;}
  .drawer-title{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,.4);text-transform:uppercase;text-align:center;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.08);margin:0 14px;}
  .drawer-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:10px 10px;max-height:55vh;overflow-y:auto;}
  .drawer-item{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px;border-radius:10px;cursor:pointer;color:rgba(255,255,255,.8);font-size:10px;font-weight:600;text-align:center;transition:background .15s;line-height:1.2;}
  .drawer-item .di{font-size:24px;line-height:1;}
  .drawer-item:active,.drawer-item.active{background:rgba(255,255,255,.15);color:#fff;}
  .drawer-overlay{position:fixed;inset:0;z-index:497;}

  /* ══ RESPONSIVE ══ */
  @media(max-width:768px){
    #app{flex-direction:column;}
    #sidebar{position:fixed;top:0;left:0;bottom:0;transform:translateX(-100%);width:82%;max-width:290px;box-shadow:6px 0 24px rgba(0,0,0,.5);}
    #sidebar.open{transform:translateX(0);}
    #sidebar-overlay.show{display:block;}
    #hamburger{display:flex;}
    #bottom-nav{display:block;}
    #mobile-drawer.open ~ #bottom-nav,
    #bottom-nav .bnav-more.active{border-top-color:var(--gold);}
    #content{padding:12px 10px 72px;}
    #topbar h1{font-size:14px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .topbar-right .clock{display:none;}
    .topbar-right .btn.btn-ghost:not(.keep){display:none;}
  }
  @media(max-width:480px){
    #content{padding:8px 8px 68px;}
  }
  @media(min-width:769px){
    #hamburger{display:none!important;}
    #bottom-nav{display:none!important;}
    #mobile-drawer{display:none!important;}
  }

  #topbar{display:flex;align-items:center;gap:12px;padding:10px 20px;background:#fff;border-bottom:3px solid var(--login-blue);box-shadow:0 2px 8px rgba(26,95,168,.1);min-height:54px;}
  #topbar h1{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;color:var(--login-blue);}
  .topbar-right{margin-left:auto;display:flex;align-items:center;gap:8px;}
  .clock{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--text-dim);background:var(--bg);padding:4px 10px;border-radius:4px;border:1px solid var(--border);}
  #content{flex:1;overflow-y:auto;padding:20px;background:var(--bg);}

  /* ── KPI ── */
  .cards-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px;}
  .kpi-card{flex:1;min-width:130px;background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;position:relative;overflow:hidden;box-shadow:0 1px 4px rgba(26,95,168,.07);}
  .kpi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;}
  .kpi-card.c-blue::before{background:var(--login-blue);}
  .kpi-card.c-green::before{background:var(--login-green);}
  .kpi-card.c-warn::before{background:var(--warn);}
  .kpi-card.c-gold::before{background:var(--gold);}
  .kpi-label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-dim);margin-bottom:6px;}
  .kpi-val{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;line-height:1;color:var(--login-blue);}
  .kpi-val.gv{color:var(--login-green);}
  .kpi-sub{font-size:11px;color:var(--muted);margin-top:4px;}

  /* ── PANEL ── */
  .panel{background:#fff;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:16px;box-shadow:0 1px 4px rgba(26,95,168,.06);}
  .panel-header{display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border);font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--login-blue);border-top:3px solid var(--login-green);border-radius:var(--radius) var(--radius) 0 0;background:linear-gradient(to right,var(--login-blue-xlt),#fff);}
  .panel-header .badge{margin-left:auto;background:var(--login-blue);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;}

  /* ── TABLE ── */
  .tbl{width:100%;border-collapse:collapse;font-size:13px;}
  .tbl th{background:var(--login-blue-xlt);color:var(--login-blue);font-size:10px;text-transform:uppercase;letter-spacing:1px;padding:8px 12px;text-align:left;border-bottom:2px solid var(--border);}
  .tbl td{padding:9px 12px;border-bottom:1px solid var(--bg);vertical-align:top;}
  .tbl tr:hover td{background:#F4F8FC;}
  .tbl tr:last-child td{border-bottom:none;}

  /* ── TAGS ── */
  .tag{display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.5px;}
  .tc{background:#DBEAFE;color:#1E40AF;border:1px solid #BFDBFE;}
  .tm{background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;}
  .tr{background:#D1FAE5;color:#065F46;border:1px solid #A7F3D0;}
  .tb{background:#EDE9FE;color:#5B21B6;border:1px solid #DDD6FE;}
  .te{background:#FCE7F3;color:#9D174D;border:1px solid #FBCFE8;}
  .tok{background:#D1FAE5;color:#065F46;border:1px solid #A7F3D0;}
  .tpend{background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;}
  .tcrit{background:#FEE2E2;color:#991B1B;border:1px solid #FECACA;}

  /* ── FORMS ── */
  .form-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;}
  .form-group{flex:1;min-width:160px;}
  .form-group label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-dim);margin-bottom:5px;font-weight:600;}
  .form-control{width:100%;background:#fff;border:1px solid var(--border);border-radius:5px;padding:8px 10px;color:var(--text);font-size:13px;font-family:'Barlow',sans-serif;outline:none;transition:border .15s;}
  .form-control:focus{border-color:var(--login-blue);box-shadow:0 0 0 3px rgba(26,95,168,.1);}
  textarea.form-control{min-height:80px;resize:vertical;}
  .sep{height:1px;background:var(--border);margin:14px 0;}

  /* ── BUTTONS ── */
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:5px;border:none;cursor:pointer;font-size:12px;font-weight:700;font-family:'Barlow',sans-serif;text-transform:uppercase;letter-spacing:.5px;transition:all .15s;}
  .btn-primary{background:var(--login-blue);color:#fff;}
  .btn-primary:hover{background:var(--login-blue-lt);}
  .btn-green{background:var(--login-green);color:#fff;}
  .btn-green:hover{background:var(--login-green-lt);}
  .btn-danger{background:var(--danger);color:#fff;}
  .btn-danger:hover{background:#e74c3c;}
  .btn-warn{background:var(--warn);color:#fff;}
  .btn-warn:hover{background:#f59e0b;}
  .btn-ghost{background:var(--bg);color:var(--text-dim);border:1px solid var(--border);}
  .btn-ghost:hover{background:var(--border);color:var(--text);}
  .btn-sm{padding:5px 10px;font-size:11px;}

  /* ── EXPORT BAR ── */
  .export-bar{display:flex;align-items:center;gap:12px;background:var(--login-blue-xlt);border:1px solid var(--border);border-radius:var(--radius);padding:10px 14px;margin-bottom:14px;font-size:12px;color:var(--login-blue);}
  .export-bar p{flex:1;}

  /* ── WEEK TABS ── */
  .week-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
  .week-tab{padding:7px 16px;background:#fff;border:2px solid var(--border);border-radius:20px;cursor:pointer;font-size:12px;font-weight:700;color:var(--text-dim);transition:all .15s;font-family:'Barlow Condensed',sans-serif;letter-spacing:.5px;}
  .week-tab:hover{border-color:var(--login-blue);color:var(--login-blue);}
  .week-tab.active{background:var(--login-blue);border-color:var(--login-blue);color:#fff;}

  /* ── DEPT PILLS ── */
  .dept-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
  .dept-pill{padding:6px 16px;background:#fff;border:2px solid var(--border);border-radius:20px;cursor:pointer;font-size:12px;font-weight:700;color:var(--text-dim);transition:all .15s;}
  .dept-pill:hover{border-color:var(--login-blue);}
  .dept-pill.pa{background:var(--login-blue);border-color:var(--login-blue);color:#fff;}
  .dept-pill.pc{background:#DBEAFE;border-color:#93C5FD;color:#1E40AF;}
  .dept-pill.pm{background:#FEF3C7;border-color:#FCD34D;color:#92400E;}
  .dept-pill.pr{background:#D1FAE5;border-color:#6EE7B7;color:#065F46;}
  .dept-pill.pbl{background:#EDE9FE;border-color:#C4B5FD;color:#5B21B6;}

  /* ── SEARCH BAR ── */
  .search-bar{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:8px 12px;margin-bottom:14px;}
  .search-bar input{flex:1;border:none;outline:none;font-size:13px;font-family:'Barlow',sans-serif;color:var(--text);background:transparent;}

  /* ── TIMELINE ── */
  .timeline{display:flex;flex-direction:column;gap:10px;}
  .timeline-item{background:#fff;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;border-left:4px solid var(--login-green);}
  .tl-date{background:var(--login-blue-xlt);padding:7px 14px;font-size:11px;color:var(--login-blue);display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--border);}
  .tl-content{padding:10px 14px;}
  .tl-title{font-weight:600;font-size:13px;margin-bottom:4px;}
  .tl-body{font-size:12px;color:var(--text-dim);}

  /* ── PHOTOS ── */
  .compress-info{background:var(--login-green-xlt);border:1px solid #A7F3D0;border-radius:6px;padding:8px 12px;font-size:11px;color:var(--login-green-dk);margin-bottom:12px;}
  .photo-drop-zone{border:2px dashed var(--border2);border-radius:var(--radius);padding:18px;text-align:center;color:var(--text-dim);cursor:pointer;transition:all .2s;margin-bottom:10px;display:block;}
  .photo-drop-zone:hover{border-color:var(--login-green);color:var(--login-green);background:var(--login-green-xlt);}
  .photo-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}
  .photo-thumb{position:relative;width:90px;height:90px;border-radius:5px;overflow:hidden;border:2px solid var(--border);cursor:pointer;transition:border-color .15s;}
  .photo-thumb:hover{border-color:var(--login-blue);}
  .photo-thumb img{width:100%;height:100%;object-fit:cover;}
  .photo-thumb .rmp{position:absolute;top:2px;right:2px;background:rgba(192,57,43,.88);border:none;border-radius:3px;color:#fff;font-size:10px;padding:1px 4px;cursor:pointer;}
  .rep-photo{width:120px;height:90px;object-fit:cover;border-radius:5px;border:2px solid var(--border);cursor:pointer;transition:transform .15s;}
  .rep-photo:hover{transform:scale(1.04);border-color:var(--login-blue);}
  .rep-photos{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}

  /* ── MODAL ── */
  .modal-overlay{display:none;position:fixed;inset:0;background:rgba(10,30,70,.55);z-index:1000;align-items:center;justify-content:center;padding:20px;}
  .modal-overlay.open{display:flex;}
  .modal{background:#fff;border-radius:10px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(10,30,70,.3);}
  .modal-header{display:flex;align-items:center;justify-content:space-between;padding:15px 20px;border-bottom:1px solid var(--border);font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;text-transform:uppercase;color:var(--login-blue);background:linear-gradient(to right,var(--login-blue-xlt),#fff);border-top:4px solid var(--login-green);border-radius:10px 10px 0 0;}
  .modal-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-dim);padding:2px 6px;border-radius:4px;margin-left:auto;}
  .modal-close:hover{background:var(--bg);color:var(--danger);}
  .modal-body{padding:18px 20px;}
  .modal-footer{display:flex;gap:10px;justify-content:flex-end;padding:14px 20px;border-top:1px solid var(--border);background:var(--surface2);border-radius:0 0 10px 10px;}

  /* ── CREW CARDS ── */
  .crew-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:12px 14px;display:flex;align-items:flex-start;gap:12px;margin-bottom:8px;transition:border-color .15s;box-shadow:0 1px 3px rgba(26,95,168,.06);}
  .crew-card:hover{border-color:var(--login-blue);}
  .crew-av{width:46px;height:46px;border-radius:50%;background:var(--login-blue);display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:#fff;flex-shrink:0;}
  .crew-name{font-weight:700;font-size:14px;}
  .crew-role{font-size:11px;color:var(--text-dim);margin-top:1px;}
  .emb-b{background:var(--login-blue-xlt);color:var(--login-blue);font-size:11px;font-weight:600;padding:2px 8px;border-radius:3px;}
  .des-b{background:var(--login-green-xlt);color:var(--login-green-dk);font-size:11px;font-weight:600;padding:2px 8px;border-radius:3px;}

  /* ── REPORT HEADER ── */
  .rpt-header{display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,var(--login-blue-dk) 0%,var(--login-blue) 60%,var(--login-blue-lt) 100%);color:#fff;padding:16px 20px;border-radius:var(--radius) var(--radius) 0 0;margin-bottom:0;}
  .rpt-logo{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:-1px;flex-shrink:0;}
  .rpt-logo .gi{color:var(--login-green-lt);}
  .rpt-logo .dot{color:rgba(255,255,255,.5);}
  .rpt-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;text-transform:uppercase;}
  .rpt-sub{font-size:11px;opacity:.7;margin-top:3px;}

  /* ── STORAGE ── */
  .save-panel{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:16px 18px;margin-bottom:14px;border-left-width:4px;}
  .save-panel h3{font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;color:var(--login-blue);text-transform:uppercase;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border);}
  .save-opts{display:flex;gap:10px;flex-wrap:wrap;}
  .save-opt{flex:1;min-width:130px;border:1px solid var(--border);border-radius:var(--radius);padding:12px;text-align:center;cursor:pointer;transition:all .15s;}
  .save-opt:hover{border-color:var(--login-blue);background:var(--login-blue-xlt);}
  .oi{font-size:22px;margin-bottom:4px;}
  .ot{font-weight:700;font-size:12px;text-transform:uppercase;}
  .od{font-size:10px;color:var(--text-dim);margin-top:4px;line-height:1.4;}
  .net-hint{font-family:'IBM Plex Mono',monospace;font-size:11px;background:var(--bg);border:1px solid var(--border);padding:4px 10px;border-radius:4px;color:var(--text-dim);word-break:break-all;display:inline-block;margin-top:4px;}

  /* ── MISC ── */
  .empty-state{text-align:center;color:var(--muted);padding:40px;}
  .empty-state .ico{font-size:36px;margin-bottom:10px;}
  .mono{font-family:'IBM Plex Mono',monospace;}
  .section-title{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-dim);margin-bottom:10px;}
  .page{display:none;}
  .page.active{display:block;}
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}
  .toast{position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 18px;border-radius:6px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,.2);animation:fadeUp .3s ease;}
  .t-ok{background:var(--login-green);color:#fff;}
  .t-warn{background:var(--warn);color:#fff;}
  .t-err{background:var(--danger);color:#fff;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

  /* ── INSPECTION ITEMS ── */
  .insp-item{background:#fff;border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px;position:relative;}
  .insp-item-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;}
  .insp-item-num{background:var(--login-blue);color:#fff;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;flex-shrink:0;}
  .insp-item-del{margin-left:auto;background:none;border:none;color:var(--danger);cursor:pointer;font-size:14px;padding:2px 6px;border-radius:4px;}
  .insp-item-del:hover{background:#FEE2E2;}
  .insp-res-badge{font-size:10px;font-weight:700;padding:2px 10px;border-radius:10px;}

  /* ── MOBILE ACTION CARD ── */
  .mob-action-card{background:#fff;border:2px solid var(--border);border-radius:10px;padding:18px;text-align:center;cursor:pointer;transition:transform .1s,background .15s;}
  .mob-action-card:active{transform:scale(.96);}

  /* ── FLOATING BAR ── */
  #float-bar{
    position:fixed;
    z-index:8000;
    min-width:240px;
    max-width:320px;
    background:linear-gradient(135deg,var(--login-blue-dk),var(--login-blue));
    border-radius:14px;
    box-shadow:0 8px 32px rgba(10,30,70,.4);
    overflow:hidden;
    user-select:none;
    transition:box-shadow .2s;
  }
  #float-bar.dragging{box-shadow:0 16px 48px rgba(10,30,70,.6);opacity:.95;}
  #float-bar-handle{
    display:flex;align-items:center;gap:8px;
    padding:10px 12px;
    cursor:grab;
    background:rgba(0,0,0,.15);
    border-bottom:1px solid rgba(255,255,255,.1);
  }
  #float-bar-handle:active{cursor:grabbing;}
  #float-bar-drag-icon{font-size:16px;color:rgba(255,255,255,.6);flex-shrink:0;}
  #float-bar-title{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:#fff;letter-spacing:.5px;}
  #float-bar-body{padding:10px 12px;}
  #float-bar-body.collapsed{display:none;}
  #float-bar-btns{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:0;}
  .fbar-btn{
    display:flex;flex-direction:column;align-items:center;gap:2px;
    background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);
    border-radius:8px;padding:8px 4px;cursor:pointer;
    transition:background .15s;color:#fff;font-size:10px;font-weight:700;
    text-align:center;
  }
  .fbar-btn:hover{background:rgba(255,255,255,.25);}
  .fbar-btn:active{transform:scale(.93);}
  .fbar-btn .fbar-ico{font-size:20px;line-height:1;}

  /* ── CREW MULTISELECT ── */
  .crew-check-list{max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:5px;padding:6px;}
  .crew-check-item{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:4px;cursor:pointer;transition:background .1s;}
  .crew-check-item:hover{background:var(--login-blue-xlt);}
  .crew-check-item input[type=checkbox]{accent-color:var(--login-blue);width:14px;height:14px;}
  .crew-check-item label{cursor:pointer;font-size:12px;flex:1;}
  .crew-check-item .fn-badge{font-size:10px;color:var(--text-dim);}
  .selected-crew-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px;min-height:24px;}
  .ctag{background:var(--login-blue);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;cursor:pointer;}
  .ctag:hover{background:var(--danger);}

  .cfg-chip{display:inline-flex;align-items:center;gap:5px;background:var(--login-blue-xlt);border:1px solid var(--border2);color:var(--login-blue);font-size:11px;font-weight:600;padding:4px 10px;border-radius:14px;}
  .cfg-chip .rm{cursor:pointer;color:var(--danger);font-weight:700;padding:0 2px;}
  .cfg-chip .rm:hover{color:#900;}

  /* ── ACT CARD (registro em card vertical) ── */
  .act-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;overflow:hidden;box-shadow:0 1px 4px rgba(26,95,168,.05);transition:box-shadow .15s;}
  .act-card:hover{box-shadow:0 3px 12px rgba(26,95,168,.12);}
  .act-card-head{display:flex;align-items:flex-start;gap:10px;padding:11px 14px 10px;border-bottom:1px solid var(--bg);}
  .act-num{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;color:#fff;background:var(--login-blue);padding:2px 7px;border-radius:4px;flex-shrink:0;margin-top:2px;}
  .act-title-block{flex:1;min-width:0;}
  .act-title{font-size:13px;font-weight:700;color:var(--text);line-height:1.45;letter-spacing:.1px;}
  .act-desc{
    font-size:12px;color:var(--text-dim);line-height:1.65;
    margin-top:5px;padding:8px 10px;
    background:var(--surface2);border-left:3px solid var(--border2);
    border-radius:0 4px 4px 0;
    white-space:pre-wrap;       /* preserva quebras de linha e espaços */
    word-break:break-word;
    overflow-wrap:break-word;
    font-family:'Barlow',sans-serif;
  }
  .act-actions{display:flex;gap:5px;flex-shrink:0;}
  .act-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:7px 14px;background:var(--surface2);border-bottom:1px solid var(--bg);font-size:11px;color:var(--text-dim);}
  .act-meta-item{display:flex;align-items:center;gap:4px;white-space:nowrap;}
  .act-meta-equipe{flex-wrap:wrap;white-space:normal;align-items:flex-start;}
  .crew-tag-pill{display:inline-flex;align-items:center;background:var(--login-blue-xlt);color:var(--login-blue);border:1px solid var(--border2);font-size:10px;font-weight:700;padding:1px 7px;border-radius:10px;font-family:'IBM Plex Mono',monospace;white-space:nowrap;margin:1px 2px;}
  .act-photos{padding:8px 14px 12px;background:#F7FBFF;}
  .act-photos-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;color:var(--text-dim);margin-bottom:6px;}
  .act-photos-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
  .act-photo-wrap{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:5px;border:2px solid var(--border);cursor:pointer;transition:border-color .15s,transform .1s;}
  .act-photo-wrap:hover{border-color:var(--login-blue);transform:scale(1.02);}
  .act-photo-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

  /* ── SENHA / PIN MODAL ── */
  .pin-dots{display:flex;justify-content:center;gap:10px;margin:16px 0 8px;}
  .pin-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--border2);background:transparent;transition:all .15s;}
  .pin-dot.filled{background:var(--login-blue);border-color:var(--login-blue);}
  .pin-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px;}
  .pin-btn{background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:15px;font-size:20px;font-weight:700;font-family:'Barlow Condensed',sans-serif;cursor:pointer;transition:all .1s;text-align:center;color:var(--text);}
  .pin-btn:hover{background:var(--login-blue-xlt);border-color:var(--login-blue);color:var(--login-blue);}
  .pin-btn:active{transform:scale(.94);}
  .pin-btn.clr{color:var(--danger);font-size:14px;}
  .pin-btn.del{color:var(--text-dim);font-size:14px;}
  .pin-btn.ok{grid-column:span 3;background:var(--login-blue);color:#fff;font-size:14px;border-color:var(--login-blue);letter-spacing:1px;}
  .pin-btn.ok:hover{background:var(--login-blue-lt);}
  .pin-err{color:var(--danger);font-size:12px;text-align:center;margin-top:6px;min-height:18px;font-weight:600;}

  /* ── CARTÃO DE DESVIO ── */
  .desvio-card{background:#fff;border:1px solid var(--border);border-left:4px solid var(--danger);border-radius:var(--radius);margin-bottom:10px;overflow:hidden;box-shadow:0 1px 4px rgba(192,57,43,.08);}
  .desvio-card.aberto .desvio-head{background:#FEF2F2;}
  .desvio-card.fechado{border-left-color:var(--login-green);}
  .desvio-card.fechado .desvio-head{background:var(--login-green-xlt);}
  .desvio-head{display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background .15s;user-select:none;}
  .desvio-head:hover{background:var(--bg);}
  .desvio-num{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;color:#fff;background:var(--danger);padding:2px 8px;border-radius:4px;flex-shrink:0;}
  .desvio-card.fechado .desvio-num{background:var(--login-green);}
  .desvio-titulo{font-size:13px;font-weight:700;color:var(--text);flex:1;line-height:1.3;}
  .desvio-badge-aberto{background:#FEE2E2;color:#991B1B;border:1px solid #FECACA;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;flex-shrink:0;}
  .desvio-badge-fechado{background:var(--login-green-xlt);color:var(--login-green-dk);border:1px solid #A7F3D0;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;flex-shrink:0;}
  .desvio-chevron{font-size:14px;color:var(--text-dim);transition:transform .2s;flex-shrink:0;}
  .desvio-card.expanded .desvio-chevron{transform:rotate(180deg);}
  .desvio-body{padding:14px;border-top:1px solid var(--border);display:none;background:#FAFCFF;}
  .desvio-card.expanded .desvio-body{display:block;}
  .desvio-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:11px;color:var(--text-dim);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border);}
  .desvio-meta-item{display:flex;align-items:center;gap:4px;}
  .desvio-desc{font-size:12px;color:var(--text);white-space:pre-wrap;line-height:1.6;margin-bottom:12px;padding:8px 10px;background:#fff;border:1px solid var(--border);border-radius:5px;}
  .desvio-hist{border-top:1px solid var(--border);padding-top:10px;}
  .desvio-hist-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;color:var(--text-dim);margin-bottom:6px;}
  .desvio-hist-item{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid var(--bg);font-size:11px;color:var(--text-dim);}
  .desvio-hist-item:last-child{border-bottom:none;}
  .desvio-hist-date{font-family:'IBM Plex Mono',monospace;font-size:10px;flex-shrink:0;color:var(--muted);}

  /* ── INLINE EQUIPE POPUP ── */
  .equipe-popup-wrap{position:relative;}
  .equipe-popup{display:none;position:absolute;top:100%;left:0;z-index:600;background:#fff;border:1px solid var(--border2);border-radius:var(--radius);box-shadow:0 8px 28px rgba(26,95,168,.18);width:310px;padding:10px;}
  .equipe-popup.open{display:block;}
  .equipe-popup-search{width:100%;border:1px solid var(--border);border-radius:5px;padding:6px 10px;font-size:12px;margin-bottom:6px;outline:none;}
  .equipe-popup-search:focus{border-color:var(--login-blue);}
  .equipe-popup-list{max-height:200px;overflow-y:auto;}
  .equipe-popup-item{display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:4px;cursor:pointer;font-size:12px;}
  .equipe-popup-item:hover{background:var(--login-blue-xlt);}
  .equipe-popup-item input{accent-color:var(--login-blue);width:13px;height:13px;}
  .equipe-popup-btn-row{display:flex;gap:6px;margin-top:8px;border-top:1px solid var(--border);padding-top:8px;}

  /* ── MÓDULO DEPT CHIP ── */
  .mod-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:#fff;font-size:11px;font-weight:600;cursor:default;}
  .mod-chip.ok{border-color:var(--login-green);background:var(--login-green-xlt);color:var(--login-green-dk);}
  .mod-chip.pending{border-color:var(--warn);background:#FEF3C7;color:#92400E;}
  .mod-chip .mod-count{font-family:'IBM Plex Mono',monospace;font-size:10px;background:rgba(0,0,0,.1);padding:1px 5px;border-radius:3px;}
  .mod-imported-tag{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;background:var(--login-blue-xlt);border:1px solid var(--border2);color:var(--login-blue);font-size:11px;font-weight:600;}
  .mod-imported-tag .rm{cursor:pointer;color:var(--danger);}

  /* ── DRIVE LINK SAVED ── */
  .drive-link-saved{background:var(--login-blue-xlt);border:1px solid var(--border2);border-radius:6px;padding:10px 12px;margin-top:10px;}
  .drive-link-saved a{color:var(--login-blue);font-weight:700;word-break:break-all;font-size:12px;}
  .drive-link-saved .link-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--text-dim);margin-bottom:4px;font-weight:700;}

  @media print{
    /* ── RESET COMPLETO PARA IMPRESSÃO ── */
    *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;box-sizing:border-box!important;}
    html,body{height:auto!important;overflow:visible!important;background:#fff!important;font-size:11px!important;}
    #app{display:block!important;height:auto!important;}
    #sidebar,#topbar,.export-bar,.week-tabs,.dept-pills,.search-bar,
    .compress-info,.btn,.act-actions,.nav-item,.topbar-right,
    .modal-overlay,.pin-pad,.save-panel{display:none!important;}
    #main{display:block!important;overflow:visible!important;width:100%!important;}
    #content{overflow:visible!important;padding:6px 10px!important;background:#fff!important;height:auto!important;}
    .page{display:none!important;}
    .page.active{display:block!important;}

    /* ── CABEÇALHO DO RELATÓRIO ── */
    .rpt-header{
      display:flex!important;flex-direction:row!important;align-items:center!important;
      background:#0E3D72!important;color:#fff!important;
      padding:12px 16px!important;margin-bottom:12px!important;
      border-radius:6px!important;page-break-after:avoid!important;
    }
    .rpt-logo{font-size:24px!important;font-weight:800!important;color:#fff!important;flex-shrink:0!important;}
    .rpt-logo .gi{color:#6DB847!important;}
    .rpt-logo .dot{color:#2471C2!important;}
    .rpt-title{font-size:14px!important;font-weight:700!important;color:#fff!important;}
    .rpt-sub{font-size:10px!important;color:rgba(255,255,255,.75)!important;}

    /* ── PANELS ── */
    .panel{
      break-inside:avoid!important;page-break-inside:avoid!important;
      box-shadow:none!important;margin-bottom:10px!important;
      border:1px solid #C8D9ED!important;border-radius:6px!important;
    }
    .panel-header{
      background:#EBF3FB!important;color:#1A5FA8!important;
      padding:7px 12px!important;font-size:11px!important;
      border-bottom:1px solid #C8D9ED!important;
      display:flex!important;align-items:center!important;
    }
    .panel-header .badge{background:#1A5FA8!important;color:#fff!important;border-radius:8px!important;padding:1px 6px!important;font-size:9px!important;}

    /* ── ACT CARD ── */
    .act-card{
      break-inside:avoid!important;page-break-inside:avoid!important;
      border:1px solid #C8D9ED!important;border-radius:5px!important;
      margin-bottom:7px!important;box-shadow:none!important;
      background:#fff!important;overflow:visible!important;
    }
    .act-card-head{
      display:flex!important;align-items:flex-start!important;
      gap:8px!important;padding:8px 10px 7px!important;
      border-bottom:1px solid #EBF3FB!important;
    }
    .act-num{
      background:#1A5FA8!important;color:#fff!important;
      font-size:10px!important;padding:2px 6px!important;
      border-radius:3px!important;flex-shrink:0!important;
    }
    .act-title-block{flex:1!important;min-width:0!important;}
    .act-title{
      font-size:11px!important;font-weight:700!important;
      color:#1A2A3A!important;line-height:1.4!important;
      white-space:normal!important;word-break:break-word!important;
    }
    .act-desc{
      font-size:10px!important;color:#5A7A9A!important;
      line-height:1.55!important;margin-top:4px!important;
      padding:5px 8px!important;
      background:#F7FAFE!important;border-left:2px solid #A3C2E0!important;
      border-radius:0 3px 3px 0!important;
      white-space:pre-wrap!important;word-break:break-word!important;
    }
    .act-meta{
      display:flex!important;flex-wrap:wrap!important;gap:10px!important;
      padding:5px 10px!important;background:#F7FAFE!important;
      border-bottom:1px solid #EBF3FB!important;font-size:10px!important;
      color:#5A7A9A!important;
    }
    .act-meta-item{display:flex!important;align-items:center!important;gap:3px!important;white-space:nowrap!important;}
    .crew-tag-pill{background:#EBF3FB!important;color:#1A5FA8!important;border:1px solid #C8D9ED!important;font-size:9px!important;font-weight:700!important;padding:1px 5px!important;border-radius:8px!important;font-family:'IBM Plex Mono',monospace!important;}

    /* ── FOTOS EM GRADE 4 COLUNAS ── */
    .act-photos{padding:10px 12px 12px;background:linear-gradient(180deg,#f8fbff,#f0f5fa);}
    .act-photos-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:8px;display:flex;align-items:center;gap:6px;}
    .act-photos-label span{background:var(--login-blue);color:#fff;font-size:9px;padding:1px 7px;border-radius:10px;}
    .act-photos-grid{
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(100px,1fr));
      gap:8px;
    }
    .act-photo-wrap{
      border-radius:10px;overflow:hidden;
      border:2px solid var(--border);
      background:#fff;
      box-shadow:var(--shadow-xs);
      transition:transform .2s,box-shadow .2s;
      cursor:pointer;
    }
    .act-photo-wrap:hover{transform:scale(1.03);box-shadow:var(--shadow-md);border-color:var(--login-blue);}
    .act-photo-wrap img{width:100%;height:120px;object-fit:cover;display:block;}
    .act-photo-caption{font-size:9px;color:var(--text-dim);text-align:center;padding:4px 6px;background:#f9fafb;border-top:1px solid var(--border);line-height:1.3;font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

    /* ── TAGS ── */
    .tag{font-size:9px!important;padding:1px 5px!important;border-radius:3px!important;font-weight:700!important;}
    .tok{background:#D1FAE5!important;color:#065F46!important;}
    .tpend{background:#FEF3C7!important;color:#92400E!important;}
    .tcrit{background:#FEE2E2!important;color:#991B1B!important;}

    /* ── KPI CARDS ── */
    .cards-row{display:flex!important;flex-wrap:wrap!important;gap:6px!important;margin-bottom:10px!important;}
    .kpi-card{flex:1!important;min-width:80px!important;padding:8px 10px!important;border:1px solid #C8D9ED!important;border-radius:5px!important;box-shadow:none!important;}
    .kpi-card::before{height:3px!important;}
    .kpi-label{font-size:9px!important;}
    .kpi-val{font-size:22px!important;}

    /* ── TABELAS (embarque) ── */
    table{width:100%!important;border-collapse:collapse!important;font-size:10px!important;}
    th{background:#EBF3FB!important;color:#1A5FA8!important;padding:5px 7px!important;border:1px solid #C8D9ED!important;text-align:left!important;white-space:normal!important;}
    td{padding:5px 7px!important;border:1px solid #E2EBF5!important;vertical-align:top!important;white-space:normal!important;word-break:break-word!important;}

    /* ── CREW CARDS ── */
    .crew-card{break-inside:avoid!important;border:1px solid #C8D9ED!important;padding:7px 10px!important;margin-bottom:5px!important;border-radius:5px!important;}
    .crew-av{width:34px!important;height:34px!important;font-size:12px!important;}

    /* ── RODAPÉ LÍDERES ── */
    .rpt-footer-leaders{display:flex!important;flex-wrap:wrap!important;gap:14px!important;font-size:10px!important;}

    /* ── QUEBRAS ── */
    .panel{page-break-before:auto!important;}
    .rpt-header,.panel-header{page-break-after:avoid!important;}
  }

  /* ═══════════════════════════════════════════════
     VISUAL SYSTEM 2026 — Design Tokens & Components
  ═══════════════════════════════════════════════ */

  /* ── Buttons ── */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
    padding:8px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;
    border:1.5px solid transparent;transition:all .15s;letter-spacing:.2px;white-space:nowrap;
    font-family:'Barlow',system-ui,sans-serif;}
  .btn:active{transform:scale(.97);}
  .btn-primary{background:var(--login-blue);color:#fff;border-color:var(--login-blue);}
  .btn-primary:hover{background:var(--login-blue-dk);}
  .btn-ghost{background:transparent;color:var(--login-blue);border-color:var(--border2);}
  .btn-ghost:hover{background:var(--login-blue-xlt);}
  .btn-green{background:var(--login-green);color:#fff;border-color:var(--login-green);}
  .btn-green:hover{background:var(--login-green-dk);}
  .btn-warn{background:var(--warn);color:#fff;border-color:var(--warn);}
  .btn-warn:hover{background:#B45309;}
  .btn-danger{background:var(--danger);color:#fff;border-color:var(--danger);}
  .btn-danger:hover{background:#B91C1C;}
  .btn-sm{padding:5px 11px;font-size:11px;border-radius:6px;}
  .btn-lg{padding:12px 24px;font-size:14px;border-radius:10px;}

  /* ── Forms ── */
  .form-control{width:100%;background:#fff;border:1.5px solid var(--border);border-radius:8px;
    padding:9px 12px;font-size:13px;color:var(--text);font-family:'Barlow',system-ui,sans-serif;
    transition:border-color .15s,box-shadow .15s;}
  .form-control:focus{border-color:var(--login-blue);outline:none;
    box-shadow:0 0 0 3px rgba(26,95,168,.12);}
  .form-control::placeholder{color:var(--muted);}
  .form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:12px;}
  .form-group label{font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.5px;}
  .form-row{display:flex;gap:12px;flex-wrap:wrap;}
  .form-row .form-group{flex:1;min-width:100px;}
  .sep{height:1px;background:var(--border);margin:14px 0;}

  /* ── Panels & Cards ── */
  .panel{background:#fff;border:1px solid var(--border);border-radius:12px;
    margin-bottom:16px;box-shadow:var(--shadow-sm);}
  .panel-header{display:flex;align-items:center;gap:10px;padding:12px 16px;
    border-bottom:1px solid var(--border);font-weight:700;font-size:14px;
    color:var(--login-blue);background:linear-gradient(90deg,var(--login-blue-xlt),#fff);
    border-radius:12px 12px 0 0;}

  /* ── Act card ── */
  .act-card{background:#fff;border:1px solid var(--border);border-radius:12px;
    margin-bottom:12px;overflow:hidden;box-shadow:var(--shadow-xs);transition:box-shadow .2s;}
  .act-card:hover{box-shadow:var(--shadow-md);}
  .act-card-head{display:flex;align-items:flex-start;gap:10px;padding:11px 14px 10px;}
  .act-num{background:var(--login-blue);color:#fff;font-family:'IBM Plex Mono',monospace;
    font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px;flex-shrink:0;margin-top:2px;}
  .act-title-block{flex:1;min-width:0;}
  .act-title{font-size:14px;font-weight:700;color:var(--text);line-height:1.3;}
  .act-desc{font-size:12px;color:var(--text-dim);margin-top:4px;white-space:pre-wrap;line-height:1.5;}
  .act-meta{display:flex;flex-wrap:wrap;gap:8px;padding:7px 14px 8px;
    background:var(--login-blue-xlt);border-top:1px solid var(--border);}
  .act-meta-item{font-size:11px;color:var(--text-dim);}
  .act-actions{display:flex;gap:4px;align-items:flex-start;flex-shrink:0;}

  /* ── Photos ── */
  .act-photos{padding:12px 14px 14px;background:linear-gradient(180deg,#f5f9ff,#eef4fb);}
  .act-photos-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;
    color:var(--text-dim);margin-bottom:9px;display:flex;align-items:center;gap:7px;}
  .act-photo-count{background:var(--login-blue);color:#fff;font-size:9px;font-weight:700;
    padding:1px 7px;border-radius:10px;}
  .act-photos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;}
  .act-photo-wrap{border-radius:10px;overflow:hidden;border:2px solid var(--border);
    background:#fff;box-shadow:var(--shadow-xs);cursor:pointer;
    transition:transform .2s,box-shadow .2s,border-color .2s;}
  .act-photo-wrap:hover{transform:scale(1.04);box-shadow:var(--shadow-md);border-color:var(--login-blue);}
  .act-photo-wrap img{width:100%;height:110px;object-fit:cover;display:block;}
  .act-photo-caption{font-size:9px;color:var(--text-dim);text-align:center;
    padding:4px 6px;background:#f9fafb;border-top:1px solid var(--border);
    line-height:1.3;font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

  /* ── Export bar ── */
  .export-bar{background:linear-gradient(135deg,var(--login-blue-xlt),#fff);
    border:1px solid var(--border);border-radius:12px;padding:12px 16px;
    margin-bottom:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;
    box-shadow:var(--shadow-xs);}
  .export-bar>span{font-size:26px;}
  .export-bar>p{flex:1;font-size:12px;color:var(--text-dim);min-width:120px;line-height:1.4;}

  /* ── Crew ── */
  .crew-card{background:#fff;border:1.5px solid var(--border);border-radius:12px;
    padding:12px 14px;margin-bottom:8px;display:flex;align-items:flex-start;gap:12px;
    box-shadow:var(--shadow-xs);transition:border-color .15s,box-shadow .15s;}
  .crew-card:hover{border-color:var(--login-blue);box-shadow:var(--shadow-sm);}
  .crew-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;
    justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;}
  .crew-name{font-size:14px;font-weight:700;color:var(--text);}
  .crew-role{font-size:12px;color:var(--text-dim);margin-top:2px;}
  .crew-tag-pill{display:inline-block;background:var(--login-blue-xlt);color:var(--login-blue);
    font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:700;padding:1px 6px;border-radius:4px;}
  .emb-b{background:#eff6ff;color:var(--login-blue);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;}
  .des-b{background:#f0fdf4;color:var(--login-green);font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;}

  /* ── KPI ── */
  .kpi-card{flex:1;min-width:130px;background:#fff;border:1px solid var(--border);
    border-radius:12px;padding:14px 16px;box-shadow:var(--shadow-xs);}
  .kpi-val{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:900;color:var(--login-blue);line-height:1;}
  .gv{color:var(--login-green)!important;}
  .kpi-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--text-dim);margin-bottom:3px;}
  .kpi-sub{font-size:11px;color:var(--muted);}

  /* ── RPT Header ── */
  .rpt-header{display:flex;align-items:center;gap:14px;
    background:linear-gradient(135deg,#07182e 0%,#0e2540 60%,#1A5FA8 100%);
    color:#fff;padding:16px 20px;border-radius:12px;margin-bottom:14px;
    box-shadow:0 4px 20px rgba(7,24,46,.25);}
  .rpt-logo{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:900;
    letter-spacing:-1.5px;line-height:1;flex-shrink:0;}
  .rpt-logo .gi{color:#6DB847;}
  .rpt-logo .dot{color:var(--login-gold);}
  .rpt-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;
    text-transform:uppercase;letter-spacing:.5px;}
  .rpt-sub{font-size:11px;opacity:.8;margin-top:2px;}

  /* ── Week tabs ── */
  .week-tabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px;
    padding-bottom:12px;border-bottom:1px solid var(--border);}
  .week-tab{padding:7px 16px;background:#fff;border:1.5px solid var(--border);
    border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;
    color:var(--text-dim);transition:all .15s;white-space:nowrap;
    font-family:'Barlow',system-ui,sans-serif;}
  .week-tab.active,.week-tab:hover{background:var(--login-blue);color:#fff;border-color:var(--login-blue);}

  /* ── Topbar ── */
  .topbar{display:flex;align-items:center;gap:12px;padding:11px 20px;
    background:#fff;border-bottom:2px solid var(--border);
    box-shadow:0 1px 6px rgba(14,61,114,.06);flex-shrink:0;}
  #page-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:800;
    color:var(--login-blue);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

  /* ── Badges & Tags ── */
  .tag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;white-space:nowrap;}
  .tok{background:#f0fdf4;color:var(--login-green);}
  .tpnd{background:#fef9c3;color:#854d0e;}
  .tcrit{background:#fef2f2;color:var(--danger);}
  .tprog{background:#eff6ff;color:var(--login-blue);}
  .badge{background:var(--login-blue);color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;}

  /* ── Empty state ── */
  .empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:40px 20px;color:var(--muted);text-align:center;}
  .empty-state .ico{font-size:40px;margin-bottom:12px;opacity:.5;}
  .empty-state p{font-size:14px;}

  /* ── Section title ── */
  .section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;
    color:var(--text-dim);margin:14px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--border);}

  /* ── Compress info ── */
  .compress-info{font-size:11px;color:var(--login-green);background:var(--login-green-xlt);
    border:1px solid #bbf7d0;border-radius:6px;padding:6px 10px;margin-bottom:10px;}

  /* ── Photo drop zone ── */
  .photo-drop-zone{display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:6px;border:2px dashed var(--border2);border-radius:12px;padding:20px;
    cursor:pointer;color:var(--text-dim);font-size:13px;text-align:center;
    background:var(--login-blue-xlt);transition:border-color .2s;margin-bottom:8px;}
  .photo-drop-zone:hover{border-color:var(--login-blue);}

  /* ── Misc ── */
  .mono{font-family:'IBM Plex Mono',monospace;}
  .selected-crew-tags{display:flex;flex-wrap:wrap;gap:5px;min-height:28px;padding:4px 0;margin-bottom:6px;}
  .crew-check-list{max-height:140px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:6px;}
  .crew-check-item{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;transition:background .1s;}
  .crew-check-item:hover{background:var(--login-blue-xlt);}
  .fn-badge{font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:700;
    background:var(--login-blue-xlt);color:var(--login-blue);padding:1px 5px;border-radius:4px;}

  @media(max-width:600px){
    .act-photos-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:6px;}
    .act-photo-wrap img{height:90px;}
    .form-row{flex-direction:column;}
    .form-row .form-group{min-width:unset;}
  }

</style>
</head>
<body>
<div id="app">

<!-- SIDEBAR -->
<nav id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark"><span class="lo">log</span><span class="gi">in</span><span class="dot">.</span></div>
    <div class="logo-tagline">logística intermodal</div>
    <div class="vessel-badge">⚓ M/V Jacarandá</div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Dashboard</div>
    <div class="nav-item active" onclick="showPage('dashboard')"><span class="ico">📊</span> Painel Geral</div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Trabalhos a Bordo</div>
    <div class="nav-item" onclick="showPage('novo')"><span class="ico">✏️</span> Novo Registro</div>
    <div class="nav-item" onclick="showPage('semanal')"><span class="ico">📅</span> Relatório Semanal</div>
    <div class="nav-item" onclick="showPage('mensal')"><span class="ico">📆</span> Relatório Mensal</div>
    <div class="nav-item" onclick="showPage('historico')"><span class="ico">🗂️</span> Histórico</div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Tripulação</div>
    <div class="nav-item" onclick="showPage('tripulantes')"><span class="ico">👥</span> Tripulantes</div>
    <div class="nav-item" onclick="showPage('embarque')"><span class="ico">🚢</span> Rel. de Embarque</div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Navegação</div>
    <div class="nav-item" onclick="showPage('rio')" style="background:linear-gradient(90deg,rgba(26,95,168,.12),transparent);border-left:3px solid #1A5FA8;"><span class="ico">🌊</span> Médias Rio Amazonas</div>
  </div>
  <div class="nav-section">
    <div class="nav-label">Arquivos & Dados</div>
    <div class="nav-item" onclick="showPage('fotos')"><span class="ico">📷</span> Fotos & Anexos</div>
    <div class="nav-item" onclick="showPage('storage')"><span class="ico">🗄️</span> Arquivos & Backups</div>
    <div class="nav-item" onclick="showPage('inspecao')"><span class="ico">🔍</span> Inspeções</div>
    <div class="nav-item" onclick="showPage('unificado')" style="background:linear-gradient(90deg,rgba(109,184,71,.15),transparent);border-left:3px solid #6DB847;"><span class="ico">📊</span> Relatório Unificado</div>
    <div class="nav-item" onclick="showPage('mobile')"><span class="ico">📱</span> Modo Celular / Tablet</div>
    <div class="nav-item" onclick="showPage('config')"><span class="ico">⚙️</span> Configurações</div>
  </div>
</nav>

<!-- MAIN -->
<div id="main">
  <div id="topbar">
    <button id="hamburger" onclick="toggleSidebar()" aria-label="Menu">
      <span class="hbg"></span><span class="hbg"></span><span class="hbg"></span>
    </button>
    <h1 id="page-title">📊 Painel Geral</h1>
    <div class="topbar-right">
      <div class="clock" id="clock-el">--:--:--</div>
      <button class="btn btn-ghost btn-sm" onclick="exportPDF()">🖨 PDF</button>
      <button class="btn btn-ghost btn-sm" onclick="exportHTMLFile()" title="Exporta o app com todos os dados para compartilhar com outro celular">📦 Compartilhar App</button>
      <button class="btn btn-ghost btn-sm" onclick="exportJSON()">⬇ Backup</button>
      <button class="btn btn-primary btn-sm" onclick="saveData()">💾 Salvar</button>
    </div>
  </div>

  <div id="content">

    <!-- DASHBOARD -->
    <div id="page-dashboard" class="page active">
      <!-- Hero KPI bar -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:16px;">
        <div class="kpi-card" style="border-top:3px solid var(--login-blue);padding:14px 16px;">
          <div class="kpi-label">Semana Atual</div>
          <div class="kpi-val" id="kv-reg" style="font-size:36px;">0</div>
          <div class="kpi-sub">SEM <span id="kv-wn">—</span>/2026</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid var(--login-green);padding:14px 16px;">
          <div class="kpi-label">Total Histórico</div>
          <div class="kpi-val gv" id="kv-tot" style="font-size:36px;">0</div>
          <div class="kpi-sub">registros</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid #7c3aed;padding:14px 16px;">
          <div class="kpi-label">Inspeções</div>
          <div class="kpi-val" id="kv-insp" style="font-size:36px;color:#7c3aed;">0</div>
          <div class="kpi-sub">registradas</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid var(--warn);padding:14px 16px;">
          <div class="kpi-label">Desvios Abertos</div>
          <div class="kpi-val" id="kv-desvios" style="font-size:36px;color:var(--warn);">0</div>
          <div class="kpi-sub">em aberto</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid var(--muted);padding:14px 16px;">
          <div class="kpi-label">Tripulantes</div>
          <div class="kpi-val" id="kv-crew" style="font-size:36px;color:var(--text-dim);">0</div>
          <div class="kpi-sub">cadastrados</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid var(--login-blue-lt);padding:14px 16px;">
          <div class="kpi-label">Fotos</div>
          <div class="kpi-val" id="kv-fotos" style="font-size:36px;color:var(--login-blue-lt);">0</div>
          <div class="kpi-sub">arquivos</div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="panel" style="margin-bottom:14px;">
        <div class="panel-header">⚡ Ações Rápidas</div>
        <div style="padding:12px 14px;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="showPage('novo')">✏️ Novo Registro</button>
          <button class="btn btn-ghost" onclick="showPage('semanal')">📅 Rel. Semanal</button>
          <button class="btn btn-ghost" onclick="showPage('inspecao')">🔍 Inspeções</button>
          <button class="btn btn-ghost" onclick="showPage('unificado')">📊 Rel. Unificado</button>
          <button class="btn btn-ghost" onclick="saveData()">💾 Salvar</button>
          <button class="btn btn-ghost" onclick="exportJSON()">⬇ Backup</button>
        </div>
      </div>

      <!-- Líderes + Últimos Registros -->
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:14px;">
        <div class="panel" style="margin-bottom:0;">
          <div class="panel-header">🚢 Líderes de Bordo</div>
          <div style="padding:12px 14px;"><div style="display:flex;flex-direction:column;gap:8px;" id="dash-crew"></div></div>
        </div>
        <div class="panel" style="margin-bottom:0;">
          <div class="panel-header">🗒️ Últimos Registros <span class="badge" id="badge-rec">0</span></div>
          <div style="padding:0;overflow-x:auto;">
            <table class="tbl">
              <thead><tr><th>Sem.</th><th>Dept.</th><th>Atividade</th><th>Equipe</th><th>Status</th><th>Data</th></tr></thead>
              <tbody id="tbl-recent"><tr><td colspan="6" class="empty-state">Nenhum registro</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- NOVO REGISTRO -->
    <div id="page-novo" class="page">
      <!-- TAB BUTTONS -->
      <div style="display:flex;gap:8px;padding:12px 0 0;margin-bottom:14px;flex-wrap:wrap;">
        <button id="ntab-atividade" class="btn btn-sm btn-primary" onclick="switchNovoTab('atividade')">✏️ Novo Registro</button>
        <button id="ntab-bloco" class="btn btn-sm btn-ghost" onclick="switchNovoTab('bloco')">🏭 Bloco / Oficina</button>
        <button id="ntab-relatorio" class="btn btn-sm btn-ghost" onclick="switchNovoTab('relatorio')">📄 Novo Relatório</button>
      </div>

      <!-- PANEL: ATIVIDADE -->
      <div id="npanel-atividade">
      <div class="panel">
        <div class="panel-header">✏️ Novo Registro de Trabalho</div>
        <div style="padding:16px;">
          <div class="form-row">
            <div class="form-group"><label>Semana</label><select class="form-control" id="r-sem"></select></div>
            <div class="form-group"><label>Data</label><input type="date" class="form-control" id="r-data"></div>
            <div class="form-group"><label>Departamento</label>
              <select class="form-control" id="r-dept" onchange="filterCrewByDept('novo')">
                <option>Convés</option>
              </select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:10px;">
            <label>📌 Título da Atividade <span style="color:var(--danger)">*</span></label>
            <input type="text" class="form-control" id="r-titulo" placeholder="Ex: Tratamento anticorrosivo Bay 10 BE — 1ª e 2ª mão de pintura" style="font-weight:600;font-size:14px;">
            <div style="font-size:10px;color:var(--text-dim);margin-top:3px;">Título claro e objetivo — aparece em negrito no relatório</div>
          </div>
          <div class="form-group" style="margin-bottom:12px;">
            <label>📝 Descrição Detalhada</label>
            <textarea class="form-control" id="r-atv" placeholder="Descreva detalhadamente:&#10;- Materiais utilizados&#10;- Procedimentos executados&#10;- Observações relevantes&#10;- Próximos passos..." style="min-height:110px;white-space:pre-wrap;line-height:1.6;"></textarea>
            <div style="font-size:10px;color:var(--text-dim);margin-top:3px;">Use Enter para separar itens — a formatação é preservada no relatório</div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Status</label>
              <select class="form-control" id="r-st">
                <option>Concluído</option><option>Em Andamento</option><option>Pendente</option><option>Crítico</option>
              </select>
            </div>
            <div class="form-group"><label>Local / Bay</label><input type="text" class="form-control" id="r-loc" placeholder="Bay 10 BE / Praça de Máquinas"></div>
          </div>
          <div class="form-group" style="margin-bottom:12px;">
            <label>👷 Equipe Responsável</label>
            <div class="selected-crew-tags" id="selected-crew-tags-novo"></div>
            <div class="crew-check-list" id="crew-check-list-novo"></div>
            <input type="hidden" id="r-eq-hidden">
          </div>
          <div class="sep"></div>
          <div class="section-title">📷 Fotos da Atividade</div>
          <div class="compress-info">⚡ Fotos comprimidas automaticamente (máx. 1024px / JPEG 70%). Reduz 3–5MB para ~150KB.</div>
          <label class="photo-drop-zone" for="foto-reg">📷 Clique para tirar foto ou selecionar arquivo<br><small>Múltiplos arquivos aceitos — adicione legenda opcional em cada foto</small></label>
          <input type="file" id="foto-reg" accept="image/*" multiple style="display:none" onchange="addPhotosWithCaption(this.files,'reg')">
          <div class="photo-grid" id="pg-reg" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;"></div>
          <div class="sep"></div>
          <button class="btn btn-primary" onclick="saveReg()" style="width:100%;padding:14px;font-size:15px;font-weight:700;">💾 Salvar Registro</button>
        </div>
      </div>
      </div>

      <!-- PANEL: BLOCO / OFICINA -->
      <div id="npanel-bloco" style="display:none;">
      <div class="panel">
        <div class="panel-header" style="color:#059669;">🏭 Novo Serviço Bloco / Oficina</div>
        <div style="padding:16px;">
          <div class="form-group" style="margin-bottom:10px;">
            <label>📌 Título do Serviço <span style="color:var(--danger)">*</span></label>
            <input type="text" class="form-control" id="novo-bloco-titulo" placeholder="Ex: Pintura interior porão 02 — prime e acabamento" style="font-weight:600;font-size:14px;">
          </div>
          <div class="form-group" style="margin-bottom:10px;">
            <label>📝 Descrição</label>
            <textarea class="form-control" id="novo-bloco-desc" placeholder="Descreva o serviço realizado..." style="min-height:70px;"></textarea>
          </div>
          <div class="form-row" style="margin-bottom:10px;">
            <div class="form-group">
              <label>🏢 Empresa</label>
              <select class="form-control" id="novo-bloco-emp"></select>
            </div>
            <div class="form-group">
              <label>👷 Responsável</label>
              <select class="form-control" id="novo-bloco-resp"></select>
            </div>
          </div>
          <!-- Add nova empresa inline -->
          <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:700;color:#14532d;margin-bottom:8px;">➕ Adicionar Nova Empresa</div>
            <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end;">
              <div>
                <label style="font-size:11px;color:var(--text-dim);">Nome da Empresa</label>
                <input type="text" class="form-control" id="novo-emp-nm" placeholder="Ex: Marítima Serviços Ltda.">
              </div>
              <div>
                <label style="font-size:11px;color:var(--text-dim);">Tipo</label>
                <select class="form-control" id="novo-emp-tipo">
                  <option>Terceirizada</option><option>Armador</option><option>Estaleiro</option><option>Fornecedor</option>
                </select>
              </div>
              <button class="btn btn-green btn-sm" onclick="novoAddEmpresa()" style="white-space:nowrap;">✅ Adicionar</button>
            </div>
          </div>
          <div class="form-row" style="margin-bottom:10px;">
            <div class="form-group" style="max-width:160px;">
              <label>Status</label>
              <select class="form-control" id="novo-bloco-st">
                <option>Em Andamento</option><option>Concluído</option><option>Pendente</option><option>Cancelado</option>
              </select>
            </div>
            <div class="form-group">
              <label>📍 Local / Bloco</label>
              <input type="text" class="form-control" id="novo-bloco-local" placeholder="Porão 02, Bay 30, etc.">
            </div>
          </div>
          <div class="form-row" style="margin-bottom:14px;">
            <div class="form-group">
              <label>📄 O.S. / Referência</label>
              <input type="text" class="for
