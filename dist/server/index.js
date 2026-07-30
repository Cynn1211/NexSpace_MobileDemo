const rooms = [
  { id: "A1201", name: "大型會議室 A", floor: "A 棟 12F", cap: 20, type: "會議室", state: "可預約", tone: "room-a", tags: ["投影機", "視訊設備", "白板"] },
  { id: "A1202", name: "小型會議室 B", floor: "A 棟 12F", cap: 8, type: "會議室", state: "已預訂", tone: "room-b", tags: ["電視", "白板"] },
  { id: "B0801", name: "創意工坊", floor: "B 棟 8F", cap: 15, type: "多功能空間", state: "可預約", tone: "room-c", tags: ["移動桌椅", "投影機", "音響"] },
  { id: "C1501", name: "頂樓活動室", floor: "C 棟 15F", cap: 50, type: "活動空間", state: "可預約", tone: "room-d", tags: ["音響", "燈光", "茶水間"] },
];

const events = [
  { id: "E01", title: "週五下午茶交流會", meta: "08/07（五）15:00–17:00", place: "C 棟 15F 交流廳", type: "社交", count: "28/40", state: "已報名", tone: "event-a" },
  { id: "E02", title: "職場健康講座：姿勢與體態", meta: "08/12（三）12:00–13:00", place: "A 棟 12F 多功能室", type: "健康", count: "15/30", state: "立即報名", tone: "event-b" },
  { id: "E03", title: "新人入職歡迎晚宴", meta: "08/21（五）18:30–21:00", place: "B 棟 1F 大廳", type: "迎新", count: "45/50", state: "已報名", tone: "event-c" },
];

const services = [
  { icon: "⌁", name: "網路故障回報", desc: "網速異常、無法連接、IP 衝突等", eta: "預計 4 小時內", hot: true },
  { icon: "▣", name: "設施維修申請", desc: "燈具、門鎖、家具、水電報修", eta: "預計 2 工作日", hot: true },
  { icon: "✦", name: "特別清潔服務", desc: "活動後清潔、地毯清洗、玻璃擦拭", eta: "預約制" },
  { icon: "▤", name: "辦公用品申請", desc: "文具、紙張、列印耗材補充", eta: "預計 1 工作日", hot: true },
  { icon: "P", name: "月租停車位申請", desc: "一般車位、機車位申請與變更", eta: "預計 3 工作日" },
  { icon: "♙", name: "訪客停車登記", desc: "預先登記訪客車牌，憑證入場", eta: "即時" },
  { icon: "☕", name: "團體午餐訂購", desc: "會議用餐、活動餐盒預訂", eta: "前一日" },
  { icon: "▦", name: "門禁卡辦理", desc: "新辦、補辦、權限調整", eta: "預計 2 工作日" },
];

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
*{box-sizing:border-box}html{background:#f0eee9}body{margin:0;color:#16120e;background:#fafaf9;font-family:Inter,"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif}a{text-decoration:none;color:inherit}button,input,select,textarea{font:inherit}.shell{width:min(100%,430px);min-height:100vh;margin:auto;background:#fafaf9;position:relative;padding-bottom:92px;box-shadow:0 0 30px #16120e12}.top{height:64px;background:#fff;border-bottom:1px solid #eae7e2;display:flex;align-items:center;gap:12px;padding:0 16px;position:sticky;top:0;z-index:10}.back{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:25px}.logo{display:flex;align-items:center;gap:9px;font-weight:900;font-size:20px}.logo-mark{width:31px;height:31px;border-radius:10px;background:#f79431;display:grid;place-items:center;color:white}.top-title{font-weight:800;font-size:17px;flex:1;text-align:center}.bell{width:38px;height:38px;display:grid;place-items:center;position:relative}.bell:after{content:"";width:7px;height:7px;background:#e53e36;border-radius:50%;position:absolute;right:6px;top:5px}.page{padding:18px 16px}.hero{background:linear-gradient(135deg,#f79431 0%,#d67820 68%,#ad5e10 100%);border-radius:22px;padding:20px;color:#fff;position:relative;overflow:hidden}.hero:after{content:"";position:absolute;width:150px;height:150px;border-radius:50%;background:#ffce0030;right:-48px;top:-58px}.kicker{font-size:12px;opacity:.88;letter-spacing:.04em}.hero h1{font-size:26px;line-height:1.2;margin:10px 0 6px}.hero p{font-size:13px;margin:0;color:#fff8f0}.section-head{display:flex;align-items:center;justify-content:space-between;margin:23px 2px 12px}.section-head h2{font-size:18px;margin:0}.section-head a{font-size:13px;color:#d67820;font-weight:700}.primary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.feature{background:#fff;border:1px solid #eae7e2;border-radius:16px;padding:14px 8px;text-align:center;min-height:116px;box-shadow:0 4px 12px #16120e08}.feature .ico,.service-ico{width:42px;height:42px;border-radius:13px;background:#fff3e7;color:#d67820;display:grid;place-items:center;margin:0 auto 10px;font-size:21px}.feature b{display:block;font-size:13px}.feature small{display:block;color:#655e55;font-size:10px;line-height:1.45;margin-top:5px}.quick-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.quick{background:#fff;border:1px solid #eae7e2;border-radius:14px;padding:13px;display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700}.quick span{font-size:19px;color:#d67820}.agenda{background:#fff;border:1px solid #eae7e2;border-radius:16px;padding:14px}.agenda-row{display:grid;grid-template-columns:52px 1fr auto;gap:8px;padding:10px 0;border-bottom:1px solid #eae7e2}.agenda-row:last-child{border:0}.agenda time{font-size:12px;color:#655e55}.agenda b{font-size:13px}.status{font-size:10px;border-radius:99px;padding:5px 8px;background:#fef0dc;color:#ad5e10;height:max-content;font-weight:800}.status.green{background:#e9f8ee;color:#27753b}.status.blue{background:#eaf4fb;color:#176b9e}.bottom{position:fixed;bottom:0;width:min(100%,430px);height:76px;border-top:1px solid #eae7e2;background:#fff;display:flex;justify-content:space-around;z-index:20;padding-bottom:env(safe-area-inset-bottom)}.bottom a{width:20%;display:grid;place-items:center;align-content:center;gap:4px;color:#655e55;font-size:10px}.bottom .on{color:#d67820;font-weight:800}.bottom span{font-size:20px}.lead h1{font-size:24px;margin:4px 0 5px}.lead p{margin:0;color:#655e55;font-size:13px}.seg{display:flex;gap:7px;overflow:auto;padding:15px 0 4px;scrollbar-width:none}.seg a{white-space:nowrap;padding:9px 13px;border-radius:99px;background:#fff;border:1px solid #eae7e2;font-size:12px}.seg .on{background:#f79431;color:#fff;border-color:#f79431}.search{display:flex;gap:8px;margin:14px 0}.field{min-height:44px;background:#fff;border:1px solid #eae7e2;border-radius:11px;padding:10px 12px;width:100%;color:#655e55}.view-toggle{display:flex;background:#f5f3f0;border-radius:10px;padding:3px}.view-toggle a{padding:8px 12px;border-radius:8px;font-size:12px}.view-toggle .on{background:#fff;color:#d67820;box-shadow:0 2px 7px #0000000d}.room-card,.event-card,.service-card,.record{background:#fff;border:1px solid #eae7e2;border-radius:17px;overflow:hidden;margin:12px 0}.room-cover,.event-cover{height:126px;padding:13px;display:flex;align-items:flex-end;color:#fff;position:relative;background-size:cover}.room-cover:after,.event-cover:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent,#16120eaa)}.room-cover>* ,.event-cover>*{position:relative;z-index:1}.room-a{background:linear-gradient(135deg,#9a7559,#332b28)}.room-b{background:linear-gradient(135deg,#4f5d66,#c49b75)}.room-c{background:linear-gradient(135deg,#c98b5b,#394a46)}.room-d{background:linear-gradient(135deg,#47423c,#d59a5e)}.cover-status{position:absolute!important;right:12px;top:12px;background:#e8faee;color:#28753b;border-radius:99px;padding:6px 9px;font-size:11px;font-weight:800}.cover-status.full{background:#fff0ef;color:#aa2924}.room-info,.event-info{padding:14px}.room-title{display:flex;align-items:center;justify-content:space-between}.room-title h3{font-size:17px;margin:0}.room-title small{color:#8a8177}.meta{display:flex;gap:12px;color:#655e55;font-size:12px;margin:9px 0}.tags{display:flex;gap:6px;flex-wrap:wrap}.tag{font-size:10px;color:#ad5e10;background:#fff3e7;padding:5px 7px;border-radius:7px}.btn{display:block;border-radius:11px;min-height:44px;line-height:44px;text-align:center;font-size:13px;font-weight:800;margin-top:12px}.btn.primary{background:#f79431;color:#fff}.btn.secondary{border:1px solid #f79431;color:#d67820;background:#fff}.btn.disabled{background:#f5f3f0;color:#b0a89c}.map-card{background:#fff;border:1px solid #eae7e2;border-radius:18px;padding:14px;margin-top:14px}.floor-tabs{display:flex;gap:7px;margin-bottom:13px}.floor-tabs a{padding:8px 14px;border-radius:9px;background:#f5f3f0;font-size:12px}.floor-tabs .on{background:#f79431;color:#fff}.floor{height:360px;background:#f8f9fb;border:2px solid #d4cec6;border-radius:14px;position:relative;padding:12px}.north{position:absolute;right:10px;top:8px;color:#8a8177}.space{position:absolute;border:1px solid #b6c4d6;border-radius:8px;background:#dceaff;color:#443d35;display:grid;place-items:center;text-align:center;font-size:12px;padding:6px}.space.available{background:#dff7e7;border-color:#9cd8b0}.space.facility{background:#fff4bd;border-color:#e6ce67}.space.lobby{background:#f1f2f4;border-color:#c9ced5}.s1{left:6%;top:14%;width:44%;height:27%}.s2{right:7%;top:14%;width:33%;height:27%}.s3{left:6%;bottom:11%;width:59%;height:36%}.s4{right:7%;bottom:11%;width:25%;height:36%}.legend{display:flex;gap:12px;flex-wrap:wrap;color:#655e55;font-size:11px;margin-top:12px}.dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-right:4px;background:#dceaff}.dot.green{background:#dff7e7}.dot.yellow{background:#fff4bd}.event-a{background:linear-gradient(135deg,#302f32,#b77734)}.event-b{background:linear-gradient(135deg,#667f64,#d69a62)}.event-c{background:linear-gradient(135deg,#7f3545,#f3b347)}.event-cover b{font-size:18px}.progress{height:6px;background:#f5f3f0;border-radius:99px;overflow:hidden;margin:10px 0}.progress i{display:block;height:100%;background:#f79431;border-radius:99px}.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.service-card{margin:0;padding:14px;min-height:174px;position:relative}.service-card .service-ico{margin:0 0 13px}.service-card h3{font-size:14px;margin:0 0 7px}.service-card p{font-size:11px;color:#655e55;line-height:1.55;margin:0}.service-card small{position:absolute;bottom:13px;color:#8a8177;font-size:10px}.hot{position:absolute;right:10px;top:10px;background:#ffce00;padding:4px 6px;border-radius:99px;font-size:9px;font-weight:900}.form-card{background:#fff;border:1px solid #eae7e2;border-radius:17px;padding:15px;margin-top:15px}.form-card label{display:block;font-size:12px;font-weight:700;margin:13px 0}.form-card .field{display:block;margin-top:7px}.summary{background:#fff8f0;border:1px solid #fddab0;border-radius:13px;padding:14px;font-size:12px;line-height:1.8}.success{text-align:center;padding-top:50px}.success-mark{width:64px;height:64px;border-radius:50%;background:#e8faee;color:#28753b;display:grid;place-items:center;font-size:32px;margin:auto}.success h1{font-size:23px}.success p{font-size:13px;color:#655e55}.record{padding:14px}.record-head{display:flex;justify-content:space-between;align-items:start}.record h3{font-size:15px;margin:0 0 6px}.record p{font-size:12px;color:#655e55;margin:4px 0}.notice{border-bottom:1px solid #eae7e2;padding:14px 2px}.notice:last-child{border:0}.notice b{font-size:14px}.notice p{font-size:12px;color:#655e55;margin:6px 0}.facility-row{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #eae7e2}.facility-row:last-child{border:0}.facility-row .service-ico{margin:0;flex:0 0 42px}.facility-row b{font-size:14px}.facility-row p{font-size:11px;color:#655e55;margin:5px 0}.qr-wrap{text-align:center}.qr{display:grid;grid-template-columns:repeat(29,6px);grid-template-rows:repeat(29,6px);gap:0;background:#fff;padding:18px;width:max-content;margin:20px auto;border:1px solid #eae7e2;box-shadow:0 6px 20px #16120e14}.qr i{width:6px;height:6px;background:#fff}.qr i.on{background:#16120e}.code{letter-spacing:.18em;font-weight:800}.help{background:#fff;border:1px solid #eae7e2;border-radius:15px;padding:14px;margin:10px 0}.help h3{font-size:14px;margin:0 0 7px}.help p{font-size:12px;color:#655e55;line-height:1.6;margin:0}@media(max-width:360px){.primary-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr}.shell,.bottom{width:100%}}
`;

function nav(path) {
  const selected = path.startsWith("/space") || path.startsWith("/reservations") ? "booking" :
    path.startsWith("/activities") ? "activities" : path.startsWith("/services") || path.startsWith("/tickets") ? "services" : path === "/" ? "home" : "more";
  return `<nav class="bottom">
    <a class="${selected === "home" ? "on" : ""}" href="/"><span>⌂</span>首頁</a>
    <a class="${selected === "booking" ? "on" : ""}" href="/space"><span>▣</span>預約</a>
    <a class="${selected === "activities" ? "on" : ""}" href="/activities"><span>☆</span>活動</a>
    <a class="${selected === "services" ? "on" : ""}" href="/services"><span>◎</span>服務</a>
    <a class="${selected === "more" ? "on" : ""}" href="/more"><span>☷</span>更多</a>
  </nav>`;
}

function top(title, back = "/") {
  if (!title) return `<header class="top"><div class="logo"><span class="logo-mark">N</span>NexSpace</div><div style="flex:1"></div><a class="bell" href="/notifications">♧</a></header>`;
  return `<header class="top"><a class="back" href="${back}">‹</a><div class="top-title">${title}</div><a class="bell" href="/notifications">♧</a></header>`;
}

function layout(path, title, body, back) {
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F79431"><meta name="description" content="NexSpace 租客員工行動工作台：空間預約、活動申請與服務申請。"><meta property="og:title" content="NexSpace 租客員工行動工作台"><meta property="og:description" content="預約空間、參加活動、提出服務申請，一站完成。"><meta property="og:image" content="https://nexspace-tenant-prototype.clovidiel.chatgpt.site/og.png"><meta name="twitter:card" content="summary_large_image"><title>${title ? `${title}｜` : ""}NexSpace</title><style>${css}</style></head><body><div class="shell">${top(title, back)}${body}${nav(path)}</div></body></html>`;
}

function home() {
  return `<main class="page">
    <section class="hero"><span class="kicker">2026年7月31日・星期五</span><h1>早安，王小明！</h1><p>NexSpace A 棟 · 今天也一起打造順暢的工作日。</p></section>
    <div class="section-head"><h2>工作台</h2><a href="/more">全部功能 ›</a></div>
    <section class="primary-grid">
      <a class="feature" href="/space"><span class="ico">▣</span><b>預約空間</b><small>找空間、看地圖<br>立即預約</small></a>
      <a class="feature" href="/activities"><span class="ico">☆</span><b>活動申請</b><small>探索活動<br>報名與管理</small></a>
      <a class="feature" href="/services"><span class="ico">◎</span><b>服務申請</b><small>維修、訪客<br>餐飲與行政</small></a>
    </section>
    <div class="section-head"><h2>快速入口</h2></div>
    <section class="quick-list">
      <a class="quick" href="/reservations"><span>▤</span>我的預約</a>
      <a class="quick" href="/tickets"><span>⌁</span>我的工單</a>
      <a class="quick" href="/facilities"><span>▦</span>空間地圖</a>
      <a class="quick" href="/notifications"><span>♧</span>通知中心</a>
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
    <div class="room-cover ${r.tone}"><span class="cover-status ${r.state === "已預訂" ? "full" : ""}">${r.state}</span><b>${r.type}</b></div>
    <div class="room-info"><div class="room-title"><h3>${r.name}</h3><small>${r.id}</small></div><div class="meta"><span>⌖ ${r.floor}</span><span>♙ ${r.cap} 人</span></div><div class="tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <a class="btn ${r.state === "已預訂" ? "disabled" : "primary"}" href="${r.state === "已預訂" ? "/space" : `/space/book?id=${r.id}`}">${r.state === "已預訂" ? "今日已滿" : "選擇時段"}</a></div>
  </article>`).join("");
}

function spacePage(map = false) {
  const lead = `<div class="lead"><h1>空間預約</h1><p>從空間清單或樓層地圖找到最適合的場地</p></div>
    <div class="search"><div class="field">⌕ 搜尋空間名稱、樓層</div><div class="view-toggle"><a class="${!map ? "on" : ""}" href="/space">清單</a><a class="${map ? "on" : ""}" href="/space/map">地圖</a></div></div>`;
  if (!map) return `<main class="page">${lead}<div class="seg"><a class="on" href="/space">全部空間</a><a href="/space">會議室</a><a href="/space">活動空間</a><a href="/space">電話亭</a></div>${roomCards()}</main>`;
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
  return `<main class="page"><div class="lead"><h1>活動與社群</h1><p>探索大樓活動，與社群建立連結</p></div><div class="seg"><a class="on" href="/activities">全部活動</a><a href="/activities">即將舉行</a><a href="/activities">我已報名</a><a href="/activities">過往活動</a></div>${registered ? `<div class="summary" style="margin-top:12px">✓ 已完成報名，活動已加入「我已報名」。</div>` : ""}${events.map((e,i) => `<article class="event-card"><div class="event-cover ${e.tone}"><span class="cover-status">${e.type}</span><b>${e.title}</b></div><div class="event-info"><p class="meta">${e.meta}<br>${e.place}</p><div class="progress"><i style="width:${i === 2 ? 90 : i === 1 ? 50 : 70}%"></i></div><p class="kicker">${e.count} 人已報名</p><a class="btn ${e.state === "已報名" ? "secondary" : "primary"}" href="${e.state === "已報名" ? "/activities" : `/activities/detail?id=${e.id}`}">${e.state}</a></div></article>`).join("")}</main>`;
}

function activityDetail() {
  return `<main class="page"><div class="event-cover event-b" style="height:190px;border-radius:18px"><b>職場健康講座：姿勢與體態</b></div><div class="section-head"><h2>活動詳情</h2><span class="status green">尚有名額</span></div><section class="record"><p>08/12（三）12:00–13:00</p><p>A 棟 12F 多功能室</p><p>由專業物理治療師帶領，認識久坐工作常見姿勢問題，並練習可在辦公桌旁完成的伸展。</p><a class="btn primary" href="/activities?registered=1">立即報名</a></section></main>`;
}

function servicePage() {
  return `<main class="page"><div class="lead"><h1>服務申請</h1><p>提交工作環境、行政與生活支援需求</p></div><div class="seg"><a class="on" href="/services">全部</a><a href="/services">IT 支援</a><a href="/services">設施維修</a><a href="/services">行政庶務</a><a href="/services">餐飲服務</a></div><section class="service-grid">${services.map((s,i) => `<a class="service-card" href="${i === 6 ? "/meal" : i === 5 ? "/visitors" : `/services/new?type=${encodeURIComponent(s.name)}`}">${s.hot ? `<span class="hot">熱門</span>` : ""}<span class="service-ico">${s.icon}</span><h3>${s.name}</h3><p>${s.desc}</p><small>◷ ${s.eta}</small></a>`).join("")}</section></main>`;
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
  return `<main class="page"><div class="lead"><h1>${ticket ? "我的工單" : "我的預約"}</h1><p>${ticket ? "追蹤服務申請進度與回覆" : "管理所有空間與設施預約"}</p></div>${fresh ? `<div class="summary" style="margin-top:14px">✓ 新資料已加入列表。</div>` : ""}<div class="seg"><a class="on" href="#">全部</a><a href="#">進行中</a><a href="#">已完成</a><a href="#">已取消</a></div>${data.map((r,i) => `<article class="record"><div class="record-head"><div><h3>${r[1]}</h3><p>${r[0]}</p></div><span class="status ${i === 1 ? "green" : i === 0 ? "blue" : ""}">${r[2]}</span></div><p>${r[3]}</p>${i === 0 ? `<a class="btn secondary" href="#">查看詳情</a>` : ""}</article>`).join("")}</main>`;
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
  return `<main class="page"><div class="lead"><h1>大樓設施</h1><p>瀏覽樓層平面圖與設施分布</p></div><section class="map-card"><div class="floor-tabs"><a class="on" href="#">A 棟</a><a href="#">B 棟</a><a href="#">C 棟</a></div><div class="floor"><span class="north">N ↑</span><a class="space s1" href="/space/book?id=A1201">大型會議室 A</a><div class="space facility s2">茶水間</div><div class="space available s3">開放辦公區</div><div class="space lobby s4">電梯大廳</div></div></section><div class="section-head"><h2>設施一覽</h2></div><section class="record">${[["☕","便利超商","B1 · 24 小時營業"],["☕","員工餐廳","1F · 11:30–19:00"],["⌁","健身房","B1 · 06:00–22:00"],["P","停車場","B1–B3 · 共 600 個車位"]].map(x=>`<div class="facility-row"><span class="service-ico">${x[0]}</span><div><b>${x[1]}</b><p>${x[2]}</p></div></div>`).join("")}</section></main>`;
}

function notifications() {
  return `<main class="page"><div class="lead"><h1>通知中心</h1><p>掌握預約、活動與服務進度</p></div><section class="record" style="margin-top:14px">${[["預約提醒","大型會議室 A 將於明日 10:00 開始。","5 分鐘前"],["工單進度更新","#SR-2026-0158 已由工程人員接手處理。","1 小時前"],["活動報名成功","職場健康講座已加入您的行程。","昨天"],["社群公告","A 棟電梯將於週六進行例行保養。","07/29"]].map(n=>`<div class="notice"><b>${n[0]}</b><p>${n[1]}</p><small class="kicker">${n[2]}</small></div>`).join("")}</section></main>`;
}

function more() {
  return `<main class="page"><div class="lead"><h1>更多功能</h1><p>完整工作台與大樓資訊</p></div><div class="section-head"><h2>個人功能</h2></div><section class="quick-list"><a class="quick" href="/reservations"><span>▤</span>我的預約</a><a class="quick" href="/tickets"><span>⌁</span>我的工單</a><a class="quick" href="/notifications"><span>♧</span>通知中心</a><a class="quick" href="/meal"><span>▦</span>餐券管理</a></section><div class="section-head"><h2>空間地圖</h2></div><section class="quick-list"><a class="quick" href="/facilities"><span>▦</span>大樓設施</a><a class="quick" href="/guide"><span>⌖</span>使用指南</a><a class="quick" href="/contact"><span>♙</span>聯絡我們</a><a class="quick" href="/services"><span>◎</span>服務申請</a></section></main>`;
}

function guide(contact = false) {
  if (contact) return `<main class="page"><div class="lead"><h1>聯絡我們</h1><p>需要協助時，NexSpace 團隊在這裡</p></div><section class="help"><h3>租客服務中心</h3><p>週一至週五 08:30–18:00<br>02-2345-6789<br>service@nexspace.example</p></section><section class="help"><h3>緊急維修專線</h3><p>24 小時服務<br>0800-123-888</p></section><a class="btn primary" href="/services">提出服務申請</a></main>`;
  return `<main class="page"><div class="lead"><h1>使用指南</h1><p>快速了解 NexSpace 常用功能</p></div>${[["如何預約會議室？","進入「空間預約」，可用清單或地圖找空間，選擇時段後送出。"],["如何報名活動？","在「活動與社群」選擇活動，查看詳情並點擊立即報名。"],["如何追蹤服務申請？","送出服務申請後，可在「我的工單」查看目前處理狀態。"],["餐券如何使用？","開啟餐券 QR Code，於取餐櫃台出示即可完成核銷。"]].map(x=>`<section class="help"><h3>${x[0]}</h3><p>${x[1]}</p></section>`).join("")}</main>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    let title = "", body = "", back = "/";
    if (path === "/") body = home();
    else if (path === "/space") { title = "空間預約"; body = spacePage(false); }
    else if (path === "/space/map") { title = "空間地圖"; body = spacePage(true); back = "/space"; }
    else if (path === "/space/book") { title = "確認預約"; body = booking(url); back = "/space"; }
    else if (path === "/space/success") { title = "預約完成"; body = success("預約成功", "空間已加入您的預約列表。", "/reservations?new=1", "查看我的預約"); back = "/space"; }
    else if (path === "/activities") { title = "活動與社群"; body = activities(url); }
    else if (path === "/activities/detail") { title = "活動詳情"; body = activityDetail(); back = "/activities"; }
    else if (path === "/services") { title = "服務申請"; body = servicePage(); }
    else if (path === "/services/new") { title = "提出申請"; body = serviceForm(url); back = "/services"; }
    else if (path === "/services/success") { title = "申請完成"; body = success("申請已送出", "案件編號 #SR-2026-0158，您可隨時查看進度。", "/tickets?new=1", "查看我的工單"); back = "/services"; }
    else if (path === "/reservations") { title = "我的預約"; body = records(false, url.searchParams.get("new") === "1"); }
    else if (path === "/tickets") { title = "我的工單"; body = records(true, url.searchParams.get("new") === "1"); }
    else if (path === "/meal") { title = "餐券／餐務"; body = meal(); back = "/services"; }
    else if (path === "/meal/qr") { title = "餐券 QR Code"; body = qrPage(); back = "/meal"; }
    else if (path === "/visitors") { title = "訪客停車登記"; body = visitors(); back = "/services"; }
    else if (path === "/facilities") { title = "大樓設施"; body = facilities(); }
    else if (path === "/notifications") { title = "通知中心"; body = notifications(); }
    else if (path === "/guide") { title = "使用指南"; body = guide(false); back = "/more"; }
    else if (path === "/contact") { title = "聯絡我們"; body = guide(true); back = "/more"; }
    else if (path === "/more") { title = "更多"; body = more(); }
    else { title = "找不到頁面"; body = `<main class="page success"><h1>此頁面不存在</h1><a class="btn primary" href="/">返回首頁</a></main>`; }
    return new Response(layout(path, title, body, back), { headers: { "content-type": "text/html;charset=UTF-8", "cache-control": "no-store" } });
  }
};
