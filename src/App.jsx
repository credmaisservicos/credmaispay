import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  Eye,
  EyeOff,
  Fingerprint,
  HeartHandshake,
  Landmark,
  LockKeyhole,
  Menu,
  MessageCircle,
  MousePointer2,
  PiggyBank,
  QrCode,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pageMeta = {
  "/": ["CredMaisPay — Pix e microcrédito para você", "Abra sua conta CredMaisPay e encontre Pix e possibilidades de microcrédito para o seu momento."],
  "/conta": ["Conta digital | CredMaisPay", "Organize, pague e acompanhe sua vida financeira em uma experiência simples."],
  "/cartao": ["Empréstimos e microcrédito | CredMaisPay", "Crédito para quem trabalha e empreende: CLT, CPF, CNPJ e trabalhadores de aplicativo."],
  "/emprestimos": ["Empréstimos e microcrédito | CredMaisPay", "Crédito para quem trabalha e empreende: CLT, CPF, CNPJ e trabalhadores de aplicativo."],
  "/abrir-conta": ["Abra sua conta | CredMaisPay", "Conheça a conta CredMaisPay para pessoa física e veja como começar sua jornada digital."],
  "/empresas": ["Conta CredMaisPay para pessoa física", "Conheça a conta CredMaisPay para pessoas físicas e veja como começar sua jornada digital."],
  "/seguranca": ["Segurança | CredMaisPay", "Tecnologia e informação clara para ajudar a proteger sua rotina financeira."],
  "/ajuda": ["Ajuda e atendimento | CredMaisPay", "Encontre respostas e canais de atendimento CredMaisPay."],
  "/login": ["Acessar conta | CredMaisPay", "Acesse com segurança a experiência digital CredMaisPay."],
};

const canonicalPath = {
  "/cartao": "/emprestimos",
};

const imageDimensions = {
  "campaign-flow-receber.png": [1254, 1254],
  "campaign-flow-planejar.png": [2172, 724],
  "campaign-business-story.png": [1024, 1536],
  "conta-pagamento.png": [1448, 1086],
  "microcredit-understand-banner-v2.png": [1448, 1086],
  "produto-celular.png": [1024, 1536],
  "produto-tablet.png": [1122, 1402],
  "produto-notebook.png": [1536, 1024],
};

function getImageDimensions(src, fallback = [1672, 941]) {
  const filename = src.split("/").pop().split("?")[0];
  return imageDimensions[filename] || fallback;
}

const solutions = [
  { icon: Smartphone, number: "01", label: "Conta", title: "Uma conta para a vida real.", text: "Movimente, acompanhe e organize seu dinheiro em uma experiência direta.", color: "blue", href: "/conta" },
  { icon: Banknote, number: "02", label: "Microcrédito", title: "Crédito para seguir em frente.", text: "Possibilidades de empréstimo para quem trabalha, empreende e precisa de fôlego.", color: "gold", href: "/emprestimos" },
  { icon: PiggyBank, number: "03", label: "Crédito", title: "Planos que podem sair do papel.", text: "Conheça possibilidades de crédito apresentadas com clareza para o seu momento.", color: "coral", href: "/abrir-conta" },
  { icon: ShieldCheck, number: "04", label: "Segurança", title: "Proteção sem complicação.", text: "Camadas de segurança, alertas e autonomia para cada movimento.", color: "mint", href: "/seguranca" },
];

const homeFaqs = [
  ["O que é a CredMaisPay?", "A CredMaisPay reúne soluções financeiras digitais para pessoas físicas. A disponibilidade de cada produto será apresentada no momento da contratação."],
  ["Como acompanho minha movimentação?", "A proposta é concentrar saldo, pagamentos, Pix e notificações em uma única experiência digital."],
  ["Quais recursos estarão disponíveis?", "Conta, Pix, pagamentos e possibilidades de microcrédito fazem parte da experiência apresentada. Condições e elegibilidade variam por produto."],
  ["Como falar com a equipe?", "Use a página de ajuda para registrar seu interesse ou encontrar o canal adequado."],
];

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
    const resetScroll = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    const [title, description] = pageMeta[location.pathname] || pageMeta["/"];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    const canonical = `https://credmaispay.com${canonicalPath[location.pathname] || (location.pathname === "/" ? "" : location.pathname)}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", location.pathname === "/login" ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    return () => window.cancelAnimationFrame(resetScroll);
  }, [location.pathname]);

  return (
    <div className={`site-shell ${isLogin ? "auth-shell" : ""}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true" />
      {isLogin ? null : <Header />}
      <AnimatePresence mode="wait">
        <motion.main id="conteudo"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/conta" element={<AccountPage />} />
            <Route path="/cartao" element={<LoanPage />} />
            <Route path="/emprestimos" element={<LoanPage />} />
            <Route path="/abrir-conta" element={<AccountOpeningPage />} />
            <Route path="/empresas" element={<AccountOpeningPage />} />
            <Route path="/seguranca" element={<SecurityPage />} />
            <Route path="/ajuda" element={<HelpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {isLogin ? null : <Footer />}
      <CookieConsent />
    </div>
  );
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("credmaispay-cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  const save = (value) => {
    window.localStorage.setItem("credmaispay-cookie-consent", JSON.stringify({ necessary: true, analytics, marketing, choice: value, updatedAt: new Date().toISOString() }));
    setVisible(false);
  };

  return <AnimatePresence>
    {visible ? <motion.aside className="cookie-consent" role="dialog" aria-label="Preferências de cookies" aria-describedby="cookie-consent-text" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 35 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
      <div className="cookie-consent-mark" aria-hidden="true"><ShieldCheck /></div>
      <div className="cookie-consent-body">
        <p className="cookie-consent-label">PRIVACIDADE E LGPD</p>
        <h2>Você escolhe como seus dados são usados.</h2>
        <p id="cookie-consent-text">Usamos cookies necessários para o site funcionar. Com sua autorização, podemos usar cookies opcionais para entender a navegação e melhorar sua experiência. Você pode alterar sua escolha a qualquer momento.</p>
        {preferences ? <div className="cookie-preferences">
          <label><input type="checkbox" checked readOnly /> <span><b>Necessários</b><small>Essenciais para segurança, navegação e funcionamento do site.</small></span></label>
          <label><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /> <span><b>Analíticos</b><small>Ajudam a entender o uso do site, sem finalidade de publicidade.</small></span></label>
          <label><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /> <span><b>Marketing</b><small>Permitem personalizar comunicações, quando disponíveis.</small></span></label>
        </div> : null}
        <Link className="cookie-policy-link" to="/ajuda#legal">Consultar política de privacidade</Link>
      </div>
      <div className="cookie-consent-actions">
        {preferences ? <button className="button button-dark" type="button" onClick={() => save("preferences")}>Salvar preferências <ArrowRight size={16} /></button> : <button className="button button-dark" type="button" onClick={() => save("accepted")}>Aceitar todos <ArrowRight size={16} /></button>}
        <button className="cookie-secondary" type="button" onClick={() => preferences ? save("necessary") : save("necessary")}>{preferences ? "Usar somente necessários" : "Recusar opcionais"}</button>
        {!preferences ? <button className="cookie-secondary" type="button" onClick={() => setPreferences(true)}>Configurar preferências</button> : null}
      </div>
    </motion.aside> : null}
  </AnimatePresence>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="CredMaisPay, início" translate="no">
        <img src="/brand/credmaispay-symbol.svg" alt="" width="96" height="96" />
        <span>CRED<span>MAIS</span><b>PAY</b></span>
      </Link>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        <NavLink to="/conta">Conta</NavLink>
        <NavLink to="/emprestimos">Empréstimos</NavLink>
        <NavLink to="/abrir-conta">Abra sua conta</NavLink>
        <NavLink to="/seguranca">Segurança</NavLink>
        <NavLink to="/ajuda">Ajuda</NavLink>
        <NavLink className="mobile-access-link" to="/login">Acessar conta</NavLink>
      </nav>
      <div className="header-actions">
        <Link className="text-link desktop-only" to="/login">Acessar</Link>
        <MagneticLink className="button button-small" to="/abrir-conta">Começar agora <ArrowRight size={16} /></MagneticLink>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function MagneticLink({ to, className, children }) {
  const ref = useRef(null);
  const onMove = (event) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    gsap.to(ref.current, { x: (event.clientX - rect.left - rect.width / 2) * 0.12, y: (event.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.25, overwrite: true });
  };
  const reset = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
  return <Link ref={ref} to={to} className={className} onMouseMove={onMove} onMouseLeave={reset}>{children}</Link>;
}

function HomePage() {
  const scope = useRef(null);
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.from(".hero-kicker, .hero-title .line, .hero-copy, .hero-actions, .hero-proof", { opacity: 0, y: 38, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.15 });
    gsap.from(".hero-visual", { opacity: 0, scale: 1.06, duration: 1.2, ease: "power3.out" });
    gsap.to(".hero-visual img", { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.25 } });
  }, { scope });

  return (
    <div ref={scope}>
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow hero-kicker"><span /> SUA CONTA. SUAS ESCOLHAS.</p>
          <h1 className="hero-title"><span className="line">Mais crédito.</span><span className="line accent-text">Mais oportunidades.</span><span className="line">Para avançar.</span></h1>
          <p className="hero-copy">Crédito para quem trabalha e empreende, com Pix e uma jornada clara para abrir sua conta.</p>
          <div className="hero-actions">
            <MagneticLink to="/login" className="button button-light">Abra sua conta <ArrowRight size={18} /></MagneticLink>
            <Link to="/conta" className="inline-link">Conhecer a conta <ArrowRight size={16} /></Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><span>+</span><span>R$</span><span>✓</span></div>
            <p><strong>Feito para acompanhar</strong><br />a sua rotina e os seus planos.</p>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/campaign-hero-v3.png" alt="Cliente usando o celular em campanha CredMaisPay" width="1672" height="940" fetchpriority="high" />
          <div className="float-card balance-card"><span>Saldo disponível</span><strong>R$ 8.420,70</strong><small><TrendingUp size={14} /> organização em dia</small></div>
          <div className="float-card pix-card"><QrCode /><span>Pix enviado</span><b>na hora</b></div>
          <div className="hero-stamp"><Sparkles /> MAIS SIMPLES<br />MAIS PERTO</div>
        </div>
        <div className="hero-index">01 — 06</div>
      </section>

      <Ticker />

      <CreditManifesto />

      <section className="section solutions" id="solucoes">
        <SectionHeading kicker="UM ECOSSISTEMA" title={<>Tudo conversa.<br /><em>Você ganha tempo.</em></>} text="Soluções conectadas para diferentes momentos da sua vida financeira." />
        <div className="solution-grid">
          {solutions.map((item, index) => <SolutionCard key={item.title} item={item} index={index} />)}
        </div>
      </section>

      <section className="section account-story">
        <Reveal className="account-image-wrap">
          <img src="/images/conta-pagamento.png" alt="Cliente realizando pagamento por aproximação em uma cafeteria" width="1448" height="1086" loading="lazy" />
          <div className="image-badge"><Zap /> rápido no gesto,<br /><strong>claro na tela.</strong></div>
        </Reveal>
        <Reveal className="account-copy" delay={0.12}>
          <p className="eyebrow dark"><span /> CONTA DIGITAL</p>
          <h2>Menos caminho entre você e o que importa.</h2>
          <p>Uma rotina financeira com menos ruído: acompanhe entradas e saídas, organize compromissos e faça pagamentos em poucos passos.</p>
          <ul className="feature-list">
            <li><ScanLine /> Pix e pagamentos com jornada objetiva</li>
            <li><BellRing /> Alertas para você acompanhar cada movimento</li>
            <li><ReceiptText /> Histórico organizado e fácil de consultar</li>
          </ul>
          <Link className="button button-dark" to="/conta">Explorar a conta <ArrowRight size={18} /></Link>
        </Reveal>
      </section>

      <MoneyFlow />

      <section className="section credit-showcase">
        <div className="credit-showcase-copy">
          <Reveal><p className="eyebrow light"><span /> MICROCRÉDITO CREDMAISPAY</p><h2>Mais crédito.<br /><em>Mais oportunidade.</em></h2></Reveal>
          <Reveal delay={0.1}><p>Para quem trabalha, empreende ou precisa reorganizar um plano. Consulte possibilidades para CPF, CNPJ e trabalhadores de aplicativo.</p></Reveal>
          <Reveal delay={0.16}><Link className="button button-gold" to="/emprestimos">Conhecer o microcrédito <ArrowRight size={18} /></Link></Reveal>
        </div>
        <Reveal className="credit-showcase-product" delay={0.12}><img src="/images/personal-credit-mockup-v1.png" alt="Aplicativo CredMaisPay exibindo uma simulação de microcrédito" width="1024" height="1536" loading="lazy" /></Reveal>
        <div className="credit-showcase-perks"><span><BriefcaseBusiness /> CLT e autônomos</span><span><Store /> CPF e CNPJ</span><span><Banknote /> Microcrédito</span></div>
      </section>

      <section className="section business-block">
        <Reveal className="business-copy">
          <p className="eyebrow dark"><span /> ABERTURA DE CONTA</p>
          <h2>Comece pelo celular. Continue no seu ritmo.</h2>
          <p>Uma jornada simples para conhecer a conta, enviar seus dados e acompanhar cada etapa com clareza.</p>
          <div className="business-stats">
            <div><strong>01</strong><span>Conheça</span></div><div><strong>02</strong><span>Cadastre-se</span></div><div><strong>03</strong><span>Use</span></div>
          </div>
          <Link className="inline-link dark-link" to="/abrir-conta">Ver como abrir a conta <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal className="business-image" delay={0.1}>
          <img src="/images/login-credmaispay.png" alt="Cliente começando sua jornada CredMaisPay pelo celular" width="1122" height="1402" loading="lazy" />
          <div className="sales-card"><small>Jornada digital</small><strong>3 passos</strong><div className="mini-chart"><i /><i /><i /><i /><i /></div></div>
        </Reveal>
      </section>

      <section className="section security-story">
        <Reveal className="security-photo"><img src="/images/seguranca-familia.png" alt="Mãe e filha consultando juntas uma notificação financeira" width="1672" height="941" loading="lazy" /></Reveal>
        <div className="security-panel">
          <Reveal><p className="eyebrow light"><span /> SEGURANÇA É CONVERSA CLARA</p><h2>Você entende.<br />Você decide.<br /><em>Você controla.</em></h2></Reveal>
          <Reveal delay={0.1}><p>Alertas, autenticação e informações diretas para ajudar você a reconhecer cada ação.</p></Reveal>
          <div className="security-chips"><span><LockKeyhole /> acesso protegido</span><span><BellRing /> alertas em tempo real</span><span><ShieldCheck /> camadas de segurança</span></div>
          <Link className="button button-light" to="/seguranca">Entender a segurança <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="section app-preview">
        <Reveal className="app-copy"><p className="eyebrow dark"><span /> TUDO NO MESMO LUGAR</p><h2>Abra o app.<br /><em>Veja sua vida financeira.</em></h2><p>Uma tela inicial que mostra o essencial e deixa o próximo passo sempre ao alcance.</p><Link to="/conta" className="button button-dark">Descobrir recursos <ArrowRight size={18} /></Link></Reveal>
        <Reveal className="app-device-product" delay={0.1}><img src="/images/produto-tablet.png" alt="Tablet exibindo a visão financeira CredMaisPay" width="1122" height="1402" loading="lazy" /></Reveal>
        <div className="app-orbit orbit-one">Pix</div><div className="app-orbit orbit-two">Crédito</div><div className="app-orbit orbit-three">Controle</div>
      </section>

      <section className="section faq-section">
        <SectionHeading kicker="PERGUNTAS DIRETAS" title={<>Informação para<br /><em>decidir melhor.</em></>} text="O essencial, sem letras miúdas escondidas." />
        <FaqList items={homeFaqs} />
      </section>

      <ClosingCTA />
    </div>
  );
}

function Ticker() {
  const text = ["CONTA DIGITAL", "PIX E PAGAMENTOS", "MAIS CONTROLE", "CARTÃO", "MENOS BUROCRACIA", "CREDMAISPAY"];
  return <div className="ticker" aria-label="Soluções CredMaisPay"><div>{[...text, ...text].map((item, index) => <span key={`${item}-${index}`}>{item} <i>✦</i></span>)}</div></div>;
}

function CreditManifesto() {
  return <section className="credit-manifesto"><Reveal className="manifesto-intro"><p className="eyebrow light"><span /> #sejaCREDMAISpay</p><h2>Sem banco.<br />Sem gerente.<br /><em>Sem burocracia.</em></h2><p>Uma conta digital criada para aproximar você do seu dinheiro, dos seus planos e de novas possibilidades.</p><Link className="button button-gold" to="/abrir-conta">Abra sua conta <ArrowRight size={18} /></Link></Reveal><div className="impact-stack" aria-label="Benefícios CredMaisPay"><Reveal><span>01</span><strong>Mais controle.</strong></Reveal><Reveal delay={0.08}><span>02</span><strong>Mais liberdade.</strong></Reveal><Reveal delay={0.16}><span>03</span><strong>Mais possibilidades.</strong></Reveal></div><small>Crédito sujeito à análise e aprovação.</small></section>;
}

function SectionHeading({ kicker, title, text }) {
  return <div className="section-heading"><Reveal><p className="eyebrow dark"><span /> {kicker}</p><h2>{title}</h2></Reveal><Reveal delay={0.12}><p>{text}</p></Reveal></div>;
}

function LoanAudienceMessage() {
  const messages = [
    ["Crédito para a vida real.", "Uma jornada clara para quem trabalha, empreende e precisa fazer o próximo passo acontecer."],
    ["Seu CPF também tem movimento.", "Consulte possibilidades de microcrédito com informações objetivas antes de decidir."],
    ["Do salário ao corre.", "CLT, autônomo, CNPJ ou aplicativo: o crédito começa entendendo o seu momento."],
    ["Mais crédito. Mais oportunidade.", "Fôlego para organizar a vida, investir no trabalho e seguir em frente."]
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % messages.length), 4200);
    return () => window.clearInterval(timer);
  }, [messages.length]);
  return <motion.div className="loan-audience-message" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}><span>CRÉDITO QUE ACOMPANHA</span><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .45, ease: "easeOut" }}><h3>{messages[active][0]}</h3><p>{messages[active][1]}</p></motion.div></AnimatePresence><div className="loan-audience-message-dots" aria-hidden="true">{messages.map((_, index) => <i className={index === active ? "is-active" : ""} key={index} />)}</div></motion.div>;
}

function SolutionCard({ item, index }) {
  const Icon = item.icon;
  return <Reveal className={`solution-card ${item.color}`} delay={index * 0.07}><div className="solution-top"><span>{item.number} / {item.label}</span><Icon /></div><div><h3>{item.title}</h3><p>{item.text}</p></div><Link to={item.href} aria-label={`Conhecer ${item.label}`}><ArrowRight /></Link></Reveal>;
}

function MoneyFlow() {
  const ref = useRef(null);
  useGSAP(() => {
    const panels = gsap.utils.toArray(".flow-panel", ref.current);
    if (window.matchMedia("(max-width: 860px), (prefers-reduced-motion: reduce)").matches) return;
    gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: "none", scrollTrigger: { trigger: ref.current, pin: true, scrub: 1, start: "top top", end: () => `+=${ref.current.offsetWidth * 2}`, invalidateOnRefresh: true } });
  }, { scope: ref });
  const panels = [
    { step: "01", title: "Receba e acompanhe.", text: "Veja entradas, identifique recebimentos e mantenha o movimento do dia organizado.", image: "/images/campaign-flow-receber.png", alt: "Cliente usando o celular em campanha financeira", benefits: ["Pix e recebimentos reunidos", "Histórico fácil de consultar"], cta: "Conhecer a conta", href: "/conta", tone: "flow-blue" },
    { step: "02", title: "Pague com clareza.", text: "Resolva pagamentos e transferências com confirmação visível antes de concluir.", image: "/images/campaign-flow-pagar.png", alt: "Cliente realizando operações financeiras pelo celular", benefits: ["Atalhos para ações frequentes", "Alertas a cada movimento"], cta: "Ver os recursos", href: "/conta", tone: "flow-navy" },
    { step: "03", title: "Transforme movimento em plano.", text: "Use a visão da rotina para entender o presente e preparar o próximo passo.", image: "/images/campaign-flow-planejar.png", alt: "Pessoa analisando uma possibilidade financeira", benefits: ["Pix e crédito no mesmo lugar", "Informação para decidir melhor"], cta: "Conhecer o crédito", href: "/emprestimos", tone: "flow-light" },
  ];
  return <section className="money-flow" ref={ref}><div className="flow-track">{panels.map(({ step, title, text, image, alt, benefits, cta, href, tone }) => { const [width, height] = getImageDimensions(image, [2048, 1152]); return <article className={`flow-panel ${tone}`} key={step}><div className="flow-copy"><span>{step} — SUA ROTINA FINANCEIRA</span><h2>{title}</h2><p>{text}</p><ul>{benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul><Link className="button button-light" to={href}>{cta}<ArrowRight size={18} /></Link></div><div className="flow-media"><img src={image} alt={alt} width={width} height={height} loading="lazy" /><b>{step}</b></div></article>; })}</div></section>;
}

function PhoneMockup() {
  return <Reveal className="phone-stage" delay={0.1}><div className="phone"><div className="phone-speaker" /><div className="phone-ui"><div className="phone-greeting"><span>Olá, Marina</span><BellRing size={18} /></div><small>Saldo disponível</small><strong>R$ 8.420,70</strong><div className="quick-actions"><i><QrCode /><b>Pix</b></i><i><ReceiptText /><b>Pagar</b></i><i><Banknote /><b>Crédito</b></i></div><div className="phone-banner"><span>Organize seu mês</span><b>ver visão completa →</b></div><div className="phone-list"><span><i className="dot coffee" />Café do bairro <b>- R$ 18,90</b></span><span><i className="dot income" />Transferência recebida <b>+ R$ 480</b></span></div></div></div></Reveal>;
}

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function FaqList({ items }) {
  return <div className="faq-list">{items.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>;
}

function ClosingCTA() {
  return <section className="closing-cta"><div className="cta-orb orb-a" /><div className="cta-orb orb-b" /><Reveal><p className="eyebrow light"><span /> #sejaCREDMAISpay</p><h2>Mais crédito.<br /><em>Mais oportunidades.</em></h2><p>Sem banco, sem gerente, sem burocracia. Crédito sujeito à análise e aprovação.</p><MagneticLink to="/login" className="button button-gold">Abra sua conta <ArrowRight size={18} /></MagneticLink></Reveal></section>;
}

function ProductRibbon({ items, tone = "blue" }) {
  return <section className={`product-ribbon ribbon-${tone}`} aria-label="Destaques do produto"><span>CredMaisPay</span>{items.map((item) => <div key={item}><Check aria-hidden="true" />{item}</div>)}</section>;
}

function CampaignBanner({ image, alt, eyebrow, title, text, cta, to = "/ajuda#contato", tone = "navy", reverse = false }) {
  const ref = useRef(null);
  useGSAP(() => {
    const imageElement = ref.current?.querySelector("img");
    if (!imageElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(imageElement, { scale: 1.06, yPercent: -2 }, { scale: 1.06, yPercent: 2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: .7 } });
  }, { scope: ref });
  const [width, height] = getImageDimensions(image);
  return <section ref={ref} className={`campaign-banner banner-${tone} ${reverse ? "is-reverse" : ""}`}><Reveal className="campaign-photo"><img src={image} alt={alt} width={width} height={height} loading="lazy" /></Reveal><div className="campaign-copy"><Reveal><p className="eyebrow light"><span /> {eyebrow}</p><h2>{title}</h2><p>{text}</p><Link className="button button-light" to={to}>{cta}<ArrowRight size={18} /></Link></Reveal><div className="campaign-index" aria-hidden="true">C+</div></div></section>;
}

function PageHero({ kicker, title, accent, text, image, alt, tone = "navy", children }) {
  const dimensions = image.includes("campaign-conta-ultrawide")
    ? { width: 1916, height: 821 }
    : image.includes("cartoes") || image.includes("conta-pagamento")
    ? { width: 1448, height: 1086 }
    : { width: 1672, height: image.includes("empresa") ? 940 : 941 };
  return <section className={`page-hero ${tone} ${image.includes("campaign-conta") ? "page-hero-account" : ""}`}><div className="page-hero-copy"><motion.p className="eyebrow light" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><span /> {kicker}</motion.p><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>{title}<em>{accent}</em></motion.h1><motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>{text}</motion.p><motion.div className="page-hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}><Link className="button button-light" to="/ajuda#contato">Quero conhecer <ArrowRight size={18} /></Link>{children}</motion.div></div><motion.div className="page-hero-image" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}><img src={image} alt={alt} width={dimensions.width} height={dimensions.height} fetchpriority="high" /></motion.div></section>;
}

function AccountPage() {
  return <>
    <PageHero kicker="CONTA CREDMAISPAY" title="A rotina flui. " accent="Você acompanha." text="Pague, organize e visualize seus movimentos em uma experiência que coloca o essencial primeiro." image="/images/campaign-conta-ultrawide.png?v=1" alt="Empreendedora usando o celular para acompanhar sua conta CredMaisPay" />
    <ProductRibbon items={["Pix e pagamentos", "Visão da rotina", "Alertas úteis", "Controle no app"]} />
    <FeatureIntro number="01" kicker="VISÃO DO DIA" title="Você abre. Você entende." text="Saldo, compromissos e atalhos organizados para uma leitura rápida — sem fazer você procurar o que importa." image="/images/produto-celular.png" alt="Cliente apresentando o aplicativo CredMaisPay no celular" benefits={["Saldo e movimentações no mesmo lugar", "Pix, pagamentos e comprovantes acessíveis"]} />
    <AccountVisualFeatures />
    <CampaignBanner image="/images/conta-lifestyle.png" alt="Cliente usando o celular em uma sala iluminada" eyebrow="DINHEIRO NA VIDA REAL" title={<>Sua rotina muda.<br />Sua conta acompanha.</>} text="Da casa ao trabalho, uma experiência construída para estar presente sem ocupar espaço demais." cta="Conhecer a experiência" />
    <StepsSection title="Da abertura ao primeiro movimento." steps={[["01", "Conheça", "Veja os recursos e as condições disponíveis."], ["02", "Cadastre", "Informe seus dados em um fluxo guiado."], ["03", "Comece", "Acesse a experiência e organize sua rotina."]]} />
    <AppSplit />
    <InfoBand icon={BadgeCheck} title="Clareza antes de confirmar." text="Informações, condições e autorizações apresentadas no momento certo da jornada." />
    <FaqSection title="Dúvidas sobre a conta" items={homeFaqs.slice(0, 3)} />
    <ClosingCTA />
  </>;
}

function LoanPage() {
  const scope = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 861px)", reduce: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      if (conditions.reduce) return;
      gsap.from(".loan-hero-copy > *", { opacity: 0, y: 38, duration: .82, stagger: .09, ease: "power3.out", delay: .12 });
      gsap.from(".loan-hero-visual", { opacity: 0, x: 42, scale: .96, duration: 1, ease: "power3.out" });
      gsap.to(".loan-hero-visual img", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".loan-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".loan-audience-mockup", { opacity: 0, y: 42, stagger: .1, duration: .72, ease: "power2.out", scrollTrigger: { trigger: ".loan-audience", start: "top 78%" } });
    });
    return () => mm.revert();
  }, { scope });
  return <div className="loan-page" ref={scope}>
    <section className="impact-phrase-strip" aria-label="Mensagens principais"><span>{"Crédito para quem trabalha e empreende"}</span><span>{"Empréstimo sem burocracia"}</span><span>{"Mais crédito, mais oportunidades"}</span><span>Mais vendas</span></section>
    <section className="loan-hero"><div className="loan-hero-copy"><p className="eyebrow light"><span /> CRÉDITO PARA A VIDA REAL</p><h1>Mais crédito.<br /><em>Mais oportunidade.</em></h1><p>Microcrédito para quem trabalha e empreende. Consulte possibilidades para o seu CPF, CNPJ ou para a sua rotina de trabalho por aplicativo.</p><div className="loan-actions"><Link className="button button-gold" to="/ajuda#contato">Simular meu crédito <ArrowRight size={18} /></Link><Link className="text-link light" to="#como-funciona">Entender como funciona <ArrowRight size={16} /></Link></div><small>Crédito sujeito à análise e aprovação.</small></div><div className="loan-hero-visual"><img src="/images/microcredit-hero-people-v2.png" alt="Empreendedora, motoboy, profissional CLT e motorista reunidos em uma campanha de microcrédito" width="1672" height="941" fetchpriority="high" /></div><div className="loan-hero-note"><b><Zap /> Feito para o seu momento</b><span>CLT • CPF • CNPJ • app</span></div></section>
    <ProductRibbon tone="gold" items={["Microcrédito pessoal", "Para quem trabalha", "Para quem empreende", "Pix para movimentar"]} />
    <section className="loan-audience section" id="perfis"><div className="loan-audience-heading"><SectionHeading kicker="UM CRÉDITO MAIS PRÓXIMO" title={<>Seu trabalho tem ritmo.<br /><em>Seu crédito acompanha.</em></>} text="" /><LoanAudienceMessage /></div><div className="loan-audience-grid"><article className="loan-audience-mockup"><div className="loan-mockup-visual"><img src="/images/microcredit-clt-card-v2.png" alt="Profissional CLT consultando o celular" width="1024" height="1536" loading="lazy" /></div><div className="loan-mockup-copy"><span>01 — CLT</span><h3>Para organizar a vida</h3><p>Uma possibilidade para cuidar de uma emergência ou tirar um plano do papel.</p><Link to="/ajuda#contato">Conhecer possibilidades <ArrowRight size={17} /></Link></div></article><article className="loan-audience-mockup"><div className="loan-mockup-visual"><img src="/images/microcredit-cpf-card-v2.png" alt="Trabalhador autônomo usando o celular" width="1024" height="1536" loading="lazy" /></div><div className="loan-mockup-copy"><span>02 — CPF</span><h3>Para quem trabalha por conta</h3><p>Crédito para diferentes momentos, sempre apresentado com condições e análise.</p><Link to="/ajuda#contato">Ver como funciona <ArrowRight size={17} /></Link></div></article><article className="loan-audience-mockup"><div className="loan-mockup-visual"><img src="/images/microcredit-cnpj-card-v2.png" alt="Empreendedora organizando seu negócio" width="1024" height="1536" loading="lazy" /></div><div className="loan-mockup-copy"><span>03 — CNPJ</span><h3>Para fazer o negócio girar</h3><p>Mais recurso para estoque, ferramenta ou uma decisão importante da operação.</p><Link to="/ajuda#contato">Falar com a equipe <ArrowRight size={17} /></Link></div></article><article className="loan-audience-mockup"><div className="loan-mockup-visual"><img src="/images/microcredit-app-card-v2.png" alt="Trabalhadora de aplicativo com celular e capacete" width="1024" height="1536" loading="lazy" /></div><div className="loan-mockup-copy"><span>04 — APP</span><h3>Para manter o ritmo</h3><p>Uma alternativa para quem entrega, dirige ou presta serviço.</p><Link to="/ajuda#contato">Tenho interesse <ArrowRight size={17} /></Link></div></article></div></section>
    <section className="loan-simulation" id="como-funciona"><div className="loan-simulation-copy"><p className="eyebrow light"><span /> SIMULE COM CLAREZA</p><h2>Você escolhe o objetivo.<br /><em>A gente mostra o caminho.</em></h2><p>Comece informando quanto precisa e conheça as possibilidades disponíveis para o seu perfil. Sem promessa de aprovação: tudo passa por análise.</p><ul><li><Check /> Solicitação pelo digital</li><li><Check /> Condições antes da confirmação</li><li><Check /> Acompanhamento do pedido</li></ul><Link className="button button-light" to="/ajuda#contato">Quero simular <ArrowRight size={18} /></Link></div><div className="loan-simulation-visual"><img src="/images/personal-credit-mockup-v1.png" alt="Mockup da simulação de crédito no aplicativo CredMaisPay" width="1024" height="1536" loading="lazy" /><div className="loan-rate"><span>Parcela estimada</span><strong>R$ 607,48</strong><small>Exemplo ilustrativo</small></div></div></section>
    <FeatureIntro number="01" kicker="CRÉDITO QUE SE EXPLICA" title="Antes de contratar, você entende." text="A jornada apresenta o valor, o prazo, as condições e os próximos passos para você decidir com mais segurança." image="/images/microcredit-understand-banner-v2.png" alt="Empreendedora analisando valor, prazo e condições de um microcrédito no celular" benefits={["Informação em cada etapa", "Decisão no seu tempo"]} dark />
    <section className="loan-story"><div className="loan-story-media"><img src="/images/microcredit-simulation-story-v1.png" alt="Pessoa simulando um empréstimo pelo celular" width="1672" height="941" loading="lazy" /></div><div className="loan-story-copy"><p className="eyebrow dark"><span /> MAIS CRÉDITO, MAIS OPORTUNIDADE</p><h2>O próximo passo pode começar pequeno.</h2><p>Microcrédito também é ferramenta: pode ajudar a repor materiais, cobrir uma conta importante ou investir no que faz sua renda acontecer.</p><div className="loan-story-points"><span><Banknote /><b>Fôlego</b><small>para o agora</small></span><span><TrendingUp /><b>Movimento</b><small>para continuar</small></span><span><Zap /><b>Oportunidade</b><small>para avançar</small></span></div><Link className="button button-dark" to="/ajuda#contato">Conversar sobre crédito <ArrowRight size={18} /></Link></div></section>
    <BentoFeatures items={[[QrCode, "Pix para movimentar", "Use sua conta para enviar, receber e organizar o dinheiro do dia a dia.", "blue"], [Banknote, "Crédito para o momento", "Conheça possibilidades de microcrédito de acordo com sua necessidade.", "gold"], [ReceiptText, "Tudo mais claro", "Veja informações e condições antes de confirmar qualquer etapa.", "mint"], [ShieldCheck, "Segurança na jornada", "Dados protegidos e acompanhamento durante a solicitação.", "coral"]]} />
    <CampaignBanner image="/images/campaign-business-story.png" alt="Pessoa conferindo uma movimentação financeira no celular" eyebrow="SEM BUROCRACIA DESNECESSÁRIA" title={<>Mais crédito para<br /><em>mais possibilidades.</em></>} text="Conta, Pix e microcrédito em uma experiência feita para quem precisa fazer a vida andar." cta="Quero conhecer" to="/ajuda#contato" tone="blue" reverse />
    <StepsSection title="Da intenção à resposta, em poucos passos." steps={[["01", "Conte seu momento", "Informe seu perfil, sua renda e o que você precisa realizar."], ["02", "Conheça as condições", "Veja as possibilidades apresentadas para sua análise."], ["03", "Acompanhe a jornada", "Receba orientação e acompanhe os próximos passos pelo digital."]]} />
    <InfoBand icon={HeartHandshake} title="Crédito com conversa clara." text="A CredMaisPay aproxima possibilidades de quem trabalha e empreende, respeitando análise, condições e disponibilidade." />
    <FaqSection title="Dúvidas sobre microcrédito" items={[["Quem pode solicitar?", "A disponibilidade pode considerar pessoas com CPF, trabalhadores CLT, autônomos, trabalhadores de aplicativo e empresas com CNPJ. A elegibilidade será informada durante a análise."], ["O crédito é aprovado na hora?", "Não. Toda solicitação está sujeita à análise, aprovação, condições e disponibilidade do produto."], ["Posso usar o crédito para o meu negócio?", "Sim. Pessoas empreendedoras podem indicar objetivos como estoque, ferramenta, capital de giro ou outros planos, sempre conforme a análise."], ["A CredMaisPay oferece cartão?", "Não. A plataforma é focada em conta, Pix e possibilidades de microcrédito."]]} />
    <ClosingCTA />
  </div>;
}

function AccountOpeningPage() {
  const scope = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 861px)", reduce: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      if (conditions.reduce) return;
      gsap.from(".business-hero-copy > *", { opacity: 0, y: 42, duration: .85, stagger: .09, ease: "power3.out", delay: .12 });
      gsap.from(".business-hero-picture", { opacity: 0, scale: 1.04, duration: 1.15, ease: "power3.out" });
      gsap.to(".business-hero-picture img", { yPercent: 5, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".business-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".business-number", { opacity: 0, y: 34, stagger: .12, duration: .75, ease: "power2.out", scrollTrigger: { trigger: ".business-numbers", start: "top 82%" } });
      gsap.from(".business-start-mockup", { opacity: 0, y: 80, rotate: -4, scale: .9, stagger: .14, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".business-start", start: "top 72%" } });
    });
    return () => mm.revert();
  }, { scope });

  return <div className="business-page" ref={scope}>
    <section className="business-hero">
      <div className="business-hero-picture"><img src="/images/campaign-hero-v2.png" alt="Cliente abrindo sua conta CredMaisPay pelo celular" width="1672" height="941" fetchpriority="high" /></div>
      <div className="business-hero-copy">
        <p className="eyebrow light"><span /> CONTA CREDMAISPAY</p>
        <h1>Sua conta.<br /><em>Seu próximo passo.</em></h1>
        <p>Abra sua conta pelo celular e tenha Pix, pagamentos e possibilidades de microcrédito para cuidar da sua vida financeira.</p>
        <div className="business-hero-actions"><MagneticLink className="button button-gold" to="/ajuda#contato">Abrir minha conta <ArrowRight size={18} /></MagneticLink><Link className="business-video-link" to="#recursos"><span><ArrowRight /></span> Conhecer a conta</Link></div>
        <small>Crédito sujeito à análise e aprovação.</small>
      </div>
      <div className="business-hero-proof"><b><Sparkles /> Feita para sua rotina</b><span>Conta • Pix • microcrédito</span></div>
    </section>

    <ProductRibbon tone="coral" items={["Abertura digital", "Pix e pagamentos", "Microcrédito", "Crédito para seus planos"]} />

    <section className="business-receive" id="recursos">
      <Reveal className="business-receive-media"><img src="/images/campaign-business-story.png" alt="Cliente acompanhando sua conta CredMaisPay pelo celular" width="1024" height="1536" loading="lazy" /><div className="receive-badge"><QrCode /><span>Pagamento concluído</span><strong>R$ 89,90</strong></div></Reveal>
      <div className="business-receive-copy"><Reveal><p className="eyebrow dark"><span /> CONTA PARA A VIDA REAL</p><h2>Seu dinheiro.<br /><em>Mais perto de você.</em></h2><p>Consulte saldo, faça Pix, pague contas e acompanhe seus movimentos sem transformar a rotina em complicação.</p></Reveal><div className="receive-list"><Reveal><span>01</span><div><b>Pix em poucos passos</b><p>Envie, receba e consulte quando precisar.</p></div></Reveal><Reveal delay={.08}><span>02</span><div><b>Pagamentos organizados</b><p>Contas e comprovantes reunidos em um só lugar.</p></div></Reveal><Reveal delay={.16}><span>03</span><div><b>Alertas que ajudam</b><p>Reconheça cada movimento e mantenha o controle.</p></div></Reveal></div></div>
    </section>

    <section className="business-numbers" aria-label="Benefícios da conta CredMaisPay"><div className="business-number"><strong>01</strong><p>Conta digital para sua rotina.</p></div><div className="business-number"><strong>02</strong><p>Movimentos fáceis de acompanhar.</p></div><div className="business-number"><strong>03</strong><p>Mais clareza para seus planos.</p></div></section>

    <AccountJourney />

    <section className="business-credit">
      <img src="/images/personal-credit-mockup-v1.png" alt="Aplicativo CredMaisPay exibindo uma simulação de crédito pessoal" width="1024" height="1536" loading="lazy" />
      <Reveal className="business-credit-copy"><p className="eyebrow dark"><span /> CRÉDITO PARA SEUS PLANOS</p><h2>Seu próximo passo pode ganhar <em>fôlego.</em></h2><p>Conheça possibilidades para uma compra importante, uma emergência ou um projeto pessoal, com condições apresentadas antes da confirmação.</p><ul><li><Check /> Solicitação digital</li><li><Check /> Análise para o seu perfil</li><li><Check /> Taxas e condições com clareza</li></ul><Link className="button button-dark" to="/ajuda#contato">Quero conhecer <ArrowRight size={18} /></Link><small>Crédito sujeito à análise e aprovação.</small></Reveal>
    </section>

    <section className="business-profiles section"><SectionHeading kicker="PARA OS SEUS MOMENTOS" title={<>Uma conta.<br /><em>Muitos planos pela frente.</em></>} text="Recursos para acompanhar o cotidiano, organizar escolhas e construir o próximo passo." /><div className="business-profile-grid"><BusinessProfile image="/images/hero-credmaispay.png" label="Dia a dia" text="Pix, pagamentos e controle na palma da mão." /><BusinessProfile image="/images/campaign-ajuda-v2.png" label="Atendimento" text="Orientação clara sempre que você precisar." /><BusinessProfile image="/images/campaign-seguranca-v2.png" label="Planos" text="Informação para decidir junto e avançar." /></div></section>

    <section className="business-start section" id="business-start"><Reveal><p className="eyebrow light"><span /> COMEÇAR É SIMPLES</p><h2>Do cadastro à sua conta pronta para usar.</h2></Reveal><div className="business-start-mockups"><article className="business-start-mockup"><div className="mockup-visual"><img src="/images/account-register-mockup-v1.png" alt="Celular apresentando o início do cadastro CredMaisPay" width="1024" height="1536" loading="lazy" /></div><footer><b>01</b><div><h3>Informe seus dados</h3><p>Comece com seu CPF e suas informações pessoais.</p></div></footer></article><article className="business-start-mockup"><div className="mockup-visual"><img src="/images/account-identity-mockup-v1.png" alt="Celular apresentando a confirmação de identidade" width="1024" height="1536" loading="lazy" /></div><footer><b>02</b><div><h3>Confirme sua identidade</h3><p>Siga as etapas de segurança apresentadas na tela.</p></div></footer></article><article className="business-start-mockup"><div className="mockup-visual"><img src="/images/account-ready-mockup-v1.png" alt="Aplicativo CredMaisPay confirmando que a conta está pronta" width="1024" height="1536" loading="lazy" /></div><footer><b>03</b><div><h3>Comece a usar</h3><p>Acompanhe sua conta e encontre os recursos disponíveis.</p></div></footer></article></div><Reveal className="business-start-action"><Link className="button button-gold" to="/ajuda#contato">Abrir minha conta <ArrowRight size={18} /></Link></Reveal></section>

    <InfoBand icon={HeartHandshake} title="Atendimento para começar com segurança." text="Orientação direta para tirar dúvidas sobre cadastro, acesso e os recursos da sua conta." />
    <FaqSection title="Dúvidas sobre a abertura da conta" items={[["Quem pode abrir uma conta?", "Pessoas físicas podem registrar interesse. Os requisitos de elegibilidade e a disponibilidade serão informados durante o cadastro."], ["Quais dados são necessários?", "A jornada pode solicitar CPF, dados pessoais e etapas de confirmação de identidade para manter o processo seguro."], ["A abertura da conta tem custo?", "Eventuais tarifas, condições e características do produto serão apresentadas com clareza antes de qualquer confirmação."], ["Quando posso começar a usar?", "Após a análise e aprovação do cadastro, os recursos disponíveis serão apresentados no ambiente digital CredMaisPay."]]} />
    <ClosingCTA />
  </div>;
}

function AccountJourney() {
  const ref = useRef(null);
  useGSAP(() => {
    const panels = gsap.utils.toArray(".business-journey-card", ref.current);
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 861px)", reduce: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      if (conditions.reduce) return;
      gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${ref.current.offsetWidth * 2.4}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
    });
    return () => mm.revert();
  }, { scope: ref });
  const items = [
    [QrCode, "01", "Faça Pix", "Envie, receba e consulte seus movimentos em poucos passos.", "/images/business-first-payment-transparent-v1.png"],
    [ReceiptText, "02", "Pague contas", "Pagamentos e comprovantes reunidos para consultar quando precisar.", "/images/business-organize-transparent-v1.png"],
    [BellRing, "03", "Acompanhe", "Alertas objetivos para reconhecer cada movimento e agir rápido.", "/images/business-track-transparent-v1.png"],
    [PiggyBank, "04", "Organize planos", "Metas visíveis para acompanhar o que importa e preparar o próximo passo.", "/images/business-plan-transparent-v1.png"],
  ];
  return <section className="business-journey" ref={ref}><div className="business-journey-track">{items.map(([Icon, number, title, text, image]) => <article className="business-journey-card" key={number}><div className="journey-copy"><span>{number} — SUA CONTA</span><Icon /><h2>{title}<br /><em>sem perder o ritmo.</em></h2><p>{text}</p><Link className="button button-light" to="/ajuda#contato">Abrir minha conta <ArrowRight size={18} /></Link></div><div className="journey-media"><img src={image} alt={`Mockup CredMaisPay para ${title.toLowerCase()}`} width="1536" height="1024" loading="lazy" /></div></article>)}</div></section>;
}

function BusinessProfile({ image, label, text }) {
  return <Reveal className="business-profile-card"><div><img src={image} alt={`Solução CredMaisPay para ${label.toLowerCase()}`} width="1672" height="940" loading="lazy" /></div><footer><span>{label}</span><p>{text}</p><ArrowRight /></footer></Reveal>;
}

function SecurityPage() {
  return <>
    <PageHero kicker="SEGURANÇA CREDMAISPAY" title="Proteção forte. " accent="Informação clara." text="Tecnologia, autonomia e comunicação para ajudar você a reconhecer e proteger cada movimento." image="/images/campaign-seguranca-v3.png" alt="Casal conferindo informações com segurança no celular" tone="mint" />
    <ProductRibbon tone="mint" items={["Acesso protegido", "Alertas contextuais", "Autonomia no app", "Orientação direta"]} />
    <FeatureIntro number="01" kicker="CAMADAS DE PROTEÇÃO" title="Segurança que trabalha junto com você." text="Recursos de autenticação, alertas e monitoramento compõem uma experiência feita para prevenir e informar." image="/images/security-guidance-v1.png" alt="Cliente recebendo orientação para conferir uma notificação financeira" benefits={["Alertas para reconhecer movimentações", "Controles disponíveis no ambiente digital"]} dark />
    <BentoFeatures items={[
      [Fingerprint, "Confirmação de identidade", "Ações importantes pedem a confirmação certa.", "blue"],
      [BellRing, "Alertas contextuais", "Informação rápida quando uma movimentação acontece.", "gold"],
      [LockKeyhole, "Controle de acesso", "Gerencie acesso e recursos de segurança pelo ambiente digital.", "mint"],
      [MessageCircle, "Comunicação direta", "Orientações objetivas para situações que exigem atenção.", "coral"],
    ]} />
    <CampaignBanner image="/images/seguranca-banner.png" alt="Mãe e filha conferindo juntas uma informação no celular" eyebrow="SEGURANÇA TAMBÉM É PROXIMIDADE" title={<>Informação que chega.<br />Cuidado que permanece.</>} text="A proteção fica mais forte quando você entende o que está acontecendo e sabe qual é o próximo passo." cta="Ver orientações" to="/ajuda" tone="mint" reverse />
    <section className="section safety-guide"><Reveal><p className="eyebrow dark"><span /> PAUSA QUE PROTEGE</p><h2>Desconfie. Confira. Só então confirme.</h2></Reveal><div className="safety-grid"><article><b>01</b><h3>Nunca compartilhe códigos</h3><p>Senhas e códigos de confirmação são pessoais.</p></article><article><b>02</b><h3>Confira o destino</h3><p>Revise nomes e valores antes de concluir.</p></article><article><b>03</b><h3>Use canais oficiais</h3><p>Em dúvida, pare a ação e procure ajuda.</p></article></div></section>
    <InfoBand icon={LockKeyhole} title="Cuidado também é autonomia." text="Quanto mais clara a informação, mais segura pode ser a sua decisão." />
    <FaqSection title="Perguntas de segurança" items={[["A CredMaisPay pede minha senha por mensagem?", "Não compartilhe senhas ou códigos por mensagens. Canais legítimos não devem solicitar suas credenciais completas."], ["O que fazer diante de uma movimentação desconhecida?", "Use os controles disponíveis e procure imediatamente o canal de atendimento apresentado no ambiente oficial."], ["Como identificar um contato confiável?", "Acesse sempre o site ou aplicativo diretamente, sem usar links recebidos de origem desconhecida."]]} />
    <ClosingCTA />
  </>;
}

function HelpPage() {
  return <>
    <section className="help-hero"><div><p className="eyebrow light"><span /> CENTRAL DE AJUDA</p><h1>Como podemos<br /><em>ajudar agora?</em></h1><p>Encontre respostas rápidas ou indique o assunto para receber orientação.</p><label className="search-box"><MousePointer2 aria-hidden="true" /><input name="help-search" autoComplete="off" aria-label="Buscar na central de ajuda" placeholder="Busque por conta, crédito ou Pix…" /></label></div><div className="help-hero-media"><img src="/images/campaign-ajuda-v3.png" alt="Especialista CredMaisPay pronto para atender" width="1672" height="941" fetchpriority="high" /><div className="help-cards"><article><MessageCircle aria-hidden="true" /><h3>Atendimento</h3><p>Escolha o assunto e encontre o caminho adequado.</p><ArrowRight aria-hidden="true" /></article><article><ShieldCheck aria-hidden="true" /><h3>Segurança</h3><p>Veja orientações para agir em situações urgentes.</p><ArrowRight aria-hidden="true" /></article></div></div></section>
    <section className="section help-topics"><SectionHeading kicker="ASSUNTOS MAIS BUSCADOS" title={<>Comece pelo<br /><em>que você precisa.</em></>} text="Respostas organizadas por tema." /><div className="topic-grid">{[[Smartphone,"Conta e acesso"],[Banknote,"Empréstimos"],[QrCode,"Pix e pagamentos"],[PiggyBank,"Abertura de conta"],[LockKeyhole,"Segurança"],[ReceiptText,"Documentos"]].map(([Icon, label]) => <a href="#contato" key={label}><Icon /><span>{label}</span><ArrowRight /></a>)}</div></section>
    <CampaignBanner image="/images/ajuda-atendimento.png" alt="Especialista de atendimento conversando com uma cliente" eyebrow="GENTE QUE ESCUTA" title={<>Atendimento claro.<br />Próximo passo simples.</>} text="Comece pelo assunto e encontre a orientação certa para continuar com segurança." cta="Falar com a equipe" to="#contato" tone="blue" />
    <section className="section contact-panel" id="contato"><Reveal><p className="eyebrow dark"><span /> FALE COM A CREDMAISPAY</p><h2>Conte o que você precisa.</h2><p>Como os canais oficiais ainda serão confirmados, este formulário funciona como uma prévia visual e não envia dados.</p></Reveal><ContactForm /></section>
    <FaqSection title="Respostas rápidas" items={homeFaqs} />
    <ClosingCTA />
  </>;
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState("");
  const submit = (event) => {
    event.preventDefault();
    setFeedback("Esta é uma prévia visual. O acesso real será conectado ao ambiente oficial.");
  };

  return <section className="login-page">
    <motion.div className="login-panel" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
      <Link className="brand login-brand" to="/" aria-label="CredMaisPay, voltar ao início" translate="no"><img src="/brand/credmaispay-symbol.svg" alt="" width="96" height="96" /><span>CRED<span>MAIS</span><b>PAY</b></span></Link>
      <div className="login-content">
        <p className="eyebrow dark"><span /> ÁREA SEGURA</p>
        <h1>Sua vida financeira,<br /><em>do seu jeito.</em></h1>
        <p className="login-lead">Entre para acompanhar suas soluções CredMaisPay.</p>
        <form className="login-form" onSubmit={submit}>
          <label>CPF<span className="login-field"><Fingerprint aria-hidden="true" /><input name="document" inputMode="numeric" autoComplete="username" spellCheck="false" placeholder="000.000.000-00" required /></span></label>
          <label>Senha<span className="login-field"><LockKeyhole aria-hidden="true" /><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" spellCheck="false" placeholder="Digite sua senha…" required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>{showPassword ? <EyeOff /> : <Eye />}</button></span></label>
          <div className="login-options"><label><input type="checkbox" name="remember" /> Lembrar meu documento</label><Link to="/ajuda">Esqueci minha senha</Link></div>
          <button className="button button-dark login-submit" type="submit">Acessar minha conta <ArrowRight size={18} /></button>
          <p className="login-feedback" aria-live="polite">{feedback}</p>
        </form>
        <div className="login-support"><ShieldCheck aria-hidden="true" /><span><strong>Acesso protegido</strong>Não compartilhe sua senha ou códigos de confirmação.</span></div>
        <p className="login-create">Ainda não começou? <Link to="/ajuda#contato">Abra sua conta</Link></p>
      </div>
    </motion.div>
    <motion.aside className="login-visual" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
      <img src="/images/campaign-login-v2.png" alt="Cliente acessando a conta CredMaisPay" width="1122" height="1402" fetchpriority="high" />
      <div className="login-campaign"><span>#sejaCREDMAISpay</span><h2>Mais crédito.<br />Mais oportunidades.<br />Mais movimento.</h2><p>Sem banco, sem gerente, sem burocracia.</p></div>
      <div className="login-security-pill"><ShieldCheck /> Ambiente protegido</div>
    </motion.aside>
  </section>;
}

function FeatureIntro({ number, kicker, title, text, image, alt, benefits = [], dark = false }) {
  const mediaClass = image.includes("produto-monitor") ? "is-device" : image.includes("produto-celular") ? "is-portrait" : image.includes("cartao-aproximacao") ? "is-payment" : image.includes("microcredit-understand") ? "is-credit-understand" : "";
  const [width, height] = getImageDimensions(image);
  return <section className={`feature-intro ${dark ? "is-dark" : ""}`}><Reveal className={`feature-media ${mediaClass}`}><img src={image} alt={alt} width={width} height={height} loading="lazy" /><span>{number}</span></Reveal><Reveal className="feature-copy" delay={0.1}><p className={`eyebrow ${dark ? "light" : "dark"}`}><span /> {kicker}</p><h2>{title}</h2><p>{text}</p><ul>{benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul><Link className={`button ${dark ? "button-light" : "button-dark"}`} to="/ajuda#contato">Quero conhecer <ArrowRight size={18} /></Link></Reveal></section>;
}

function BentoFeatures({ items }) {
  return <section className="section bento-grid">{items.map(([Icon, title, text, color], index) => <Reveal className={`bento-card ${color} bento-${index + 1}`} key={title} delay={index * 0.06}><div className="bento-icon"><Icon /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>{index === 0 ? <div className="bento-signal"><i /><i /><i /><i /></div> : null}</Reveal>)}</section>;
}

function AccountVisualFeatures() {
  const items = [
    { number: "01", title: "Pix do seu jeito", text: "Envie, receba e consulte cada movimento em poucos passos.", image: "/images/mockup-pix.png", alt: "Celular exibindo pagamento por Pix", tone: "pix" },
    { number: "02", title: "Contas organizadas", text: "Centralize pagamentos e mantenha os comprovantes sempre acessíveis.", image: "/images/mockup-contas.png", alt: "Celular com contas pagas e comprovante digital", tone: "bills" },
    { number: "03", title: "Alertas que ajudam", text: "Saiba quando o Pix chega e acompanhe movimentações importantes.", image: "/images/mockup-alertas.png", alt: "Celular mostrando alerta de Pix recebido", tone: "alerts" },
    { number: "04", title: "Planos acompanhados", text: "Organize objetivos e compartilhe decisões com quem faz parte deles.", image: "/images/mockup-metas.png", alt: "Casal acompanhando objetivos financeiros pelo celular", tone: "goals" },
  ];
  return <section className="section visual-feature-section"><div className="visual-feature-grid">{items.map((item, index) => <Reveal className={`visual-feature ${item.tone}`} key={item.title} delay={index * .06}><div className="visual-feature-media"><img src={item.image} alt={item.alt} width="1536" height="1024" loading="lazy" /></div><div className="visual-feature-copy"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><Link to="/ajuda#contato" aria-label={`Conhecer ${item.title}`}><ArrowRight /></Link></div></Reveal>)}</div></section>;
}

function StepsSection({ title, steps }) {
  return <section className="section steps-section"><Reveal><p className="eyebrow dark"><span /> PASSO A PASSO</p><h2>{title}</h2></Reveal><div className="steps-list">{steps.map(([number, heading, text]) => <Reveal className="step-row" key={number}><b>{number}</b><h3>{heading}</h3><p>{text}</p><span><ArrowRight /></span></Reveal>)}</div></section>;
}

function AppSplit() {
  return <section className="section app-split"><Reveal className="app-split-device"><img src="/images/produto-notebook.png" alt="Notebook exibindo a plataforma CredMaisPay" width="1536" height="1024" loading="lazy" /></Reveal><Reveal className="app-split-copy"><p className="eyebrow light"><span /> EXPERIÊNCIA DIGITAL</p><h2>O essencial aparece primeiro.</h2><p>Uma hierarquia visual que ajuda a ler sua vida financeira sem transformar tudo em planilha.</p><ul className="check-list"><li><Check /> atalhos para ações frequentes</li><li><Check /> histórico com leitura clara</li><li><Check /> visão dos próximos compromissos</li></ul></Reveal></section>;
}

function InfoBand({ icon: Icon, title, text }) {
  return <section className="info-band"><Reveal><Icon /><h2>{title}</h2><p>{text}</p><Link to="/ajuda">Saiba mais <ArrowRight size={16} /></Link></Reveal></section>;
}

function FaqSection({ title, items }) {
  return <section className="section faq-section compact"><div className="faq-intro"><Reveal><p className="eyebrow dark"><span /> PERGUNTAS FREQUENTES</p><h2>{title}</h2></Reveal><Reveal className="faq-support" delay={0.1}><span className="faq-support-mark">?</span><div><b>Ainda ficou com dúvida?</b><p>Fale com a equipe e encontre o próximo passo para o seu momento.</p><Link to="/ajuda#contato">Falar com a equipe <ArrowRight size={15} /></Link></div></Reveal></div><FaqList items={items} /></section>;
}

function LogoMini() { return <strong className="logo-mini">CRED<span>MAIS</span><small>PAY</small></strong>; }

function ContactForm() {
  const [sent, setSent] = useState(false);
  return <Reveal className="contact-form" delay={0.1}><div className="form-grid"><label>Nome<input name="name" autoComplete="name" placeholder="Ex.: Maria Silva" /></label><label>Telefone<input name="phone" autoComplete="tel" placeholder="Ex.: (11) 99999-9999" inputMode="tel" type="tel" /></label><label className="full">Assunto<select name="subject" autoComplete="off" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Abertura de conta</option><option>Conta digital</option><option>Empréstimos e microcrédito</option><option>Pix</option><option>Segurança</option></select></label><label className="full">Mensagem<textarea name="message" autoComplete="off" placeholder="Conte um pouco sobre o que você precisa…" rows="4" /></label></div><button className="button button-dark" type="button" onClick={() => setSent(true)}>{sent ? "Prévia registrada" : "Visualizar interesse"}<ArrowRight size={18} /></button><p className="form-note" aria-live="polite">{sent ? "Esta é uma demonstração visual. Nenhum dado foi enviado." : ""}</p></Reveal>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-lead"><div><p className="eyebrow light"><span /> #sejaCREDMAISpay</p><h2>Mais clareza para<br /><em>seguir em frente.</em></h2></div><div><p>Conta, Pix e microcrédito para quem trabalha, empreende e faz a vida acontecer.</p><Link className="button button-gold" to="/ajuda#contato">Falar com a gente <ArrowRight size={18} /></Link></div></div><div className="footer-brand"><Link className="brand brand-light" to="/" translate="no"><img src="/brand/credmaispay-symbol.svg" alt="" width="96" height="96" /><span>CRED<span>MAIS</span><b>PAY</b></span></Link><p>Uma experiência financeira mais próxima, simples e transparente.</p></div><div className="footer-links"><div><b>Para você</b><Link to="/conta">Conta</Link><Link to="/emprestimos">Microcrédito</Link><Link to="/seguranca">Segurança</Link></div><div><b>Comece agora</b><Link to="/abrir-conta">Abrir conta</Link><Link to="/ajuda#contato">Atendimento</Link><Link to="/login">Acessar</Link></div><div><b>Explore</b><Link to="/ajuda">Central de ajuda</Link><a href="#legal">Privacidade</a><a href="#legal">Termos de uso</a></div></div><div className="footer-bottom" id="legal"><span>© 2026 CredMaisPay</span><p>Crédito sujeito à análise e aprovação. Produtos, condições, canais oficiais e informações regulatórias sujeitos à confirmação e disponibilidade.</p><a className="footer-credit" href="https://focussdev.art/" target="_blank" rel="noreferrer">Desenvolvido por FocussDev</a></div></footer>;
}

export default App;
