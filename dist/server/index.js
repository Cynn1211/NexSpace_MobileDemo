const rooms = [
  { id: "A1201", name: "大型會議室 A", floor: "A 棟 12F", cap: 20, type: "會議室", state: "可預約", photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82", tags: ["投影機", "視訊設備", "白板"] },
  { id: "A1202", name: "小型會議室 B", floor: "A 棟 12F", cap: 8, type: "會議室", state: "已預訂", photo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82", tags: ["電視", "白板"] },
  { id: "B0801", name: "創意工坊", floor: "B 棟 8F", cap: 15, type: "多功能空間", state: "可預約", photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=82", tags: ["移動桌椅", "投影機", "音響"] },
  { id: "C1501", name: "頂樓活動室", floor: "C 棟 15F", cap: 50, type: "活動空間", state: "可預約", photo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=82", tags: ["音響", "燈光", "茶水間"] },
];

const events = [
  { id: "E01", title: "週五下午茶交流會", meta: "08/07（五）15:00–17:00", place: "C 棟 15F 交流廳", type: "社交", count: "28/40", state: "已報名", photo: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=82" },
  { id: "E02", title: "職場健康講座：姿勢與體態", meta: "08/12（三）12:00–13:00", place: "A 棟 12F 多功能室", type: "健康", count: "15/30", state: "立即報名", photo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=82" },
  { id: "E03", title: "新人入職歡迎晚宴", meta: "08/21（五）18:30–21:00", place: "B 棟 1F 大廳", type: "迎新", count: "45/50", state: "已報名", photo: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=82" },
];

const services = [
  { icon: "wifi", name: "網路故障回報", desc: "網速異常、無法連接、IP 衝突等", eta: "預計 4 小時內", hot: true },
  { icon: "screwdriver-wrench", name: "設施維修申請", desc: "燈具、門鎖、家具、水電報修", eta: "預計 2 工作日", hot: true },
  { icon: "sparkles", name: "特別清潔服務", desc: "活動後清潔、地毯清洗、玻璃擦拭", eta: "預約制" },
  { icon: "box-open", name: "辦公用品申請", desc: "文具、紙張、列印耗材補充", eta: "預計 1 工作日", hot: true },
  { icon: "square-parking", name: "月租停車位申請", desc: "一般車位、機車位申請與變更", eta: "預計 3 工作日" },
  { icon: "car-side", name: "訪客停車登記", desc: "預先登記訪客車牌，憑證入場", eta: "即時" },
  { icon: "utensils", name: "團體午餐訂購", desc: "會議用餐、活動餐盒預訂", eta: "前一日" },
  { icon: "id-card", name: "門禁卡辦理", desc: "新辦、補辦、權限調整", eta: "預計 2 工作日" },
];

function icon(name, extra = "") {
  return `<i class="fa-solid fa-${name}${extra ? ` ${extra}` : ""}" aria-hidden="true"></i>`;
}

function qrMarkup() {
  const size = 29;
  const cell = (x, y) => {
    const finder = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7 &&
      (x === ox || x === ox + 6 || y === oy || y === oy + 6 || (x >= ox + 2 && x <= ox + 4 && y >= oy + 2 && y <= oy + 4));
    if (finder(0, 0) || finder(size - 7, 0) || finder(0, size - 7)) return true;
    if ((x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)) return false;
    return ((x * 17 + y * 31 + x * y * 3 + (x ^ y)) % 7) < 3;
  };
  let out = "";
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) out += `<i class="${cell(x, y) ? "on" : ""}"></i>`;
  return out;
}

const css = `
*{box-sizing:border-box}html{background:#f0eee9}body{margin:0;color:#16120e;background:#fafaf9;font-family:Inter,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}a{text-decoration:none;color:inherit}button,input,select,textarea{font:inherit}.shell{width:min(100%,430px);min-height:100vh;margin:auto;background:#fafaf9;position:relative;padding-bottom:92px;box-shadow:0 0 30px #16120e12}.top{height:64px;background:#fff;border-bottom:1px solid #eae7e2;display:flex;align-items:center;gap:12px;padding:0 16px;position:sticky;top:0;z-index:10}.back{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:19px}.logo{display:flex;align-items:center;gap:9px;font-weight:900;font-size:20px}.brand-logo{width:44px;height:40px;object-fit:contain;flex:0 0 auto}.top-title{font-weight:800;font-size:17px;flex:1;text-align:center}.bell{width:38px;height:38px;display:grid;place-items:center;position:relative;font-size:19px}.bell:after{content:"";width:7px;height:7px;background:#e53e36;border-radius:50%;position:absolute;right:6px;top:5px}.page{padding:18px 16px}.hero{background:linear-gradient(135deg,#f79431 0%,#d67820 68%,#ad5e10 100%);border-radius:24px;padding:20px;color:#fff;position:relative;overflow:hidden;min-height:176px;display:flex;align-items:center;box-shadow:0 12px 28px #ad5e1028}.hero:before{content:"";position:absolute;width:116px;height:116px;border:30px solid #ffce0025;border-radius:50%;right:-42px;bottom:-55px}.hero:after{content:"";position:absolute;width:92px;height:92px;border-radius:50%;background:#fff8f014;right:48px;top:-38px}.hero-copy{position:relative;z-index:2;max-width:275px;display:flex;flex-direction:column;align-items:flex-start}.hero-pill{font-size:11px;font-weight:800;background:#fff8f024;border:1px solid #fff8f03d;padding:7px 10px;border-radius:99px;margin-bottom:12px}.hero-pill i{margin-right:5px}.hero-orbit{position:absolute;right:20px;bottom:20px;width:50px;height:50px;border-radius:16px;background:#fff8f024;display:grid;place-items:center;font-size:22px;z-index:2}.kicker{font-size:12px;opacity:.88;letter-spacing:.04em}.hero h1{font-size:27px;line-height:1.2;margin:7px 0}.hero p{font-size:12px;line-height:1.6;margin:0;color:#fff8f0}.home-glance{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border:1px solid #eae7e2;border-radius:18px;margin:-15px 12px 0;position:relative;z-index:3;box-shadow:0 8px 22px #16120e10}.home-glance a{text-align:center;padding:12px 5px;position:relative}.home-glance a:not(:last-child):after{content:"";position:absolute;right:0;top:14px;bottom:14px;width:1px;background:#eae7e2}.home-glance b{display:block;color:#ad5e10;font-size:19px}.home-glance span{font-size:10px;color:#655e55}.section-head{display:flex;align-items:center;justify-content:space-between;margin:23px 2px 12px}.section-head h2{font-size:18px;margin:0}.section-head a{font-size:13px;color:#d67820;font-weight:700}.eyebrow{display:block;color:#d67820;font-size:10px;font-weight:900;letter-spacing:.12em;margin-bottom:3px}.manage-link{background:#fff8f0;padding:8px 11px;border-radius:99px}.manage-link i{margin-right:4px}.primary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.feature{background:#fff;border:1px solid #eae7e2;border-radius:18px;padding:14px 10px;text-align:left;min-height:142px;box-shadow:0 7px 18px #16120e0b;position:relative;overflow:hidden}.feature:after{content:"";position:absolute;width:52px;height:52px;border-radius:50%;background:#fff8f0;right:-23px;bottom:-24px}.feature .ico,.service-ico{width:46px;height:46px;border-radius:15px;background:#fff3e7;color:#d67820;display:grid;place-items:center;margin:0 0 12px;font-size:20px}.feature b{display:block;font-size:13px}.feature small{display:block;color:#655e55;font-size:10px;line-height:1.45;margin-top:5px}.feature em{position:absolute;right:10px;top:15px;color:#f9a24d;font-size:11px;font-style:normal}.quick-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.quick{background:#fff;border:1px solid #eae7e2;border-radius:15px;padding:12px;display:flex;align-items:center;gap:9px;font-size:12px;font-weight:700;box-shadow:0 5px 14px #16120e08}.quick span{width:35px;height:35px;border-radius:11px;background:#fff8f0;display:grid;place-items:center;font-size:16px;color:#d67820}.quick .arrow{margin-left:auto;color:#b0a89c;font-size:10px}.agenda{background:#fff;border:1px solid #eae7e2;border-radius:18px;padding:14px;box-shadow:0 7px 18px #16120e08}.agenda-row{display:grid;grid-template-columns:52px 1fr auto;gap:8px;padding:10px 0;border-bottom:1px solid #eae7e2}.agenda-row:last-child{border:0}.agenda time{font-size:12px;color:#655e55}.agenda b{font-size:13px}.status{font-size:10px;border-radius:99px;padding:5px 8px;background:#fef0dc;color:#ad5e10;height:max-content;font-weight:800}.status.green{background:#e9f8ee;color:#27753b}.status.blue{background:#eaf4fb;color:#176b9e}.status.red{background:#fff0ef;color:#aa2924}.bottom{position:fixed;bottom:0;width:min(100%,430px);height:78px;border-top:1px solid #eae7e2;background:#ffffffee;backdrop-filter:blur(18px);display:flex;justify-content:space-around;z-index:20;padding-bottom:env(safe-area-inset-bottom);box-shadow:0 -8px 24px #16120e0b}.bottom a{width:20%;display:grid;place-items:center;align-content:center;gap:5px;color:#8a8177;font-size:10px;font-weight:700;position:relative}.bottom a:before{content:"";position:absolute;top:0;width:34px;height:3px;border-radius:0 0 4px 4px;background:transparent}.bottom .on{color:#d67820;font-weight:900}.bottom .on:before{background:#f79431}.bottom span{font-size:21px;line-height:1}.lead h1{font-size:24px;margin:4px 0 5px}.lead p{margin:0;color:#655e55;font-size:13px}.seg{display:flex;gap:7px;overflow:auto;padding:15px 0 4px;scrollbar-width:none}.seg a{white-space:nowrap;padding:9px 13px;border-radius:99px;background:#fff;border:1px solid #eae7e2;font-size:12px}.seg .on{background:#f79431;color:#fff;border-color:#f79431}.search{display:flex;gap:8px;margin:14px 0}.field{min-height:44px;background:#fff;border:1px solid #eae7e2;border-radius:11px;padding:10px 12px;width:100%;color:#655e55}.view-toggle{display:flex;background:#f5f3f0;border-radius:10px;padding:3px}.view-toggle a{padding:8px 12px;border-radius:8px;font-size:12px}.view-toggle .on{background:#fff;color:#d67820;box-shadow:0 2px 7px #0000000d}.room-card,.event-card,.service-card,.record{background:#fff;border:1px solid #eae7e2;border-radius:17px;overflow:hidden;margin:12px 0}.room-cover,.event-cover{height:150px;padding:13px;display:flex;align-items:flex-end;color:#fff;position:relative;background-size:cover;background-position:center}.room-cover:after,.event-cover:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent,#16120eb8)}.room-cover>* ,.event-cover>*{position:relative;z-index:1}.cover-status{position:absolute!important;right:12px;top:12px;background:#e8faee;color:#28753b;border-radius:99px;padding:6px 9px;font-size:11px;font-weight:800}.cover-status.full{background:#fff0ef;color:#aa2924}.room-info,.event-info{padding:14px}.room-title{display:flex;align-items:center;justify-content:space-between}.room-title h3{font-size:17px;margin:0}.room-title small{color:#8a8177}.meta{display:flex;gap:12px;color:#655e55;font-size:12px;margin:9px 0;flex-wrap:wrap}.tags{display:flex;gap:6px;flex-wrap:wrap}.tag{font-size:10px;color:#ad5e10;background:#fff3e7;padding:5px 7px;border-radius:7px}.btn{display:block;border-radius:12px;min-height:44px;line-height:44px;text-align:center;font-size:13px;font-weight:800;margin-top:12px}.btn.primary{background:#f79431;color:#fff;box-shadow:0 6px 14px #f7943128}.btn.secondary{border:1px solid #f79431;color:#d67820;background:#fff}.btn.danger{background:#c7372f;color:#fff}.btn.disabled{background:#f5f3f0;color:#b0a89c}.map-card{background:#fff;border:1px solid #eae7e2;border-radius:18px;padding:14px;margin-top:14px}.floor-tabs{display:flex;gap:7px;margin-bottom:13px}.floor-tabs a{padding:8px 14px;border-radius:9px;background:#f5f3f0;font-size:12px}.floor-tabs .on{background:#f79431;color:#fff}.floor{height:360px;background:#f8f9fb;border:2px solid #d4cec6;border-radius:14px;position:relative;padding:12px}.north{position:absolute;right:10px;top:8px;color:#8a8177}.space{position:absolute;border:1px solid #b6c4d6;border-radius:8px;background:#dceaff;color:#443d35;display:grid;place-items:center;text-align:center;font-size:12px;padding:6px}.space.available{background:#dff7e7;border-color:#9cd8b0}.space.facility{background:#fff4bd;border-color:#e6ce67}.space.lobby{background:#f1f2f4;border-color:#c9ced5}.s1{left:6%;top:14%;width:44%;height:27%}.s2{right:7%;top:14%;width:33%;height:27%}.s3{left:6%;bottom:11%;width:59%;height:36%}.s4{right:7%;bottom:11%;width:25%;height:36%}.legend{display:flex;gap:12px;flex-wrap:wrap;color:#655e55;font-size:11px;margin-top:12px}.dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:4px;background:#dceaff}.dot.green{background:#dff7e7}.dot.yellow{background:#fff4bd}.event-cover b{font-size:18px}.progress{height:6px;background:#f5f3f0;border-radius:99px;overflow:hidden;margin:10px 0}.progress i{display:block;height:100%;background:#f79431;border-radius:99px}.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.service-card{margin:0;padding:14px;min-height:174px;position:relative;box-shadow:0 6px 16px #16120e08}.service-card .service-ico{margin:0 0 13px}.service-card h3{font-size:14px;margin:0 0 7px}.service-card p{font-size:11px;color:#655e55;line-height:1.55;margin:0}.service-card small{position:absolute;bottom:13px;color:#8a8177;font-size:10px}.service-card small i{margin-right:4px}.hot{position:absolute;right:10px;top:10px;background:#ffce00;padding:4px 6px;border-radius:99px;font-size:9px;font-weight:900}.form-card{background:#fff;border:1px solid #eae7e2;border-radius:17px;padding:15px;margin-top:15px}.form-card label{display:block;font-size:12px;font-weight:700;margin:13px 0}.form-card .field{display:block;margin-top:7px}.summary{background:#fff8f0;border:1px solid #fddab0;border-radius:13px;padding:14px;font-size:12px;line-height:1.8}.success{text-align:center;padding-top:50px}.success-mark{width:64px;height:64px;border-radius:50%;background:#e8faee;color:#28753b;display:grid;place-items:center;font-size:32px;margin:auto}.success h1{font-size:23px}.success p{font-size:13px;color:#655e55}.record{padding:14px}.record-head{display:flex;justify-content:space-between;align-items:start}.record h3{font-size:15px;margin:0 0 6px}.record p{font-size:12px;color:#655e55;margin:4px 0}.record-actions{display:flex;gap:8px}.record-actions .btn{flex:1}.notice{border-bottom:1px solid #eae7e2;padding:14px 2px}.notice:last-child{border:0}.notice b{font-size:14px}.notice p{font-size:12px;color:#655e55;margin:6px 0}.facility-row{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #eae7e2}.facility-row:last-child{border:0}.facility-row .service-ico{margin:0;flex:0 0 42px}.facility-row b{font-size:14px}.facility-row p{font-size:11px;color:#655e55;margin:5px 0}.qr-wrap{text-align:center}.qr{display:grid;grid-template-columns:repeat(29,6px);grid-template-rows:repeat(29,6px);gap:0;background:#fff;padding:18px;width:max-content;margin:20px auto;border:1px solid #eae7e2;box-shadow:0 6px 20px #16120e14}.qr i{width:6px;height:6px;background:#fff}.qr i.on{background:#16120e}.code{letter-spacing:.18em;font-weight:800}.help{background:#fff;border:1px solid #eae7e2;border-radius:15px;padding:14px;margin:10px 0}.help h3{font-size:14px;margin:0 0 7px}.help p{font-size:12px;color:#655e55;line-height:1.6;margin:0}.feature-row{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #eae7e2;padding:12px;border-radius:13px;margin:8px 0}.drag{color:#8a8177;font-size:18px}.pin{margin-left:auto;width:34px;height:34px;border-radius:50%;background:#fff3e7;color:#d67820;display:grid;place-items:center}.parcel-photo{width:76px;height:60px;border-radius:10px;object-fit:cover}.photo-upload{display:grid;grid-template-columns:78px 78px;gap:8px}.photo-upload div{height:78px;border:1px dashed #f79431;background:#fff8f0;border-radius:10px;display:grid;place-items:center;color:#d67820;font-size:11px}.modal-card{text-align:center;background:#fff;border:1px solid #eae7e2;border-radius:18px;padding:20px;margin-top:30px}.modal-card .warn{width:48px;height:48px;border-radius:50%;background:#fff0ef;color:#c7372f;display:grid;place-items:center;margin:auto;font-size:24px}.credit{background:linear-gradient(135deg,#4f2805,#ad5e10);color:#fff;border-radius:18px;padding:18px;margin:14px 0}.credit strong{font-size:28px;display:block;margin-top:8px}.tiny{font-size:10px;color:#8a8177}.checkbox{display:flex!important;align-items:center;gap:8px}.checkbox input{width:18px;height:18px}.empty-state{text-align:center;padding:45px 18px;color:#655e55}.empty-state span{font-size:42px;color:#f79431}.ext-photo{height:180px;border-radius:18px;background-size:cover;background-position:center;margin:14px 0}@media(max-width:360px){.primary-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr}.shell,.bottom{width:100%}}
`;

function nav(path) {
  const selected = path.startsWith("/space") || path.startsWith("/reservations") || path.startsWith("/facility") ? "booking" :
    path.startsWith("/activities") ? "activities" : path.startsWith("/services") || path.startsWith("/tickets") || path.startsWith("/packages") || path.startsWith("/visitors") || path.startsWith("/issues") ? "services" : path === "/" ? "home" : "more";
  return `<nav class="bottom">
    <a class="${selected === "home" ? "on" : ""}" href="/"><span>${icon("house")}</span>首頁</a>
    <a class="${selected === "booking" ? "on" : ""}" href="/space"><span>${icon("calendar-check")}</span>預約</a>
    <a class="${selected === "activities" ? "on" : ""}" href="/activities"><span>${icon("people-group")}</span>活動</a>
    <a class="${selected === "services" ? "on" : ""}" href="/services"><span>${icon("headset")}</span>服務</a>
    <a class="${selected === "more" ? "on" : ""}" href="/more"><span>${icon("grip")}</span>更多</a>
  </nav>`;
}

function top(title, back = "/") {
  if (!title) return `<header class="top"><div class="logo"><img class="brand-logo" src="/nanshan-logo.png" alt="南山人壽">NexSpace</div><div style="flex:1"></div><a class="bell" href="/notifications" aria-label="通知中心">${icon("bell")}</a></header>`;
  return `<header class="top"><a class="back" href="${back}" aria-label="返回">${icon("chevron-left")}</a><div class="top-title">${title}</div><a class="bell" href="/notifications" aria-label="通知中心">${icon("bell")}</a></header>`;
}

function layout(path, title, body, back) {
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F79431"><meta name="description" content="NexSpace 租客員工行動工作台：空間預約、活動申請與服務申請。"><meta property="og:title" content="NexSpace 租客員工行動工作台"><meta property="og:description" content="預約空間、參加活動、提出服務申請，一站完成。"><meta property="og:image" content="https://nexspace-tenant-prototype.clovidiel.chatgpt.site/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"><title>${title ? `${title}｜` : ""}NexSpace</title><style>${css}</style></head><body><div class="shell">${top(title, back)}${body}${nav(path)}</div></body></html>`;
}

function home() {
  return `<main class="page">
    <section class="hero"><div class="hero-copy"><span class="hero-pill">${icon("location-dot")} NexSpace A 棟</span><span class="kicker">2026年7月31日・星期五</span><h1>早安，王小明！</h1><p>今天有 2 項行程，第一場會議將於 09:30 開始。</p></div><div class="hero-orbit">${icon("building")}</div></section>
    <div class="home-glance"><a href="/reservations"><b>2</b><span>今日行程</span></a><a href="/tickets"><b>1</b><span>處理中工單</span></a><a href="/notifications"><b>3</b><span>最新通知</span></a></div>
    <div class="section-head"><div><span class="eyebrow">常用功能</span><h2>我的工作台</h2></div><a class="manage-link" href="/features">${icon("sliders")} 管理</a></div>
    <section class="primary-grid">
      <a class="feature" href="/space"><span class="ico">${icon("calendar-check")}</span><b>會議室預約</b><small>找空間與可用時段</small><em>${icon("arrow-right")}</em></a>
      <a class="feature" href="/facility"><span class="ico">${icon("dumbbell")}</span><b>公共設施</b><small>預約、點數與紀錄</small><em>${icon("arrow-right")}</em></a>
      <a class="feature" href="/packages"><span class="ico">${icon("box")}</span><b>郵務包裹</b><small>寄件與收件管理</small><em>${icon("arrow-right")}</em></a>
    </section>
    <div class="section-head"><h2>快速入口</h2></div>
    <section class="quick-list">
      <a class="quick" href="/reservations"><span>${icon("clipboard-check")}</span><b>我的預約</b>${icon("chevron-right","arrow")}</a>
      <a class="quick" href="/tickets"><span>${icon("file-circle-check")}</span><b>我的工單</b>${icon("chevron-right","arrow")}</a>
      <a class="quick" href="/facilities"><span>${icon("map-location-dot")}</span><b>空間地圖</b>${icon("chevron-right","arrow")}</a>
      <a class="quick" href="/notifications"><span>${icon("bell")}</span><b>通知中心</b>${icon("chevron-right","arrow")}</a>
    </section>
    <div class="section-head"><h2>即將到來</h2><a href="/reservations">查看全部 ›</a></div>
    <section class="agenda">
      <div class="agenda-row"><time>09:30</time><b>行銷部門會議<br><small class="kicker">A 棟 12F · A1201</small></b><span class="status blue">進行中</span></div>
      <div class="agenda-row"><time>15:00</time><b>週五下午茶交流會<br><small class="kicker">C 棟 15F 交流廳</small></b><span class="status">已報名</span></div>
    </section>
  </main>`;
}

function roomCards() {
  return rooms.map(r => `<article class="room-card">
    <div class="room-cover" style="background-image:url('${r.photo}')"><span class="cover-status ${r.state === "已預訂" ? "full" : ""}">${r.state}</span><b>${r.type}</b></div>
    <div class="room-info"><div class="room-title"><h3>${r.name}</h3><small>${r.id}</small></div><div class="meta"><span>⌖ ${r.floor}</span><span>♙ ${r.cap} 人</span></div><div class="tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <a class="btn ${r.state === "已預訂" ? "disabled" : "primary"}" href="${r.state === "已預訂" ? "/space" : `/space/book?id=${r.id}`}">${r.state === "已預訂" ? "今日已滿" : "選擇時段"}</a></div>
  </article>`).join("");
}

function spacePage(map = false) {
  const lead = `<div class="lead"><h1>空間預約</h1><p>從空間清單或樓層地圖找到最適合的場地</p></div>
    <div class="search"><div class="field">⌕ 搜尋空間名稱、樓層</div><div class="view-toggle"><a class="${!map ? "on" : ""}" href="/space">清單</a><a class="${map ? "on" : ""}" href="/space/map">地圖</a></div></div>`;
  if (!map) return `<main class="page">${lead}<div class="seg"><a href="/reservations">我的預約</a><a class="on" href="/space">預約查詢</a></div><div class="seg"><a class="on" href="/space">全部空間</a><a href="/space?type=meeting">會議室</a><a href="/space?type=event">活動空間</a><a href="/space?type=phone">電話亭</a></div>${roomCards()}</main>`;
  return `<main class="page">${lead}<section class="map-card"><div class="floor-tabs"><a class="on" href="/space/map">A 棟</a><a href="/space/map">B 棟</a><a href="/space/map">C 棟</a></div><div class="floor"><span class="north">N ↑</span><a class="space s1" href="/space/book?id=A1201">大型會議室 A<br><small>可預約</small></a><div class="space facility s2">茶水間</div><a class="space available s3" href="/space/book?id=A1202">開放辦公區</a><div class="space lobby s4">電梯大廳</div></div><div class="legend"><span><i class="dot"></i>會議室</span><span><i class="dot green"></i>開放辦公</span><span><i class="dot yellow"></i>設施</span></div></section><div class="section-head"><h2>地圖上的可預約空間</h2></div>${rooms.slice(0,2).map(r => `<a class="record" style="display:block" href="/space/book?id=${r.id}"><div class="record-head"><div><h3>${r.name}</h3><p>${r.floor} · ${r.cap} 人</p></div><span class="status green">可預約</span></div></a>`).join("")}</main>`;
}

function booking(url) {
  const id = url.searchParams.get("id") || "A1201";
  const room = rooms.find(r => r.id === id) || rooms[0];
  return `<main class="page"><div class="lead"><h1>確認空間與時段</h1><p>完成資料後送出預約</p></div><section class="form-card"><div class="summary"><b>${room.name}</b><br>${room.floor} · 容量 ${room.cap} 人<br>設備：${room.tags.join("、")}</div><form action="/space/success"><input type="hidden" name="id" value="${room.id}"><label>日期<input class="field" type="date" value="2026-08-05"></label><label>開始時間<select class="field"><option>10:00</option><option>11:00</option><option>14:00</option></select></label><label>使用部門<select class="field"><option>產品部</option><option>行銷部</option><option>行政部</option></select></label><label>會議主旨<input class="field" value="季度工作會議"></label><button class="btn primary" style="width:100%;border:0">送出預約</button></form></section></main>`;
}

function success(title, text, target, button) {
  return `<main class="page success"><div class="success-mark">✓</div><h1>${title}</h1><p>${text}</p><a class="btn primary" href="${target}">${button}</a><a class="btn secondary" href="/">返回首頁</a></main>`;
}

function activities(url) {
  const registered = url.searchParams.get("registered") === "1";
  return `<main class="page"><div class="lead"><h1>活動與社群</h1><p>探索大樓活動，與社群建立連結</p></div><div class="seg"><a class="on" href="/activities">全部活動</a><a href="/activities?tab=upcoming">即將舉行</a><a href="/activities?tab=mine">我已報名</a><a href="/activities?tab=past">過往活動</a></div>${registered ? `<div class="summary" style="margin-top:12px">✓ 已完成報名，活動已加入「我已報名」。</div>` : ""}${events.map((e,i) => `<article class="event-card"><div class="event-cover" style="background-image:url('${e.photo}')"><span class="cover-status">${e.type}</span><b>${e.title}</b></div><div class="event-info"><p class="meta">${e.meta}<br>${e.place}</p><div class="progress"><i style="width:${i === 2 ? 90 : i === 1 ? 50 : 70}%"></i></div><p class="kicker">${e.count} 人已報名</p><a class="btn ${e.state === "已報名" ? "secondary" : "primary"}" href="${e.state === "已報名" ? "/activities?tab=mine" : `/activities/detail?id=${e.id}`}">${e.state}</a></div></article>`).join("")}</main>`;
}

function activityDetail() {
  return `<main class="page"><div class="event-cover" style="height:190px;border-radius:18px;background-image:url('${events[1].photo}')"><b>職場健康講座：姿勢與體態</b></div><div class="section-head"><h2>活動詳情</h2><span class="status green">尚有名額</span></div><section class="record"><p>08/12（三）12:00–13:00</p><p>A 棟 12F 多功能室</p><p>由專業物理治療師帶領，認識久坐工作常見姿勢問題，並練習可在辦公桌旁完成的伸展。</p><a class="btn primary" href="/activities?registered=1">立即報名</a></section></main>`;
}

function servicePage() {
  return `<main class="page"><div class="lead"><h1>服務申請</h1><p>提交工作環境、行政與生活支援需求</p></div><div class="seg"><a class="on" href="/services">全部</a><a href="/services?cat=it">IT 支援</a><a href="/services?cat=repair">設施維修</a><a href="/services?cat=admin">行政庶務</a><a href="/services?cat=food">餐飲服務</a></div><section class="service-grid"><a class="service-card" href="/packages"><span class="hot">常用</span><span class="service-ico">${icon("box")}</span><h3>郵務包裹</h3><p>寄件、收件、常用收件人與寄件 QR Code</p><small>${icon("clock")} 即時</small></a><a class="service-card" href="/issues"><span class="hot">常用</span><span class="service-ico">${icon("triangle-exclamation")}</span><h3>問題反映</h3><p>設備故障、環境異常與現場照片回報</p><small>${icon("clock")} 依類型處理</small></a>${services.map((s,i) => `<a class="service-card" href="${i === 6 ? "/meal" : i === 5 ? "/visitors" : `/services/new?type=${encodeURIComponent(s.name)}`}">${s.hot ? `<span class="hot">熱門</span>` : ""}<span class="service-ico">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.desc}</p><small>${icon("clock")} ${s.eta}</small></a>`).join("")}</section></main>`;
}

function serviceForm(url) {
  const type = url.searchParams.get("type") || "設施維修申請";
  return `<main class="page"><div class="lead"><h1>${type}</h1><p>請描述需求，我們會盡快協助處理</p></div><section class="form-card"><form action="/services/success"><label>問題位置<select class="field"><option>A 棟 12F</option><option>B 棟 8F</option><option>C 棟 15F</option></select></label><label>問題標題<input class="field" value="${type}"></label><label>詳細說明<textarea class="field" rows="5" placeholder="請描述目前狀況"></textarea></label><label>聯絡人<input class="field" value="王小明"></label><button class="btn primary" style="width:100%;border:0">送出申請</button></form></section></main>`;
}

function records(ticket = false, fresh = false) {
  const data = ticket ? [
    ["#SR-2026-0158","會議室冷氣不冷","處理中","A 棟 12F · 建立於今日"],
    ["#SR-2026-0144","門禁卡權限調整","已完成","建立於 07/28"],
    ["#SR-2026-0129","辦公用品補充","已結案","建立於 07/20"],
  ] : [
    ["#MR-2026-0831","大型會議室 A","已預約","08/05（三）10:00–11:00"],
    ["#FAC-2026-0802","健身房 3F","已預約","08/06（四）18:00–19:00"],
    ["#MR-2026-0728","小型會議室 B","已完成","07/28（二）14:00–15:00"],
  ];
  if (fresh === "cancelled" && !ticket) data[0][2] = "已取消";
  const message = fresh === "cancelled" ? "✓ 預約已取消，列表狀態已更新。" : fresh === "edited" ? "✓ 預約內容已儲存。" : fresh ? "✓ 新資料已加入列表。" : "";
  return `<main class="page"><div class="lead"><h1>${ticket ? "我的工單" : "我的預約"}</h1><p>${ticket ? "追蹤服務申請進度與回覆" : "管理所有空間與設施預約"}</p></div>${message ? `<div class="summary" style="margin-top:14px">${message}</div>` : ""}<div class="seg"><a class="on" href="${ticket?"/tickets":"/reservations"}">全部</a><a href="?status=active">進行中</a><a href="?status=done">已完成</a><a href="?status=cancelled">已取消</a></div>${data.map((r,i) => `<article class="record"><div class="record-head"><div><h3>${r[1]}</h3><p>${r[0]}</p></div><span class="status ${r[2]==="已取消"?"red":i === 1 ? "green" : i === 0 ? "blue" : ""}">${r[2]}</span></div><p>${r[3]}</p>${i === 0 && r[2]!=="已取消" ? `<div class="record-actions"><a class="btn secondary" href="${ticket?"/tickets/detail":"/reservations/edit"}">編輯</a><a class="btn danger" href="${ticket?"/tickets/detail":"/reservations/cancel"}">取消</a></div>` : `<a class="btn secondary" href="${ticket?"/tickets/detail":"/reservations/detail"}">查看詳情</a>`}</article>`).join("")}</main>`;
}

function meal() {
  return `<main class="page"><div class="lead"><h1>餐券／餐務</h1><p>管理餐券、團體午餐與常用取餐人</p></div><div class="summary" style="margin-top:15px">可用餐券 <b style="float:right;font-size:20px;color:#ad5e10">6 張</b></div><article class="record"><div class="record-head"><div><h3>每日午餐餐券</h3><p>#MV-2026-08254</p></div><span class="status green">未使用</span></div><p>使用日期：08/01（五）</p><p>取餐人：王小明 · 服務台自取</p><a class="btn primary" href="/meal/qr">查看 QR Code</a></article><article class="record"><div class="record-head"><div><h3>健康餐盒</h3><p>#MV-2026-08196</p></div><span class="status">已使用</span></div><p>使用日期：07/30（三）</p></article><a class="btn secondary" href="/services">返回服務申請</a></main>`;
}

function qrPage() {
  return `<main class="page qr-wrap"><div class="success-mark">✓</div><h1>餐券 QR Code</h1><p class="kicker">請於取餐時出示此畫面</p><div class="qr">${qrMarkup()}</div><p class="code">VX-8254-NS</p><p class="kicker">有效期限：2026/08/01 14:00</p><a class="btn primary" href="/meal">返回我的餐券</a></main>`;
}

function visitors() {
  return `<main class="page"><div class="lead"><h1>訪客停車登記</h1><p>預先登記訪客與車牌，快速入場</p></div><section class="form-card"><form action="/services/success"><label>來訪日期<input class="field" type="date" value="2026-08-05"></label><label>訪客姓名<input class="field" value="陳大文"></label><label>手機號碼<input class="field" value="0912-345-678"></label><label>車牌號碼<input class="field" placeholder="ABC-1234"></label><button class="btn primary" style="width:100%;border:0">送出登記</button></form></section></main>`;
}

function facilities() {
  return `<main class="page"><div class="lead"><h1>大樓設施</h1><p>瀏覽樓層平面圖與設施分布</p></div><section class="map-card"><div class="floor-tabs"><a class="on" href="/facilities?building=A">A 棟</a><a href="/facilities?building=B">B 棟</a><a href="/facilities?building=C">C 棟</a></div><div class="floor"><span class="north">N ↑</span><a class="space s1" href="/space/book?id=A1201">大型會議室 A</a><div class="space facility s2">茶水間</div><a class="space available s3" href="/space/book?id=A1202">開放辦公區</a><div class="space lobby s4">電梯大廳</div></div></section><div class="section-head"><h2>設施一覽</h2></div><section class="record">${[["store","便利超商","B1 · 24 小時營業"],["utensils","員工餐廳","1F · 11:30–19:00"],["dumbbell","健身房","B1 · 06:00–22:00"],["square-parking","停車場","B1–B3 · 共 600 個車位"]].map(x=>`<div class="facility-row"><span class="service-ico">${icon(x[0])}</span><div><b>${x[1]}</b><p>${x[2]}</p></div></div>`).join("")}</section></main>`;
}

function notifications() {
  return `<main class="page"><div class="lead"><h1>通知中心</h1><p>掌握預約、活動與服務進度</p></div><section class="record" style="margin-top:14px">${[["預約提醒","大型會議室 A 將於明日 10:00 開始。","5 分鐘前"],["工單進度更新","#SR-2026-0158 已由工程人員接手處理。","1 小時前"],["活動報名成功","職場健康講座已加入您的行程。","昨天"],["社群公告","A 棟電梯將於週六進行例行保養。","07/29"]].map(n=>`<div class="notice"><b>${n[0]}</b><p>${n[1]}</p><small class="kicker">${n[2]}</small></div>`).join("")}</section></main>`;
}

function more() {
  const extras=[["file-contract","合約資訊"],["wallet","繳費記錄"],["print","資料列印系統"],["square-parking","停車管理系統"],["truck","貨車預約系統"]];
  return `<main class="page"><div class="lead"><h1>更多功能</h1><p>完整工作台與大樓資訊</p></div><div class="section-head"><h2>個人功能</h2><a href="/features">功能管理</a></div><section class="quick-list"><a class="quick" href="/reservations"><span>${icon("clipboard-check")}</span><b>我的預約</b></a><a class="quick" href="/tickets"><span>${icon("file-circle-check")}</span><b>我的工單</b></a><a class="quick" href="/notifications"><span>${icon("bell")}</span><b>通知中心</b></a><a class="quick" href="/meal"><span>${icon("ticket")}</span><b>餐券管理</b></a></section><div class="section-head"><h2>空間地圖</h2></div><section class="quick-list"><a class="quick" href="/facilities"><span>${icon("building")}</span><b>大樓設施</b></a><a class="quick" href="/guide"><span>${icon("map")}</span><b>使用指南</b></a><a class="quick" href="/contact"><span>${icon("address-book")}</span><b>聯絡我們</b></a><a class="quick" href="/services"><span>${icon("headset")}</span><b>服務申請</b></a></section><div class="section-head"><h2>其他系統</h2></div>${extras.map(x=>`<a class="feature-row" href="/external?name=${encodeURIComponent(x[1])}"><span class="service-ico" style="margin:0">${icon(x[0])}</span><b>${x[1]}</b><span class="pin">${icon("chevron-right")}</span></a>`).join("")}</main>`;
}

function guide(contact = false) {
  if (contact) return `<main class="page"><div class="lead"><h1>聯絡我們</h1><p>需要協助時，NexSpace 團隊在這裡</p></div><section class="help"><h3>租客服務中心</h3><p>週一至週五 08:30–18:00<br>02-2345-6789<br>service@nexspace.example</p></section><section class="help"><h3>緊急維修專線</h3><p>24 小時服務<br>0800-123-888</p></section><a class="btn primary" href="/services">提出服務申請</a></main>`;
  return `<main class="page"><div class="lead"><h1>使用指南</h1><p>快速了解 NexSpace 常用功能</p></div>${[["如何預約會議室？","進入「空間預約」，可用清單或地圖找空間，選擇時段後送出。"],["如何報名活動？","在「活動與社群」選擇活動，查看詳情並點擊立即報名。"],["如何追蹤服務申請？","送出服務申請後，可在「我的工單」查看目前處理狀態。"],["餐券如何使用？","開啟餐券 QR Code，於取餐櫃台出示即可完成核銷。"]].map(x=>`<section class="help"><h3>${x[0]}</h3><p>${x[1]}</p></section>`).join("")}</main>`;
}

function featureManager(url) {
  const swapped = url.searchParams.get("swap") === "1";
  const pinned = swapped ? [["box","郵務包裹"],["calendar-check","會議室預約"],["dumbbell","公共設施預約"]] : [["calendar-check","會議室預約"],["dumbbell","公共設施預約"],["box","郵務包裹"]];
  const rest = [["user-group","訪客登記","/visitors"],["triangle-exclamation","問題反映","/issues"],["people-group","活動與社群","/activities"],["headset","服務申請","/services"],["file-contract","合約資訊","/external?name=合約資訊"],["wallet","繳費記錄","/external?name=繳費記錄"],["square-parking","停車管理系統","/external?name=停車管理系統"]];
  return `<main class="page"><div class="lead"><h1>功能管理</h1><p>常用功能最多 3 個，可調整順序與釘選項目</p></div><div class="section-head"><h2>常用功能（3/8）</h2><a href="/features?swap=${swapped?0:1}">交換順序</a></div>${pinned.map((x,i)=>`<div class="feature-row"><span class="drag">${icon("grip-vertical")}</span><span class="service-ico" style="margin:0">${icon(x[0])}</span><b>${x[1]}</b><a class="pin" href="/features?swap=${i===0?1:0}">${icon("thumbtack")}</a></div>`).join("")}<div class="section-head"><h2>功能列表</h2></div>${rest.map(x=>`<a class="feature-row" href="${x[2]}"><span class="drag">${icon("grip-vertical")}</span><span class="service-ico" style="margin:0">${icon(x[0])}</span><b>${x[1]}</b><span class="pin">${icon("plus")}</span></a>`).join("")}<a class="btn primary" href="/?saved=1">儲存</a></main>`;
}

function reservationEdit() {
  return `<main class="page"><div class="lead"><h1>編輯預約</h1><p>修改部門、主旨與備註</p></div><section class="form-card"><div class="summary">08/05（三）10:00–11:00<br><b>大型會議室 A</b> · A 棟 12F · 20 人</div><form action="/reservations?edited=1"><label>使用部門<select class="field"><option>產品部</option><option>行銷部</option></select></label><label>會議主旨<input class="field" value="季度工作會議"></label><label>備註<textarea class="field">請提前開啟視訊設備</textarea></label><button class="btn primary" style="width:100%;border:0">儲存變更</button></form></section></main>`;
}

function confirmPage(kind, target, back, text) {
  return `<main class="page"><section class="modal-card"><div class="warn">!</div><h1>${kind}</h1><p class="kicker">${text}</p><a class="btn danger" href="${target}">確定</a><a class="btn secondary" href="${back}">返回</a></section></main>`;
}

function facilityHome(url) {
  const fresh = url.searchParams.get("new") === "1";
  return `<main class="page"><div class="lead"><h1>公共設施預約</h1><p>查詢公設時段、管理點數與預約</p></div><section class="credit"><span>可用點數</span><strong>${url.searchParams.get("topped")==="1"?265:165} 點</strong><div class="record-actions"><a class="btn secondary" href="/facility/history">使用記錄</a><a class="btn primary" href="/facility/topup">儲值點數</a></div></section>${fresh?`<div class="summary">✓ 公設預約已新增。</div>`:""}<div class="seg"><a class="on" href="/facility">我的預約</a><a href="/facility/query">預約查詢</a></div><article class="record"><div class="record-head"><div><h3>放映廳 3F-3</h3><p>#FAC-2026-0907</p></div><span class="status blue">已預約</span></div><p>08/06（四）16:00–17:00</p><p>使用人數 5 人 · 支出 5 點</p><div class="record-actions"><a class="btn secondary" href="/facility/edit">編輯</a><a class="btn danger" href="/facility/cancel">取消</a></div></article><article class="record"><div class="record-head"><div><h3>多功能室 3F-1</h3><p>#FAC-2026-0818</p></div><span class="status green">已結束</span></div><p>07/28（二）15:00–16:00</p><a class="btn secondary" href="/facility/detail">查看詳情</a></article></main>`;
}

function facilityQuery() {
  const facilities = [
    ["放映廳 3F-3","5 點","25 人","https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=82"],
    ["健身房 4F-1","20 點","15 人","https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=82"],
    ["多功能活動室","10 點","40 人","https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=82"]
  ];
  return `<main class="page"><div class="lead"><h1>公設預約查詢</h1><p>輸入條件後選擇可用公設</p></div><div class="seg"><a href="/facility">我的預約</a><a class="on" href="/facility/query">預約查詢</a></div><section class="form-card"><label>棟別<select class="field"><option>A 棟</option><option>B 棟</option></select></label><label>公設類型<select class="field"><option>全部</option><option>放映廳</option><option>健身房</option></select></label><label>使用人數<select class="field"><option>5 人</option><option>10 人</option><option>20 人</option></select></label><label>開始日期時間<input class="field" value="2026-08-06 16:00"></label><a class="btn primary" href="/facility/query?searched=1">搜尋</a></section><div class="section-head"><h2>可用公設</h2><a href="/facility/query?sort=za">名稱排序</a></div>${facilities.map((f,i)=>`<article class="room-card"><div class="room-cover" style="background-image:url('${f[3]}')"><span class="cover-status">可預約</span><b>${f[0]}</b></div><div class="room-info"><div class="room-title"><h3>${f[0]}</h3><small>${f[1]}</small></div><p class="meta">容量 ${f[2]} · 投影／音響設備</p><a class="btn primary" href="/facility/book?id=${i}">預約</a></div></article>`).join("")}</main>`;
}

function facilityBook(url, edit=false) {
  return `<main class="page"><div class="lead"><h1>${edit?"編輯公設預約":"確認公設預約"}</h1><p>確認點數與使用資料</p></div><section class="form-card"><div class="summary"><b>放映廳 3F-3</b><br>08/06（四）16:00–17:00<br>所需點數：5 點 · 目前餘額 165 點</div><form action="/facility?new=1"><label>使用目的<input class="field" value="${edit?"外賓參訪":"部門影片欣賞"}"></label><label>使用部門<select class="field"><option>產品部</option><option>總務部</option></select></label><label>使用人數<input class="field" value="5"></label><label>備註<textarea class="field"></textarea></label><button class="btn primary" style="width:100%;border:0">${edit?"儲存變更":"送出預約"}</button></form></section></main>`;
}

function facilityHistory() {
  const rows = [["+100","儲值 100 點","07/30 09:00"],["-5","預約放映廳 3F-3","07/29 16:20"],["-20","預約健身房 4F-1","07/20 10:12"],["+50","活動回饋點數","07/18 15:40"]];
  return `<main class="page"><div class="credit"><span>目前點數</span><strong>165 點</strong></div><div class="section-head"><h2>使用記錄</h2><a href="/facility/history?more=1">載入更多</a></div>${rows.map((r,i)=>`<article class="record"><div class="record-head"><div><h3>${r[1]}</h3><p>${r[2]}</p></div><b style="color:${i===0||i===3?"#28753b":"#c7372f"}">${r[0]} 點</b></div></article>`).join("")}</main>`;
}

function facilityTopup() {
  return `<main class="page"><div class="lead"><h1>儲值點數</h1><p>本原型直接模擬儲值成功</p></div><section class="form-card"><label>儲值點數<input class="field" value="100"></label><div class="summary">換算金額 <b style="float:right">NT$ 100</b></div><a class="btn primary" href="/facility?topped=1">送出</a></section></main>`;
}

const parcelPhoto = "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=82";
function packages(url) {
  const newItem = url.searchParams.get("new")==="1";
  return `<main class="page"><div class="lead"><h1>郵務包裹</h1><p>管理寄件、收件與常用收件人</p></div><div class="seg"><a class="on" href="/packages">我的郵務</a><a href="/packages/recipients">常用收件人</a></div><a class="btn primary" href="/packages/new">＋ 新增寄件</a>${newItem?`<div class="summary">✓ 新增寄件資料成功。</div>`:""}<div class="section-head"><h2>寄件中</h2><a href="/packages/history">使用紀錄</a></div><article class="record"><div style="display:flex;gap:12px"><img class="parcel-photo" src="${parcelPhoto}" alt="紙箱包裹"><div><h3>包裹中心 A 櫃</h3><p>#260104149302 · 11:20</p><span class="status blue">待寄件</span></div></div><div class="record-actions"><a class="btn secondary" href="/packages/cancel">取消</a><a class="btn primary" href="/packages/qr">寄件 QR</a></div></article><div class="section-head"><h2>收件紀錄</h2></div>${[["包裹中心 A 櫃","已領取"],["設計科技｜汪建國","已寄件"]].map((x,i)=>`<article class="record"><div class="record-head"><div><h3>${x[0]}</h3><p>07/${28-i} · 11:20</p></div><span class="status green">${x[1]}</span></div><a class="btn secondary" href="/packages/detail">查看詳情</a></article>`).join("")}</main>`;
}

function packageForm() {
  return `<main class="page"><div class="lead"><h1>新增寄件</h1><p>填寫郵件與收件資料</p></div><section class="form-card"><form action="/packages?new=1"><div class="summary">寄件須知：請確認內容物與包裝完整，禁寄危險物品。</div><label>物流公司<select class="field"><option>黑貓宅急便</option><option>郵局</option><option>新竹物流</option></select></label><label class="checkbox"><input type="checkbox" checked> 已閱讀並同意寄件規範</label><label>收件公司<input class="field" value="致遠科技"></label><label>收件人<input class="field" value="汪建國"></label><label>收件地址<input class="field" value="台北市中山區中山北路100號"></label><label>聯絡電話<input class="field" value="02-2345-6788 #111"></label><label class="checkbox"><input type="checkbox"> 儲存為常用收件人</label><button class="btn primary" style="width:100%;border:0">送出</button></form></section></main>`;
}

function recipients(url) {
  const deleted = url.searchParams.get("deleted")==="1";
  return `<main class="page"><div class="lead"><h1>常用收件人</h1><p>快速套用常用寄件資料</p></div><div class="seg"><a href="/packages">我的郵務</a><a class="on" href="/packages/recipients">常用收件人</a></div><a class="btn primary" href="/packages/recipients/new">＋ 新增常用收件人</a>${deleted?`<div class="summary">✓ 收件人已刪除。</div>`:""}${["汪建國｜致遠科技","王小華｜安信公司","陳美玲｜旭日設計"].map((x,i)=>`<article class="record"><h3>${x}</h3><p>台北市信義區辦公大樓 · 02-2345-67${88+i}</p><div class="record-actions"><a class="btn secondary" href="/packages/recipients/edit?id=${i}">編輯</a><a class="btn danger" href="/packages/recipients/delete?id=${i}">刪除</a></div></article>`).join("")}</main>`;
}

function recipientForm(edit=false) {
  return `<main class="page"><div class="lead"><h1>${edit?"編輯":"新增"}常用收件人</h1><p>建立可快速套用的寄件資料</p></div><section class="form-card"><form action="/packages/recipients"><label>名稱描述<input class="field" value="${edit?"149302":""}"></label><label>收件公司<input class="field" value="${edit?"致遠科技":""}"></label><label>收件地址<input class="field" value="${edit?"台北市大安區信義路100號":""}"></label><label>收件人<input class="field" value="${edit?"汪建國":""}"></label><label>聯絡電話<input class="field" value="${edit?"02-2345-6788 #111":""}"></label><button class="btn primary" style="width:100%;border:0">送出</button></form></section></main>`;
}

function visitorsList(url) {
  const fresh=url.searchParams.get("new")==="1";
  const cards=[["亞鴻廣告 陳毅","待審核","08/05（三）10:00"],["公務採訪團","已核准","08/02（日）14:00"],["合作夥伴 李小姐","已完成","07/29（三）09:30"]];
  return `<main class="page"><div class="lead"><h1>訪客登記</h1><p>新增、篩選與管理訪客申請</p></div><a class="btn primary" href="/visitors/new">＋ 新增訪客</a><div class="record-actions"><a class="btn secondary" href="/visitors/filter">篩選</a><a class="btn secondary" href="/visitors">清除篩選</a></div>${fresh?`<div class="summary" style="margin-top:12px">✓ 新增訪客資料成功。</div>`:""}${cards.map((v,i)=>`<article class="record"><div class="record-head"><div><h3>${v[0]}</h3><p>${v[2]} · 產品部</p></div><span class="status ${i===1?"green":i===0?"blue":""}">${v[1]}</span></div><p>申請人：王小明</p>${i===0?`<div class="record-actions"><a class="btn secondary" href="/visitors/edit">編輯</a><a class="btn danger" href="/visitors/cancel">取消</a></div>`:`<a class="btn secondary" href="/visitors/detail">查看詳情</a>`}</article>`).join("")}</main>`;
}

function visitorForm(edit=false) {
  return `<main class="page"><div class="lead"><h1>${edit?"編輯":"新增"}訪客</h1><p>至少保留一位訪客</p></div><section class="form-card"><form action="/visitors?new=1"><label>預計來訪日期時間<input class="field" value="2026-08-05 10:00"></label><label>受訪部門<select class="field"><option>產品部</option><option>行政部</option></select></label><div class="section-head"><h2>訪客 1</h2><a href="/visitors/new?people=2">＋ 訪客</a></div><label>姓名<input class="field" value="${edit?"陳毅":"王小華"}"></label><label>電話<input class="field" value="0912-345-678"></label><label>Email<input class="field" value="visitor@example.com"></label><label>申請人<input class="field" value="王小明"></label><button class="btn primary" style="width:100%;border:0">送出</button></form></section></main>`;
}

function filterPage(kind) {
  return `<main class="page"><div class="lead"><h1>${kind==="訪客"?"訪客":"問題"}篩選</h1><p>選擇狀態與日期範圍</p></div><section class="form-card"><label>狀態<select class="field"><option>全部</option><option>${kind==="訪客"?"待審核":"未處理"}</option><option>${kind==="訪客"?"已核准":"處理中"}</option><option>${kind==="訪客"?"已完成":"已結案"}</option></select></label><label>開始日期<input class="field" type="date" value="2026-07-31"></label><label>結束日期<input class="field" type="date" value="2026-08-07"></label><div class="record-actions"><a class="btn secondary" href="${kind==="訪客"?"/visitors":"/issues"}">取消</a><a class="btn primary" href="${kind==="訪客"?"/visitors?filtered=1":"/issues?filtered=1"}">確定</a></div></section></main>`;
}

function issues(url) {
  const fresh=url.searchParams.get("new")==="1";
  const rows=[["6樓茶水間｜飲水機出水異常","未處理","設備故障"],["4F 投影設備異常","處理中","設備故障"],["停車場照明不足","已結案","環境安全"]];
  return `<main class="page"><div class="lead"><h1>問題反映</h1><p>回報環境與設備問題並追蹤狀態</p></div><a class="btn primary" href="/issues/new">＋ 問題反映</a><div class="record-actions"><a class="btn secondary" href="/issues/filter">篩選</a><a class="btn secondary" href="/issues">通報時間排序</a></div>${fresh?`<div class="summary" style="margin-top:12px">✓ 問題已新增為未處理。</div>`:""}${rows.map((x,i)=>`<article class="record"><div class="record-head"><div><h3>${x[0]}</h3><p>A 棟 · 07/${31-i} 11:00</p></div><span class="status ${i===1?"blue":i===2?"green":""}">${x[1]}</span></div><p>問題類型：${x[2]}</p><p>處理回覆：${i===0?"已收到您的反映":i===1?"工程人員處理中":"檢查無問題"}</p></article>`).join("")}</main>`;
}

function issueForm() {
  return `<main class="page"><div class="lead"><h1>問題反映</h1><p>可上傳最多 4 張現場照片</p></div><section class="form-card"><form action="/issues?new=1"><label>問題類型<select class="field"><option>設備故障</option><option>環境清潔</option><option>安全問題</option></select></label><label>反映內容／標題<input class="field" value="飲水機出水異常"></label><label>建物<select class="field"><option>A 棟</option><option>B 棟</option></select></label><label>位置描述<input class="field" value="6樓茶水間"></label><label>聯絡人<input class="field" value="王小明"></label><label>問題描述<textarea class="field">飲水機出水量很小，已持續兩天。</textarea></label><label>現場照片<div class="photo-upload"><div style="background-image:url('https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80');background-size:cover"></div><div>＋ 1/4</div></div></label><button class="btn primary" style="width:100%;border:0">送出</button></form></section></main>`;
}

function externalPage(url) {
  const name=url.searchParams.get("name")||"外部系統";
  return `<main class="page"><div class="lead"><h1>${name}</h1><p>此入口將於正式版連接既有租戶系統</p></div><div class="ext-photo" style="background-image:url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=82')"></div><section class="help"><h3>安全跳轉提示</h3><p>Prototype 以內部模擬頁呈現，正式上線後會採單一登入並開啟對應系統。</p></section><a class="btn primary" href="/external?name=${encodeURIComponent(name)}&opened=1">模擬開啟 ${name}</a><a class="btn secondary" href="/more">返回功能列表</a></main>`;
}

function packageQr() {
  return `<main class="page qr-wrap"><div class="success-mark">✓</div><h1>寄件 QR Code</h1><p class="kicker">請於郵務櫃台出示此畫面</p><div class="qr">${qrMarkup()}</div><p class="code">PK-149302-NS</p><a class="btn primary" href="/packages">返回郵務包裹</a></main>`;
}

function simpleDetail(title, lines, back) {
  return `<main class="page"><div class="lead"><h1>${title}</h1><p>完整資料與狀態摘要</p></div><section class="record" style="margin-top:15px">${lines.map(x=>`<div class="notice"><b>${x[0]}</b><p>${x[1]}</p></div>`).join("")}</section><a class="btn primary" href="${back}">返回列表</a></main>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    let title = "", body = "", back = "/";
    if (path === "/") body = home();
    else if (path === "/features") { title = "功能管理"; body = featureManager(url); }
    else if (path === "/space") { title = "會議室預約"; body = spacePage(false); }
    else if (path === "/space/map") { title = "空間地圖"; body = spacePage(true); back = "/space"; }
    else if (path === "/space/book") { title = "確認預約"; body = booking(url); back = "/space"; }
    else if (path === "/space/success") { title = "預約完成"; body = success("預約成功", "空間已加入您的預約列表。", "/reservations?new=1", "查看我的預約"); back = "/space"; }
    else if (path === "/reservations") { title = "我的預約"; body = records(false, url.searchParams.get("cancelled")==="1"?"cancelled":url.searchParams.get("edited")==="1"?"edited":url.searchParams.get("new")==="1"); }
    else if (path === "/reservations/edit") { title = "編輯預約"; body = reservationEdit(); back = "/reservations"; }
    else if (path === "/reservations/cancel") { title = "取消預約"; body = confirmPage("取消預約","/reservations?cancelled=1","/reservations","確定取消大型會議室 A 的預約嗎？"); back = "/reservations"; }
    else if (path === "/reservations/detail") { title = "預約詳情"; body = simpleDetail("預約詳情",[["預約編號","#MR-2026-0728"],["空間","小型會議室 B"],["時段","07/28（二）14:00–15:00"],["狀態","已完成"]],"/reservations"); back="/reservations"; }
    else if (path === "/facility") { title = "公共設施預約"; body = facilityHome(url); }
    else if (path === "/facility/query") { title = "公設預約查詢"; body = facilityQuery(); back="/facility"; }
    else if (path === "/facility/book") { title = "確認公設預約"; body = facilityBook(url,false); back="/facility/query"; }
    else if (path === "/facility/edit") { title = "編輯公設預約"; body = facilityBook(url,true); back="/facility"; }
    else if (path === "/facility/cancel") { title = "取消公設預約"; body = confirmPage("取消公設預約","/facility?cancelled=1","/facility","取消後將退回 5 點，確定繼續嗎？"); back="/facility"; }
    else if (path === "/facility/history") { title = "點數使用記錄"; body = facilityHistory(); back="/facility"; }
    else if (path === "/facility/topup") { title = "儲值點數"; body = facilityTopup(); back="/facility"; }
    else if (path === "/facility/detail") { title = "公設預約詳情"; body = simpleDetail("多功能室 3F-1",[["狀態","已結束"],["使用人數","5 人"],["使用目的","外賓參訪"],["管理員意見","管委會協調完成"]],"/facility"); back="/facility"; }
    else if (path === "/activities") { title = "活動與社群"; body = activities(url); }
    else if (path === "/activities/detail") { title = "活動詳情"; body = activityDetail(); back = "/activities"; }
    else if (path === "/services") { title = "服務申請"; body = servicePage(); }
    else if (path === "/services/new") { title = "提出申請"; body = serviceForm(url); back = "/services"; }
    else if (path === "/services/success") { title = "申請完成"; body = success("申請已送出", "案件編號 #SR-2026-0158，您可隨時查看進度。", "/tickets?new=1", "查看我的工單"); back = "/services"; }
    else if (path === "/tickets") { title = "我的工單"; body = records(true, url.searchParams.get("new") === "1"); }
    else if (path === "/tickets/detail") { title = "工單詳情"; body = simpleDetail("會議室冷氣不冷",[["案件編號","#SR-2026-0158"],["處理狀態","工程人員處理中"],["建立時間","今日 09:20"],["最新回覆","已安排 15:00 到場檢查"]],"/tickets"); back="/tickets"; }
    else if (path === "/packages") { title = "郵務包裹"; body = packages(url); back="/services"; }
    else if (path === "/packages/new") { title = "新增寄件"; body = packageForm(); back="/packages"; }
    else if (path === "/packages/recipients") { title = "常用收件人"; body = recipients(url); back="/packages"; }
    else if (path === "/packages/recipients/new") { title = "新增常用收件人"; body = recipientForm(false); back="/packages/recipients"; }
    else if (path === "/packages/recipients/edit") { title = "編輯常用收件人"; body = recipientForm(true); back="/packages/recipients"; }
    else if (path === "/packages/recipients/delete") { title = "刪除收件人"; body = confirmPage("刪除常用收件人","/packages/recipients?deleted=1","/packages/recipients","確定刪除「汪建國｜致遠科技」嗎？"); back="/packages/recipients"; }
    else if (path === "/packages/cancel") { title = "取消寄件"; body = confirmPage("取消寄件","/packages?cancelled=1","/packages","確定取消寄件資料嗎？"); back="/packages"; }
    else if (path === "/packages/qr") { title = "寄件 QR Code"; body = packageQr(); back="/packages"; }
    else if (path === "/packages/detail") { title = "寄件詳情"; body = simpleDetail("寄件詳情",[["物流公司","黑貓宅急便"],["收件公司","致遠科技"],["收件人","汪建國"],["狀態","已寄件"]],"/packages"); back="/packages"; }
    else if (path === "/packages/history") { title = "郵務使用記錄"; body = simpleDetail("郵務使用記錄",[["現有零用金","NT$ 355"],["儲值","NT$ 500 · 07/01"],["支出","NT$ 32 · 07/28"],["支出","NT$ 32 · 07/20"]],"/packages"); back="/packages"; }
    else if (path === "/visitors") { title = "訪客登記"; body = visitorsList(url); back = "/services"; }
    else if (path === "/visitors/new") { title = "新增訪客"; body = visitorForm(false); back="/visitors"; }
    else if (path === "/visitors/edit") { title = "編輯訪客"; body = visitorForm(true); back="/visitors"; }
    else if (path === "/visitors/filter") { title = "訪客篩選"; body = filterPage("訪客"); back="/visitors"; }
    else if (path === "/visitors/cancel") { title = "取消訪客"; body = confirmPage("取消訪客申請","/visitors?cancelled=1","/visitors","確定取消亞鴻廣告陳毅的來訪申請嗎？"); back="/visitors"; }
    else if (path === "/visitors/detail") { title = "訪客詳情"; body = simpleDetail("合作夥伴 李小姐",[["狀態","已完成"],["來訪時間","07/29（三）09:30"],["受訪部門","產品部"],["申請人","王小明"]],"/visitors"); back="/visitors"; }
    else if (path === "/issues") { title = "問題反映"; body = issues(url); back="/services"; }
    else if (path === "/issues/new") { title = "新增問題"; body = issueForm(); back="/issues"; }
    else if (path === "/issues/filter") { title = "問題篩選"; body = filterPage("問題"); back="/issues"; }
    else if (path === "/meal") { title = "餐券／餐務"; body = meal(); back = "/services"; }
    else if (path === "/meal/qr") { title = "餐券 QR Code"; body = qrPage(); back = "/meal"; }
    else if (path === "/facilities") { title = "大樓設施"; body = facilities(); }
    else if (path === "/notifications") { title = "通知中心"; body = notifications(); }
    else if (path === "/guide") { title = "使用指南"; body = guide(false); back = "/more"; }
    else if (path === "/contact") { title = "聯絡我們"; body = guide(true); back = "/more"; }
    else if (path === "/external") { title = url.searchParams.get("name") || "外部系統"; body = externalPage(url); back="/more"; }
    else if (path === "/more") { title = "更多"; body = more(); }
    else { title = "找不到頁面"; body = `<main class="page success"><h1>此頁面不存在</h1><a class="btn primary" href="/">返回首頁</a></main>`; }
    return new Response(layout(path, title, body, back), { headers: { "content-type": "text/html;charset=UTF-8", "cache-control": "no-store" } });
  }
};
