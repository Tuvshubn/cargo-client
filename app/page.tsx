'use client';
import { useState, useEffect, useRef } from 'react';

// ============================================================
//  TRANSLATIONS
// ============================================================
const T = {
  mn: {
    nav: { about:'Бидний тухай', services:'Үйлчилгээ', reps:'Төлөөлөгчид', contact:'Холбогдох', rules:'Журам', track:'Ачаа хянах' },
    hero: { badge:'Солонгос → Монгол карго', title:'Найдвартай,\nТүргэн шуурхай\nТээвэр', sub:'Солонгосоос Монгол руу автомашин болон ачааг хамгийн богино хугацаанд хүргэнэ', cta:'Ачаа хянах', cta2:'Холбогдох →' },
    about: { title:'Бидний тухай', desc:'Манай компани Солонгосоос Монгол руу автомашин болон ачааг түргэн шуурхай, найдвартайгаар тээвэрлэж байна. Олон жилийн туршлага, мэргэшсэн баг хамт олонтойгоо хэрэглэгч бүрийн итгэлийг олж авч ажилладаг.' },
    services: { title:'Үйлчилгээний төрөл', items:[
      {icon:'📦',title:'Бөөний ачаа',desc:'Бүх төрлийн бөөний болон бизнесс ачаа'},
      {icon:'⚡',title:'Газрын экспресс',desc:'7-10 хоногийн дотор хүргэлт'},
      {icon:'🚌',title:'Газрын энгийн',desc:'20-25 хоногийн дотор хүргэлт'},
      {icon:'🛍️',title:'Онлайн захиалга',desc:'Солонгосоос онлайнаар захиалсан бараа'},
      {icon:'🚗',title:'Автомашин тээвэр',desc:'Бүх төрлийн автомашин'},
      {icon:'🏗️',title:'Том оврын ачаа',desc:'Хэт том болон хүнд ачаа'},
    ]},
    reps: { title:'Хотуудын төлөөлөгчид' },
    contact: { title:'Холбогдох', phone:'Утас', email:'Имэйл', addr:'Хаяг', hours:'Цагийн хуваарь', delivery:'Хүргэлтийн үйлчилгээ', delDesc:'Мягмар болон Бямба гарагт орой 19:00 цагаас хойш хүргэлт гарна.', fee1:'1 хайрцаг ачаа 10,000₮ (байршлаас +5,000-10,000₮)', fee2:'Овортой болон 6+ ширхэгтэй ачаа 70,000₮' },
    rules: { title:'Анхаарах зүйлс', items:[
      'Ачаанд бэлэн мөнгө, алт, үнэт эдлэл, хориотой бараа хийхийг хориглоно',
      'Химийн болон тэсэрч дэлбэрэх бодис хийхийг хориглоно',
      'Хэврэг бараа, амархан эвдрэх зүйлсийг сайн боож савлах. Зурагт болон шилэн тоног төхөөрөмжийг зориулалттын сав баглааг заавал хийх',
      'Барааны нэр төрлийг буруу мэдүүлсэн тохиолдолд хариуцлага хүлээхгүй',
      'Ачаа буусан өдрөөс хойш 7 хоногт багтаан ачаа аваагүй тохиолдолд 1 хайрцаг ачаа 1,000₮-өөр хадгалалт тооцогдоно',
      'Цаг агаарын байдал, техникийн саатал, гаалийн хяналтаас хамаарч буух хугацаа хойшлох тохиолдол гарч болзошгүй',
    ]},
    track: { title:'Ачаагаа хянах', sub:'Трекинг код эсвэл утасны дугаараар ачаагаа хянаарай', codeLabel:'Трекинг код', phoneLabel:'Монгол дугаар', btn:'Хайх', notFound:'Ачаа олдсонгүй', info:'Ачааны мэдээлэл', receiver:'Хүлээн авагч', qty:'Тоо ширхэг', type:'Төрөл', payment:'Төлбөр', remaining:'Үлдэгдэл', storage:'Хадгалалтын төлбөр', total:'Нийт', payNow:'QPay-аар төлөх', paid:'Төлсөн ✓', history:'Явцын түүх', batch:'Багц' },
    status: { incheon:'Инчеон боомт', tianjin:'Тьянжин боомт', erlian:'Эрээн', zamiin_uud:'Замын-Үүд', customs:'Гааль хийгдэж байгаа', warehouse:'Агуулахад буусан', delivering:'Хүргэлтэнд гарсан', delivered:'Хүргэгдсэн' },
  },
  ko: {
    nav: { about:'회사 소개', services:'서비스', reps:'담당자', contact:'연락처', rules:'주의사항', track:'화물 추적' },
    hero: { badge:'한국 → 몽골 카고', title:'신뢰할 수 있는\n빠른 배송\n서비스', sub:'한국에서 몽골까지 자동차와 화물을 가장 빠르게 배송합니다', cta:'화물 추적', cta2:'문의하기 →' },
    about: { title:'회사 소개', desc:'저희 회사는 한국에서 몽골로 자동차와 화물을 신속하고 안전하게 운송합니다. 다년간의 경험과 전문 팀으로 모든 고객의 신뢰를 얻고 있습니다.' },
    services: { title:'서비스 종류', items:[
      {icon:'📦',title:'도매 화물',desc:'모든 종류의 도매 및 비즈니스 화물'},
      {icon:'⚡',title:'육로 특급',desc:'7-10일 이내 배송'},
      {icon:'🚌',title:'육로 일반',desc:'20-25일 이내 배송'},
      {icon:'🛍️',title:'온라인 주문',desc:'한국에서 온라인으로 주문한 상품'},
      {icon:'🚗',title:'자동차 운송',desc:'모든 종류의 자동차'},
      {icon:'🏗️',title:'대형 화물',desc:'초대형 및 중량물'},
    ]},
    reps: { title:'지역별 담당자' },
    contact: { title:'연락처', phone:'전화', email:'이메일', addr:'주소', hours:'영업시간', delivery:'배송 서비스', delDesc:'화요일과 토요일 오후 7시 이후 배송 출발.', fee1:'박스 1개 10,000₮ (위치에 따라 +5,000-10,000₮)', fee2:'부피 큰 화물 또는 6개 이상 70,000₮' },
    rules: { title:'주의사항', items:[
      '화물에 현금, 금, 귀금속, 금지 물품 넣는 것을 금지합니다',
      '화학 물질 및 폭발물 금지',
      '깨지기 쉬운 물품은 잘 포장하고, TV 및 유리 제품은 전용 포장재 사용 필수',
      '상품명을 잘못 신고한 경우 책임지지 않습니다',
      '화물 도착 후 7일 이내 수령하지 않으면 박스당 하루 1,000₮ 보관료 부과',
      '날씨, 기술적 지연, 세관 검사로 인해 도착이 지연될 수 있습니다',
    ]},
    track: { title:'화물 추적', sub:'트래킹 코드 또는 전화번호로 화물을 추적하세요', codeLabel:'트래킹 코드', phoneLabel:'전화번호', btn:'검색', notFound:'화물을 찾을 수 없습니다', info:'화물 정보', receiver:'수취인', qty:'수량', type:'종류', payment:'결제', remaining:'잔금', storage:'보관료', total:'합계', payNow:'QPay 결제', paid:'결제 완료 ✓', history:'진행 내역', batch:'배치' },
    status: { incheon:'인천항', tianjin:'텐진항', erlian:'얼롄', zamiin_uud:'자민우드', customs:'통관 중', warehouse:'창고 도착', delivering:'배송 중', delivered:'배송 완료' },
  },
} as const;

type Lang = 'mn' | 'ko';
type StatusKey = keyof typeof T.mn.status;

const REPS = [
  { type:'mn',label:{ mn:'Төвийн жолооч', ko:'중앙 기사' }, phone:'010-7517-4549', color:'#1565C0' },
  { type:'mn',label:{ mn:'Төв оффис', ko:'본사' }, phone:'010-5963-2528', color:'#7B1FA2' },
  { region:'군산, 익산, 김제, 전주, 임실, 남원', phone:'010-5631-4041', color:'#2E7D32' },
  { region:'서울, 경기도', phone:'010-3167-6907', color:'#C62828' },
  { region:'안산, 시흥, 안양', phone:'010-7673-5156', color:'#FF6F00' },
  { region:'화성, 수원', phone:'010-8467-1420', color:'#00838F' },
  { region:'논산, 대전', phone:'010-5807-8553', color:'#558B2F' },
  { region:'천안, 논산, 아산, 평택, 안성, 순탄', phone:'010-5837-7997', color:'#4527A0' },
];

const STATUS_STEPS: StatusKey[] = ['incheon','tianjin','erlian','zamiin_uud','customs','warehouse','delivering','delivered'];
const STATUS_COLORS: Record<StatusKey, string> = {
  incheon:'#64748b', tianjin:'#3B82F6', erlian:'#8B5CF6', zamiin_uud:'#F59E0B',
  customs:'#EF4444', warehouse:'#10B981', delivering:'#0EA5E9', delivered:'#22C55E',
};
const API = process.env.NEXT_PUBLIC_API_URL || 'https://cargo-backend-qk76v7t31-tuvshusoyl-8670s-projects.vercel.app/api';

// ============================================================
//  MAIN COMPONENT
// ============================================================
export default function Home() {
  const [lang, setLang] = useState<Lang>('mn');
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [page, setPage] = useState<'home'|'track'>('home');
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved) setLang(saved);
    const dark = localStorage.getItem('dark') === '1';
    setDark(dark);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const switchLang = () => {
    const next = lang === 'mn' ? 'ko' : 'mn';
    setLang(next); localStorage.setItem('lang', next);
  };
  const switchDark = () => {
    const next = !dark; setDark(next); localStorage.setItem('dark', next ? '1' : '0');
  };
  const navTo = (id: string) => {
    setPage('home'); setMobileMenu(false);
    setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); }, 50);
  };

  const bg = dark ? '#0f172a' : '#fff';
  const text = dark ? '#f1f5f9' : '#0f172a';
  const muted = dark ? '#94a3b8' : '#64748b';
  const card = dark ? '#1e293b' : '#fff';
  const border = dark ? '#334155' : '#e2e8f0';

  const css = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Noto Sans','Noto Sans KR',sans-serif;background:${bg};color:${text};transition:background .3s,color .3s}
    .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 24px;transition:all .3s;background:${scrolled?(dark?'rgba(15,23,42,0.97)':'rgba(255,255,255,0.97)'):'transparent'};backdrop-filter:${scrolled?'blur(20px)':'none'};box-shadow:${scrolled?'0 1px 20px rgba(0,0,0,0.1)':'none'}}
    .nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;height:68px;gap:8px}
    .logo{display:flex;align-items:center;gap:10px;cursor:pointer;margin-right:24px;text-decoration:none}
    .logo-icon{width:38px;height:38px;background:#1565C0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
    .logo-text{font-weight:900;font-size:18px;color:#1565C0}
    .nav-links{display:flex;gap:2px;flex:1}
    @media(max-width:768px){.nav-links{display:none}}
    .nav-btn{padding:8px 14px;border-radius:8px;font-size:13.5px;font-weight:600;color:${text};cursor:pointer;border:none;background:transparent;font-family:inherit;transition:.15s}
    .nav-btn:hover{background:${dark?'#1e293b':'#f3f4f6'};color:#1565C0}
    .nav-right{display:flex;gap:8px;align-items:center;margin-left:auto}
    .lang-btn{padding:6px 14px;border:1.5px solid ${border};border-radius:8px;font-size:12px;font-weight:800;cursor:pointer;background:${card};color:${text};font-family:inherit;transition:.15s}
    .lang-btn:hover{border-color:#1565C0;color:#1565C0}
    .dark-btn{width:36px;height:36px;border:1.5px solid ${border};border-radius:8px;cursor:pointer;background:${card};font-size:16px;display:flex;align-items:center;justify-content:center}
    .track-nav-btn{background:#1565C0;color:#fff;padding:9px 18px;border-radius:10px;font-size:13px;font-weight:700;border:none;cursor:pointer;font-family:inherit;white-space:nowrap}
    .track-nav-btn:hover{background:#0D47A1}
    .hamburger{display:none;background:transparent;border:1.5px solid ${border};border-radius:8px;padding:6px 10px;cursor:pointer;font-size:18px;color:${text}}
    @media(max-width:768px){.hamburger{display:flex;align-items:center}}
    .mobile-menu{display:${mobileMenu?'block':'none'};position:fixed;top:68px;left:0;right:0;background:${card};border-bottom:1px solid ${border};padding:12px;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.1)}
    .mobile-link{display:block;padding:12px 16px;font-size:15px;font-weight:600;color:${text};cursor:pointer;border-radius:8px;margin-bottom:4px}
    .mobile-link:hover{background:${dark?'#334155':'#f3f4f6'}}
    section{padding:80px 24px}
    @media(max-width:600px){section{padding:60px 16px}}
    .section-inner{max-width:1200px;margin:0 auto}
    .badge{display:inline-flex;align-items:center;gap:6px;background:#EFF6FF;color:#1565C0;padding:5px 14px;border-radius:100px;font-size:12px;font-weight:700;margin-bottom:14px;letter-spacing:.04em}
    .dark .badge{background:#1e3a5f;color:#93C5FD}
    h2.section-title{font-size:clamp(1.8rem,4vw,2.4rem);font-weight:900;color:${text};margin-bottom:12px;letter-spacing:-.02em}
    .lead{color:${muted};font-size:1rem;line-height:1.7;max-width:600px}
    /* HERO */
    .hero{min-height:100vh;display:flex;align-items:center;background:linear-gradient(135deg,#0D47A1 0%,#1565C0 40%,#1976D2 70%,#42A5F5 100%);position:relative;overflow:hidden;padding:100px 24px 60px}
    .hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1}
    .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:8px 18px;color:#fff;font-size:13px;font-weight:600;margin-bottom:24px}
    .hero h1{font-size:clamp(2.2rem,6vw,4.2rem);font-weight:900;color:#fff;line-height:1.05;margin-bottom:20px;white-space:pre-line}
    .hero-sub{font-size:clamp(0.95rem,2vw,1.1rem);color:rgba(255,255,255,0.85);line-height:1.75;margin-bottom:36px;max-width:500px}
    .hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}
    .btn-white{background:#fff;color:#1565C0;padding:14px 28px;border-radius:12px;font-weight:800;font-size:15px;border:none;cursor:pointer;font-family:inherit;transition:.2s;box-shadow:0 6px 20px rgba(0,0,0,0.15)}
    .btn-white:hover{transform:translateY(-2px)}
    .btn-outline-hero{background:transparent;color:#fff;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;border:2px solid rgba(255,255,255,0.45);cursor:pointer;font-family:inherit;transition:.2s}
    .btn-outline-hero:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.8)}
    .hero-stats{display:flex;gap:clamp(20px,4vw,40px)}
    .stat-num{font-size:clamp(1.6rem,4vw,2.2rem);font-weight:900;color:#FFD700}
    .stat-lbl{font-size:11px;color:rgba(255,255,255,0.65);margin-top:3px}
    @media(max-width:480px){.hero-btns{flex-direction:column}.btn-white,.btn-outline-hero{text-align:center}}
    /* ABOUT */
    .about-section{background:linear-gradient(135deg,#1565C0,#1976D2 50%,#1E88E5);padding:80px 24px;text-align:center}
    .about-section h2{color:#fff;font-size:clamp(1.8rem,4vw,2.4rem);font-weight:900;margin-bottom:20px}
    .about-section p{color:rgba(255,255,255,0.88);font-size:1.05rem;line-height:1.85;max-width:700px;margin:0 auto}
    /* SERVICES */
    .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
    @media(max-width:900px){.services-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:500px){.services-grid{grid-template-columns:1fr}}
    .svc-card{background:${card};border-radius:18px;padding:28px;border:1px solid ${border};transition:.25s;cursor:default}
    .svc-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(0,0,0,${dark?'.25':'.08'})}
    .svc-icon{width:54px;height:54px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px}
    .svc-card h3{font-size:1rem;font-weight:800;color:${text};margin-bottom:8px}
    .svc-card p{font-size:13.5px;color:${muted};line-height:1.65}
    /* REPS */
    .reps-bg{background:${dark?'#0f172a':'#f8fafc'}}
    .reps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:48px}
    @media(max-width:900px){.reps-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:480px){.reps-grid{grid-template-columns:1fr}}
    .rep-card{background:${card};border-radius:13px;padding:16px;border:1px solid ${border};transition:.2s}
    .rep-card:hover{box-shadow:0 6px 20px rgba(0,0,0,${dark?'.3':'.07'});border-color:#BFDBFE}
    .rep-dot{width:8px;height:8px;border-radius:50%;margin-bottom:10px}
    .rep-name{font-size:13px;font-weight:700;color:${text};margin-bottom:7px;line-height:1.4}
    .rep-phone{font-size:13px;font-weight:700;color:#1565C0}
    /* CONTACT */
    .contact-bg{background:${dark?'#1e293b':'#f8fafc'}}
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px}
    @media(max-width:768px){.contact-grid{grid-template-columns:1fr}}
    .contact-card{background:${card};border-radius:20px;padding:32px;border:1px solid ${border}}
    .contact-card h3{font-size:1.05rem;font-weight:800;color:${text};margin-bottom:22px}
    .ci{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px}
    .ci-ico{width:40px;height:40px;background:${dark?'#1e3a5f':'#EFF6FF'};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
    .ci-lbl{font-size:11px;color:${muted};font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:3px}
    .ci-val{font-size:14px;font-weight:700;color:${text};line-height:1.5}
    .delivery-alert{background:${dark?'#1e3a5f':'#EFF6FF'};border:1px solid ${dark?'#2563EB':'#BFDBFE'};border-radius:13px;padding:16px;margin-bottom:14px}
    .delivery-alert p:first-child{font-size:13px;font-weight:800;color:${dark?'#93C5FD':'#1D4ED8'};margin-bottom:5px}
    .delivery-alert p{font-size:13px;color:${dark?'#60A5FA':'#3B82F6'};line-height:1.6}
    .fee-item{background:${card};border:1px solid ${border};border-radius:11px;padding:13px;margin-bottom:9px;font-size:13.5px;color:${text};line-height:1.55}
    /* RULES */
    .rules-card{background:${card};border-radius:20px;border:2px solid #FCD34D;overflow:hidden;max-width:860px;margin:48px auto 0}
    .rules-hdr{background:${dark?'rgba(251,191,36,0.15)':'#FFFBEB'};padding:16px 24px;border-bottom:1px solid #FCD34D}
    .rules-hdr span{font-size:15px;font-weight:800;color:${dark?'#FCD34D':'#92400E'}}
    .rule-row{display:flex;gap:14px;align-items:flex-start;padding:15px 24px;border-bottom:1px solid ${dark?'#1e293b':'#FEF9E7'};transition:.15s}
    .rule-row:last-child{border-bottom:none}
    .rule-row:hover{background:${dark?'rgba(251,191,36,0.05)':'#FFFDF0'}}
    .rule-icon{font-size:17px;flex-shrink:0;margin-top:2px}
    .rule-text{font-size:13.5px;color:${text};line-height:1.65}
    /* TRACK PAGE */
    .track-page{min-height:100vh;background:${dark?'#0f172a':'#f8fafc'};padding:100px 24px 80px}
    .track-inner{max-width:780px;margin:0 auto}
    .track-hero{text-align:center;margin-bottom:40px}
    .track-ico{width:72px;height:72px;background:linear-gradient(135deg,#1565C0,#1976D2);border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 20px;box-shadow:0 8px 24px rgba(21,101,192,0.3)}
    .track-hero h1{font-size:clamp(1.6rem,4vw,2rem);font-weight:900;color:${text};margin-bottom:8px}
    .track-hero p{color:${muted};font-size:15px}
    .search-card{background:${card};border-radius:20px;padding:26px;border:1px solid ${border};margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,${dark?'.2':'.04'})}
    .search-row{display:grid;grid-template-columns:1fr 1fr auto;gap:14px;align-items:flex-end}
    @media(max-width:600px){.search-row{grid-template-columns:1fr;gap:12px}}
    .field label{font-size:11px;font-weight:700;color:${muted};display:block;margin-bottom:7px;text-transform:uppercase;letter-spacing:.05em}
    .field input{width:100%;padding:13px 16px;border:2px solid ${border};border-radius:12px;font-size:14px;font-family:inherit;outline:none;background:${card};color:${text};transition:.2s}
    .field input:focus{border-color:#1565C0;box-shadow:0 0 0 4px rgba(21,101,192,0.1)}
    .search-btn{background:#1565C0;color:#fff;padding:13px 24px;border-radius:12px;font-weight:800;font-size:14px;border:none;cursor:pointer;font-family:inherit;white-space:nowrap;transition:.2s;width:100%}
    .search-btn:hover{background:#0D47A1}
    .result-card{background:${card};border-radius:20px;padding:28px;border:2px solid ${border};box-shadow:0 4px 16px rgba(0,0,0,${dark?'.2':'.05'})}
    .rc-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:24px}
    .rc-code{font-size:1.2rem;font-weight:900;color:${text};font-family:monospace}
    .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
    .chip{padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700}
    .pay-btn{background:#DC2626;color:#fff;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:800;border:none;cursor:pointer;font-family:inherit;box-shadow:0 4px 12px rgba(220,38,38,0.3)}
    .paid-chip{background:#F0FDF4;color:#16A34A;padding:8px 16px;border-radius:12px;font-size:13px;font-weight:800}
    /* STEPPER */
    .stepper-wrap{background:${dark?'#1e293b':'#f8fafc'};border-radius:14px;padding:18px;margin-bottom:24px;overflow-x:auto}
    .stepper-row{display:flex;align-items:center;min-width:660px}
    .step{display:flex;flex-direction:column;align-items:center;gap:5px;flex:1}
    .step-c{width:30px;height:30px;border-radius:50%;border:2.5px solid ${border};background:${card};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${muted};flex-shrink:0}
    .step.done .step-c{background:#1565C0;border-color:#1565C0;color:#fff}
    .step.active .step-c{background:#FF6F00;border-color:#FF6F00;color:#fff;box-shadow:0 0 0 6px rgba(255,111,0,0.15)}
    .step-line{flex:1;height:3px;background:${border}}
    .step.done+.step-line{background:#1565C0}
    .step-lbl{font-size:9px;color:${muted};font-weight:600;text-align:center;white-space:nowrap}
    .step.done .step-lbl,.step.active .step-lbl{color:#1565C0;font-weight:700}
    /* DETAIL GRID */
    .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
    @media(max-width:600px){.detail-grid{grid-template-columns:1fr}}
    .detail-box h4{font-size:11px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
    .dr{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid ${border}}
    .dr:last-child{border-bottom:none}
    .dk{font-size:13px;color:${muted}}
    .dv{font-size:13px;font-weight:700;color:${text}}
    .pay-box{background:${dark?'#0f172a':'#f8fafc'};border-radius:13px;padding:16px}
    .pr{display:flex;justify-content:space-between;margin-bottom:10px}
    .pk{font-size:13px;color:${muted}}
    .pv{font-size:13px;font-weight:700}
    .pr-total{display:flex;justify-content:space-between;padding-top:11px;border-top:2px solid ${border};margin-top:4px}
    .pr-total span{font-weight:900;font-size:15px}
    .storage-warn{background:${dark?'rgba(251,191,36,0.1)':'#FFFBEB'};border:1px solid #FCD34D;border-radius:12px;padding:13px;font-size:12.5px;color:${dark?'#FCD34D':'#92400E'};margin-top:11px;line-height:1.6}
    /* HISTORY */
    .hist-section{margin-top:22px;padding-top:22px;border-top:2px solid ${border}}
    .hist-section h4{font-size:11px;font-weight:700;color:${muted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:13px}
    .hist-row{display:flex;align-items:center;gap:9px;margin-bottom:9px;flex-wrap:wrap}
    .hc{padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700}
    .ht{font-size:12px;color:${muted}}
    /* QPAY MODAL */
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:2000;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
    .modal-overlay.open{display:flex}
    .modal{background:${card};border-radius:22px;padding:36px;max-width:380px;width:100%;text-align:center;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.3)}
    .modal h3{font-size:1.2rem;font-weight:800;color:${text};margin-bottom:8px}
    .modal p{color:${muted};font-size:13px;margin-bottom:20px}
    .qr-box{background:${dark?'#0f172a':'#f8fafc'};border-radius:14px;padding:20px;margin-bottom:20px}
    .qr-placeholder{width:160px;height:160px;background:linear-gradient(135deg,#1565C0,#1976D2);border-radius:12px;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:48px}
    .modal-close{position:absolute;top:14px;right:14px;background:${dark?'#334155':'#f1f5f9'};border:none;border-radius:8px;width:32px;height:32px;cursor:pointer;font-size:16px;color:${muted}}
    .modal-amount{font-size:2rem;font-weight:900;color:#DC2626;margin-bottom:16px}
    .modal-btn{width:100%;background:#1565C0;color:#fff;padding:14px;border-radius:12px;font-size:15px;font-weight:800;border:none;cursor:pointer;font-family:inherit;margin-bottom:10px}
    .modal-btn2{width:100%;background:${dark?'#1e293b':'#f8fafc'};color:${text};padding:12px;border-radius:12px;font-size:14px;font-weight:600;border:1px solid ${border};cursor:pointer;font-family:inherit}
    footer{background:#0D47A1;padding:28px 24px;text-align:center}
    footer p{color:rgba(255,255,255,0.65);font-size:13px}
    footer a{color:rgba(255,255,255,0.85);text-decoration:none;font-weight:600}
    @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .fade-in{animation:fadeIn .4s ease forwards}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }}/>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo" onClick={() => navTo('hero')}>
            <div className="logo-icon">🚛</div>
            <span className="logo-text">МонтоТрейд</span>
          </div>
          <div className="nav-links">
            {['about','services','reps','contact','rules'].map(id => (
              <button key={id} className="nav-btn" onClick={() => navTo(id)}>{t.nav[id as keyof typeof t.nav]}</button>
            ))}
          </div>
          <div className="nav-right">
            <button className="lang-btn" onClick={switchLang}>{lang === 'mn' ? '한' : 'МН'}</button>
            <button className="dark-btn" onClick={switchDark}>{dark ? '☀️' : '🌙'}</button>
            <button className="track-nav-btn" onClick={() => setPage('track')}>{t.nav.track}</button>
            <button className="hamburger" onClick={() => setMobileMenu(m => !m)}>☰</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className="mobile-menu">
        {['about','services','reps','contact','rules'].map(id => (
          <div key={id} className="mobile-link" onClick={() => navTo(id)}>{t.nav[id as keyof typeof t.nav]}</div>
        ))}
        <div className="mobile-link" onClick={() => { setPage('track'); setMobileMenu(false); }} style={{ color:'#1565C0', fontWeight:800 }}>{t.nav.track}</div>
      </div>

      {/* ============ HOME PAGE ============ */}
      {page === 'home' && (
        <main>
          {/* HERO */}
          <section className="hero" id="hero">
            <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")` }}/>
            <div style={{ position:'absolute', top:-80, right:-80, width:'min(600px,80vw)', height:'min(600px,80vw)', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)' }}/>
            <div className="hero-inner">
              <div className="hero-badge"><span>🚛</span> {t.hero.badge}</div>
              <h1 className="hero" style={{ color:'#fff', fontSize:'clamp(2.2rem,6vw,4.2rem)', fontWeight:900, lineHeight:1.05, marginBottom:20, whiteSpace:'pre-line' }}>{t.hero.title}</h1>
              <p className="hero-sub">{t.hero.sub}</p>
              <div className="hero-btns">
                <button className="btn-white" onClick={() => setPage('track')}>📦 {t.hero.cta}</button>
                <button className="btn-outline-hero" onClick={() => navTo('contact')}>{t.hero.cta2}</button>
              </div>
              <div className="hero-stats">
                {[{v:'7-10',l:lang==='mn'?'Хоног (экспресс)':'일 (특급)'},{v:'100%',l:lang==='mn'?'Найдвартай':'안전'},{v:'24/7',l:lang==='mn'?'Хяналт':'추적'}].map(s=>(
                  <div key={s.v}><div className="stat-num">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="about-section" id="about">
            <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4vw,2.4rem)', fontWeight:900, marginBottom:20 }}>{t.about.title}</h2>
            <p style={{ color:'rgba(255,255,255,0.88)', fontSize:'1.05rem', lineHeight:1.85, maxWidth:700, margin:'0 auto' }}>{t.about.desc}</p>
          </section>

          {/* SERVICES */}
          <section id="services" style={{ background:dark?'#0f172a':'#f8fafc' }}>
            <div className="section-inner">
              <div className="badge">{'SERVICES'}</div>
              <h2 className="section-title">{t.services.title}</h2>
              <div className="services-grid">
                {t.services.items.map((s, i) => (
                  <div key={i} className="svc-card">
                    <div className="svc-icon" style={{ background:['#EFF6FF','#FFFBEB','#F0FDF4','#F5F3FF','#FEF2F2','#ECFEFF'][i] }}>{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REPS */}
          <section id="reps">
            <div className="section-inner">
              <div className="badge">REPRESENTATIVES</div>
              <h2 className="section-title">{t.reps.title}</h2>
              <div className="reps-grid">
                {REPS.map((r, i) => (
                  <div key={i} className="rep-card">
                    <div className="rep-dot" style={{ background:r.color }}/>
                    <div className="rep-name">{'label' in r ? r.label[lang] : r.region}</div>
                    <div className="rep-phone">📞 {r.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="contact-bg">
            <div className="section-inner">
              <div className="badge">CONTACT</div>
              <h2 className="section-title">{t.contact.title}</h2>
              <div className="contact-grid">
                <div className="contact-card">
                  <h3>📞 {t.contact.title}</h3>
                  <div className="ci"><div className="ci-ico">📞</div><div><div className="ci-lbl">{t.contact.phone}</div><div className="ci-val">7500-5747 / 8000-0341</div></div></div>
                  <div className="ci"><div className="ci-ico">📧</div><div><div className="ci-lbl">{t.contact.email}</div><div className="ci-val">montotrade@gmail.com</div></div></div>
                  <div className="ci"><div className="ci-ico">📍</div><div><div className="ci-lbl">{t.contact.addr}</div><div className="ci-val">БГД 6-р хороо Блэйк хорс</div></div></div>
                  <div className="ci"><div className="ci-ico">🕐</div><div><div className="ci-lbl">{t.contact.hours}</div><div className="ci-val" style={{ whiteSpace:'pre-line' }}>{lang==='mn'?'Мягмар-Бямба 09:00-18:00\nНям 11:00-16:00\nДаваа гарагт амрана':'화-토 09:00-18:00\n일 11:00-16:00\n월요일 휴무'}</div></div></div>
                </div>
                <div className="contact-card">
                  <h3>🚚 {t.contact.delivery}</h3>
                  <div className="delivery-alert"><p>📅 {lang==='mn'?'Хүргэлтийн хуваарь':'배송 일정'}</p><p>{t.contact.delDesc}</p></div>
                  <div className="fee-item">📦 {t.contact.fee1}</div>
                  <div className="fee-item">📦 {t.contact.fee2}</div>
                </div>
              </div>
            </div>
          </section>

          {/* RULES */}
          <section id="rules">
            <div className="section-inner" style={{ textAlign:'center' }}>
              <div className="badge" style={{ background:dark?'rgba(251,191,36,0.15)':'#FFFBEB', color:'#D97706' }}>⚠️ {lang==='mn'?'АНХААРАЛ':'주의사항'}</div>
              <h2 className="section-title">{t.rules.title}</h2>
            </div>
            <div className="rules-card">
              <div className="rules-hdr"><span>⚠️ {lang==='mn'?'Дараах зүйлсийг анхаарна уу':'다음 사항을 주의하세요'}</span></div>
              {t.rules.items.map((item, i) => (
                <div key={i} className="rule-row">
                  <div className="rule-icon">{i < 2 ? '🚫' : i === 2 ? '📺' : i === 3 ? '📝' : i === 4 ? '🕐' : '🌦️'}</div>
                  <div className="rule-text">{item}</div>
                </div>
              ))}
            </div>
          </section>

          <footer>
            <p>© 2024 МонтоТрейд · <a href="mailto:montotrade@gmail.com">montotrade@gmail.com</a> · 7500-5747</p>
          </footer>
        </main>
      )}

      {/* ============ TRACK PAGE ============ */}
      {page === 'track' && <TrackPage t={t} lang={lang} dark={dark} card={card} border={border} muted={muted} textColor={text} onBack={() => navTo('hero')}/>}
    </>
  );
}

// ============================================================
//  TRACK PAGE COMPONENT
// ============================================================
function TrackPage({ t, lang, dark, card, border, muted, textColor, onBack }: {
  t: typeof T.mn; lang: Lang; dark: boolean; card: string; border: string; muted: string; textColor: string; onBack: () => void;
}) {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{parcels: ParcelType[], history: HistoryItem[]} | null>(null);
  const [error, setError] = useState('');
  const [qpayModal, setQpayModal] = useState<{amount: number} | null>(null);

  type ParcelType = {
    id: string; tracking_code: string; mn_name: string; mn_phone: string;
    cargo_type: string; quantity: number; status: StatusKey;
    paid_in_korea: number; total_fee: number; remaining_fee: number;
    is_paid: boolean; arrived_at?: string; batch_code?: string; current_storage_fee?: number;
  };
  type HistoryItem = { parcel_id: string; status: StatusKey; note?: string; created_at: string };

  const search = async () => {
    if (!code && !phone) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const params = new URLSearchParams();
      if (code) params.set('code', code);
      if (phone) params.set('phone', phone);
      const res = await fetch(`${API}/parcels/track?${params}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      setResult(data);
    } catch {
      setError(t.track.notFound);
    } finally { setLoading(false); }
  };

  const DEMO: {parcels: ParcelType[], history: HistoryItem[]} = {
    parcels: [{ id:'1', tracking_code:'MN240501AB12', mn_name:'Батболд Д.', mn_phone:'9911-2233', cargo_type:'express', quantity:3, status:'warehouse', paid_in_korea:50000, total_fee:130000, remaining_fee:80000, is_paid:false, arrived_at:new Date(Date.now()-10*86400000).toISOString(), batch_code:'BCH240501XYZ', current_storage_fee:3000 }],
    history: [
      { parcel_id:'1', status:'incheon', note:'Падан бүртгэгдлээ', created_at:new Date(Date.now()-15*86400000).toISOString() },
      { parcel_id:'1', status:'tianjin', created_at:new Date(Date.now()-12*86400000).toISOString() },
      { parcel_id:'1', status:'erlian', created_at:new Date(Date.now()-9*86400000).toISOString() },
      { parcel_id:'1', status:'zamiin_uud', created_at:new Date(Date.now()-7*86400000).toISOString() },
      { parcel_id:'1', status:'customs', created_at:new Date(Date.now()-5*86400000).toISOString() },
      { parcel_id:'1', status:'warehouse', note:'Монголд ирлээ', created_at:new Date(Date.now()-10*86400000).toISOString() },
    ]
  };

  const displayResult = result || (code === 'DEMO' || phone === '99000000' ? DEMO : null);

  return (
    <div className="track-page fade-in">
      <div className="track-inner">
        <div style={{ marginBottom:24 }}>
          <button onClick={onBack} style={{ background:'transparent', border:`1.5px solid ${border}`, borderRadius:10, padding:'8px 16px', cursor:'pointer', color:muted, fontSize:14, fontFamily:'inherit', fontWeight:600 }}>← {t.nav.about.includes('Бид') ? 'Нүүр хуудас' : 'ホーム'}</button>
        </div>
        <div className="track-hero">
          <div className="track-ico">📦</div>
          <h1>{t.track.title}</h1>
          <p>{t.track.sub}</p>
        </div>
        <div className="search-card">
          <div className="search-row">
            <div className="field">
              <label>{t.track.codeLabel}</label>
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="MN240101XXXX (DEMO)" onKeyDown={e => e.key === 'Enter' && search()}/>
            </div>
            <div className="field">
              <label>{t.track.phoneLabel}</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="99000000 (DEMO)" onKeyDown={e => e.key === 'Enter' && search()}/>
            </div>
            <button className="search-btn" onClick={search} disabled={loading}>{loading ? '...' : t.track.btn}</button>
          </div>
          <p style={{ fontSize:12, color:muted, marginTop:10 }}>💡 Demo: code = <b>DEMO</b> эсвэл phone = <b>99000000</b></p>
        </div>
        {error && <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:12, padding:14, color:'#DC2626', fontWeight:600, marginBottom:16 }}>{error}</div>}
        {displayResult?.parcels.map((parcel) => {
          const stepIdx = STATUS_STEPS.indexOf(parcel.status);
          const storageFee = parcel.current_storage_fee || 0;
          const totalDue = (parcel.remaining_fee || 0) + storageFee;
          const history = displayResult.history.filter(h => h.parcel_id === parcel.id);
          return (
            <div key={parcel.id} className="result-card fade-in" style={{ marginBottom:20, borderColor: parcel.is_paid ? '#22C55E' : border }}>
              <div className="rc-head">
                <div>
                  <div className="rc-code">{parcel.tracking_code}</div>
                  <div className="chips">
                    <span className="chip" style={{ background:STATUS_COLORS[parcel.status]+'22', color:STATUS_COLORS[parcel.status] }}>{t.status[parcel.status]}</span>
                    <span className="chip" style={{ background:'#EFF6FF', color:'#1565C0' }}>{parcel.cargo_type}</span>
                  </div>
                </div>
                {parcel.is_paid
                  ? <span className="paid-chip">{t.track.paid}</span>
                  : totalDue > 0 && <button className="pay-btn" onClick={() => setQpayModal({ amount: totalDue })}>💳 {t.track.payNow}</button>
                }
              </div>

              {/* STEPPER */}
              <div className="stepper-wrap">
                <div className="stepper-row">
                  {STATUS_STEPS.map((s, i) => (
                    <>
                      <div key={s} className={`step ${i < stepIdx ? 'done' : i === stepIdx ? 'active' : ''}`}>
                        <div className="step-c">{i < stepIdx ? '✓' : i + 1}</div>
                        <div className="step-lbl">{t.status[s]}</div>
                      </div>
                      {i < STATUS_STEPS.length - 1 && <div key={s+'line'} className={`step-line ${i < stepIdx ? 'done' : ''}`} style={{ background: i < stepIdx ? '#1565C0' : border }}/>}
                    </>
                  ))}
                </div>
              </div>

              <div className="detail-grid">
                <div>
                  <div className="detail-box">
                    <h4>{t.track.info}</h4>
                    <div className="dr"><span className="dk">{t.track.receiver}</span><span className="dv">{parcel.mn_name}</span></div>
                    <div className="dr"><span className="dk">{t.track.phoneLabel}</span><span className="dv">{parcel.mn_phone}</span></div>
                    <div className="dr"><span className="dk">{t.track.qty}</span><span className="dv">{parcel.quantity} ширхэг</span></div>
                    <div className="dr"><span className="dk">{t.track.type}</span><span className="dv">{parcel.cargo_type}</span></div>
                    {parcel.batch_code && <div className="dr"><span className="dk">{t.track.batch}</span><span className="dv" style={{ color:'#1565C0' }}>{parcel.batch_code}</span></div>}
                  </div>
                </div>
                <div>
                  <div className="detail-box">
                    <h4>{t.track.payment}</h4>
                    <div className="pay-box">
                      <div className="pr"><span className="pk">Солонгосд төлсөн</span><span className="pv">{(parcel.paid_in_korea||0).toLocaleString()}₮</span></div>
                      <div className="pr"><span className="pk">{t.track.remaining}</span><span className="pv" style={{ color:'#DC2626' }}>{(parcel.remaining_fee||0).toLocaleString()}₮</span></div>
                      {storageFee > 0 && <div className="pr"><span className="pk">{t.track.storage}</span><span className="pv" style={{ color:'#D97706' }}>{storageFee.toLocaleString()}₮</span></div>}
                      {storageFee > 0 && (
                        <div className="pr-total">
                          <span>{t.track.total}</span>
                          <span style={{ color:'#DC2626' }}>{totalDue.toLocaleString()}₮</span>
                        </div>
                      )}
                    </div>
                    {storageFee > 0 && <div className="storage-warn">⚠️ {lang === 'mn' ? `Агуулахын хадгалалтын төлбөр нэмэгдэж байна!` : `보관료가 발생하고 있습니다!`}</div>}
                  </div>
                </div>
              </div>

              {history.length > 0 && (
                <div className="hist-section">
                  <h4>{t.track.history}</h4>
                  {history.map((h, i) => (
                    <div key={i} className="hist-row">
                      <span className="hc" style={{ background:STATUS_COLORS[h.status]+'22', color:STATUS_COLORS[h.status] }}>{t.status[h.status]}</span>
                      <span className="ht">{new Date(h.created_at).toLocaleString('mn-MN')}</span>
                      {h.note && <span className="ht">· {h.note}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* QPAY MODAL */}
      <div className={`modal-overlay${qpayModal ? ' open' : ''}`} onClick={() => setQpayModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setQpayModal(null)}>✕</button>
          <div style={{ fontSize:36, marginBottom:12 }}>📱</div>
          <h3>QPay төлбөр</h3>
          <p>QPay апп-аар QR кодыг скан хийж төлнэ үү</p>
          <div className="qr-box"><div className="qr-placeholder">QR</div></div>
          <div className="modal-amount">{qpayModal?.amount.toLocaleString()}₮</div>
          <button className="modal-btn">QPay апп нээх</button>
          <button className="modal-btn2" onClick={() => setQpayModal(null)}>Хаах</button>
        </div>
      </div>
    </div>
  );
}

