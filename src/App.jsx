import { useEffect, useState } from 'react';
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
  ShieldCheck,
  Star,
  Target,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Diagnóstico', id: 'diagnostico' },
  { label: 'Antivalor', id: 'antivalor' },
  { label: 'Protocolo', id: 'metodo' },
  { label: 'Oferta', id: 'oferta' },
];

const leakSignals = [
  'Responde rápido demais para não perder atenção.',
  'Explica demais para parecer interessante.',
  'Insiste quando deveria observar.',
  'Tenta impressionar antes de construir respeito.',
  'Confunde intensidade com presença.',
  'Aceita migalha de atenção e chama isso de estratégia.',
];

const symptoms = [
  {
    icon: <EyeOff size={28} />,
    title: 'Você parece disponível demais',
    text: 'Não porque gosta. Mas porque sua pressa comunica medo de perder espaço antes mesmo de existir espaço.',
  },
  {
    icon: <Brain size={28} />,
    title: 'Você fala para aliviar ansiedade',
    text: 'Responde rápido, explica demais, pede sinais demais. O corpo entrega urgência antes da frase terminar.',
  },
  {
    icon: <Target size={28} />,
    title: 'Você tenta provar valor',
    text: 'E quanto mais tenta provar, mais denuncia falta de eixo. O homem perde valor quando tenta provar valor.',
  },
];

const valueComparisons = [
  'Menos que um corte + barba em muitos barbershops.',
  'Menos que um perfume usado para tentar resolver presença por cheiro.',
  'Menos que um jantar onde você pode chegar com a mesma postura insegura de sempre.',
  'Menos que um tênis comprado para parecer mais confiante enquanto o corpo continua entregando ansiedade.',
];

const fitList = [
  'Homens que querem parar de procurar aprovação antes de agir.',
  'Homens que percebem que postura, voz, silêncio e limite também comunicam valor.',
  'Homens que preferem um plano curto, direto e aplicável a fantasia de guru alfa.',
  'Homens que querem corrigir sinais de carência, pressa e reatividade sem virar personagem.',
];

const notFitList = [
  'Quem procura manipulação, script pronto ou promessa de conquista garantida.',
  'Quem quer controlar a escolha de outra pessoa em vez de reconstruir o próprio eixo.',
  'Quem espera resultado sem leitura, prática e auto-observação diária.',
  'Quem precisa de substituto para terapia, acompanhamento médico ou tratamento psicológico.',
];

const protocolSteps = [
  {
    phase: 'Dias 1-5',
    title: 'Corte do Antivalor',
    text: 'Você identifica onde parece ansioso: pressa, excesso de explicação, disponibilidade sem critério e necessidade de validação.',
  },
  {
    phase: 'Dias 6-10',
    title: 'Construção do Eixo',
    text: 'Você treina postura, voz, olhar, silêncio, limite e pequenas decisões que comunicam firmeza sem teatralizar masculinidade.',
  },
  {
    phase: 'Dias 11-15',
    title: 'Aplicação Social',
    text: 'Você aplica em conversas, encontros, trabalho e redes sociais para parar de transformar interesse em urgência.',
  },
];

const beforeAfter = [
  ['Antes', 'Responde para aliviar ansiedade, tenta explicar valor, fica disponível demais e se sente escolhido ou rejeitado rápido demais.'],
  ['Durante', 'Observa os vazamentos, corta antivalor, ajusta postura, voz, silêncio, limite e autocontrole.'],
  ['Depois', 'Comunica menos carência, sustenta mais presença e para de perder eixo quando gosta de alguém.'],
];

const receiveStack = [
  { item: 'Magnetus III: Protocolo de Presença Masculina', value: 'R$ 127,00' },
  { item: 'Antivalor: mapa dos sinais que reduzem seu valor percebido', value: 'R$ 67,00' },
  { item: 'Plano prático de aplicação em 15 dias', value: 'R$ 47,00' },
  { item: 'Acesso vitalício e atualizações do material', value: 'R$ 47,00' },
];

const testimonials = [
  {
    name: 'Ricardo M.',
    age: '34 anos',
    text: 'Eu achava que precisava falar mais. O material me mostrou que meu problema era urgência, postura e excesso de explicação.',
  },
  {
    name: 'André S.',
    age: '28 anos',
    text: 'O Antivalor bateu em pontos que eu fazia no automático. Em poucos dias comecei a perceber onde eu entregava carência.',
  },
  {
    name: 'Paulo F.',
    age: '41 anos',
    text: 'A leitura é direta e aplicável. Não me vendeu fantasia. Me deu um roteiro para observar e corrigir comportamento.',
  },
];

const faqs = [
  {
    q: 'O acesso é imediato?',
    a: 'Sim. Após a confirmação do pagamento, você recebe o acesso completo no seu e-mail e pode começar o protocolo hoje.',
  },
  {
    q: 'É vídeo ou PDF?',
    a: 'O Magnetus III e o Antivalor são materiais digitais em PDF, otimizados para celular, tablet e computador.',
  },
  {
    q: 'Funciona mesmo?',
    a: 'O protocolo organiza práticas de presença, postura, comunicação e autorregulação. Não é promessa mágica: a evolução depende de aplicação consistente.',
  },
  {
    q: 'Serve para reconquistar alguém?',
    a: 'O protocolo não é sobre manipulação. É sobre reconstruir eixo, postura e presença. Isso pode mudar a forma como você é percebido, mas não controla a escolha de ninguém.',
  },
  {
    q: 'Quanto tempo preciso por dia?',
    a: 'Reserve de 10 a 20 minutos para leitura, observação e execução dos exercícios. A proposta é simples, diária e direta.',
  },
  {
    q: 'Posso pedir reembolso?',
    a: 'Sim. Você tem 7 dias de garantia pela plataforma de pagamento. Se o material não fizer sentido para você, solicite o reembolso dentro do prazo.',
  },
];

function ProductComboCard() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-8 rounded-full bg-[#CFA34A]/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-[#CFA34A]/25 bg-[radial-gradient(circle_at_top_right,rgba(207,163,74,.20),transparent_35%),linear-gradient(145deg,#18130b,#080705_58%,#1b1207)] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.55)]">
        <div className="grid grid-cols-2 gap-4">
          {[
            ['MAGNETUS III', 'Protocolo de Presença', '15 dias'],
            ['ANTIVALOR', 'Mapa dos Vazamentos', 'Bônus'],
          ].map(([title, subtitle, badge]) => (
            <div key={title} className="min-h-[250px] rounded-xl border border-[#CFA34A]/35 bg-[#090806] p-5 shadow-[inset_0_0_45px_rgba(207,163,74,.08)]">
              <div className="mb-10 inline-flex rounded-full bg-[#CFA34A] px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-[#090806]">{badge}</div>
              <p className="text-2xl font-black uppercase leading-none text-[#CFA34A]">{title}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[.18em] text-[#d8d0c1]">{subtitle}</p>
              <div className="mt-10 h-1 w-16 bg-[#CFA34A]" />
            </div>
          ))}
        </div>
        <div className="mt-5 border border-[#CFA34A]/25 bg-[#090806]/80 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Dois materiais. Uma correção.</p>
          <p className="mt-1 text-sm font-bold text-[#f4ead8]">Diagnosticar os vazamentos de valor e treinar presença com eixo, limite e autocontrole.</p>
        </div>
      </div>
    </div>
  );
}

function MockupPanel() {
  return (
    <div className="w-full border border-[#CFA34A]/20 bg-[linear-gradient(145deg,#15120e,#070604)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ['MAGNETUS III', 'Protocolo de Presença Masculina', 'postura · voz · silêncio · limite'],
          ['ANTIVALOR', 'Mapa dos Sinais que Reduzem Valor', 'pressa · carência · reatividade'],
        ].map(([title, subtitle, tags]) => (
          <div key={title} className="min-h-[320px] border border-[#CFA34A]/30 bg-[#090806] p-6">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#CFA34A]">material digital</p>
            <h3 className="mt-12 text-4xl font-black uppercase leading-none text-[#f4ead8]">{title}</h3>
            <p className="mt-5 text-sm font-bold uppercase tracking-[.14em] text-[#CFA34A]">{subtitle}</p>
            <p className="mt-16 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[.14em] text-[#8f8678]">{tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterVisual() {
  return (
    <div className="relative overflow-hidden border border-[#CFA34A]/20 bg-[#11100d] p-7 min-h-[360px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,163,74,.18),transparent_35%)]" />
      <div className="relative grid h-full gap-4 sm:grid-cols-2">
        <div className="flex min-h-[260px] flex-col justify-between border border-red-900/35 bg-red-950/10 p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-300">antes</p>
          <div>
            <p className="text-3xl font-black uppercase leading-none text-[#f4ead8]">Reativo</p>
            <p className="mt-3 text-sm leading-relaxed text-[#aaa194]">pressa, excesso de explicação, urgência e busca de aprovação</p>
          </div>
        </div>
        <div className="flex min-h-[260px] flex-col justify-between border border-[#CFA34A]/45 bg-[#CFA34A]/10 p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">depois</p>
          <div>
            <p className="text-3xl font-black uppercase leading-none text-[#f4ead8]">Comando de si</p>
            <p className="mt-3 text-sm leading-relaxed text-[#d8d0c1]">postura, silêncio, limite, autocontrole e presença sustentada</p>
          </div>
        </div>
      </div>
      <div className="relative mt-5 border-t border-[#CFA34A]/20 pt-5">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Antes e depois</p>
        <p className="mt-2 max-w-md text-lg font-black uppercase leading-tight text-[#f4ead8]">Da reatividade para o comando de si.</p>
      </div>
    </div>
  );
}

function AuthorVisual() {
  return (
    <div className="relative mx-auto w-72 max-w-full md:mx-0">
      <div className="absolute inset-0 translate-x-4 translate-y-4 border border-[#CFA34A]" />
      <div className="relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden border border-[#CFA34A]/25 bg-[radial-gradient(circle_at_top,rgba(207,163,74,.28),transparent_42%),linear-gradient(180deg,#1b140a,#070604)] p-7">
        <div className="absolute left-7 top-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#CFA34A] text-2xl font-black text-[#090806]">S</div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#CFA34A]">criadora do método</p>
          <h3 className="mt-3 text-5xl font-black uppercase leading-none text-[#f4ead8]">Sol<br />Lima</h3>
        </div>
      </div>
    </div>
  );
}

function SecurityVisuals() {
  return (
    <div className="grid gap-5 md:grid-cols-[0.7fr_1fr] md:items-center">
      <div className="mx-auto flex aspect-square w-full max-w-xs flex-col items-center justify-center rounded-full border border-[#CFA34A]/35 bg-[#11100d] p-8 text-center shadow-[0_0_60px_rgba(207,163,74,.12)]">
        <ShieldCheck size={64} className="text-[#CFA34A]" />
        <p className="mt-5 text-5xl font-black text-[#CFA34A]">7</p>
        <p className="text-xs font-black uppercase tracking-[.22em] text-[#f4ead8]">dias de garantia</p>
      </div>
      <div className="grid gap-4">
        {['Pagamento seguro', 'Acesso imediato por e-mail', 'Material digital em PDF', 'Garantia real pela plataforma'].map((item) => (
          <div key={item} className="flex items-center gap-4 border border-[#CFA34A]/20 bg-[#11100d] p-5">
            <CheckCircle2 className="shrink-0 text-[#CFA34A]" size={20} />
            <p className="text-sm font-black uppercase tracking-[.12em] text-[#d8d0c1]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
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
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[#CFA34A] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-[#090806]">
        Pular para o conteúdo
      </a>

      <nav className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? 'border-b border-[#CFA34A]/25 bg-[#090806]/95 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={() => scrollToSection('conteudo')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CFA34A] text-lg font-black italic text-[#090806] shadow-[0_0_24px_rgba(207,163,74,0.4)]">M</span>
            <span className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Magnetus III</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#9b9488]">corte do antivalor</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d8d0c1] transition-colors hover:text-[#CFA34A]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta rounded-sm px-6 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#090806] transition-all active:translate-y-px">
              Quero cortar meu antivalor
            </button>
          </div>

          <button type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} className="p-2 text-[#CFA34A] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div className={`fixed inset-0 z-[105] flex flex-col justify-center bg-[#090806] px-7 transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="absolute left-8 top-24 text-[120px] font-black leading-none text-[#CFA34A]/10">M</div>
          <div className="relative flex flex-col gap-6">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-left text-3xl font-black uppercase tracking-tight text-[#f2eadc]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta mt-5 rounded-sm px-6 py-5 text-base font-black uppercase tracking-[0.12em] text-[#090806]">
              Quero cortar meu antivalor
            </button>
          </div>
        </div>
      </nav>

      <main id="conteudo">
        <section className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_75%_18%,rgba(207,163,74,.22),transparent_30%),radial-gradient(circle_at_90%_72%,rgba(102,57,12,.28),transparent_36%),linear-gradient(100deg,#090806_0%,#0b0906_45%,#17100a_100%)]">
          <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(207,163,74,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(207,163,74,.35)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090806] via-[#090806]/50 to-transparent" />

          <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-32">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CFA34A]/35 bg-[#090806]/70 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CFA34A]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Protocolo completo + bônus Antivalor</span>
              </div>
              <h1 className="max-w-5xl text-[43px] font-black uppercase leading-[0.93] tracking-tight text-[#f4ead8] md:text-7xl xl:text-[88px]">
                Corte o antivalor. <span className="text-[#CFA34A]">Construa presença.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#cfc7b8] md:text-xl">
                Você pode estar bem vestido, ter assunto e ainda assim comunicar ansiedade, pressa e necessidade de aprovação. O Magnetus III é um protocolo de 15 dias para corrigir os sinais que reduzem seu valor percebido antes mesmo da conversa começar.
              </p>
              <p className="mt-5 max-w-2xl border-l-2 border-[#CFA34A] pl-4 text-lg font-black leading-relaxed text-[#f4ead8]">
                O homem perde valor quando tenta provar valor.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToSection('oferta')} className="gold-cta group flex w-full items-center justify-center gap-3 rounded-sm px-8 py-5 text-base font-black uppercase tracking-wide text-[#090806] transition-all active:translate-y-px sm:w-auto">
                  Quero cortar meu antivalor
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={() => scrollToSection('diagnostico')} className="flex w-full items-center justify-center rounded-sm border border-[#CFA34A]/45 px-8 py-5 text-sm font-black uppercase tracking-wide text-[#CFA34A] transition-colors hover:bg-[#CFA34A]/10 sm:w-auto">
                  Fazer mini diagnóstico
                </button>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
                {['Acesso imediato', 'PDF prático', 'Bônus Antivalor', 'Garantia 7 dias'].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                    <CheckCircle2 size={16} className="mb-3 text-[#CFA34A]" />
                    <p className="text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-[#d8d0c1]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <ProductComboCard />
          </div>
        </section>

        <section id="diagnostico" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Mini diagnóstico</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-6xl">
                  Você está entregando antivalor quando...
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#bdb4a5]">
                  Se você marcou mentalmente dois ou mais itens, o problema não é falta de potencial. É vazamento de valor percebido.
                </p>
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
              <p className="text-2xl font-black uppercase leading-tight text-[#f4ead8] md:text-4xl">
                O problema não é você gostar. É você perder eixo quando gosta.
              </p>
            </div>
          </div>
        </section>

        <section id="antivalor" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O conflito real</span>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                  Não é falta de dinheiro, shape ou frase pronta. É postura emocional.
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#bdb4a5]">
                Antes de qualquer palavra, as pessoas leem seu ritmo, sua pressa, seu silêncio, seu limite e sua necessidade de aprovação. Quando esses sinais estão desalinhados, você pode tentar impressionar e ainda assim parecer inseguro.
              </p>
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
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#d8d0c1]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#CFA34A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-white/10 bg-[#090806] p-7 md:p-9">
                <h3 className="mb-7 text-2xl font-black uppercase text-[#f4ead8]">Não é para você se...</h3>
                <ul className="space-y-4">
                  {notFitList.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#aaa194]">
                      <X size={18} className="mt-0.5 shrink-0 text-[#7e7568]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eee6d7] py-24 text-[#17120b]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#B8842F]">Quebra de objeção</span>
              <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                Custa menos que o que muitos homens compram para parecer confiantes.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4c4132]">
                Barbershop melhora o visual por alguns dias. Perfume chama atenção por alguns segundos. Um jantar pode virar tentativa cara de compensar insegurança. O Magnetus trabalha o que sustenta tudo isso: postura, leitura emocional, comunicação e presença.
              </p>
              <p className="mt-5 max-w-2xl text-base font-bold leading-relaxed text-[#17120b]">
                Não substitui terapia, experiência de vida ou maturidade real. Mas corrige uma camada que quase ninguém ensina: como você é percebido quando entra, fala, silencia e decide.
              </p>
            </div>

            <div className="border border-[#B8842F]/25 bg-[#fbf6ea] p-5 shadow-[0_30px_80px_rgba(23,18,11,0.12)] md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#B8842F]/20 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8842F]">Investimento</p>
                  <p className="mt-1 text-4xl font-black text-[#17120b]">R$ 79,90</p>
                </div>
                <Crown size={42} className="text-[#B8842F]" />
              </div>
              <div className="space-y-3">
                {valueComparisons.map((item) => (
                  <div key={item} className="flex gap-3 border-b border-[#B8842F]/10 pb-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#B8842F]" />
                    <p className="text-sm font-bold leading-relaxed text-[#3d3327]">{item}</p>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => scrollToSection('oferta')} className="mt-8 flex w-full items-center justify-center gap-3 bg-[#17120b] px-6 py-5 text-sm font-black uppercase tracking-wide text-[#eee6d7] transition-colors hover:bg-[#2c2114]">
                Ver oferta completa
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section id="metodo" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O que você recebe</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">
                  Diagnóstico para cortar. Protocolo para construir.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#bdb4a5]">
                  O combo une o Magnetus III ao Antivalor. Um material mostra o que enfraquece sua presença por dentro, o outro organiza práticas para reconstruir eixo por repetição.
                </p>
              </div>
              <MockupPanel />
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

        <section className="bg-[#090806] py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8">
            <BeforeAfterVisual />

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">O que muda na prática</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">
                Você não muda virando outra pessoa. Muda parando de se abandonar.
              </h2>
              <div className="mt-8 grid gap-4">
                {beforeAfter.map(([title, text]) => (
                  <div key={title} className="border border-white/10 bg-white/[0.035] p-6">
                    <h3 className="text-lg font-black uppercase text-[#CFA34A]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#bdb4a5]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="autora" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[340px_1fr] md:px-8">
            <AuthorVisual />
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">A criadora do método</span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-[#f4ead8] md:text-6xl">Sol Lima</h2>
              <div className="mt-7 max-w-3xl space-y-5 text-base leading-relaxed text-[#bdb4a5] md:text-lg">
                <p className="text-xl font-bold text-[#f4ead8]">Eu estudo presença, magnetismo e os sinais que mudam a forma como uma pessoa é percebida.</p>
                <p>O Magnetus nasceu da observação de homens capazes que perdiam força social por detalhes de postura, fala, urgência emocional e falta de eixo.</p>
                <p>Meu trabalho é traduzir comportamento, comunicação e autoimagem em práticas aplicáveis, sem vender manipulação e sem prometer controle sobre outras pessoas.</p>
              </div>
              <blockquote className="mt-8 border border-[#CFA34A]/25 bg-[#090806] p-6 text-lg font-bold italic leading-relaxed text-[#f4ead8]">
                "Presença não é ser notado. É não se perder tentando ser escolhido."
              </blockquote>
            </div>
          </div>
        </section>

        <section className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Segurança da compra</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                  Compra segura, acesso imediato e garantia real.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[#bdb4a5]">
                  Você recebe os materiais no e-mail após a confirmação. Se dentro de 7 dias perceber que não é para você, solicite o reembolso pela própria plataforma.
                </p>
              </div>
              <SecurityVisuals />
            </div>
          </div>
        </section>

        <section className="bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Prova social</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                O que homens percebem ao aplicar
              </h2>
              <div className="mt-6 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} className="fill-[#CFA34A] text-[#CFA34A]" />
                ))}
                <span className="ml-2 text-sm text-[#aaa194]">Relatos e padrões observados</span>
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="relative border border-white/10 bg-[#090806] p-6">
                  <MessageSquareQuote size={24} className="absolute right-5 top-5 text-[#CFA34A]/35" />
                  <div className="mb-5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className="fill-[#CFA34A] text-[#CFA34A]" />
                    ))}
                  </div>
                  <p className="min-h-[120px] text-sm italic leading-relaxed text-[#d8d0c1]">"{testimonial.text}"</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-sm font-black text-[#f4ead8]">{testimonial.name}</p>
                    <p className="mt-1 text-xs text-[#7e7568]">{testimonial.age}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#7e7568]">Nomes abreviados para preservar privacidade.</p>
          </div>
        </section>

        <section id="oferta" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <div className="relative overflow-hidden border border-[#CFA34A]/40 bg-[linear-gradient(180deg,#14120e_0%,#080705_100%)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.58)] md:p-14">
              <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#CFA34A]/15 blur-3xl" />
              <div className="relative grid gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div>
                  <div className="mb-6 inline-flex bg-[#CFA34A] px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#090806]">
                    Lote promocional disponível
                  </div>
                  <ProductComboCard />
                </div>

                <div>
                  <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#f4ead8] md:text-6xl">
                    Acesso completo ao Magnetus III
                  </h2>
                  <p className="mt-5 text-base font-bold leading-relaxed text-[#d8d0c1]">
                    Para cortar sinais de antivalor e construir presença masculina com postura, voz, silêncio, limite e autocontrole.
                  </p>
                  <div className="mt-7 space-y-3">
                    {receiveStack.map((row) => (
                      <div key={row.item} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#CFA34A]" />
                          <span className="text-sm leading-relaxed text-[#d8d0c1]">{row.item}</span>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-[#7e7568] line-through">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-b-2 border-[#CFA34A]/30 pb-4">
                    <span className="text-base font-black uppercase text-[#f4ead8]">Valor total</span>
                    <span className="text-base font-black text-[#7e7568] line-through">R$ 288,00</span>
                  </div>

                  <div className="mt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CFA34A]">Hoje por apenas</p>
                    <p className="mt-1 text-6xl font-black tracking-tight text-[#CFA34A] md:text-8xl">R$ 79,90</p>
                    <p className="mt-2 text-sm font-bold text-[#aaa194]">ou 6x de R$ 13,32 no cartão</p>
                  </div>

                  <button type="button" onClick={handleCheckout} className="gold-cta group mt-8 flex w-full items-center justify-center gap-3 rounded-sm px-8 py-6 text-lg font-black uppercase tracking-wide text-[#090806] transition-all active:translate-y-px">
                    Quero cortar meu antivalor
                    <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#8f8678]">
                    <Lock size={13} /> Pagamento seguro via Kiwify. Acesso enviado por e-mail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#090806] pb-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#CFA34A]">Dúvidas frequentes</span>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4ead8] md:text-4xl">Antes de entrar</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={faq.q} className={`overflow-hidden border bg-[#11100d] transition-colors ${openFaq === idx ? 'border-[#CFA34A]/45' : 'border-white/10'}`}>
                  <button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span className="text-sm font-black text-[#f4ead8] md:text-base">{faq.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-[#CFA34A] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-56 px-5 pb-5' : 'max-h-0 px-5'}`}>
                    <p className="text-sm leading-relaxed text-[#aaa194]">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#070604] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 px-5 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFA34A] text-sm font-black italic text-[#090806]">M</span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#CFA34A]">Magnetus III</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7e7568]">
            <a href="/politica-de-privacidade.html" className="transition-colors hover:text-[#CFA34A]">Política de Privacidade</a>
            <a href="/termos-de-uso.html" className="transition-colors hover:text-[#CFA34A]">Termos de Uso</a>
            <a href="mailto:contato@sollimastudio.com" className="transition-colors hover:text-[#CFA34A]">Contato</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-4xl px-5 text-center text-[10px] leading-relaxed text-[#686054]">
          Magnetus III &copy; {new Date().getFullYear()} Sollima Studio. Este produto não garante resultados específicos. Resultados variam conforme aplicação individual.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#CFA34A]/30 bg-[#090806]/96 px-4 py-3 backdrop-blur-md md:hidden">
        <button type="button" onClick={handleCheckout} className="gold-cta flex w-full items-center justify-center gap-2 rounded-sm px-5 py-4 text-sm font-black uppercase tracking-wide text-[#090806]">
          Cortar antivalor - R$ 79,90
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default App;
