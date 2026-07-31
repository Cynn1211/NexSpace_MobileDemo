"use client";
import { useMemo, useState } from "react";

type Item={id:number;name:string;date:string;status:string;detail:string;points?:number;expanded?:boolean};
const seed={
 meeting:[{id:1,name:"會議室 3F-3",date:"08/05（二）09:30–10:30",status:"已預約",detail:"產品部 · Q3 規劃會議"},{id:2,name:"會議室 4F-1",date:"08/01（五）14:00–15:30",status:"已完成",detail:"行銷部 · 客戶提案"},{id:3,name:"會議室 3F-4",date:"07/28（一）10:00–11:00",status:"已取消",detail:"人資部 · 面談"}],
 facility:[{id:1,name:"健身房 3F-3",date:"08/06（三）18:00–19:00",status:"已預約",detail:"行政部 · 團體課程",points:25},{id:2,name:"健身房 4F-1",date:"08/02（六）10:00–11:00",status:"已完成",detail:"個人使用",points:20},{id:3,name:"多功能教室",date:"07/26（六）13:00–15:00",status:"已取消",detail:"設計部 · 工作坊",points:30}],
 meal:[{id:1,name:"每日午餐餐券",date:"使用日期 08/01（五）",status:"未使用",detail:"王小明 · 自取 · VX-8254"},{id:2,name:"健康餐盒",date:"使用日期 07/30（三）",status:"已使用",detail:"王小明 · 服務台取餐"},{id:3,name:"商務午餐餐券",date:"使用日期 07/25（五）",status:"已過期",detail:"王小明 · 外送"}],
 visitor:[{id:1,name:"陳大文 等 2 人",date:"來訪 08/04（一）10:00",status:"待審核",detail:"產品部 · 申請人 王小明"},{id:2,name:"合作夥伴來訪",date:"來訪 08/01（五）14:00",status:"已核准",detail:"行銷部 · 申請人 林美玲"},{id:3,name:"供應商會議",date:"來訪 07/28（一）09:30",status:"已完成",detail:"行政部 · 申請人 王小明"}],
 issue:[{id:1,name:"3F 茶水間咖啡機故障",date:"建立於 07/31",status:"未處理",detail:"設備維護 · 已收到您的反映"},{id:2,name:"4F 投影設備異常",date:"建立於 07/29",status:"處理中",detail:"設備維護 · 工程師已安排檢修"},{id:3,name:"停車場照明不足",date:"建立於 07/22",status:"已結案",detail:"環境安全 · 已完成燈具更換"}]
};
const icons:{[k:string]:string}={"會議室預約":"▣","公設預約":"♧","訪客登記":"♙","餐券／餐務":"▤","問題反映":"!","合約資訊":"▱","繳費紀錄":"$","資料列印系統":"▧","停車管理系統":"P"};
function Header({title,back=true}:{title:string,back?:boolean}){
 return <header><button className="icon" type="button">{back?"‹":""}</button><b>{title}</b><button className="icon" type="button">⋯</button></header>;
}
export default function Home(){
 const [view,setView]=useState("HOME-01"),[tab,setTab]=useState("首頁"),[toast,setToast]=useState(""),[balance,setBalance]=useState(120),[items,setItems]=useState(seed),[expanded,setExpanded]=useState<number|null>(null),[confirm,setConfirm]=useState<{kind:keyof typeof seed,id:number}|null>(null),[filter,setFilter]=useState("全部"),[pinned,setPinned]=useState(["會議室預約","餐券／餐務","訪客登記"]),[draft,setDraft]=useState([...pinned]),[editing,setEditing]=useState<{kind:keyof typeof seed,id:number}|null>(null);
 const flash=(m:string)=>{setToast(m);setTimeout(()=>setToast(""),2200)};
 const go=(v:string)=>{setView(v); if(v==="HOME-01")setTab("首頁")};
 const route=(name:string)=>{const map:any={"會議室預約":"MR-01","公設預約":"FAC-01","餐券／餐務":"MV-01","訪客登記":"VIS-01","問題反映":"ISSUE-01"};go(map[name]||"PLACEHOLDER")};
 const statusClass=(s:string)=>s.includes("取消")||s.includes("拒絕")?"bad":s.includes("完成")||s.includes("使用")||s.includes("結案")?"good":s.includes("處理")||s.includes("審核")?"progress":"booked";
 const cancel=()=>{if(!confirm)return;setItems(x=>({...x,[confirm.kind]:x[confirm.kind].map(i=>i.id===confirm.id?{...i,status:"已取消"}:i)}));if(confirm.kind==="facility")setBalance(v=>v+25);setConfirm(null);flash("已取消，列表已更新")};
 const add=(kind:keyof typeof seed,name:string,status:string,detail:string)=>{setItems(x=>({...x,[kind]:[{id:Date.now(),name,date:"建立於 今日",status,detail},...x[kind]]}));flash("送出成功，列表已更新")};
 const moduleKind=(view.startsWith("MR")?"meeting":view.startsWith("FAC")?"facility":view.startsWith("MV")?"meal":view.startsWith("VIS")?"visitor":"issue") as keyof typeof seed;
 const moduleTitle= view.startsWith("MR")?"會議室預約":view.startsWith("FAC")?"公設預約":view.startsWith("MV")?"餐券":view.startsWith("VIS")?"訪客登記":"問題反映";
 const list=items[moduleKind].filter(i=>filter==="全部"||i.status===filter);
 const Header=({title,back=true}:{title:string,back?:boolean})=><header><button className="icon" onClick={()=>back?go("HOME-01"):null}>{back?"‹":""}</button><b>{title}</b><button className="icon">⋯</button></header>;
 const Bottom=()=> <nav>{["首頁","預約","活動","服務","更多"].map(t=><button className={tab===t?"active":""} onClick={()=>{setTab(t); if(t==="首頁")go("HOME-01");else if(t==="預約")go("MR-01");else if(t==="服務")go("VIS-01");else go("PLACEHOLDER")}}><span>{t==="首頁"?"⌂":t==="預約"?"▣":t==="活動"?"☆":t==="服務"?"◎":"☷"}</span>{t}</button>)}</nav>;
 const Card=({it,kind}:{it:Item,kind:keyof typeof seed})=><article className="card"><div className="cardtop" onClick={()=>setExpanded(expanded===it.id?null:it.id)}><div><span className="eyebrow">#{String(it.id).slice(-5)}</span><h3>{it.name}</h3><p>{it.date}</p></div><span className={'pill '+statusClass(it.status)}>{it.status}</span></div>{expanded===it.id&&<div className="expand"><p>{it.detail}</p>{it.points&&<p>使用點數：{it.points} 點</p>}<div className="row">{!it.status.includes("取消")&&!it.status.includes("完成")&&<><button className="secondary" onClick={()=>setEditing({kind,id:it.id})}>編輯</button><button className="danger" onClick={()=>setConfirm({kind,id:it.id})}>取消</button></>}{kind==="meal"&&<button className="secondary" onClick={()=>go("MV-04")}>查看 QR Code</button>}</div></div>}</article>;
 const Form=({kind,action}:{kind:keyof typeof seed,action:string})=>{
  const [error,setError]=useState(false);
  const [name,setName]=useState("");
  const submit=()=>{
   if(!name){setError(true);return}
   if(kind==="meal"){
    add(kind,"每日午餐餐券","未使用","王小明 · 自取 · VX-"+Math.floor(Math.random()*9999));
    go("MV-04");
    return;
   }
   add(kind,name,kind==="visitor"?"待審核":kind==="issue"?"未處理":"已預約","王小明 · 新建立資料");
   go(kind==="meeting"?"MR-01":kind==="facility"?"FAC-01":kind==="visitor"?"VIS-01":"ISSUE-01");
  };
  return <><Header title={action}/><main className="form">
   <div className="summary">{action.includes("預約")?"已選擇：3F-4 · 10 人 · 08/05 10:00–11:00":"請完整填寫以下資料"}</div>
   <label>{kind==="issue"?"問題類型 *":kind==="visitor"?"受訪部門 *":kind==="meal"?"餐券方案 *":"使用部門 *"}<select><option>產品部</option><option>行政部</option></select></label>
   <label>{kind==="visitor"?"訪客姓名 *":kind==="issue"?"反映內容／標題 *":kind==="meal"?"取餐人姓名 *":"會議主旨 *"}<input value={name} onChange={e=>setName(e.target.value)} placeholder="請輸入內容"/></label>
   {kind==="visitor"&&<label>Email *<input className={error?"error":""} placeholder="name@example.com"/><small>{error&&"請輸入正確 Email 格式"}</small></label>}
   <label>{kind==="issue"?"問題描述 *":"備註（選填）"}<textarea placeholder="請輸入說明"/></label>
   {kind==="issue"&&<div className="upload">＋ 上傳現場照片（最多 4 張）</div>}
   <button className="primary fixed" onClick={submit}>{editing?"儲存變更":"送出"}</button>
   {error&&!name&&<p className="errorText">請填寫必填欄位</p>}
  </main></>;
 };
 if(view==="HOME-01")return <div className="app"><div className="hero"><span className="brand">● NexSpace</span><button>♧<i/></button><h1>早安，王小明</h1><p>NexSpace A 棟 · 租客員工</p></div><main><div className="sectionTitle"><h2>常用功能</h2><button onClick={()=>go("HOME-02")}>功能管理</button></div><div className="shortcuts">{pinned.map(x=><button onClick={()=>route(x)}><span>{icons[x]}</span>{x.replace("／餐務","")}</button>)}</div><div className="sectionTitle"><h2>全部功能</h2></div><div className="functions">{Object.keys(icons).map(x=><button onClick={()=>route(x)}><span>{icons[x]}</span>{x}<b>›</b></button>)}</div></main><Bottom/>{toast&&<div className="toast">✓ {toast}</div>}</div>;
 if(view==="HOME-02")return <div className="app"><Header title="功能管理"/><main><p className="hint">常用功能（{draft.length}/3）</p><div className="manage">{draft.map((x,i)=><div><span>☷</span>{x}<button onClick={()=>setDraft(draft.filter(v=>v!==x))}>−</button>{i>0&&<button onClick={()=>setDraft(draft.map((v,j)=>j===i?draft[i-1]:j===i-1?x:v))}>↑</button>}</div>)}</div><p className="hint">功能列表</p><div className="manage">{Object.keys(icons).filter(x=>!draft.includes(x)).map(x=><div><span>☷</span>{x}<button disabled={draft.length>=3} onClick={()=>setDraft([...draft,x])}>＋</button></div>)}</div><button className="primary fixed" onClick={()=>{setPinned(draft);go("HOME-01");flash("常用功能已更新")}}>儲存</button></main></div>;
 if(view==="MV-04")return <div className="app"><Header title="餐券 QR Code"/><main className="center"><div className="successMark">✓</div><h2>餐券建立成功</h2><p>請於取餐時出示 QR Code</p><div className="qr">▦<br/>▦▦<br/>▦ ▦</div><b>VX-8254-NS</b><button className="secondary wide" onClick={()=>flash("已模擬下載 QR Code")}>下載</button><button className="primary wide" onClick={()=>go("MV-01")}>返回我的餐券</button></main></div>;
 if(view==="MV-05")return <People go={go} flash={flash}/>;
 if(view==="PLACEHOLDER")return <div className="app"><Header title={tab}/><main className="empty"><div>✦</div><h2>{tab}功能準備中</h2><p>此原型保留入口，正式功能將於後續版本提供。</p><button className="primary" onClick={()=>go("HOME-01")}>返回首頁</button></main><Bottom/></div>;
 if(view.endsWith("-02")&&(view.startsWith("VIS")||view.startsWith("ISSUE")))return <Filter title={moduleTitle+"篩選"} onApply={(s)=>{setFilter(s);go(view.startsWith("VIS")?"VIS-01":"ISSUE-01")}}/>;
 if(view.endsWith("-03")||view==="MR-04")return <div className="app"> <Form kind={editing?.kind||moduleKind} action={view==="MR-04"?"編輯預約":view.startsWith("VIS")?"新增訪客":view.startsWith("ISSUE")?"問題反映":view.startsWith("MV")?"新增餐券":"確認預約"}/></div>;
 if(view==="FAC-04"||view==="MV-02")return <div className="app"><Header title="使用紀錄"/><main><div className="balance">目前可用點數 <strong>{view==="FAC-04"?balance:6}</strong></div>{["今日 · 預約 健身房 3F-3","07/30 · 儲值點數","07/28 · 使用餐券"].map((x,i)=><div className="timeline"><i className={i===1?"plus":"minus"}/><div>{x}<small>{i===1?"+ 100":"- "+(i?1:25)+" 點"}</small></div></div>)}</main></div>;
 if(view==="FAC-05")return <Topup balance={balance} setBalance={setBalance} go={go} flash={flash}/>;
 if(view==="MR-02"||view==="FAC-02")return <Search title={moduleTitle} go={go} facility={view.startsWith("FAC")}/>;
 // module main
 const isFac=view.startsWith("FAC"), isMeal=view.startsWith("MV");
 return <div className="app"><Header title={moduleTitle}/><main>{(isFac||isMeal)&&<div className="balance">{isMeal?"可用餐券":"預約點數餘額"}<strong>{isMeal?6:balance}{isMeal?" 張":" 點"}</strong><span><button onClick={()=>go(isMeal?"MV-02":"FAC-04")}>使用紀錄</button>{isFac&&<button onClick={()=>go("FAC-05")}>儲值點數</button>}</span></div>} {!isMeal&&!(view.startsWith("VIS")||view.startsWith("ISSUE"))&&<div className="tabs"><button className="selected">我的預約</button><button onClick={()=>go(isFac?"FAC-02":"MR-02")}>預約查詢</button></div>}<div className="pageActions"><h2>{isMeal?"我的餐券／訂單":view.startsWith("VIS")?"訪客紀錄":view.startsWith("ISSUE")?"問題列表":"我的預約"}</h2><button className="primary small" onClick={()=>go(isMeal?"MV-03":view.startsWith("VIS")?"VIS-03":view.startsWith("ISSUE")?"ISSUE-03":isFac?"FAC-02":"MR-02")}>{isMeal?"新增餐券":view.startsWith("VIS")?"新增訪客":view.startsWith("ISSUE")?"問題反映":"＋ 預約查詢"}</button></div>{(view.startsWith("VIS")||view.startsWith("ISSUE"))&&<div className="filterline"><button onClick={()=>go(view.startsWith("VIS")?"VIS-02":"ISSUE-02")}>⌘ 篩選</button>{filter!=="全部"&&<button onClick={()=>setFilter("全部")}>清除篩選</button>}</div>}{isMeal&&<button className="link" onClick={()=>go("MV-05")}>常用取餐人管理 ›</button>}<div className="cards">{list.map(it=><Card it={it} kind={moduleKind}/>)}</div></main><Bottom/>{confirm&&<Confirm onCancel={()=>setConfirm(null)} onOk={cancel}/>} {toast&&<div className="toast">✓ {toast}</div>}</div>
}
function Search({title,go,facility}:{title:string,go:(v:string)=>void,facility:boolean}){const [empty,setEmpty]=useState(false);return <div className="app"><Header title="預約查詢"/><main className="form"><label>{facility?"公設類型":"棟別／區域"}<select><option>NexSpace A 棟</option></select></label><label>使用人數<input placeholder="請輸入人數"/></label><div className="two"><label>開始日期<input value="2026-08-05" readOnly/></label><label>開始時間<input value="10:00" readOnly/></label></div><button className="primary" onClick={()=>setEmpty(!empty)}>搜尋</button>{empty?<div className="empty mini"><h3>查無可用空間</h3><p>請調整日期、時間或人數後再試。</p><button className="secondary" onClick={()=>setEmpty(false)}>調整條件</button></div>:<div className="results">{[facility?"健身房 4F-1":"會議室 3F-4",facility?"多功能教室":"會議室 4F-1"].map((x,i)=><article className="result"><div className="photo">{facility?"♧":"▣"}</div><div><h3>{x}</h3><p>{i?"4F · 15 人":"3F · 10 人"} · 投影設備</p><b>{facility?(i?30:20)+" 點":""}</b></div><button className="secondary" onClick={()=>go(facility?"FAC-03":"MR-03")}>預約</button></article>)}</div>}</main></div>}
function Filter({title,onApply}:{title:string,onApply:(s:string)=>void}){const [s,setS]=useState("待審核");return <div className="app"><Header title={title}/><main className="form"><h3>狀態</h3>{["全部","待審核","未處理","處理中","已結案","已核准"].map(x=><label className="check"><input type="radio" checked={s===x} onChange={()=>setS(x)}/>{x}</label>)}<label>開始日期<input type="date"/></label><label>結束日期<input type="date"/></label><div className="two"><button className="secondary" onClick={()=>onApply("全部")}>取消</button><button className="primary" onClick={()=>onApply(s)}>確定</button></div></main></div>}
function Topup({balance,setBalance,go,flash}:{balance:number,setBalance:(n:number)=>void,go:(s:string)=>void,flash:(s:string)=>void}){const [val,setVal]=useState("1000");return <div className="app"><Header title="儲值點數"/><main className="form"><div className="balance">目前點數<strong>{balance} 點</strong></div><label>儲值金額<input inputMode="numeric" value={val} onChange={e=>setVal(e.target.value)}/></label><div className="summary">預計獲得 <b>{Math.floor(Number(val||0)/10)} 點</b></div><button className="primary fixed" onClick={()=>{setBalance(balance+Math.floor(Number(val)/10));flash("儲值成功，點數已更新");go("FAC-01")}}>送出</button></main></div>}
function People({go,flash}:{go:(s:string)=>void,flash:(s:string)=>void}){const [people,setPeople]=useState(["王小明｜總機服務台｜0912-345-678","林美玲｜4F 接待區｜0988-111-222"]);return <div className="app"><Header title="常用取餐人"/><main><input className="search" placeholder="搜尋取餐人"/>{people.map((p,i)=><article className="person"><b>{p.split("｜")[0]}</b><p>{p.split("｜").slice(1).join(" · ")}</p><button className="danger" onClick={()=>{setPeople(people.filter((_,j)=>j!==i));flash("已刪除取餐人")}}>刪除</button></article>)}<button className="primary fixed" onClick={()=>{setPeople([...people,"新取餐人｜NexSpace A 棟｜0900-000-000"]);flash("已新增取餐人")}}>新增取餐人</button></main></div>}
function Confirm({onCancel,onOk}:{onCancel:()=>void,onOk:()=>void}){return <div className="modal"><div><h2>確定要取消嗎？</h2><p>取消後將更新此筆預約的狀態。</p><button className="secondary" onClick={onCancel}>返回</button><button className="danger big" onClick={onOk}>確定取消</button></div></div>}
