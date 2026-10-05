(function(){
'use strict';

const $ = id => document.getElementById(id);
const FORM = {tab:'Tablet',cap:'Capsule',captab:'Capsule / Tablet',amp:'Ampoule',vial:'Vial',supp:'Suppository',cream:'Cream',oint:'Ointment',lotion:'Lotion',gel:'Gel',syrup:'Syrup',susp:'Suspension',drops:'Drops',spray:'Spray',inh:'Inhaler',sach:'Sachet',patch:'Patch',powder:'Powder',wash:'Mouthwash',vag:'Vaginal',eff:'Effervescent',dressing:'Dressing',cart:'Cartridge',pen:'Pen',film:'Film',other:'Other'};
const FORM_SYN = {tab:'tablet tablets tabs قرص اقراص',cap:'capsule capsules caps كبسول كبسولات',captab:'tablet capsule tab cap قرص كبسول',amp:'ampoule ampule injection inj حقن حقنه امبول',vial:'injection inj vial فيال حقن',supp:'suppository suppositories لبوس لبوسه',cream:'cream topical كريم',oint:'ointment topical مرهم',lotion:'lotion لوشن',gel:'gel جل جيل',syrup:'syrup syp شراب',susp:'suspension syrup syp شراب معلق',drops:'drop drops eye ear قطره نقط',spray:'spray nasal بخاخ',inh:'inhaler puff spray بخاخ',sach:'sachet sachets كيس اكياس',patch:'patch لزقه',powder:'powder بودره',wash:'mouthwash wash غسول مضمضه',vag:'vaginal مهبلي',eff:'effervescent فوار',dressing:'dressing',cart:'cartridge insulin قلم خرطوشه',pen:'pen insulin قلم',film:'film'};
const AUTH = {gp:'GP',sp:'Specialist',cons:'Consultant',committee:'Committee'};
const AUTH_LONG = {gp:'General practitioner',sp:'Specialist',cons:'Consultant',committee:'Committee decision'};
const AUTH_SYN = {gp:'gp general practitioner عام',sp:'specialist اخصائي',cons:'consultant استشاري',committee:'committee لجنه'};
const GROUP_PRETTY = {
  "Antipyretic Analgesic , antirheumatic drugs":"Analgesics & Antirheumatics","Central Muscle Relaxant Drugs":"Muscle Relaxants",
  "Benzyl penicillin and phenoxymethylpenicillin":"Penicillins","Ampicillin Derivatives":"Ampicillin Derivatives","Cephalosporin first Generation":"Cephalosporins",
  "Tetracyclines":"Tetracyclines","Macrolides":"Macrolides","Lincosamides":"Lincosamides","Amphenicols":"Amphenicols","Aminoglycosides":"Aminoglycosides",
  "Quinolones":"Quinolones","Sulfonamides":"Sulfonamides","Oxazolidinones":"Oxazolidinones","B-Anti -Tuberculous Drugs":"Anti-Tuberculosis",
  "C- Anti-liperotic Drugs":"Anti-Leprotic","D - Drugs for urinary infection":"Urinary Antiseptics","Antifungal Drugs":"Antifungals","Antiviral Drugs":"Antivirals",
  "Anti-Amoebic, Anti-Giardial Drugs":"Anti-Amoebic & Giardial","Anthelmintic Drugs":"Anthelmintics","Anti - Malarial Drugs":"Antimalarials",
  "Psychotropic Drugs":"Psychotropics","Anti-depressant Drugs":"Antidepressants","Anti-Epileptic Drugs":"Antiepileptics","Anti - parkinsonial Drugs":"Antiparkinsonian",
  "Cardiovascular Drugs":"Cardiovascular","Diuretics":"Diuretics","Anti-Coagulant Drugs":"Anticoagulants","Haemostatic Drugs":"Haemostatics",
  "Anti-Diabetics Drugs":"Diabetes & Insulin","Hormones Drugs":"Hormones","Anti - Allergic Drugs":"Antiallergics & Steroids","Drugs For Respiratory System":"Respiratory",
  "Dermatological Drugs":"Dermatology","Ophthalmic Drugs":"Ophthalmology","Ear & Nose & Throat Drugs":"Ear, Nose & Throat","Dental &Buccal Drugs":"Dental & Oral",
  "Drugs For Haemorrhoid":"Haemorrhoid Care","Gastro-Intestinal Drugs":"Gastrointestinal","Antidiarrheal Drugs":"Antidiarrhoeals","Laxative Drugs":"Laxatives",
  "Drugs For Hepatic Diseases":"Hepatology","Drugs For Urinary & Prostatic diseases":"Urology & Prostate","Effervescent & Antispasmodic Drugs":"Antispasmodics",
  "Cytotoxic, Immunosuppressive & Complimentary Drugs":"Oncology & Immunology","vitamins Drugs":"Vitamins & Specialty"
};
const PAID_GROUP = {D:"Anti-Diabetics Drugs",C:"Cardiovascular Drugs",U:"Drugs For Urinary & Prostatic diseases",V:"vitamins Drugs",P:"Antipyretic Analgesic , antirheumatic drugs",OP:"Ophthalmic Drugs",AC:"Anti-Coagulant Drugs",R:"Drugs For Respiratory System",AP:"Anti - parkinsonial Drugs",E:"Anti-Epileptic Drugs",X:"Cytotoxic, Immunosuppressive & Complimentary Drugs",DM:"Dermatological Drugs",H:"Hormones Drugs",AM:"Anti-Amoebic, Anti-Giardial Drugs",DI:"Diuretics",AD:"Anti-depressant Drugs",G:"Gastro-Intestinal Drugs"};
const STOP = new Set(['mg','mcg','ml','iu','gm','g','u','i','of','and','the','with','w','x']);
const KEY_STOP = new Set(['sodium','potassium','acid','with','containing','contain','drug','drugs','other','student','protocol','tablet','syrup','plus','forte','cream']);
const AR_KB = {'ض':'q','ص':'w','ث':'e','ق':'r','ف':'t','غ':'y','ع':'u','ه':'i','خ':'o','ح':'p','ج':'[','د':']','ش':'a','س':'s','ي':'d','ب':'f','ل':'g','ا':'h','ت':'j','ن':'k','م':'l','ك':';','ط':"'",'ئ':'z','ء':'x','ؤ':'c','ر':'v','ى':'n','ة':'m','و':',','ز':'.','ظ':'/','ذ':'`','أ':'h','إ':'h','آ':'h','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
const ICONS = {
  pill:'<rect x="2.8" y="8.6" width="18.4" height="6.8" rx="3.4" transform="rotate(-38 12 12)"/><path d="m9.3 8.2 5.4 7.6"/>',
  liquid:'<path d="M12 3.5s6 6.4 6 10.7a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/><path d="M9.3 14.6a2.8 2.8 0 0 0 2.7 2.6"/>',
  inj:'<path d="m17 3 4 4M19 5l-4.5 4.5M14.5 6.5l3 3L9 18l-3.5.5L6 15z"/><path d="m3 21 2.6-2.6M11 9.5l1.5 1.5M8.8 11.7l1.5 1.5"/>',
  inh:'<path d="M9 3h5v5.5l3 2V20a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9.5l2-2z"/><path d="M7 15h10"/>',
  tube:'<path d="M8.5 3h7l-.8 3H9.3z"/><path d="M9.2 6h5.6l1.6 12.8a2 2 0 0 1-2 2.2H9.6a2 2 0 0 1-2-2.2z"/><path d="M9.6 12h4.8"/>',
  box:'<rect x="4" y="7" width="16" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M12 11v5M9.5 13.5h5"/>'
};
const FORM_ICON = {tab:'pill',cap:'pill',captab:'pill',film:'pill',eff:'pill',sach:'pill',drops:'liquid',syrup:'liquid',susp:'liquid',wash:'liquid',lotion:'liquid',amp:'inj',vial:'inj',pen:'inj',cart:'inj',inh:'inh',spray:'inh',cream:'tube',oint:'tube',gel:'tube',dressing:'tube',patch:'tube',vag:'tube',supp:'pill'};
const SVG_CHECK = '<svg class="opt-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const SVG_HEART = '<svg class="pin-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-7.5-4.4-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.8-7.5 10.2-7.5 10.2z"/></svg>';
const SVG_CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
const PAGE = 40;
const NF = new Intl.NumberFormat('en-US',{maximumFractionDigits:2});
const fmt = n => NF.format(n);

const AR_DIAC = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;
const HAS_AR = /[\u0600-\u06FF]/;
function norm(s){
  if (s == null) return '';
  return String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(AR_DIAC,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي')
    .replace(/[\u0660-\u0669]/g,d=>String(d.charCodeAt(0)-0x660)).replace(/[\u06F0-\u06F9]/g,d=>String(d.charCodeAt(0)-0x6F0))
    .replace(/[^\p{L}\p{N}.]+/gu,' ').replace(/\.(?!\d)/g,' ').replace(/(^|\D)\./g,'$1 ')
    .replace(/(\p{L})(\d)/gu,'$1 $2').replace(/(\d)(\p{L})/gu,'$1 $2').replace(/\s+/g,' ').trim();
}
const toks = s => { const n = norm(s); return n ? n.split(' ') : []; };
function skel(t){
  if (/^\d/.test(t)) return t;
  if (HAS_AR.test(t)) return t.replace(/(.)\1+/g,'$1');
  return t.replace(/ph/g,'f').replace(/th/g,'t').replace(/ck/g,'k').replace(/[cq]/g,'k').replace(/z/g,'s').replace(/y/g,'i')
    .replace(/ou/g,'u').replace(/ae/g,'e').replace(/ee/g,'i').replace(/(.)\1+/g,'$1').replace(/(.{4,})e$/,'$1');
}
function dl(a,b,max){
  const m = a.length, n = b.length;
  if (Math.abs(m-n) > max) return max+1;
  if (!m) return n; if (!n) return m;
  let p2 = null, p = new Array(n+1), c = new Array(n+1);
  for (let j=0;j<=n;j++) p[j] = j;
  for (let i=1;i<=m;i++){
    c[0] = i; let rowMin = i;
    const ai = a.charCodeAt(i-1);
    for (let j=1;j<=n;j++){
      const cost = ai === b.charCodeAt(j-1) ? 0 : 1;
      let v = Math.min(p[j]+1, c[j-1]+1, p[j-1]+cost);
      if (i>1 && j>1 && ai === b.charCodeAt(j-2) && a.charCodeAt(i-2) === b.charCodeAt(j-1)) v = Math.min(v, p2[j-2]+1);
      c[j] = v; if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max+1;
    const t = p2 || new Array(n+1); p2 = p; p = c; c = t;
  }
  return p[n];
}
const maxD = L => L<=3 ? 0 : L<=5 ? 1 : L<=8 ? 2 : 3;
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const titleCase = s => String(s||'').replace(/\b\p{L}/gu, c => c.toUpperCase());
const prettyGroup = g => g ? (GROUP_PRETTY[g] || titleCase(g.toLowerCase())) : '';
function hash(s){ let h = 0; for (let i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
function mono(label){
  const w = label.replace(/[^A-Za-z ]/g,' ').split(' ').filter(x=>x.length>1);
  const m = w.length > 1 ? w[0][0] + w[1][0].toLowerCase() : (w[0]||'?').slice(0,2);
  return '<span class="mono tone-'+(hash(label)%4)+'">'+esc(m[0].toUpperCase()+(m[1]||''))+'</span>';
}
function load(k,f){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; }catch(e){ return f; } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

let ITEMS = [], VOCAB = [], VSKEL = [], VPOST = [], VW = [], KEYMAP = new Map(), GROUPS = [], FORMS = [];
const termCache = new Map();

function buildItems(free, paid){
  const out = [];
  for (const r of free){
    const [id,name,conc,form,auth,duration,,maxDose,dayDose,group,syn,notes] = r;
    if (!name) continue;
    out.push({ key:'f'+id, type:'free', name:String(name).trim(), conc, form, auth, duration, maxDose, dayDose, group, syn:syn||[], notes, generic:'', pack:'', price:0, hay:null, stu:null, note:'',
      unverified: !form && !auth && !duration && !maxDose && !dayDose });
  }
  for (const r of paid){
    const [name,pack,form,price,hay,stu,note,generic,code,aliases] = r;
    out.push({ key:'p'+norm(name).replace(/ /g,''), type:'paid', name, conc:'', form, auth:null, duration:null, maxDose:null, dayDose:null, group:PAID_GROUP[code]||null, syn:aliases||[], notes:'', generic, pack, price, hay, stu, note, unverified:false });
  }
  out.forEach((it,i) => {
    it.i = i;
    it.sortPrice = it.type==='free' ? 0 : it.price != null ? it.price : it.hay != null ? Math.min(it.hay, it.stu) : 1e6;
    it.nameNorm = norm(it.name);
    it.compact = it.nameNorm.replace(/ /g,'');
    it.nameToks = new Set(it.nameNorm.split(' '));
    it.lname = it.name.toLowerCase();
  });
  return out;
}

function buildIndex(){
  const tmap = new Map();
  const add = (i, text, w) => {
    for (const t of toks(text)){
      if (STOP.has(t)) continue;
      let m = tmap.get(t); if (!m){ m = new Map(); tmap.set(t, m); }
      if ((m.get(i)||0) < w) m.set(i, w);
    }
  };
  for (const it of ITEMS){
    const i = it.i;
    add(i, it.name, 1);
    add(i, it.syn.join(' '), .95);
    if (it.generic) add(i, it.generic, .9);
    if (it.conc) add(i, it.conc, .9);
    if (it.pack) add(i, it.pack, .5);
    if (it.group) add(i, it.group + ' ' + prettyGroup(it.group), .42);
    if (it.form) add(i, (FORM[it.form]||'') + ' ' + (FORM_SYN[it.form]||''), .5);
    if (it.auth) add(i, AUTH_SYN[it.auth]||'', .3);
    if (it.duration) add(i, it.duration, .3);
    if (it.hay != null) add(i, 'هيئه طلاب', .3);
    if (it.note) add(i, it.note, .3);
    add(i, it.type==='free' ? 'free covered مجاني' : 'paid price contribution مدفوع', .3);
  }
  VOCAB = [...tmap.keys()];
  VSKEL = VOCAB.map(skel);
  VPOST = VOCAB.map(t => [...tmap.get(t)]);
  VW = VPOST.map(p => p.reduce((a,b)=>Math.max(a,b[1]),0));
  const gm = new Map(), fm = new Map();
  for (const it of ITEMS){
    if (it.group){ const g = gm.get(it.group) || {v:it.group,label:prettyGroup(it.group),n:0,paid:0}; g.n++; if (it.type==='paid') g.paid++; gm.set(it.group,g); }
    if (it.form){ const f = fm.get(it.form) || {v:it.form,label:FORM[it.form]||it.form,n:0,paid:0}; f.n++; if (it.type==='paid') f.paid++; fm.set(it.form,f); }
  }
  GROUPS = [...gm.values()].sort((a,b)=>b.n-a.n);
  FORMS = [...fm.values()].sort((a,b)=>b.n-a.n);
  for (const it of ITEMS){
    it.keys = relKeys(it);
    for (const k of it.keys){ let a = KEYMAP.get(k); if (!a){ a = []; KEYMAP.set(k,a); } a.push(it.i); }
  }
}
function relKeys(it){
  const ks = new Set();
  const take = s => { const t = toks(s).find(x => x.length >= 4 && !/^\d/.test(x) && !KEY_STOP.has(x)); if (t) ks.add(t); };
  take(it.name);
  if (it.generic) take(it.generic);
  for (const s of it.syn) take(s);
  return [...ks];
}

function matchTerm(term){
  const hit = termCache.get(term); if (hit) return hit;
  const scores = new Map(), hitToks = new Map();
  let direct = false, best = null;
  const isNum = /^\d/.test(term), L = term.length, sk = skel(term), md = maxD(L), pmd = L<=3 ? 0 : L<=6 ? 1 : 2;
  for (let k=0;k<VOCAB.length;k++){
    const tok = VOCAB[k]; let s = 0, d = false;
    if (tok === term){ s = 100; d = true; }
    else if (isNum){ if (tok.startsWith(term)) s = 52; }
    else if (/^\d/.test(tok)) continue;
    else if (tok.startsWith(term)){ s = 94 - Math.min(18, (tok.length-L)*1.2); d = true; }
    else {
      const ts = VSKEL[k];
      if (ts === sk && L >= 3){ s = 88; d = true; }
      else if (L >= 3 && ts.startsWith(sk)){ s = 82 - Math.min(14, ts.length-sk.length); d = true; }
      else if (L >= 4 && tok.includes(term)) s = 64;
      else if (L >= 4){
        const f = Math.min(dl(term,tok,md), dl(sk,ts,md));
        if (f <= md) s = 78 - 15*f;
        else if (pmd > 0 && tok.length > L){
          let pf = pmd+1;
          for (let x=-1;x<=1;x++){ const sl = L+x; if (sl < 3 || sl > tok.length) continue; const v = dl(term, tok.slice(0,sl), pmd); if (v < pf) pf = v; }
          if (pf <= pmd) s = 68 - 14*pf;
        }
      }
    }
    if (s <= 0) continue;
    if (d) direct = true;
    else if (VW[k] >= .9 && (!best || s > best.s || (s === best.s && VPOST[k].length > best.n))) best = { tok, s, n:VPOST[k].length };
    hitToks.set(tok, s);
    for (const [i,w] of VPOST[k]){ const v = s*w; if (v > (scores.get(i)||0)) scores.set(i, v); }
  }
  const r = { term, scores, hitToks, direct, best };
  termCache.set(term, r);
  if (termCache.size > 400) termCache.delete(termCache.keys().next().value);
  return r;
}

function queryTerms(raw){
  let t = toks(raw);
  const m = t.filter(x => !STOP.has(x));
  if (m.length) t = m;
  return [...new Set(t)].slice(0, 8);
}
function execute(raw){
  const terms = queryTerms(raw);
  if (!terms.length) return { list:[], mode:'none', infos:[] };
  const infos = terms.map(matchTerm);
  const sorted = [...infos].sort((a,b)=>a.scores.size-b.scores.size);
  const qc = norm(raw).replace(/ /g,'');
  const bonus = it => {
    let b = 0;
    if (it.compact.startsWith(qc)) b += 26; else if (qc.length >= 4 && it.compact.includes(qc)) b += 10;
    const first = it.nameNorm.split(' ')[0];
    if (first.startsWith(terms[0])) b += 12;
    return b - Math.min(8, it.name.length/14);
  };
  let list = [];
  for (const [i,s0] of sorted[0].scores){
    let sum = s0, ok = true;
    for (let k=1;k<sorted.length;k++){ const v = sorted[k].scores.get(i); if (!v){ ok = false; break; } sum += v; }
    if (ok) list.push({ i, base: sum/terms.length, score: sum/terms.length + bonus(ITEMS[i]) });
  }
  let mode = 'and';
  if (!list.length && terms.length > 1){
    const acc = new Map();
    for (const inf of infos) for (const [i,v] of inf.scores){ const a = acc.get(i) || {n:0,s:0}; a.n++; a.s += v; acc.set(i,a); }
    list = [...acc].map(([i,a]) => ({ i, base: a.n*100 + a.s/terms.length, score: a.n*100 + a.s/terms.length + bonus(ITEMS[i]) }));
    mode = list.length ? 'or' : 'none';
  }
  if (!list.length) mode = 'none';
  if (list.length > 1){
    let top = 0; for (const r of list) if (r.base > top) top = r.base;
    const cut = top >= 85 ? top * .7 : top * .55;
    list = list.filter(r => r.base >= cut);
  }
  let corrected = null;
  if (list.length && infos.some(x => !x.direct && x.best)){
    const c = infos.map(x => x.direct || !x.best ? x.term : x.best.tok).join(' ');
    if (c !== terms.join(' ')) corrected = c;
  }
  return { list, mode, infos, corrected };
}
function fromArabicLayout(s){
  return s.replace(/لا/g,'b').replace(/./g, ch => AR_KB[ch] != null ? AR_KB[ch] : ch).replace(/[\[\];',.\/`]/g,' ');
}
function runQuery(raw){
  let res = execute(raw);
  res.layout = null;
  if (HAS_AR.test(raw)){
    const alt = fromArabicLayout(raw);
    if (!HAS_AR.test(alt) && /[a-z]{2}/.test(alt)){
      const r2 = execute(alt);
      const top = r => r.list.reduce((m,x) => Math.max(m, x.score), 0);
      if (r2.list.length && (res.mode !== 'and' || (r2.mode === 'and' && top(r2) > top(res) + 15))){ r2.layout = alt.replace(/\s+/g,' ').trim(); res = r2; }
    }
  }
  return res;
}

function highlight(text, infos){
  if (!infos || !infos.length) return esc(text);
  let out = '', last = 0;
  for (const m of text.matchAll(/[\p{L}\p{N}]+(?:\.\d+)?/gu)){
    const w = m[0], off = m.index;
    const p = toks(w)[0] || '';
    let len = 0;
    for (const inf of infos){
      if (p.startsWith(inf.term) && w.toLowerCase().startsWith(inf.term)) len = Math.max(len, inf.term.length);
      else if (inf.hitToks.has(p) && inf.hitToks.get(p) >= 50 && !/^\d/.test(p)) len = w.length;
      else if (/^\d/.test(inf.term) && p === inf.term) len = Math.max(len, inf.term.length);
    }
    if (!len) continue;
    out += esc(text.slice(last, off)) + '<mark>' + esc(text.slice(off, off+len)) + '</mark>';
    last = off + len;
  }
  return out + esc(text.slice(last));
}

const S = {
  q:'', price:'all', cls:null, form:null, sort:'best', pinsOnly:false,
  pins:new Set(load('ag.pins',[])), recents:load('ag.recents',[]),
  list:[], shown:0, active:-1, selected:null, res:null, sheet:null
};
const isDesk = () => matchMedia('(min-width:1024px)').matches;
const hasFilters = () => S.price !== 'all' || S.cls || S.form || S.pinsOnly;

function priceCard(it){
  if (it.type === 'free') return '<div class="price free"><span class="price-tag">Free</span><span class="price-num">0<small>EGP</small></span></div>';
  if (it.price != null) return '<div class="price paid"><span class="price-tag">Patient pays</span><span class="price-num">'+fmt(it.price)+'<small>EGP</small></span></div>';
  if (it.hay != null) return '<div class="price split"><div class="split-row"><span class="ar">هيئة</span><b>'+fmt(it.hay)+'</b></div><div class="split-row"><span class="ar">طلاب</span><b>'+fmt(it.stu)+'</b></div></div>';
  return '<div class="price pct"><span class="ar" dir="rtl" lang="ar">'+esc(it.note)+'</span></div>';
}
function priceInline(it){
  if (it.type === 'free') return '<span class="rel-price free">0 EGP</span>';
  if (it.price != null) return '<span class="rel-price">'+fmt(it.price)+' EGP</span>';
  if (it.hay != null) return '<span class="rel-price">'+fmt(it.stu)+'–'+fmt(it.hay)+' EGP</span>';
  return '<span class="rel-price">50%</span>';
}
function priceText(it){
  if (it.type === 'free') return '0 EGP (free)';
  if (it.price != null) return fmt(it.price)+' EGP';
  if (it.hay != null) return 'هيئة '+fmt(it.hay)+' EGP / طلاب '+fmt(it.stu)+' EGP';
  return it.note;
}
function subLine(it, infos){
  const parts = [];
  if (infos && infos.length){
    const nameHit = infos.every(inf => [...it.nameToks].some(t => inf.hitToks.has(t)));
    if (!nameHit){
      const alias = it.syn.find(s => toks(s).some(t => infos.some(inf => inf.hitToks.has(t))));
      if (alias) parts.push('aka <b>'+esc(titleCase(alias))+'</b>');
    }
  }
  if (it.type === 'free'){ if (it.conc) parts.push(esc(it.conc)); if (it.form) parts.push(esc(FORM[it.form])); }
  else { if (it.generic) parts.push(esc(titleCase(it.generic))); if (it.pack) parts.push(esc(it.pack)); }
  return parts.join(' · ');
}
function cardHTML(it, n, infos){
  const ic = ICONS[FORM_ICON[it.form] || 'box'];
  let tags = '';
  if (it.type === 'free'){
    if (it.auth) tags += '<span class="tag auth-'+it.auth+'">'+AUTH[it.auth]+'</span>';
    if (it.duration) tags += '<span class="tag ar" dir="rtl" lang="ar">'+esc(it.duration.length > 26 ? it.duration.slice(0,26)+'…' : it.duration)+'</span>';
    if (it.unverified) tags += '<span class="tag limited">Limited info</span>';
  } else if (it.group) tags += '<span class="tag">'+esc(prettyGroup(it.group))+'</span>';
  const pinned = S.pins.has(it.key);
  return '<article class="card'+(it.type==='paid'?' is-paid':'')+(S.selected===it.i?' selected':'')+'" data-open="'+it.i+'" data-n="'+n+'" tabindex="-1" role="button" aria-label="'+esc(it.name)+'">'+
    '<span class="card-icon" aria-hidden="true"><svg viewBox="0 0 24 24">'+ic+'</svg></span>'+
    '<div class="card-main"><h3 class="card-title" dir="auto">'+highlight(it.name, infos)+'</h3>'+
    '<p class="card-sub">'+subLine(it, infos)+'</p>'+(tags?'<div class="tags">'+tags+'</div>':'')+'</div>'+
    '<div class="card-side">'+priceCard(it)+(pinned?SVG_HEART:'')+'</div></article>';
}

function related(it){
  const set = new Set();
  for (const k of it.keys) for (const i of (KEYMAP.get(k)||[])) if (i !== it.i) set.add(i);
  const nums = new Set(toks(it.name + ' ' + (it.conc||'')).filter(t => /^\d/.test(t)));
  const arr = [...set].map(i => ITEMS[i]).map(o => ({ o, s: toks(o.name+' '+(o.conc||'')).filter(t => nums.has(t)).length }));
  arr.sort((a,b) => b.s - a.s || a.o.sortPrice - b.o.sortPrice || a.o.name.localeCompare(b.o.name));
  return { free: arr.filter(x => x.o.type==='free').slice(0,6).map(x=>x.o), paid: arr.filter(x => x.o.type==='paid').slice(0,6).map(x=>x.o) };
}
function relList(title, items){
  if (!items.length) return '';
  return '<div class="related"><h3>'+title+'</h3><div class="rel-list">'+items.map(o =>
    '<button class="rel" data-open="'+o.i+'"><span class="rel-name" dir="auto">'+esc(o.name)+(o.type==='free'&&o.conc?' <span>'+esc(o.conc)+'</span>':'')+(o.type==='paid'&&o.pack?' <span>'+esc(o.pack)+'</span>':'')+'</span>'+priceInline(o)+'</button>'
  ).join('')+'</div></div>';
}
function detailHTML(it){
  const free = it.type === 'free';
  let price = '';
  if (free) price = '<div class="d-price free"><div class="dp-label">Patient contribution</div><div class="dp-value">0<small>EGP</small></div><div class="dp-note">Fully covered on the formulary list.</div></div>';
  else if (it.price != null) price = '<div class="d-price"><div class="dp-label">Patient contribution</div><div class="dp-value">'+fmt(it.price)+'<small>EGP</small></div><div class="dp-note">Per pack'+(it.pack?' · '+esc(it.pack):'')+'</div></div>';
  else if (it.hay != null) price = '<div class="d-price"><div class="dp-label">Patient contribution</div><div class="dp-split"><div><span class="ar" lang="ar">هيئة</span><b>'+fmt(it.hay)+'<small>EGP</small></b></div><div><span class="ar" lang="ar">طلاب</span><b>'+fmt(it.stu)+'<small>EGP</small></b></div></div><div class="dp-note">Per '+esc(it.pack||'unit')+' · Staff (هيئة) and students (طلاب) pay different amounts.</div></div>';
  else price = '<div class="d-price"><div class="dp-label">Patient contribution</div><div class="dp-pct ar" dir="rtl" lang="ar">'+esc(it.note)+'</div><div class="dp-note">Half of the supply price · '+esc(it.pack||'')+'</div></div>';
  const facts = [
    ['Strength', it.conc], ['Generic', it.generic ? titleCase(it.generic) : null], ['Pack', it.pack], ['Form', it.form ? FORM[it.form] : null],
    ['Prescriber', it.auth ? AUTH_LONG[it.auth] : null], ['Duration', it.duration], ['Max dose', it.maxDose], ['Daily dose', it.dayDose],
    ['Class', prettyGroup(it.group)], ['Also known as', it.syn.length ? it.syn.map(titleCase).join(', ') : null], ['Notes', it.notes]
  ].filter(f => f[1]);
  const rel = related(it);
  const pinned = S.pins.has(it.key);
  return '<article class="detail" data-item="'+it.i+'">'+
    '<span class="d-kicker'+(free?'':' paid')+'"><i></i>'+(free?'Free on formulary':'Paid item')+'</span>'+
    '<h2 class="d-title" dir="auto">'+esc(it.name)+'</h2>'+
    '<p class="d-sub">'+esc(free ? (it.syn.length ? it.syn.slice(0,3).map(titleCase).join(' · ') : prettyGroup(it.group)) : titleCase(it.generic||prettyGroup(it.group)))+'</p>'+
    price+
    (it.unverified ? '<p class="dp-note" style="margin:10px 2px 0">Limited info in the source list — confirm details before dispensing.</p>' : '')+
    '<dl class="facts">'+facts.map(f => '<div class="fact"><dt>'+f[0]+'</dt><dd'+(HAS_AR.test(f[1])?' class="ar" dir="rtl" lang="ar"':' dir="auto"')+'>'+esc(f[1])+'</dd></div>').join('')+'</dl>'+
    '<div class="d-actions"><button class="btn'+(pinned?' on':'')+'" data-act="pin" data-i="'+it.i+'">'+(pinned?'♥ Saved':'♡ Save')+'</button><button class="btn primary" data-act="copy" data-i="'+it.i+'">Copy</button></div>'+
    (free ? relList('Paid brands', rel.paid) + relList('Other free options', rel.free) : relList('Free alternatives', rel.free) + relList('Other paid strengths', rel.paid))+
    '</article>';
}
function paneEmpty(){
  return '<div class="pane-empty"><img src="images/logo.svg" alt=""><h3>Pick a result</h3><p>Details, price and free alternatives will appear here.</p>'+
    '<div class="keys"><span><span class="kbd">/</span>search</span><span><span class="kbd">↑↓</span>move</span><span><span class="kbd">Enter</span>open</span><span><span class="kbd">Esc</span>clear</span></div></div>';
}

function greeting(){
  const h = new Date().getHours();
  return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
function renderHome(){
  S.list = []; S.active = -1;
  const nFree = ITEMS.filter(x=>x.type==='free').length, nPaid = ITEMS.length - nFree;
  const rec = S.recents.slice(0,8).map(r => '<button class="recent" data-q="'+esc(r)+'">'+SVG_CLOCK+esc(r)+'</button>').join('');
  const tiles = GROUPS.slice(0,12).map(g => '<button class="cls-tile" data-cls="'+esc(g.v)+'">'+mono(g.label)+'<span><div class="cls-name">'+esc(g.label)+'</div><div class="cls-count">'+g.n+' items'+(g.paid?' · <b>'+g.paid+' paid</b>':'')+'</div></span></button>').join('');
  $('results-meta').innerHTML = '';
  $('results').innerHTML = '<div class="home">'+
    '<div class="hello"><h1>'+greeting()+',<br><em>what are we looking for?</em></h1>'+
    '<p>Type a drug, brand or class — typos are fine. Try <q>amoxcilin</q>, <q>glucofage 1000</q> or <q>insulin pen</q>.</p></div>'+
    '<div class="stats"><button class="stat" data-focus="1"><div class="stat-k">Total</div><div class="stat-v">'+ITEMS.length+'</div><div class="stat-s">items listed</div></button>'+
    '<button class="stat free" data-price="free"><div class="stat-k">Free</div><div class="stat-v">'+nFree+'</div><div class="stat-s">0 EGP to patient</div></button>'+
    '<button class="stat paid" data-price="paid"><div class="stat-k">Paid</div><div class="stat-v">'+nPaid+'</div><div class="stat-s">patient contribution</div></button></div>'+
    (rec ? '<div class="section-h"><h2>Recent</h2><button data-act="clear-recents">Clear</button></div><div class="recent-row">'+rec+'</div>' : '')+
    '<div class="section-h"><h2>Browse by class</h2><button data-sheet="class">See all '+GROUPS.length+'</button></div><div class="cls-grid">'+tiles+'</div>'+
    '<div class="home-foot"><span class="dedication">For every pharmacist who ever squinted at a handwritten script at 2am.</span><button data-sheet="about">Search tips</button></div>'+
    '</div>';
  $('more-loader').hidden = true;
  updateCounts(null);
}

function passOther(it){
  if (S.cls && it.group !== S.cls) return false;
  if (S.form && it.form !== S.form) return false;
  if (S.pinsOnly && !S.pins.has(it.key)) return false;
  return true;
}
function sortList(list, hasQuery){
  const by = S.sort === 'best' && !hasQuery ? 'name' : S.sort;
  const A = i => ITEMS[i];
  if (by === 'best') list.sort((a,b) => b.score - a.score || A(a.i).name.length - A(b.i).name.length || A(a.i).name.localeCompare(A(b.i).name));
  else if (by === 'name') list.sort((a,b) => A(a.i).name.localeCompare(A(b.i).name, 'en', {numeric:true, sensitivity:'base'}));
  else if (by === 'low') list.sort((a,b) => A(a.i).sortPrice - A(b.i).sortPrice || A(a.i).name.localeCompare(A(b.i).name));
  else if (by === 'high') list.sort((a,b) => (A(b.i).sortPrice >= 1e6 ? -1 : A(b.i).sortPrice) - (A(a.i).sortPrice >= 1e6 ? -1 : A(a.i).sortPrice) || A(a.i).name.localeCompare(A(b.i).name));
}
function updateCounts(pre){
  const all = pre ? pre.length : ITEMS.length;
  let free = 0;
  if (pre){ for (const r of pre) if (ITEMS[r.i].type === 'free') free++; }
  else free = ITEMS.filter(x=>x.type==='free').length;
  $('c-all').textContent = all; $('c-free').textContent = free; $('c-paid').textContent = all - free;
}

function update(){
  const raw = S.q.trim();
  let res = null;
  if (raw) res = runQuery(raw);
  S.res = res;
  if (!res && !hasFilters()){ renderHome(); syncChips(); return; }
  const base = res ? res.list : ITEMS.map(it => ({ i:it.i, score:0 }));
  const pre = base.filter(r => passOther(ITEMS[r.i]));
  updateCounts(pre);
  const fin = S.price === 'all' ? pre.slice() : pre.filter(r => ITEMS[r.i].type === S.price);
  sortList(fin, !!res);
  S.list = fin; S.shown = 0; S.active = -1;
  renderMeta(fin, res);
  if (!fin.length) renderEmpty(res);
  else { $('results').innerHTML = ''; renderMore(); }
  syncChips();
  window.scrollTo({ top: 0 });
  if (isDesk() && fin.length && raw && (S.selected == null || !fin.some(r => r.i === S.selected))) select(fin[0].i, false);
}
function renderMeta(fin, res){
  let free = 0; for (const r of fin) if (ITEMS[r.i].type === 'free') free++;
  let h = '<span><b>'+fin.length+'</b> '+(fin.length===1?'result':'results')+'</span>';
  if (fin.length) h += '<span class="meta-split"><span><i class="dot-free"></i>'+free+' free</span><span><i class="dot-paid"></i>'+(fin.length-free)+' paid</span></span>';
  if (res && res.layout) h += '<span class="suggest">Keyboard was on Arabic — showing <button data-q="'+esc(res.layout)+'">'+esc(res.layout)+'</button></span>';
  else if (res && res.corrected) h += '<span class="suggest">Showing results for <button data-q="'+esc(res.corrected)+'">'+esc(res.corrected)+'</button></span>';
  if (res && res.mode === 'or') h += '<span class="suggest">No item matches every word — closest first</span>';
  $('results-meta').innerHTML = h;
}
function renderEmpty(res){
  const filt = hasFilters();
  $('results').innerHTML = '<div class="empty"><div class="bloom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6M8.5 11h5"/></svg></div>'+
    '<h2>Nothing found</h2><p>'+(filt ? 'Your filters may be hiding results.' : 'Try fewer letters, a brand name, or the generic name.')+'</p>'+
    '<div class="actions">'+(filt?'<button class="btn primary" data-act="reset-filters">Clear filters</button>':'')+(S.q?'<button class="btn" data-act="clear-q">New search</button>':'')+'</div></div>';
  $('more-loader').hidden = true;
}
function renderMore(){
  const infos = S.res ? S.res.infos : null;
  const end = Math.min(S.list.length, S.shown + PAGE);
  let h = '';
  for (let n = S.shown; n < end; n++) h += cardHTML(ITEMS[S.list[n].i], n, infos);
  $('results').insertAdjacentHTML('beforeend', h);
  S.shown = end;
  $('more-loader').hidden = S.shown >= S.list.length;
}
function setActive(n){
  const cards = $('results').querySelectorAll('.card');
  if (!cards.length) return;
  n = Math.max(0, Math.min(S.list.length-1, n));
  while (n >= S.shown && S.shown < S.list.length) renderMore();
  const all = $('results').querySelectorAll('.card');
  all.forEach(c => c.classList.remove('active'));
  const el = all[n]; if (!el) return;
  el.classList.add('active'); S.active = n;
  el.scrollIntoView({ block:'nearest', behavior:'smooth' });
  if (isDesk()) select(S.list[n].i, false);
}
function select(i, commit){
  S.selected = i;
  $('results').querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
  const c = $('results').querySelector('.card[data-open="'+i+'"]'); if (c) c.classList.add('selected');
  if (commit) commitRecent();
  if (isDesk()){ $('detail-pane').innerHTML = detailHTML(ITEMS[i]); $('detail-pane').scrollTop = 0; }
}
function openItem(i){
  commitRecent();
  if (isDesk()) select(i, true);
  else { S.selected = i; $('q').blur(); openSheet(detailHTML(ITEMS[i]), 'detail'); }
}

function commitRecent(){
  const v = S.q.trim(); if (!v || !S.list.length) return;
  S.recents = [v, ...S.recents.filter(r => r.toLowerCase() !== v.toLowerCase())].slice(0,8);
  save('ag.recents', S.recents);
}

let sheetPushed = false;
function openSheet(html, kind){
  const sh = $('sheet');
  $('sheet-body').innerHTML = html; $('sheet-body').scrollTop = 0;
  sh.setAttribute('aria-label', kind === 'detail' ? 'Details' : kind);
  S.sheet = kind;
  sh.classList.add('open'); $('scrim').classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  sh.style.transform = '';
  if (!sheetPushed){ history.pushState({ agSheet:1 }, ''); sheetPushed = true; }
  setTimeout(() => { const f = sh.querySelector('.sheet-search'); if (f && isDesk()) f.focus(); else sh.focus({ preventScroll:true }); }, 60);
}
function closeSheet(fromPop){
  if (!S.sheet) return;
  S.sheet = null;
  $('sheet').classList.remove('open'); $('scrim').classList.remove('open'); $('sheet').style.transform = '';
  document.documentElement.style.overflow = '';
  if (sheetPushed){ sheetPushed = false; if (!fromPop) history.back(); }
}
function optList(items, cur, type){
  const all = '<button class="opt'+(cur==null?' on':'')+'" data-pick="'+type+'" data-v=""><span class="opt-label">All</span><span class="opt-count">'+ITEMS.length+'</span>'+SVG_CHECK+'</button>';
  return all + items.map(o => '<button class="opt'+(cur===o.v?' on':'')+'" data-pick="'+type+'" data-v="'+esc(o.v)+'" data-label="'+esc(norm(o.label+' '+o.v))+'">'+mono(o.label)+'<span class="opt-label">'+esc(o.label)+'</span><span class="opt-count">'+o.n+(o.paid?' · '+o.paid+' paid':'')+'</span>'+SVG_CHECK+'</button>').join('');
}
function openPicker(kind){
  if (kind === 'class') openSheet('<h2 class="sheet-title">Drug class</h2><input class="sheet-search" type="search" placeholder="Filter classes…" data-filter="1" autocomplete="off"><div class="opt-list">'+optList(GROUPS, S.cls, 'cls')+'</div>', 'Class');
  else if (kind === 'form') openSheet('<h2 class="sheet-title">Dosage form</h2><div class="opt-list">'+optList(FORMS, S.form, 'form')+'</div>', 'Form');
  else if (kind === 'sort'){
    const o = [['best','Best match'],['name','Name A → Z'],['low','Price · low to high'],['high','Price · high to low']];
    openSheet('<h2 class="sheet-title">Sort by</h2><div class="opt-list">'+o.map(x => '<button class="opt'+(S.sort===x[0]?' on':'')+'" data-pick="sort" data-v="'+x[0]+'"><span class="opt-label">'+x[1]+'</span>'+SVG_CHECK+'</button>').join('')+'</div>', 'Sort');
  }
  else if (kind === 'about') openSheet(aboutHTML(), 'About');
}
function aboutHTML(){
  const nPaid = ITEMS.filter(x=>x.type==='paid').length;
  return '<h2 class="sheet-title">Search tips</h2><dl class="facts">'+
    '<div class="fact"><dt>Typos</dt><dd>Spell it how it sounds — <i>amoxcilin</i>, <i>glucofage</i>, <i>zitromax</i> all work.</dd></div>'+
    '<div class="fact"><dt>Brands</dt><dd>Brand or generic: <i>panadol</i> finds Paracetamol, <i>lipitor</i> finds atorvastatin.</dd></div>'+
    '<div class="fact"><dt>Strength</dt><dd>Add numbers to narrow: <i>crestor 10</i>, <i>metformin 1000</i>.</dd></div>'+
    '<div class="fact"><dt>Form</dt><dd>Words like <i>syrup</i>, <i>eye drops</i>, <i>pen</i>, <i>شراب</i> filter by form.</dd></div>'+
    '<div class="fact"><dt>Arabic keyboard</dt><dd>Forgot to switch layout? <i class="ar">لمعؤخحاشلث</i> still finds <i>glucophage</i>.</dd></div>'+
    '<div class="fact"><dt>Price</dt><dd>Free items cost the patient 0 EGP. Paid items show the patient contribution; some list separate <span class="ar">هيئة</span> and <span class="ar">طلاب</span> amounts.</dd></div>'+
    '<div class="fact"><dt>Keyboard</dt><dd><span class="kbd">/</span> search · <span class="kbd">↑↓</span> move · <span class="kbd">Enter</span> open · <span class="kbd">Esc</span> clear</dd></div>'+
    '<div class="fact"><dt>Data</dt><dd>'+ITEMS.length+' items · '+(ITEMS.length-nPaid)+' free · '+nPaid+' paid. Works offline after first visit.</dd></div>'+
    '</dl><div class="d-actions"><button class="btn" data-act="reset-all">Clear saved & recents</button><button class="btn primary" data-act="close">Got it</button></div>'+
    '<p class="dedication" style="text-align:center;margin:20px 0 0">For every pharmacist who ever squinted at a handwritten script at 2am.</p>';
}

function syncChips(){
  const seg = $('price-seg');
  const idx = ['all','free','paid'].indexOf(S.price);
  seg.dataset.i = idx;
  seg.querySelectorAll('button').forEach((b,k) => { b.classList.toggle('on', k===idx); b.setAttribute('aria-checked', k===idx); });
  const cc = $('chip-class'); cc.classList.toggle('on', !!S.cls); cc.querySelector('.chip-label').textContent = S.cls ? prettyGroup(S.cls) : 'Class';
  const fc = $('chip-form'); fc.classList.toggle('on', !!S.form); fc.querySelector('.chip-label').textContent = S.form ? FORM[S.form] : 'Form';
  const sl = {best:'Best match',name:'A → Z',low:'Price ↑',high:'Price ↓'};
  $('chip-sort').querySelector('.chip-label').textContent = sl[S.sort];
  const pc = $('chip-pins'); pc.classList.toggle('on', S.pinsOnly); pc.setAttribute('aria-pressed', S.pinsOnly);
  pc.querySelector('.chip-label').textContent = 'Saved' + (S.pins.size ? ' · '+S.pins.size : '');
  $('clear-btn').hidden = !S.q; $('kbd-hint').hidden = !!S.q;
}

let urlTimer = null;
function syncURL(){
  clearTimeout(urlTimer);
  urlTimer = setTimeout(() => {
    const p = new URLSearchParams();
    if (S.q.trim()) p.set('q', S.q.trim());
    if (S.price !== 'all') p.set('price', S.price);
    if (S.cls) p.set('class', S.cls);
    if (S.form) p.set('form', S.form);
    const s = p.toString();
    history.replaceState(history.state, '', s ? '?'+s : location.pathname);
  }, 250);
}
let raf = 0, recentTimer = null;
function schedule(){
  if (raf) return;
  raf = requestAnimationFrame(() => { raf = 0; update(); syncURL(); });
  clearTimeout(recentTimer);
  recentTimer = setTimeout(commitRecent, 2200);
}
function setQuery(v, focus){
  $('q').value = v; S.q = v; schedule();
  if (focus) $('q').focus();
}

let toastT = null;
function toast(m){ const t = $('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1700); }
function copy(text){
  const done = () => { toast('Copied to clipboard'); if (navigator.vibrate) navigator.vibrate(8); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallback());
  else fallback();
  function fallback(){ const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('Copy failed'); } ta.remove(); }
}
function copyItem(it){
  const parts = [it.name];
  if (it.conc) parts.push(it.conc);
  if (it.pack) parts.push(it.pack);
  else if (it.form) parts.push(FORM[it.form]);
  parts.push('Patient pays: ' + priceText(it));
  return parts.join(' — ');
}
function togglePin(i){
  const it = ITEMS[i];
  if (S.pins.has(it.key)) S.pins.delete(it.key); else S.pins.add(it.key);
  save('ag.pins', [...S.pins]);
  toast(S.pins.has(it.key) ? 'Saved' : 'Removed from saved');
  document.querySelectorAll('.detail[data-item="'+i+'"]').forEach(d => d.outerHTML = detailHTML(it));
  const card = $('results').querySelector('.card[data-open="'+i+'"]');
  if (card){ const side = card.querySelector('.card-side'); side.innerHTML = priceCard(it) + (S.pins.has(it.key) ? SVG_HEART : ''); }
  syncChips();
  if (S.pinsOnly) schedule();
}

function bind(){
  const q = $('q');
  q.addEventListener('input', () => { S.q = q.value; schedule(); });
  q.addEventListener('focus', () => $('search-box').classList.add('focus'));
  q.addEventListener('blur', () => $('search-box').classList.remove('focus'));
  q.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown'){ e.preventDefault(); setActive(S.active + 1); }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); setActive(S.active - 1); }
    else if (e.key === 'Enter'){
      e.preventDefault();
      if (S.list.length) openItem(S.list[Math.max(0, S.active)].i);
      if (!isDesk()) q.blur();
    }
    else if (e.key === 'Escape' && !S.sheet){ setQuery('', true); }
  });
  $('clear-btn').addEventListener('click', () => setQuery('', true));
  $('price-seg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    S.price = b.dataset.v; schedule();
  });
  $('chip-class').addEventListener('click', e => { if (S.cls && e.target.closest('.chip-x')){ S.cls = null; schedule(); return; } openPicker('class'); });
  $('chip-form').addEventListener('click', e => { if (S.form && e.target.closest('.chip-x')){ S.form = null; schedule(); return; } openPicker('form'); });
  $('chip-sort').addEventListener('click', () => openPicker('sort'));
  $('chip-pins').addEventListener('click', () => { S.pinsOnly = !S.pinsOnly; schedule(); });
  $('about-btn').addEventListener('click', () => openPicker('about'));
  $('theme-btn').addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try{ localStorage.setItem('ag.theme', t); }catch(e){}
  });
  $('scrim').addEventListener('click', () => closeSheet());
  $('sheet-close').addEventListener('click', () => closeSheet());
  window.addEventListener('popstate', () => { if (S.sheet){ sheetPushed = false; closeSheet(true); } });

  document.addEventListener('click', e => {
    const t = e.target;
    const act = t.closest('[data-act]');
    if (act){
      const a = act.dataset.act, i = +act.dataset.i;
      if (a === 'copy') copy(copyItem(ITEMS[i]));
      else if (a === 'pin') togglePin(i);
      else if (a === 'clear-recents'){ S.recents = []; save('ag.recents', []); renderHome(); }
      else if (a === 'reset-filters'){ S.price = 'all'; S.cls = null; S.form = null; S.pinsOnly = false; schedule(); }
      else if (a === 'clear-q') setQuery('', true);
      else if (a === 'close') closeSheet();
      else if (a === 'reset-all'){ S.pins.clear(); S.recents = []; save('ag.pins', []); save('ag.recents', []); closeSheet(); toast('Cleared'); schedule(); }
      return;
    }
    const pick = t.closest('[data-pick]');
    if (pick){
      const v = pick.dataset.v || null;
      if (pick.dataset.pick === 'cls') S.cls = v;
      else if (pick.dataset.pick === 'form') S.form = v;
      else if (pick.dataset.pick === 'sort') S.sort = v || 'best';
      closeSheet(); schedule(); return;
    }
    const sh = t.closest('[data-sheet]'); if (sh && !sh.classList.contains('chip')){ openPicker(sh.dataset.sheet); return; }
    const dq = t.closest('[data-q]'); if (dq){ closeSheet(); setQuery(dq.dataset.q, isDesk()); return; }
    const dc = t.closest('[data-cls]'); if (dc){ S.cls = dc.dataset.cls; schedule(); return; }
    const dp = t.closest('[data-price]'); if (dp){ S.price = dp.dataset.price; schedule(); return; }
    if (t.closest('[data-focus]')){ q.focus(); return; }
    const op = t.closest('[data-open]');
    if (op){
      const i = +op.dataset.open;
      if (op.classList.contains('card')){ S.active = +op.dataset.n; openItem(i); }
      else if (S.sheet === 'detail' || !isDesk()){ $('sheet-body').innerHTML = detailHTML(ITEMS[i]); $('sheet-body').scrollTop = 0; if (!S.sheet) openSheet(detailHTML(ITEMS[i]), 'detail'); }
      else select(i, false);
    }
  });
  document.addEventListener('input', e => {
    if (!e.target.dataset || !e.target.dataset.filter) return;
    const f = norm(e.target.value);
    $('sheet-body').querySelectorAll('.opt[data-label]').forEach(o => { o.hidden = f && !o.dataset.label.includes(f); });
  });
  document.addEventListener('keydown', e => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if ((e.key === '/' && tag !== 'INPUT') || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')){ e.preventDefault(); closeSheet(); q.focus(); q.select(); }
    else if (e.key === 'Escape' && S.sheet) closeSheet();
  });

  const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting) && S.shown < S.list.length) renderMore(); }, { rootMargin:'800px 0px' });
  io.observe($('more-loader'));
  const top = new IntersectionObserver(es => $('search-zone').classList.toggle('stuck', !es[0].isIntersecting), { threshold:0 });
  top.observe($('topbar'));

  const grip = $('sheet-grip'), sheet = $('sheet');
  let y0 = null, dy = 0;
  const startDrag = e => { if (isDesk()) return; y0 = e.clientY; dy = 0; sheet.classList.add('dragging'); grip.setPointerCapture && grip.setPointerCapture(e.pointerId); };
  grip.addEventListener('pointerdown', startDrag);
  grip.addEventListener('pointermove', e => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); sheet.style.transform = 'translateY('+dy+'px)'; });
  const end = () => { if (y0 == null) return; sheet.classList.remove('dragging'); y0 = null; if (dy > 90) closeSheet(); else sheet.style.transform = ''; };
  grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);

  matchMedia('(min-width:1024px)').addEventListener('change', ev => {
    if (!ev.matches) return;
    if (S.sheet === 'detail') closeSheet();
    if (S.selected == null && S.q.trim() && S.list.length) select(S.list[0].i, false);
    else $('detail-pane').innerHTML = S.selected != null ? detailHTML(ITEMS[S.selected]) : paneEmpty();
  });
}

function extract(txt){
  const s = txt.indexOf('const DATA=');
  if (s < 0) throw new Error('no data');
  const e = txt.indexOf('\n', s);
  let line = txt.slice(s + 11, e < 0 ? undefined : e).trim();
  if (line.endsWith(';')) line = line.slice(0, -1);
  return JSON.parse(line);
}
async function fetchFree(){
  const r = await fetch('data/formulary.txt', { cache:'no-cache' });
  if (!r.ok) throw new Error('http ' + r.status);
  const data = extract(await r.text());
  try{ localStorage.setItem('ag.free.v2', JSON.stringify(data)); }catch(e){}
  return data;
}
async function loadFree(){
  let cached = null;
  try{ cached = JSON.parse(localStorage.getItem('ag.free.v2')); }catch(e){}
  if (Array.isArray(cached) && cached.length){ setTimeout(() => fetchFree().catch(() => {}), 3000); return cached; }
  return fetchFree();
}

async function init(){
  bind();
  const params = new URLSearchParams(location.search);
  S.q = params.get('q') || '';
  S.price = ['free','paid'].includes(params.get('price')) ? params.get('price') : 'all';
  S.cls = params.get('class') || null;
  S.form = params.get('form') || null;
  $('q').value = S.q;
  let free;
  try{ free = await loadFree(); }
  catch(err){
    $('results').innerHTML = '<div class="empty"><h2>Couldn’t load the list</h2><p>Check your connection and reload. The app works offline after the first successful visit.</p><div class="actions"><button class="btn primary" onclick="location.reload()">Reload</button></div></div>';
    return;
  }
  ITEMS = buildItems(free, window.AG_PAID || []);
  buildIndex();
  $('detail-pane').innerHTML = paneEmpty();
  update();
  if (isDesk() && !S.q) $('q').focus({ preventScroll:true });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
}
init();
})();
