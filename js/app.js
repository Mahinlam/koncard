const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function loadCards(){
  const res=await fetch("data/cards.json");
  return await res.json();
}

const questions=[
 {key:"spend",title:"Where do you spend most?",options:[
  ["shopping","Online shopping"],["dining","Restaurants & dining"],["travel","Travel & flights"],["everyday","Everyday spending"]]},
 {key:"benefit",title:"What matters most to you?",options:[
  ["cashback","Cashback / savings"],["rewards","Rewards"],["lounge","Airport lounges"],["installment","Installments"]]},
 {key:"international",title:"Do you need international transactions?",options:[
  ["yes","Yes"],["no","No"]]},
 {key:"lounge",title:"How important is airport lounge access?",options:[
  ["high","Very important"],["medium","Nice to have"],["low","Not important"]]}
];

const state={answers:{},index:0,cards:[]};

function initQuiz(){
 const shell=$("#quiz-shell"); if(!shell)return;
 state.cards=[];
 loadCards().then(cards=>{state.cards=cards;renderQuestion();});
}
function renderQuestion(){
 const q=questions[state.index];
 $("#qcount").textContent=`Question ${state.index+1} of ${questions.length}`;
 $("#qtitle").textContent=q.title;
 $("#options").innerHTML=q.options.map(([v,l])=>`<button class="option ${state.answers[q.key]===v?"selected":""}" data-value="${v}">${l}</button>`).join("");
 $$("#options .option").forEach(b=>b.onclick=()=>{state.answers[q.key]=b.dataset.value;$$("#options .option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");});
 $("#prev").style.visibility=state.index===0?"hidden":"visible";
 $("#next").textContent=state.index===questions.length-1?"See my match":"Next";
 $("#progress").style.width=((state.index+1)/questions.length*100)+"%";
}
function scoreCard(c,a){
 let s=0,total=0;
 const add=(x,w)=>{s+=x*w;total+=w};
 const tags=c.tags||[];
 if(a.spend==="shopping"){add(tags.includes("shopping")?10:3,2)}
 if(a.spend==="dining"){add(tags.includes("lifestyle")||tags.includes("dining")?10:4,2)}
 if(a.spend==="travel"){add(tags.includes("travel")?10:4,2)}
 if(a.spend==="everyday"){add(tags.includes("everyday")?10:6,2)}
 if(a.benefit==="cashback"){add(tags.includes("cashback")?10:4,2)}
 if(a.benefit==="rewards"){add(tags.includes("rewards")?10:4,2)}
 if(a.benefit==="lounge"){add(tags.includes("lounge")?10:2,2)}
 if(a.benefit==="installment"){add(tags.includes("installment")?10:5,2)}
 if(a.international==="yes"){add(tags.includes("international")||tags.includes("travel")?10:4,1)}
 if(a.lounge==="high"){add(tags.includes("lounge")?10:2,1)}
 if(a.lounge==="low"){add(tags.includes("lounge")?4:8,1)}
 return total?Math.round((s/total)*100):50;
}
function saveResult(){
 localStorage.setItem("koncard_answers",JSON.stringify(state.answers));
 const scored=state.cards.map(c=>({...c,score:scoreCard(c,state.answers)})).sort((a,b)=>b.score-a.score);
 localStorage.setItem("koncard_results",JSON.stringify(scored));
 location.href="result.html";
}
$("#next")?.addEventListener("click",()=>{
 if(!state.answers[questions[state.index].key]) return;
 if(state.index<questions.length-1){state.index++;renderQuestion();} else saveResult();
});
$("#prev")?.addEventListener("click",()=>{if(state.index>0){state.index--;renderQuestion();}});
initQuiz();

function cardHtml(c){
 return `<article class="carditem">
   <div class="cardtop"><div><div class="muted" style="font-size:12px">${esc(c.bank)} · ${esc(c.network)}</div><h3>${esc(c.name)}</h3></div>${c.verified?'<span class="verify">✓ Official source</span>':'<span class="verify" style="background:#fff1f1;color:#9b4444">Verification pending</span>'}</div>
   <div style="margin:10px 0">${(c.tags||[]).slice(0,4).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
   <p class="muted">${esc((c.features||[])[0]||"Details will be added after verification.")}</p>
   <a class="btn secondary" href="card.html?id=${encodeURIComponent(c.id)}">View card →</a>
 </article>`;
}
async function initCardsPage(){
 const grid=$("#cards-grid");if(!grid)return;
 const cards=await loadCards();let list=cards;
 const search=$("#search"),bank=$("#bank");
 [...new Set(cards.map(c=>c.bank))].forEach(b=>{const o=document.createElement("option");o.value=b;o.textContent=b;bank.appendChild(o)});
 function draw(){
  const q=(search.value||"").toLowerCase(),b=bank.value;
  list=cards.filter(c=>(!q || `${c.name} ${c.bank} ${(c.tags||[]).join(" ")}`.toLowerCase().includes(q))&&(!b||c.bank===b));
  grid.innerHTML=list.length?list.map(cardHtml).join(""):'<div class="empty">No cards match your filters.</div>';
 }
 search.oninput=draw;bank.onchange=draw;draw();
}
initCardsPage();

async function initResult(){
 const el=$("#result-shell");if(!el)return;
 const cards=JSON.parse(localStorage.getItem("koncard_results")||"[]");
 const answers=JSON.parse(localStorage.getItem("koncard_answers")||"{}");
 if(!cards.length){location.href="quiz.html";return}
 const best=cards[0];
 $("#score").textContent=best.score+"%";
 $("#scorebar").style.width=Math.min(best.score,100)+"%";
 $("#best-name").textContent=best.name;
 $("#best-bank").textContent=best.bank+" · "+best.network;
 $("#best-reason").textContent=buildReason(best,answers);
 $("#best-features").innerHTML=best.features.map(x=>`<li>${esc(x)}</li>`).join("");
 $("#official").href=best.official_source;
 $("#others").innerHTML=cards.slice(1,5).map(cardHtml).join("");
}
function buildReason(c,a){
 const reasons=[];
 if(a.spend && c.tags?.includes(a.spend)) reasons.push("matches your spending focus");
 if(a.benefit && c.tags?.includes(a.benefit)) reasons.push("fits your preferred benefit");
 if(a.international==="yes" && c.tags?.includes("international")) reasons.push("supports your international needs");
 if(a.lounge==="high" && c.tags?.includes("lounge")) reasons.push("has lounge-related benefits");
 return reasons.length?"It "+reasons.join(", ")+".":"It scored highest against the preferences you gave us.";
}
initResult();

async function initCardDetail(){
 const el=$("#card-detail");if(!el)return;
 const id=new URLSearchParams(location.search).get("id");const cards=await loadCards();const c=cards.find(x=>x.id===id);
 if(!c){el.innerHTML='<div class="empty">Card not found.</div>';return}
 $("#d-name").textContent=c.name;$("#d-bank").textContent=c.bank+" · "+c.network;
 $("#d-verified").innerHTML=c.verified?"✓ Official source checked":"Verification pending";
 $("#d-features").innerHTML=c.features.map(x=>`<li>${esc(x)}</li>`).join("");
 $("#d-source").href=c.official_source;$("#d-apply").href=c.application_url;
 $("#d-date").textContent=c.verified_date?`Last verified: ${c.verified_date}`:"Verification date not available";
}
initCardDetail();
