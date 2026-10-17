const input=document.getElementById("password");
const toggle=document.getElementById("togglePassword");
const strengthLabel=document.getElementById("strengthLabel");
const strengthHint=document.getElementById("strengthHint");
const currentState=document.getElementById("currentState");
const diagramState=document.getElementById("diagramState");
const meter=document.querySelector(".meter");
const transitionText=document.getElementById("transitionText");
const traceContainer=document.getElementById("trace");
const featureEls={length_ok:document.getElementById("lengthCheck"),has_digit:document.getElementById("digitCheck"),has_special:document.getElementById("specialCheck")};
const states=["q000","q001","q010","q011","q100","q101","q110","q111"];
// Bits are ordered L,D,S. Top row has L=0; bottom row has L=1.
const pos={q000:[95,95],q001:[285,95],q011:[475,95],q010:[665,95],q100:[95,270],q101:[285,270],q111:[475,270],q110:[665,270]};
let previous="q000", previousTrace=[];
const NS="http://www.w3.org/2000/svg";
function svgEl(tag,attrs={},text=""){const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text)el.textContent=text;return el;}
function buildDiagram(){
 const edges=document.getElementById("edges"),nodes=document.getElementById("nodes");edges.innerHTML="";nodes.innerHTML="";
 const transitions=[
  ["q000","q001","special"],["q000","q010","digit"],["q000","q100","8th char"],
  ["q001","q011","digit"],["q001","q101","8th char"],["q010","q011","special"],["q010","q110","8th char"],
  ["q011","q111","8th char"],["q100","q101","special"],["q100","q110","digit"],["q101","q111","digit"],["q110","q111","special"],
  ["q001","q000",""],["q010","q000",""]
 ];
 transitions.slice(0,12).forEach(([from,to,label])=>{
  const [x1,y1]=pos[from],[x2,y2]=pos[to];let sx=x1,sy=y1,ex=x2,ey=y2;
  if(Math.abs(x2-x1)>Math.abs(y2-y1)){sx+=Math.sign(x2-x1)*58;ex-=Math.sign(x2-x1)*58;}else{sy+=Math.sign(y2-y1)*31;ey-=Math.sign(y2-y1)*31;}
  const path=svgEl("path",{d:`M${sx} ${sy} L${ex} ${ey}`,class:"edge",id:`edge-${from}-${to}`});edges.appendChild(path);
  const tx=(sx+ex)/2,ty=(sy+ey)/2-7;edges.appendChild(svgEl("text",{x:tx,y:ty,class:"edge-label"},label));
 });
 // Draw the initial arrow and node cards.
 edges.appendChild(svgEl("circle",{cx:17,cy:95,r:4,fill:"#9aa5bd"}));
 edges.appendChild(svgEl("path",{d:"M22 95 L35 95",class:"edge"}));
 states.forEach(state=>{
  const [x,y]=pos[state],g=svgEl("g",{class:"node",id:`node-${state}`});
  if(state==="q111")g.appendChild(svgEl("circle",{cx:x,cy:y,r:48,class:"accept-ring"}));
  const bits=state.slice(1),flagNames=["length","digit","special"],labels=bits.split("").map((b,i)=>b==="1"?flagNames[i]:"").filter(Boolean);
  const subtitle=labels.length?labels.join("+"):"no flags";
  g.appendChild(svgEl("rect",{x:x-56,y:y-31,width:112,height:62,rx:15}));
  g.appendChild(svgEl("text",{x,y:y-3},state));
  g.appendChild(svgEl("text",{x,y:y+17,class:"node-sub"},state==="q111"?"all three":subtitle));
  nodes.appendChild(g);
 });
 highlight("q000");
}
function highlight(state,trace=[]){
 states.forEach(s=>{const n=document.getElementById(`node-${s}`);n.classList.remove("current","weak","medium","strong");if(s===state){n.classList.add("current");const strength=classifyBits(s);n.classList.add(strength.toLowerCase());}});
 document.querySelectorAll(".edge").forEach(e=>e.classList.remove("active"));
 // Highlight the actual state path with a bright node and transition edges where possible.
 for(let i=1;i<trace.length;i++){const from=trace[i-1].state,to=trace[i].state;const edge=document.getElementById(`edge-${from}-${to}`);if(edge)edge.classList.add("active");}
}
function classifyBits(state){const [l,d,s]=state.slice(1).split("").map(Number);if(l&&d&&s)return"Strong";if(l&&(d||s))return"Medium";return"Weak";}
function updateCheck(el,pass){el.classList.toggle("pass",pass);el.querySelector(".check-icon").textContent=pass?"✓":"×";}
function renderTrace(trace){if(!trace.length){traceContainer.innerHTML='<span class="empty-trace">Start typing to see the trace.</span>';return;}traceContainer.innerHTML="";trace.slice(-36).forEach(t=>{const box=document.createElement("div");box.className="trace-token";const b=document.createElement("b");b.textContent=t.character===" "?"␠":t.character;const small=document.createElement("small");small.textContent=t.state;box.append(b,small);box.title=`Character ${t.index}: ${t.state}`;traceContainer.appendChild(box);});}
async function analyze(){
 const password=input.value;
 try{
  const response=await fetch("/api/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
  const data=await response.json();if(!response.ok)throw new Error(data.error||"Unable to analyze password");
  const strength=data.strength.toLowerCase();strengthLabel.textContent=password?data.strength:"Waiting";strengthLabel.className=password?strength:"";
  strengthHint.textContent=!password?"Start typing to feed the automaton.":data.strength==="Strong"?"All three DFA feature checks are satisfied.":data.strength==="Medium"?"Good start. Add the missing feature to reach Strong.":"Add length, a digit, and a special character.";
  meter.className="meter "+(password?strength:"");meter.querySelectorAll("span").forEach((s,i)=>s.style.background=password&&(strength==="strong"||strength==="medium"&&i<2||strength==="weak"&&i===0)?({"weak":"#ff526e","medium":"#d79a26","strong":"#28d6a3"}[strength]):"");
  currentState.textContent=data.state;diagramState.textContent=`${data.state.toUpperCase()} · ${data.state==="q000"?"NO FLAGS":data.state.slice(1).split("").map((b,i)=>b==="1"?["LENGTH","DIGIT","SPECIAL"][i]:null).filter(Boolean).join(" + ")}`;
  updateCheck(featureEls.length_ok,data.length_ok);updateCheck(featureEls.has_digit,data.has_digit);updateCheck(featureEls.has_special,data.has_special);
  document.getElementById("lengthCount").textContent=`${Math.min(password.length,8)}/8`;document.getElementById("lengthProgress").style.width=`${Math.min(password.length/8*100,100)}%`;
  highlight(data.state,data.trace);renderTrace(data.trace);
  transitionText.textContent=!password?"Start state → q000 (empty password)":data.trace.length>1?`${data.trace[data.trace.length-2].state} → ${data.state} after “${password.slice(-1)}”`:`q000 → ${data.state} after “${password}”`;
  previous=data.state;previousTrace=data.trace;
 }catch(err){transitionText.textContent="Could not analyze: "+err.message;}
}
input.addEventListener("input",analyze);
toggle.addEventListener("click",()=>{const show=input.type==="password";input.type=show?"text":"password";toggle.textContent=show?"◉":"◉";toggle.title=show?"Hide password":"Show password";input.focus();});
document.querySelectorAll("[data-sample]").forEach(btn=>btn.addEventListener("click",()=>{input.value=btn.dataset.sample;analyze();input.focus();}));
buildDiagram();analyze();
