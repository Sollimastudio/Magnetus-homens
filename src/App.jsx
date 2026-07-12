import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  Crown,
  EyeOff,
  Lock,
  Menu,
  MessageSquareQuote,
  Star,
  Target,
  X,
} from 'lucide-react';

const productImages = {
  magnetus: '/images/ebook-magnetus-3.jpeg',
  antidoto: '/images/bonus-antidoto.jpeg',
  combo: '/images/combo-atual.png',
};

const mobileSequenceFrameCount = 192;

const getMobileSequenceFrame = (index) => `/images/mobile-scroll-sequence/frame_${String(index).padStart(4, '0')}.jpg`;

const navItems = [
  { label: 'Diagnóstico', id: 'diagnostico' },
  { label: 'Sinais', id: 'antivalor' },
  { label: 'Método', id: 'metodo' },
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
    title: 'Enxergar o problema',
    text: 'Identificar pressa, excesso de explicação, disponibilidade sem critério e busca de aprovação.',
  },
  {
    phase: 'Dias 6-10',
    title: 'Ajustar seus sinais',
    text: 'Treinar postura, voz, olhar, silêncio, limite e pequenas decisões que passam mais firmeza.',
  },
  {
    phase: 'Dias 11-15',
    title: 'Aplicar na vida real',
    text: 'Usar em conversas, encontros, trabalho e redes sociais sem transformar interesse em urgência.',
  },
];

const beforeAfter = [
  ['Antes', 'Responde no impulso, explica demais e fica disponível além da conta.'],
  ['Durante', 'Percebe os sinais de insegurança e ajusta postura, voz, silêncio e limite.'],
  ['Depois', 'Mostra menos carência, sustenta mais presença e para de se perder quando gosta.'],
];

const receiveStack = [
  { item: 'Magnetus III: Protocolo de Presença Masculina', value: 'R$ 127,00' },
  { item: 'Antídoto do Antivalor: mapa dos vazamentos invisíveis', value: 'R$ 67,00' },
  { item: 'Plano prático de aplicação em 15 dias', value: 'R$ 47,00' },
  { item: 'Acesso vitalício e atualizações do material', value: 'R$ 47,00' },
];

const comparisons = [
  'Menos que um corte + barba em muitos barbershops.',
  'Menos que um perfume usado para tentar resolver presença por cheiro.',
  'Menos que um jantar onde você pode chegar com a mesma postura insegura.',
  'Mais barato que tentar compensar insegurança comprando aparência.',
];

const testimonials = [
  {
    name: 'Ricardo M.',
    age: '34 anos',
    avatar: '/images/profiles/ricardo.png',
    text: 'Eu achava que precisava falar mais. O material me mostrou que eu estava passando pressa e explicando demais.',
  },
  {
    name: 'André S.',
    age: '28 anos',
    avatar: '/images/profiles/andre.png',
    text: 'Fiquei inseguro de comprar porque já tinha visto muita promessa vazia. Aqui foi diferente: é direto, simples e dá para aplicar no mesmo dia.',
  },
  {
    name: 'Paulo F.',
    age: '41 anos',
    avatar: '/images/profiles/paulo.png',
    text: 'A leitura é fácil e prática. Não vende fantasia. Me deu um roteiro para observar meu comportamento e corrigir aos poucos.',
  },
];

const faqs = [
  ['O acesso é imediato?', 'Sim. Após a confirmação do pagamento, você recebe o acesso completo no seu e-mail.'],
  ['É vídeo ou PDF?', 'São materiais digitais em PDF, otimizados para celular, tablet e computador.'],
  ['Funciona mesmo?', 'Funciona como protocolo de prática e auto-observação. Não é promessa mágica: depende de aplicação consistente.'],
  ['Serve para reconquistar alguém?', 'Não é sobre manipular ninguém. É sobre reconstruir eixo, postura e presença.'],
  ['Quanto tempo preciso por dia?', 'Reserve de 10 a 20 minutos para leitura, observação e execução dos exercícios.'],
  ['Posso pedir reembolso?', 'Sim. Você tem 7 dias de garantia pela plataforma de pagamento.'],
];

function ProductComboCard({ compact = false }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-[#CFA34A]/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-[#CFA34A]/35 bg-[#090806] p-2 shadow-[0_26px_90px_rgba(0,0,0,0.55)]">
        <img
          src={productImages.combo}
          alt="Combo completo Magnetus III e Antídoto do Antivalor"
          className={`w-full rounded-xl object-contain ${compact ? 'max-h-[760px]' : 'max-h-[680px]'}`}
          loading={compact ? 'lazy' : 'eager'}
        />
      </div>
      {!compact && (
        <div className="relative mx-4 -mt-5 border border-[#CFA34A]/30 bg-[#090806]/92 p-4 backdrop-blur-md">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Dois materiais. Uma correção.</p>
          <p className="mt-1 text-sm font-bold text-[#f4ead8]">Diagnosticar os vazamentos de valor e treinar presença com eixo, limite e autocontrole.</p>
        </div>
      )}
    </div>
  );
}

function ProductCoverCard({ image, title, subtitle, text, badge }) {
  return (
    <article className="overflow-hidden border border-[#CFA34A]/25 bg-[#11100d] shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
      <div className="relative bg-[#090806] p-3">
        <img src={image} alt={title} className="aspect-[3/4] w-full rounded-sm object-cover" loading="lazy" />
        <div className="absolute left-6 top-6 rounded-full bg-[#CFA34A] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#090806]">{badge}</div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-black uppercase leading-tight text-[#f4ead8]">{title}</h3>
        <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-[#CFA34A]">{subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{text}</p>
      </div>
    </article>
  );
}

function MobileScrollSequence({ onCheckout }) {
  const sectionRef = useRef(null);
  const preloadedFramesRef = useRef([]);
  const [frameIndex, setFrameIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [pinState, setPinState] = useState('before');

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const preloadedFrames = [];
    for (let index = 1; index <= mobileSequenceFrameCount; index += 1) {
      const image = new Image();
      image.src = getMobileSequenceFrame(index);
      preloadedFrames.push(image);
    }
    preloadedFramesRef.current = preloadedFrames;
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateFrame = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const nextPinState = rect.top > 0 ? 'before' : rect.bottom < window.innerHeight ? 'after' : 'active';
      const nextFrame = Math.min(
        mobileSequenceFrameCount,
        Math.max(1, Math.round(nextProgress * (mobileSequenceFrameCount - 1)) + 1),
      );

      setProgress(nextProgress);
      setPinState(nextPinState);
      setFrameIndex(nextFrame);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateFrame();
        rafId = null;
      });
    };

    updateFrame();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const captionOpacity = Math.max(0, 1 - progress / 0.32);
  const ctaProgress = Math.min(1, Math.max(0, (progress - 0.76) / 0.18));
  const frameStageClass = {
    before: 'absolute inset-x-0 top-0',
    active: 'fixed inset-0 z-[80]',
    after: 'absolute inset-x-0 bottom-0',
  }[pinState];

  return (
    <section id="mobile-scroll-offer" ref={sectionRef} className="relative h-[430svh] bg-[#070604] md:hidden">
      <div className={`${frameStageClass} h-[100svh] overflow-hidden bg-[#070604]`}>
        <img
          src={getMobileSequenceFrame(frameIndex)}
          alt="Homem confiante recebendo mensagens no celular"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,4,.48)_0%,rgba(7,6,4,.08)_42%,rgba(7,6,4,.82)_100%)]" />
        <div
          className="absolute left-5 right-5 top-24 border border-[#CFA34A]/35 bg-[#070604]/74 p-5 backdrop-blur-md"
          style={{ opacity: captionOpacity, transform: `translateY(${progress * -24}px)` }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Arraste para ver a mudança</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.92] tracking-tight text-[#f4ead8]">
            Quando sua presença muda, a resposta muda junto.
          </h2>
        </div>
        {progress > 0.76 && (
          <div
            className="absolute inset-x-5 bottom-7"
            style={{
              opacity: ctaProgress,
              transform: `translateY(${(1 - ctaProgress) * 28}px)`,
              pointerEvents: ctaProgress > 0.85 ? 'auto' : 'none',
            }}
          >
            <div className="border border-[#CFA34A]/35 bg-[#070604]/82 p-4 backdrop-blur-md">
              <p className="mb-4 text-center text-sm font-bold leading-relaxed text-[#f4ead8]">
                O método completo está pronto para acessar agora.
              </p>
              <button type="button" onClick={onCheckout} className="gold-cta flex w-full items-center justify-center gap-3 rounded-sm px-6 py-5 text-sm font-black uppercase tracking-wide text-[#090806]">
                Começar hoje - R$ 79,90
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
      const mobileSequence = document.getElementById('mobile-scroll-offer');
      if (mobileSequence) {
        const showAfterSequence = window.scrollY > mobileSequence.offsetTop + mobileSequence.offsetHeight - window.innerHeight * 0.2;
        setShowMobileCta(showAfterSequence);
        return;
      }
      setShowMobileCta(window.scrollY > window.innerHeight * 0.82);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 74;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCheckout = () => {
    window.open('https://pay.kiwify.com.br/TX2Ao2R', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090806] pb-24 text-[#eee8dd] selection:bg-[#CFA34A] selection:text-[#090806] md:pb-0">
      <nav className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? 'border-b border-[#CFA34A]/25 bg-[#090806]/95 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl' : 'bg-[#090806]/85 py-4 backdrop-blur-xl'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={() => scrollToSection('conteudo')} className="flex items-center gap-3 text-left">
            <img
              src="/images/logo-favicon.png"
              alt="Magnetus III"
              className="h-11 w-11 shrink-0 rounded-sm object-cover shadow-[0_0_24px_rgba(207,163,74,0.4)]"
            />
            <span className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Magnetus III</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#9b9488]">método de presença</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d8d0c1] transition-colors hover:text-[#CFA34A]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta rounded-sm px-6 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#090806]">
              Quero começar hoje
            </button>
          </div>

          <button type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} className="p-2 text-[#CFA34A] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div className={`fixed inset-0 z-[105] flex flex-col justify-center bg-[#090806] px-7 transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="relative flex flex-col gap-6">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-left text-3xl font-black uppercase tracking-tight text-[#f2eadc]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta mt-5 rounded-sm px-6 py-5 text-base font-black uppercase tracking-[0.12em] text-[#090806]">
              Quero começar hoje
            </button>
          </div>
        </div>
      </nav>

      <main id="conteudo">
        <section className="relative min-h-[100svh] overflow-hidden bg-[#090806]">
          <img
            src="/images/hero-wide.png"
            alt="Homem em ambiente escuro com presença séria"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] lg:object-contain lg:object-right"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,6,.98)_0%,rgba(9,8,6,.9)_36%,rgba(9,8,6,.55)_66%,rgba(9,8,6,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,.68)_0%,rgba(9,8,6,.08)_38%,rgba(9,8,6,.82)_100%)] md:bg-[linear-gradient(180deg,rgba(9,8,6,.18)_0%,rgba(9,8,6,.1)_52%,rgba(9,8,6,.58)_100%)]" />
          <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(207,163,74,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(207,163,74,.35)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-5 pb-10 pt-24 md:grid-cols-[0.88fr_1.12fr] md:px-8 md:pb-8 md:pt-24 xl:pt-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CFA34A]/35 bg-[#090806]/70 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CFA34A]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Método direto + bônus prático</span>
              </div>
              <h1 className="max-w-5xl text-[43px] font-black uppercase leading-[0.93] tracking-tight text-[#f4ead8] md:text-[64px] xl:text-[76px] 2xl:text-[84px]">
                Pare de parecer ansioso. <span className="text-[#CFA34A]">Construa presença.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#cfc7b8] md:text-lg xl:text-xl">
                Você pode estar bem vestido, ter assunto e ainda assim passar pressa, insegurança e necessidade de aprovação. O Magnetus III é um método de 15 dias para ajustar os sinais que as pessoas percebem antes das suas palavras.
              </p>
              <p className="mt-4 max-w-2xl border border-[#CFA34A]/30 bg-[#090806]/65 p-4 text-base font-black leading-relaxed text-[#f4ead8] backdrop-blur-sm md:text-lg">
                Quando você tenta convencer demais, passa insegurança. Quando age com calma, passa presença.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta group flex w-full items-center justify-center gap-3 rounded-sm px-8 py-5 text-base font-black uppercase tracking-wide text-[#090806] sm:w-auto">
                  Quero começar hoje
                  <ArrowRight size={20} />
                </button>
                <button type="button" onClick={() => scrollToSection('diagnostico')} className="flex w-full items-center justify-center rounded-sm border border-[#CFA34A]/45 px-8 py-5 text-sm font-black uppercase tracking-wide text-[#CFA34A] hover:bg-[#CFA34A]/10 sm:w-auto">
                  Fazer mini diagnóstico
                </button>
              </div>
              <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
                {['Acesso imediato', 'PDF prático', 'Bônus prático', 'Garantia 7 dias'].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                    <CheckCircle2 size={16} className="mb-3 text-[#CFA34A]" />
                    <p className="text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-[#d8d0c1]">{item}</p>
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
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Mini diagnóstico</span>
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

        <section id="antivalor" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O ponto central</span>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">Não é falta de dinheiro, shape ou frase pronta. É postura emocional.</h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#bdb4a5]">Antes de qualquer palavra, as pessoas percebem seu ritmo, sua pressa, seu silêncio e seus limites. Quando esses sinais estão confusos, você pode tentar impressionar e ainda assim parecer inseguro.</p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {symptoms.map((item) => (
                <article key={item.title} className="border border-white/10 bg-[#11100d] p-7">
                  <div className="mb-6 text-[#CFA34A]">{item.icon}</div>
                  <h3 className="text-xl font-black uppercase leading-tight text-[#f4ead8]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#a9a194]">{item.text}</p>
                </article>
              ))}
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

        <section className="bg-[#eee6d7] py-24 text-[#17120b]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#B8842F]">Decisão simples</span>
              <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">Custa menos que muita coisa comprada para parecer mais confiante.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4c4132]">Corte, barba e perfume ajudam no visual. Mas presença vem do que você comunica com postura, calma, voz, limite e atitude.</p>
            </div>
            <div className="border border-[#B8842F]/25 bg-[#fbf6ea] p-5 shadow-[0_30px_80px_rgba(23,18,11,0.12)] md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#B8842F]/20 pb-5">
                <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8842F]">Investimento</p><p className="mt-1 text-4xl font-black text-[#17120b]">R$ 79,90</p></div>
                <Crown size={42} className="text-[#B8842F]" />
              </div>
              <div className="space-y-3">
                {comparisons.map((item) => (
                  <div key={item} className="flex gap-3 border-b border-[#B8842F]/10 pb-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#B8842F]" /><p className="text-sm font-bold leading-relaxed text-[#3d3327]">{item}</p></div>
                ))}
              </div>
              <button type="button" onClick={() => scrollToSection('oferta')} className="mt-8 flex w-full items-center justify-center gap-3 bg-[#17120b] px-6 py-5 text-sm font-black uppercase tracking-wide text-[#eee6d7]">Ver oferta completa <ArrowRight size={18} /></button>
            </div>
          </div>
        </section>

        <section id="metodo" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O que você recebe</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">Entenda seus sinais. Treine novas respostas.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#bdb4a5]">O combo une o Magnetus III ao Antídoto do Antivalor. Um material mostra o que enfraquece sua presença, o outro traz práticas para você repetir e melhorar com consistência.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <ProductCoverCard image={productImages.magnetus} title="Magnetus III" subtitle="Método de presença" badge="15 dias" text="Postura, voz, silêncio, limite e autocontrole para passar mais firmeza sem tentar se provar o tempo todo." />
                <ProductCoverCard image={productImages.antidoto} title="Antídoto do Antivalor" subtitle="Bônus estratégico" badge="bônus" text="Mapa dos sinais de pressa, carência e reação impulsiva que podem diminuir sua presença." />
              </div>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {protocolSteps.map((step) => (
                <article key={step.phase} className="border border-white/10 bg-[#11100d] p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">{step.phase}</p>
                  <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-[#f4ead8]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#090806] py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-4xl">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O que muda na prática</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">Você não precisa virar outra pessoa. Precisa parar de agir contra você.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {beforeAfter.map(([title, text]) => (
                <div key={title} className="border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-lg font-black uppercase text-[#CFA34A]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#bdb4a5]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="autora" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">A criadora do método</span>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-[#f4ead8] md:text-6xl">Sol Lima</h2>
            <div className="mt-7 max-w-3xl space-y-5 text-base leading-relaxed text-[#bdb4a5] md:text-lg">
              <p className="text-xl font-bold text-[#f4ead8]">Eu estudo presença, magnetismo e os sinais que mudam a forma como uma pessoa é percebida.</p>
              <p>O Magnetus nasceu ao observar homens capazes que perdiam força social por postura, fala acelerada, urgência emocional e falta de limite.</p>
              <p>Meu trabalho é transformar comportamento, comunicação e autoimagem em práticas simples, sem manipulação e sem prometer controle sobre outras pessoas.</p>
            </div>
            <blockquote className="mt-8 border border-[#CFA34A]/25 bg-[#090806] p-6 text-lg font-bold italic leading-relaxed text-[#f4ead8]">"Presença não é ser notado. É não se perder tentando ser escolhido."</blockquote>
          </div>
        </section>

        <section className="bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Avaliações</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">O que homens perceberam ao aplicar</h2>
              <div className="mt-6 flex items-center justify-center gap-2">{[1,2,3,4,5].map((i) => <Star key={i} size={18} className="fill-[#CFA34A] text-[#CFA34A]" />)}<span className="ml-2 text-sm text-[#aaa194]">Relatos de clientes</span></div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="relative border border-white/10 bg-[#090806] p-6">
                  <MessageSquareQuote size={24} className="absolute right-5 top-5 text-[#CFA34A]/35" />
                  <p className="min-h-[120px] pr-8 text-sm italic leading-relaxed text-[#d8d0c1]">"{testimonial.text}"</p>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-4">
                    <img src={testimonial.avatar} alt={`Foto de ${testimonial.name}`} className="h-12 w-12 rounded-full border border-[#CFA34A]/35 object-cover object-top" loading="lazy" />
                    <div>
                      <p className="text-sm font-black text-[#f4ead8]">{testimonial.name}</p>
                      <p className="mt-1 text-xs text-[#7e7568]">{testimonial.age}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MobileScrollSequence onCheckout={handleCheckout} />

        <section id="oferta" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="relative overflow-hidden border border-[#CFA34A]/40 bg-[linear-gradient(180deg,#14120e_0%,#080705_100%)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.58)] md:p-12">
              <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
                <div>
                  <ProductComboCard compact />
                </div>
                <div>
                  <div className="mb-6 inline-flex bg-[#CFA34A] px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#090806]">Lote promocional disponível</div>
                  <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#f4ead8] md:text-6xl">Acesso completo ao Magnetus III</h2>
                  <p className="mt-5 text-base font-bold leading-relaxed text-[#d8d0c1]">Para diminuir sinais de insegurança e construir presença com postura, voz, silêncio, limite e autocontrole.</p>
                  <div className="mt-7 space-y-3">
                    {receiveStack.map((row) => (
                      <div key={row.item} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"><div className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#CFA34A]" /><span className="text-sm leading-relaxed text-[#d8d0c1]">{row.item}</span></div><span className="shrink-0 text-sm font-bold text-[#7e7568] line-through">{row.value}</span></div>
                    ))}
                  </div>
                  <div className="mt-8"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Hoje por apenas</p><p className="mt-1 text-6xl font-black tracking-tight text-[#CFA34A] md:text-8xl">R$ 79,90</p><p className="mt-2 text-sm font-bold text-[#aaa194]">ou 6x de R$ 13,32 no cartão</p></div>
                  <button type="button" onClick={handleCheckout} className="gold-cta group mt-8 flex w-full items-center justify-center gap-3 rounded-sm px-8 py-6 text-lg font-black uppercase tracking-wide text-[#090806]">Quero começar hoje <ArrowRight size={22} /></button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#8f8678]"><Lock size={13} /> Pagamento seguro via Kiwify. Acesso enviado por e-mail.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#090806] pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="mb-12 text-center"><span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Dúvidas frequentes</span><h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4ead8] md:text-4xl">Antes de entrar</h2></div>
            <div className="space-y-3">
              {faqs.map(([q, a], idx) => (
                <div key={q} className={`overflow-hidden border bg-[#11100d] ${openFaq === idx ? 'border-[#CFA34A]/45' : 'border-white/10'}`}>
                  <button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}><span className="text-sm font-black text-[#f4ead8] md:text-base">{q}</span><ChevronDown size={18} className={`shrink-0 text-[#CFA34A] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} /></button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-56 px-5 pb-5' : 'max-h-0 px-5'}`}><p className="text-sm leading-relaxed text-[#aaa194]">{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#070604] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 px-5 md:flex-row md:px-8">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFA34A] text-sm font-black italic text-[#090806]">M</span><span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Magnetus III</span></div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7e7568]"><a href="/politica-de-privacidade.html" className="hover:text-[#CFA34A]">Política de Privacidade</a><a href="/termos-de-uso.html" className="hover:text-[#CFA34A]">Termos de Uso</a><a href="mailto:contato@sollimastudio.com" className="hover:text-[#CFA34A]">Contato</a></div>
        </div>
        <p className="mx-auto mt-8 max-w-4xl px-5 text-center text-[10px] leading-relaxed text-[#686054]">Magnetus III &copy; {new Date().getFullYear()} Sollima Studio. Este produto não garante resultados específicos. Resultados variam conforme aplicação individual.</p>
      </footer>

      {showMobileCta && (
        <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#CFA34A]/30 bg-[#090806]/96 px-4 py-3 backdrop-blur-md md:hidden">
          <button type="button" onClick={handleCheckout} className="gold-cta flex w-full items-center justify-center gap-2 rounded-sm px-5 py-4 text-sm font-black uppercase tracking-wide text-[#090806]">Começar hoje - R$ 79,90 <ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
