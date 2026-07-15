import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  EyeOff,
  FileCheck2,
  Lock,
  Menu,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import { PRODUCT } from './config/product';
import { buildCheckoutUrl, getActiveTrackingParameters } from './lib/attribution';
import {
  getExperimentAnalyticsContext,
  getExperimentCheckoutTracking,
  resolveActiveExperiment,
} from './lib/experiments';
import {
  initializeFunnelAnalytics,
  observeFunnelSections,
  trackCtaClick,
  trackFaqOpened,
} from './lib/funnelAnalytics';
import { DeliverableCard } from './components/DeliverableCard';
import { HeroMedia } from './components/HeroMedia';
import { MobileMotionStory } from './components/MobileMotionStory';
import { ProductBundleVisual } from './components/ProductBundleVisual';

const navItems = [
  { label: 'Problema', id: 'diagnostico' },
  { label: 'Mecanismo', id: 'mecanismo' },
  { label: 'Conteúdo', id: 'conteudo-protocolo' },
  { label: 'Credibilidade', id: 'prova' },
  { label: 'Garantia', id: 'garantia' },
  { label: 'Oferta', id: 'oferta' },
];

const leakSignals = [
  'Responde rápido demais com medo de perder a pessoa.',
  'Explica tudo em excesso para tentar parecer interessante.',
  'Insiste quando o melhor seria observar e esperar.',
  'Tenta impressionar antes de criar respeito.',
  'Confunde intensidade com presença.',
  'Aceita pouco e chama isso de estratégia.',
];

const symptoms = [
  {
    icon: <EyeOff size={28} />,
    title: 'Disponível demais',
    text: 'Quando você está sempre pronto para tudo, passa a sensação de que não tem limite.',
  },
  {
    icon: <Brain size={28} />,
    title: 'No modo ansiedade',
    text: 'Você responde, explica e insiste para aliviar a própria tensão, não para se comunicar melhor.',
  },
  {
    icon: <Target size={28} />,
    title: 'Tentando se provar',
    text: 'Quanto mais você tenta convencer, mais insegurança aparece. Calma, postura e limite falam primeiro.',
  },
];

const mechanismFlow = [
  {
    label: '1. Sinal emitido',
    title: 'Pressa e excesso',
    text: 'Responder no impulso, explicar demais e ficar disponível sem critério.',
  },
  {
    label: '2. Leitura percebida',
    title: 'Insegurança',
    text: 'Mesmo com boa intenção, o ritmo comunica necessidade de aprovação e falta de eixo.',
  },
  {
    label: '3. Ajuste treinado',
    title: 'Presença',
    text: 'Pausa, postura, voz, silêncio e limite tornam a comunicação mais firme e coerente.',
  },
];

const fitList = [
  'Homens que querem parar de agir buscando aprovação.',
  'Homens que querem diminuir carência, pressa e excesso de explicação.',
  'Homens que querem mais presença na postura, na fala e nas atitudes.',
  'Homens que preferem um passo a passo direto, sem fantasia de guru alfa.',
];

const notFitList = [
  'Quem procura manipulação ou promessa de conquista garantida.',
  'Quem quer controlar outra pessoa em vez de reconstruir o próprio eixo.',
  'Quem espera resultado sem leitura, prática e auto-observação diária.',
  'Quem precisa de substituto para terapia ou tratamento psicológico.',
];

const protocolSteps = [
  {
    phase: 'Dias 1-5',
    title: 'Diagnóstico dos sinais',
    text: 'Identificar pressa, excesso de explicação, disponibilidade sem critério e busca de aprovação.',
    topics: ['Impulso', 'Explicação excessiva', 'Disponibilidade', 'Aprovação'],
  },
  {
    phase: 'Dias 6-10',
    title: 'Ajuste de presença',
    text: 'Treinar postura, voz, olhar, silêncio, limite e pequenas decisões que passam mais firmeza.',
    topics: ['Postura', 'Voz e olhar', 'Silêncio', 'Limites'],
  },
  {
    phase: 'Dias 11-15',
    title: 'Aplicação na vida real',
    text: 'Usar em conversas, encontros, trabalho e redes sociais sem transformar interesse em urgência.',
    topics: ['Conversas', 'Encontros', 'Trabalho', 'Redes sociais'],
  },
];

const deliverables = [
  {
    icon: <BookOpen size={24} />,
    label: 'Material principal • PDF',
    title: PRODUCT.canonicalName,
    text: 'Estrutura prática em três fases para reconhecer sinais de insegurança, ajustar respostas e aplicar novas condutas.',
  },
  {
    icon: <FileCheck2 size={24} />,
    label: 'Material complementar • PDF',
    title: PRODUCT.bonusName,
    text: 'Mapa complementar para identificar pressa, carência e reatividade que enfraquecem a presença.',
  },
];

const offerItems = [
  PRODUCT.canonicalName,
  `${PRODUCT.bonusName} — material complementar em PDF`,
  'Roteiro de aplicação organizado em 15 dias',
  'Acesso digital enviado por e-mail após a confirmação do pagamento',
  `Garantia de ${PRODUCT.guaranteeDays} dias processada pela Kiwify`,
];

const faqs = [
  ['O acesso é imediato?', 'Sim. Após a confirmação do pagamento, você recebe o acesso completo no seu e-mail.'],
  ['O que está incluído?', `${PRODUCT.canonicalName}, o material complementar ${PRODUCT.bonusName} e o roteiro de aplicação organizado em 15 dias.`],
  ['É vídeo ou PDF?', `${PRODUCT.format}, otimizados para celular, tablet e computador.`],
  ['Qual é a proposta?', `${PRODUCT.promise} O resultado depende da leitura, da prática e da auto-observação de cada pessoa.`],
  ['Serve para reconquistar alguém?', 'Não é sobre manipular ninguém. É sobre reconstruir eixo, postura e presença.'],
  ['Quanto tempo preciso por dia?', 'Reserve de 10 a 20 minutos para leitura, observação e execução dos exercícios.'],
  ['Posso pedir reembolso?', `Sim. Você pode solicitar o reembolso dentro de ${PRODUCT.guaranteeDays} dias pela Kiwify.`],
];

export default function App() {
  const [experiment] = useState(() => resolveActiveExperiment());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const menuButtonRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const experimentValues = experiment?.values ?? {};
  const headlineLead = experimentValues.headlineLead ?? 'Ajuste os sinais de insegurança.';
  const headlineAccent = experimentValues.headlineAccent ?? 'Construa presença.';
  const checkoutCtaLabel = experimentValues.checkoutCtaLabel ?? 'Acessar o protocolo';
  const heroSectionCtaLabel = experimentValues.heroSectionCtaLabel ?? 'Ver oferta completa';
  const stickyCtaLabel = experimentValues.stickyCtaLabel ?? 'Acessar protocolo';
  const heroMedia = experimentValues.heroMedia ?? 'static';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    if (!isMenuOpen) return () => {
      document.body.style.overflow = previousOverflow;
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const menuItems = Array.from(document.querySelectorAll('#menu-mobile button:not([tabindex="-1"])'));
      const focusableItems = [menuButtonRef.current, ...menuItems].filter(Boolean);
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => firstMenuItemRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
      const hero = document.getElementById('abertura');
      const threshold = hero ? hero.offsetTop + hero.offsetHeight * 0.72 : window.innerHeight * 0.82;
      setShowMobileCta(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    initializeFunnelAnalytics(getExperimentAnalyticsContext(experiment));
    return observeFunnelSections(['diagnostico', 'mecanismo', 'conteudo-protocolo', 'prova', 'garantia', 'oferta']);
  }, [experiment]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 74;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleTrackedSectionNavigation = (id, location) => {
    trackCtaClick({ location, destination: id });
    scrollToSection(id);
  };

  const handleCheckout = (location) => {
    const tracking = getActiveTrackingParameters();
    const experimentTracking = getExperimentCheckoutTracking(experiment, tracking);
    trackCtaClick({
      location,
      destination: 'kiwify_checkout',
      checkoutExperimentTagged: Boolean(experimentTracking.s3),
    });
    window.open(
      buildCheckoutUrl(PRODUCT.checkoutUrl, { ...tracking, ...experimentTracking }),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleLinkClick = (location, destination) => {
    trackCtaClick({ location, destination });
  };

  const handleFaqToggle = (index, question) => {
    const willOpen = openFaq !== index;
    setOpenFaq(willOpen ? index : null);
    if (willOpen) trackFaqOpened({ index, question });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090806] pb-24 text-[#eee8dd] selection:bg-[#CFA34A] selection:text-[#090806] md:pb-0">
      <nav className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? 'border-b border-[#CFA34A]/25 bg-[#090806]/95 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl' : 'bg-[#090806]/85 py-4 backdrop-blur-xl'}`}>
        <div className="relative z-[110] mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={() => handleTrackedSectionNavigation('conteudo', 'nav_logo')} className="flex items-center gap-3 text-left">
            <img
              src="/images/optimized/logo-96.webp"
              alt={PRODUCT.canonicalName}
              className="h-11 w-11 shrink-0 rounded-sm object-cover shadow-[0_0_24px_rgba(207,163,74,0.4)]"
              width="96"
              height="96"
              decoding="async"
            />
            <span className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">{PRODUCT.name}</span>
              <span className="mt-1 max-w-[17rem] text-xs font-bold uppercase tracking-[0.1em] text-[#9b9488] sm:tracking-[0.12em]">{PRODUCT.subtitle}</span>
            </span>
          </button>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => handleTrackedSectionNavigation(item.id, `nav_desktop_${item.id}`)} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d8d0c1] transition-colors hover:text-[#CFA34A]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => handleTrackedSectionNavigation('oferta', 'nav_desktop_primary')} className="gold-cta rounded-sm px-6 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#090806]">
              Ver oferta
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            className="relative z-[110] min-h-11 min-w-11 p-2 text-[#CFA34A] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[95] flex h-[100svh] w-screen flex-col overflow-y-auto bg-[#090806] px-7 pb-8 pt-28 transition-all duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}`}
      >
        <div className="relative my-auto flex flex-col gap-5">
          {navItems.map((item, index) => (
            <button
              ref={index === 0 ? firstMenuItemRef : undefined}
              key={item.id}
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => handleTrackedSectionNavigation(item.id, `menu_mobile_${item.id}`)}
              className="min-h-12 text-left text-3xl font-black uppercase tracking-tight text-[#f2eadc]"
            >
              {item.label}
            </button>
          ))}
          <button type="button" tabIndex={isMenuOpen ? 0 : -1} onClick={() => handleTrackedSectionNavigation('oferta', 'menu_mobile_primary')} className="gold-cta mt-4 rounded-sm px-6 py-5 text-base font-black uppercase tracking-[0.12em] text-[#090806]">
            Ver oferta
          </button>
        </div>
      </div>

      <main id="conteudo">
        <section id="abertura" className="relative min-h-[100svh] overflow-hidden bg-[#090806]">
          <HeroMedia mode={heroMedia} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,6,.98)_0%,rgba(9,8,6,.76)_58%,rgba(9,8,6,.3)_100%)] md:bg-[linear-gradient(90deg,rgba(9,8,6,.98)_0%,rgba(9,8,6,.9)_36%,rgba(9,8,6,.55)_66%,rgba(9,8,6,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,.58)_0%,rgba(9,8,6,.28)_30%,rgba(9,8,6,.96)_100%)] md:bg-[linear-gradient(180deg,rgba(9,8,6,.18)_0%,rgba(9,8,6,.1)_52%,rgba(9,8,6,.58)_100%)]" />
          <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(207,163,74,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(207,163,74,.35)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-7 pt-24 md:grid md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-8 md:px-8 md:pb-8 md:pt-24 xl:pt-20">
            <div className="w-full">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#CFA34A]/35 bg-[#090806]/70 px-4 py-2 backdrop-blur-md md:mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CFA34A]" />
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A] md:text-[10px] md:tracking-[0.22em]">{PRODUCT.canonicalName}</span>
              </div>
              <h1 className="max-w-5xl text-[clamp(2.25rem,10vw,3rem)] font-black uppercase leading-[0.92] tracking-tight text-[#f4ead8] md:text-[64px] xl:text-[76px] 2xl:text-[84px]">
                {headlineLead} <span className="text-[#CFA34A]">{headlineAccent}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#ded6c8] md:mt-5 md:text-lg xl:text-xl">
                {PRODUCT.promise}
              </p>
              <p className="mt-4 hidden max-w-2xl border border-[#CFA34A]/30 bg-[#090806]/65 p-4 text-base font-black leading-relaxed text-[#f4ead8] backdrop-blur-sm md:block md:text-lg">
                Um roteiro de prática e auto-observação — sem manipulação, sem promessa de conquista e sem personagem de “guru alfa”.
              </p>
              <div className="mt-4 flex items-center justify-between border-y border-[#CFA34A]/25 bg-[#090806]/68 px-4 py-3 backdrop-blur-sm md:hidden">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#CFA34A]">Acesso imediato</p>
                  <p className="mt-1 text-sm text-[#d8d0c1]">{PRODUCT.format} + {PRODUCT.guaranteeDays} dias de garantia</p>
                </div>
                <p className="ml-4 shrink-0 text-2xl font-black text-[#f4ead8]">{PRODUCT.priceLabel}</p>
              </div>
              <div className="mt-4 md:hidden">
                <button type="button" onClick={() => handleCheckout('hero_mobile_primary')} className="gold-cta flex min-h-14 w-full items-center justify-center gap-3 rounded-sm px-6 py-4 text-base font-black uppercase tracking-wide text-[#090806]">
                  {checkoutCtaLabel}
                  <ArrowRight size={20} />
                </button>
                <button type="button" onClick={() => handleTrackedSectionNavigation('diagnostico', 'hero_mobile_diagnostico')} className="mt-3 min-h-11 w-full text-sm font-black uppercase tracking-wide text-[#CFA34A]">
                  Ver se o protocolo é para mim
                </button>
              </div>
              <div className="mt-6 hidden flex-col gap-3 sm:flex-row md:flex">
                <button type="button" onClick={() => handleTrackedSectionNavigation('oferta', 'hero_desktop_primary')} className="gold-cta group flex w-full items-center justify-center gap-3 rounded-sm px-8 py-5 text-base font-black uppercase tracking-wide text-[#090806] sm:w-auto">
                  {heroSectionCtaLabel}
                  <ArrowRight size={20} />
                </button>
                <button type="button" onClick={() => handleTrackedSectionNavigation('diagnostico', 'hero_desktop_diagnostico')} className="flex w-full items-center justify-center rounded-sm border border-[#CFA34A]/45 px-8 py-5 text-sm font-black uppercase tracking-wide text-[#CFA34A] hover:bg-[#CFA34A]/10 sm:w-auto">
                  Fazer mini diagnóstico
                </button>
              </div>
              <div className="mt-6 hidden max-w-2xl grid-cols-2 gap-3 md:grid md:grid-cols-4">
                {['Acesso imediato', PRODUCT.format, 'Roteiro de 15 dias', `${PRODUCT.guaranteeDays} dias de garantia`].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                    <CheckCircle2 size={16} className="mb-3 text-[#CFA34A]" />
                    <p className="text-xs font-black uppercase leading-tight tracking-[0.12em] text-[#d8d0c1] md:text-[10px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block" aria-hidden="true" />
          </div>
        </section>

        <section id="diagnostico" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Mini diagnóstico</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-6xl">Você passa insegurança quando...</h2>
                <p className="mt-6 text-lg leading-relaxed text-[#bdb4a5]">Se você se viu em dois ou mais pontos, talvez o problema não seja falta de potencial. Pode ser a forma como você está se mostrando.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {leakSignals.map((item) => (
                  <div key={item} className="border border-white/10 bg-[#11100d] p-5">
                    <CheckCircle2 size={18} className="mb-4 text-[#CFA34A]" />
                    <p className="text-sm font-bold leading-relaxed text-[#d8d0c1]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 border border-[#CFA34A]/25 bg-[#0f0e0b] p-6 text-center md:p-8">
              <p className="text-2xl font-black uppercase leading-tight text-[#f4ead8] md:text-4xl">O problema não é gostar. É perder a calma quando gosta.</p>
            </div>
          </div>
        </section>

        <section id="mecanismo" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">O mecanismo dos sinais</span>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">Sua presença é interpretada antes do seu argumento.</h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#bdb4a5]">Ritmo, postura, voz, silêncio e limites formam uma leitura rápida. O protocolo trabalha essa sequência: reconhecer o sinal emitido, entender a leitura que ele provoca e treinar um ajuste observável.</p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {mechanismFlow.map((step) => (
                <article key={step.label} className="relative border border-[#CFA34A]/20 bg-[#090806] p-7">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A]">{step.label}</p>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight text-[#f4ead8]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{step.text}</p>
                </article>
              ))}
            </div>

            <MobileMotionStory />

            <div className="mt-14">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Como o problema aparece</p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
              {symptoms.map((item) => (
                <article key={item.title} className="border border-white/10 bg-[#11100d] p-7">
                  <div className="mb-6 text-[#CFA34A]">{item.icon}</div>
                  <h3 className="text-xl font-black uppercase leading-tight text-[#f4ead8]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#a9a194]">{item.text}</p>
                </article>
              ))}
              </div>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              <div className="border border-[#CFA34A]/30 bg-[#090806] p-7 md:p-9">
                <h3 className="mb-7 text-2xl font-black uppercase text-[#CFA34A]">É para você se...</h3>
                <ul className="space-y-4">
                  {fitList.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#d8d0c1]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#CFA34A]" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/10 bg-[#090806] p-7 md:p-9">
                <h3 className="mb-7 text-2xl font-black uppercase text-[#f4ead8]">Não é para você se...</h3>
                <ul className="space-y-4">
                  {notFitList.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#aaa194]"><X size={18} className="mt-0.5 shrink-0 text-[#7e7568]" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="conteudo-protocolo" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Conteúdo e entregáveis</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">Dois materiais. Um roteiro claro de 15 dias.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#bdb4a5]">Você recebe o protocolo principal e o material complementar em PDF. A proposta é observar seus sinais, treinar ajustes simples e aplicar cada aprendizado em situações reais.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[PRODUCT.format, '10–20 minutos por dia', 'Acesso por e-mail', `${PRODUCT.guaranteeDays} dias de garantia`].map((item) => (
                    <span key={item} className="border border-[#CFA34A]/25 bg-[#11100d] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#d8d0c1]">{item}</span>
                  ))}
                </div>
              </div>
              <ProductBundleVisual />
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {deliverables.map((item) => (
                <DeliverableCard key={item.title} {...item} />
              ))}
            </div>

            <div className="mt-20 max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Sumário do protocolo</span>
              <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-[#f4ead8] md:text-5xl">O que você trabalha em cada fase</h3>
              <p className="mt-5 text-base leading-relaxed text-[#aaa194] md:text-lg">A estrutura abaixo reúne os temas confirmados para o roteiro de 15 dias.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {protocolSteps.map((step) => (
                <article key={step.phase} className="border border-white/10 bg-[#11100d] p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.22em]">{step.phase}</p>
                  <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-[#f4ead8]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{step.text}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {step.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-3 text-sm font-bold text-[#d8d0c1]"><CheckCircle2 size={16} className="shrink-0 text-[#CFA34A]" />{topic}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="autora" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.72fr_1.28fr] md:items-center md:px-8">
            <div className="border border-[#CFA34A]/30 bg-[#090806] p-7 md:p-9" aria-label="Identidade editorial de Sol Lima">
              <div className="flex aspect-[4/5] items-center justify-center border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(207,163,74,.2),transparent_42%),linear-gradient(160deg,#19150e_0%,#080705_72%)]">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#CFA34A]/45 bg-[#0f0e0b] text-5xl font-black tracking-tight text-[#CFA34A]">SL</div>
              </div>
              <p className="mt-6 text-2xl font-black uppercase text-[#f4ead8]">Sol Lima</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#CFA34A]">Criadora e responsável editorial</p>
              <p className="mt-4 text-sm leading-relaxed text-[#8f8678]">Identificação editorial do {PRODUCT.name}, publicado por Sollima Studio.</p>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Quem responde pelo conteúdo</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">Autoria identificada. Escopo sem exageros.</h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-[#bdb4a5] md:text-lg">
                <p className="text-xl font-bold text-[#f4ead8]">Sol Lima é a criadora e responsável editorial do {PRODUCT.name}.</p>
                <p>Ela organiza a proposta, o escopo dos materiais e a comunicação do produto. Sua atuação pública reúne protocolos, livros e conteúdos digitais sobre relacionamentos.</p>
                <p>O material é educacional e trabalha auto-observação, comunicação e presença. Não é terapia, não oferece diagnóstico e não promete controlar a decisão de outras pessoas.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="border border-white/10 bg-[#090806] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#CFA34A]">Função no produto</p>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#d8d0c1]">Criadora e responsável editorial pelo Magnetus III.</p>
                </div>
                <div className="border border-white/10 bg-[#090806] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#CFA34A]">Atuação pública</p>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#d8d0c1]">Conteúdos e produtos digitais sobre relacionamentos e autoconhecimento.</p>
                </div>
              </div>
              <a
                href="https://sol-lima-bio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleLinkClick('author_public_profile', 'sol_lima_public_profile')}
                className="mt-7 inline-flex min-h-11 items-center border border-[#CFA34A]/40 px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#CFA34A] transition-colors hover:bg-[#CFA34A]/10"
              >
                Ver perfil público da autora
              </a>
            </div>
          </div>
        </section>

        <section id="prova" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Credibilidade verificável</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">Confira o que pode ser checado antes da compra.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#bdb4a5]">A página prioriza evidências documentais. Depoimentos só serão publicados quando houver origem e autorização de uso registradas.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <article className="border border-white/10 bg-[#11100d] p-7">
                <CheckCircle2 size={24} className="text-[#CFA34A]" />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A]">Escopo publicado</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[#f4ead8]">Você sabe o que recebe</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">Dois materiais em PDF, sumário em três fases, rotina de 15 dias, formato de acesso e preço estão descritos na oferta.</p>
                <button type="button" onClick={() => handleTrackedSectionNavigation('conteudo-protocolo', 'credibility_content')} className="mt-6 min-h-11 text-left text-sm font-black uppercase tracking-[0.1em] text-[#CFA34A]">Revisar conteúdo</button>
              </article>
              <article className="border border-white/10 bg-[#11100d] p-7">
                <CheckCircle2 size={24} className="text-[#CFA34A]" />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A]">Compra rastreável</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[#f4ead8]">Pagamento pela Kiwify</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">A compra é concluída no checkout da Kiwify, que envia a confirmação e mantém um canal oficial para pedidos de reembolso.</p>
                <a href="https://ajuda.kiwify.com.br/pt-br/article/como-faco-para-pedir-o-reembolso-de-um-produto-que-comprei-1kfom3h/" target="_blank" rel="noreferrer" onClick={() => handleLinkClick('credibility_kiwify_rules', 'kiwify_refund_help')} className="mt-6 inline-flex min-h-11 items-center text-sm font-black uppercase tracking-[0.1em] text-[#CFA34A]">Ver regra oficial</a>
              </article>
              <article className="border border-white/10 bg-[#11100d] p-7">
                <CheckCircle2 size={24} className="text-[#CFA34A]" />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A]">Responsabilidade</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[#f4ead8]">Identidade e suporte</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">Sol Lima responde pela edição do produto; Sollima Studio identifica a publicação; suporte, termos e privacidade são públicos.</p>
                <a href="/suporte.html" onClick={() => handleLinkClick('credibility_support', 'support_page')} className="mt-6 inline-flex min-h-11 items-center text-sm font-black uppercase tracking-[0.1em] text-[#CFA34A]">Abrir central de suporte</a>
              </article>
            </div>
            <div className="mt-8 flex gap-3 border border-[#CFA34A]/25 bg-[#0f0e0b] p-5">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-[#CFA34A]" />
              <p className="text-sm leading-relaxed text-[#bdb4a5]"><strong className="text-[#f4ead8]">Compromisso de prova:</strong> nenhum relato pessoal é exibido sem consentimento e vínculo com a compra documentados.</p>
            </div>
          </div>
        </section>

        <section id="garantia" className="border-y border-[#CFA34A]/15 bg-[#eee6d7] py-20 text-[#17120b]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.72fr_1.28fr] md:items-center md:px-8">
            <div className="flex items-center justify-center">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-[#B8842F] bg-[#17120b] text-[#eee6d7] shadow-[0_24px_70px_rgba(23,18,11,0.18)]">
                <ShieldCheck size={48} className="text-[#CFA34A]" />
                <p className="mt-3 text-4xl font-black">{PRODUCT.guaranteeDays}</p>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">dias</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B8842F]">Garantia com canal oficial</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight md:text-6xl">Acesse, leia e avalie por {PRODUCT.guaranteeDays} dias.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4c4132]">Se o material não fizer sentido para você, solicite o reembolso dentro de {PRODUCT.guaranteeDays} dias. O pedido pode ser feito pelo suporte da Sollima Studio ou diretamente no portal de reembolsos da Kiwify.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {['Pagamento pela Kiwify', `Prazo de ${PRODUCT.guaranteeDays} dias`, 'Pedido com canal oficial'].map((item) => (
                  <div key={item} className="flex gap-3 border border-[#B8842F]/25 bg-[#fbf6ea] p-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#B8842F]" /><p className="text-sm font-bold leading-relaxed text-[#3d3327]">{item}</p></div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://reembolso.kiwify.com.br/" target="_blank" rel="noreferrer" onClick={() => handleLinkClick('guarantee_refund_portal', 'kiwify_refund_portal')} className="inline-flex min-h-12 items-center justify-center bg-[#17120b] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#eee6d7]">Solicitar na Kiwify</a>
                <a href="/suporte.html" onClick={() => handleLinkClick('guarantee_support', 'support_page')} className="inline-flex min-h-12 items-center justify-center border border-[#8f6424]/40 px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#5c421b]">Falar com o suporte</a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#6b5a44]">O prazo de estorno varia conforme a forma de pagamento. Consulte as orientações oficiais da Kiwify.</p>
            </div>
          </div>
        </section>

        <section id="oferta" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="relative overflow-hidden border border-[#CFA34A]/40 bg-[linear-gradient(180deg,#14120e_0%,#080705_100%)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.58)] md:p-12">
              <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
                <div>
                  <ProductBundleVisual />
                </div>
                <div>
                  <div className="mb-6 inline-flex bg-[#CFA34A] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#090806] md:text-[10px] md:tracking-[0.18em]">Pagamento único • acesso digital</div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#CFA34A]">{PRODUCT.name}</p>
                  <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#f4ead8] md:text-6xl">{PRODUCT.subtitle}</h2>
                  <p className="mt-5 text-base font-bold leading-relaxed text-[#d8d0c1]">{PRODUCT.promise}</p>
                  <div className="mt-7 space-y-3">
                    {offerItems.map((item) => (
                      <div key={item} className="flex gap-3 border-b border-white/10 pb-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#CFA34A]" /><span className="text-sm leading-relaxed text-[#d8d0c1]">{item}</span></div>
                    ))}
                  </div>
                  <div className="mt-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.22em]">Investimento</p><p className="mt-1 text-6xl font-black tracking-tight text-[#CFA34A] md:text-8xl">{PRODUCT.priceLabel}</p><p className="mt-2 text-sm font-bold text-[#aaa194]">ou {PRODUCT.installmentLabel} no cartão</p></div>
                  <button type="button" onClick={() => handleCheckout('offer_primary')} className="gold-cta group mt-8 flex w-full items-center justify-center gap-3 rounded-sm px-8 py-6 text-lg font-black uppercase tracking-wide text-[#090806]">{checkoutCtaLabel} <ArrowRight size={22} /></button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#8f8678]"><Lock size={13} /> Pagamento seguro via Kiwify • garantia de {PRODUCT.guaranteeDays} dias.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#090806] pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="mb-12 text-center"><span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A] md:text-[10px] md:tracking-[0.24em]">Dúvidas frequentes</span><h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4ead8] md:text-4xl">Antes de entrar</h2></div>
            <div className="space-y-3">
              {faqs.map(([q, a], idx) => (
                <div key={q} className={`overflow-hidden border bg-[#11100d] ${openFaq === idx ? 'border-[#CFA34A]/45' : 'border-white/10'}`}>
                  <button type="button" aria-expanded={openFaq === idx} aria-controls={`faq-answer-${idx}`} className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => handleFaqToggle(idx, q)}><span className="text-sm font-black text-[#f4ead8] md:text-base">{q}</span><ChevronDown size={18} className={`shrink-0 text-[#CFA34A] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} /></button>
                  <div id={`faq-answer-${idx}`} role="region" aria-hidden={openFaq !== idx} className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-56 px-5 pb-5' : 'max-h-0 px-5'}`}><p className="text-sm leading-relaxed text-[#aaa194]">{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#070604] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 px-5 md:flex-row md:px-8">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFA34A] text-sm font-black italic text-[#090806]">M</span><span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">{PRODUCT.canonicalName}</span></div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-bold uppercase tracking-[0.14em] text-[#7e7568]"><a href="/suporte.html" onClick={() => handleLinkClick('footer_support', 'support_page')} className="hover:text-[#CFA34A]">Suporte</a><a href="/politica-de-privacidade.html" onClick={() => handleLinkClick('footer_privacy', 'privacy_policy')} className="hover:text-[#CFA34A]">Política de Privacidade</a><a href="/termos-de-uso.html" onClick={() => handleLinkClick('footer_terms', 'terms_of_use')} className="hover:text-[#CFA34A]">Termos de Uso</a><a href="mailto:contato@sollimastudio.com" onClick={() => handleLinkClick('footer_email', 'support_email')} className="hover:text-[#CFA34A]">Contato</a></div>
        </div>
        <p className="mx-auto mt-8 max-w-4xl px-5 text-center text-xs leading-relaxed text-[#686054]">{PRODUCT.canonicalName} &copy; {new Date().getFullYear()} Sollima Studio. Responsável editorial: Sol Lima. Este produto não garante resultados específicos. Resultados variam conforme aplicação individual.</p>
      </footer>

      {showMobileCta && (
        <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#CFA34A]/30 bg-[#090806]/96 px-4 py-3 backdrop-blur-md md:hidden">
          <button type="button" onClick={() => handleCheckout('sticky_mobile')} className="gold-cta flex w-full items-center justify-center gap-2 rounded-sm px-5 py-4 text-sm font-black uppercase tracking-wide text-[#090806]">{stickyCtaLabel} - {PRODUCT.priceLabel} <ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
