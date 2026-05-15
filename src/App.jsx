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
  Star,
  Target,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'O conflito', id: 'problema' },
  { label: 'Valor', id: 'valor' },
  { label: 'Protocolo', id: 'metodo' },
  { label: 'Oferta', id: 'oferta' },
];

const symptoms = [
  {
    icon: <EyeOff size={28} />,
    title: 'Você se esforça, mas não marca presença',
    text: 'A conversa acontece, o ambiente se move, e ainda assim sua energia parece não ocupar lugar.',
  },
  {
    icon: <Brain size={28} />,
    title: 'Você entrega ansiedade sem perceber',
    text: 'Explica demais, responde rápido demais, pede sinais demais. O corpo entrega antes da frase.',
  },
  {
    icon: <Target size={28} />,
    title: 'Você confunde intensidade com valor',
    text: 'Tenta compensar com aparência, performance ou insistência, quando o ponto real é eixo.',
  },
];

const valueComparisons = [
  'Menos que uma visita completa a um bom barbershop.',
  'Menos que um perfume importado usado para tentar causar impressão.',
  'Menos que um sapato comprado para parecer mais confiante.',
  'Menos que um jantar onde você chega com a mesma postura de sempre.',
];

const fitList = [
  'Homens que querem parar de procurar aprovação antes de agir.',
  'Homens que sabem que postura, voz, silêncio e limite também comunicam valor.',
  'Homens que preferem um plano curto e aplicável a promessas exageradas.',
  'Homens que querem corrigir sinais de carência, pressa e reatividade.',
];

const notFitList = [
  'Quem procura manipulação, script pronto ou promessa de conquista garantida.',
  'Quem quer resultado sem leitura, prática e auto-observação.',
  'Quem espera controlar a decisão de outra pessoa.',
  'Quem precisa de substituto para terapia, acompanhamento médico ou tratamento psicológico.',
];

const protocolSteps = [
  {
    phase: 'Dias 1-5',
    title: 'Corte do Antivalor',
    text: 'Você identifica vazamentos de insegurança: pressa, explicação excessiva, postura reativa e necessidade de validação.',
  },
  {
    phase: 'Dias 6-10',
    title: 'Construção do Eixo',
    text: 'Você ajusta olhar, ritmo de fala, presença corporal, limites e pequenas decisões que comunicam firmeza.',
  },
  {
    phase: 'Dias 11-15',
    title: 'Aplicação Social',
    text: 'Você leva o treino para conversas, encontros, trabalho e situações onde sua presença precisa aparecer sem esforço performático.',
  },
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
    text: 'A leitura é direta e aplicável. Não me vendeu fantasia, me deu um roteiro para observar e corrigir comportamento.',
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
    a: 'Reserve de 10 a 20 minutos para leitura, observação e execução dos exercícios. A proposta é simples e diária.',
  },
  {
    q: 'Posso pedir reembolso?',
    a: 'Sim. Você tem 7 dias de garantia pela plataforma de pagamento. Se o material não fizer sentido para você, solicite o reembolso dentro do prazo.',
  },
];

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
    <div className="min-h-screen overflow-x-hidden bg-[#090806] pb-24 text-[#eee8dd] selection:bg-[#FFD700] selection:text-[#090806] md:pb-0">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[#FFD700] focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-[#090806]">
        Pular para o conteúdo
      </a>

      <nav className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? 'border-b border-[#FFD700]/25 bg-[#090806]/95 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={() => scrollToSection('conteudo')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFD700] text-lg font-black italic text-[#090806] shadow-[0_0_24px_rgba(255,215,0,0.4)]">M</span>
            <span className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#FFD700]">Magnetus III</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#9b9488]">Presença masculina</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d8d0c1] transition-colors hover:text-[#FFD700]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="rounded-sm bg-[#FFD700] px-6 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#090806] transition-all hover:bg-[#FFF44F] active:translate-y-px">
              Acesso agora
            </button>
          </div>

          <button type="button" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} className="p-2 text-[#FFD700] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div className={`fixed inset-0 z-[105] flex flex-col justify-center bg-[#090806] px-7 transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="absolute left-8 top-24 text-[120px] font-black leading-none text-[#FFD700]/10">M</div>
          <div className="relative flex flex-col gap-6">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-left text-3xl font-black uppercase tracking-tight text-[#f2eadc]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('oferta')} className="mt-5 rounded-sm bg-[#FFD700] px-6 py-5 text-base font-black uppercase tracking-[0.12em] text-[#090806]">
              Quero meu acesso
            </button>
          </div>
        </div>
      </nav>

      <main id="conteudo">
        <section className="relative min-h-[100dvh] overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/hero.png" alt="Homem em atmosfera noturna sofisticada" className="h-full w-full scale-105 object-cover object-[60%_center] opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,215,0,0.08),transparent_35%),linear-gradient(90deg,#090806_0%,rgba(9,8,6,0.6)_35%,rgba(9,8,6,0.15)_65%,rgba(9,8,6,0.2)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090806] via-[#090806]/50 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:pt-32">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFD700]/35 bg-[#090806]/70 px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">Protocolo completo + bônus secreto</span>
              </div>
              <h1 className="max-w-4xl text-[43px] font-black uppercase leading-[0.93] tracking-tight text-[#f4ead8] md:text-7xl xl:text-[88px]">
                Pare de tentar impressionar. <span className="text-[#FFD700]">Construa presença.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#cfc7b8] md:text-xl">
                Um protocolo digital de 15 dias para corrigir sinais de insegurança, fortalecer postura e comunicar valor sem jogos rasos, sem humilhação e sem depender de validação externa.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToSection('oferta')} className="group flex w-full items-center justify-center gap-3 rounded-sm bg-[#FFD700] px-8 py-5 text-base font-black uppercase tracking-wide text-[#090806] shadow-[0_18px_46px_rgba(255,215,0,0.35)] transition-all hover:bg-[#FFF44F] active:translate-y-px sm:w-auto">
                  Começar hoje por R$ 79,90
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={() => scrollToSection('valor')} className="flex w-full items-center justify-center rounded-sm border border-[#FFD700]/45 px-8 py-5 text-sm font-black uppercase tracking-wide text-[#FFD700] transition-colors hover:bg-[#FFD700]/10 sm:w-auto">
                  Ver o que está incluso
                </button>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
                {['Acesso imediato', 'PDF prático', 'Bônus Antivalor', 'Garantia 7 dias'].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                    <CheckCircle2 size={16} className="mb-3 text-[#FFD700]" />
                    <p className="text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-[#d8d0c1]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-8 rounded-full bg-[#FFD700]/15 blur-3xl" />
              <img src="/images/combo-magnetus-masculino-original.jpeg" alt="Combo completo Magnetus III e Antivalor" className="relative w-full rounded-2xl border border-[#FFD700]/25 shadow-[0_26px_90px_rgba(0,0,0,0.55)]" />
              <div className="absolute -bottom-5 left-5 right-5 border border-[#FFD700]/30 bg-[#090806]/88 p-4 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">Dois materiais. Um objetivo.</p>
                <p className="mt-1 text-sm font-bold text-[#f4ead8]">Sua melhor versão com mais eixo, presença e autocontrole.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="problema" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">O conflito real</span>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                  Não é falta de roupa, dinheiro ou frase pronta.
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#bdb4a5]">
                O problema é quando sua presença comunica pressa, carência, dúvida e necessidade de aprovação. Antes de qualquer palavra, as pessoas já leem sua postura, seu ritmo e seus limites.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {symptoms.map((item) => (
                <article key={item.title} className="border border-white/10 bg-[#11100d] p-7">
                  <div className="mb-6 text-[#FFD700]">{item.icon}</div>
                  <h3 className="text-xl font-black uppercase leading-tight text-[#f4ead8]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#a9a194]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="valor" className="bg-[#eee6d7] py-24 text-[#17120b]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#E6B800]">Quebra de objeção</span>
              <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                Custa menos que o que muitos homens compram para parecer confiantes.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4c4132]">
                Um barbershop melhora o visual por alguns dias. Um perfume chama atenção por alguns segundos. Um sapato pode compor imagem. O Magnetus trabalha o que sustenta tudo isso: postura, leitura emocional, comunicação e presença.
              </p>
              <p className="mt-5 max-w-2xl text-base font-bold leading-relaxed text-[#17120b]">
                Não substitui uma pós-graduação, terapia ou experiência de vida. Mas corrige uma camada que muitos diplomas caros não ensinam: como você é percebido quando entra, fala, silencia e decide.
              </p>
            </div>

            <div className="border border-[#E6B800]/25 bg-[#fbf6ea] p-5 shadow-[0_30px_80px_rgba(23,18,11,0.12)] md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#E6B800]/20 pb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E6B800]">Investimento</p>
                  <p className="mt-1 text-4xl font-black text-[#17120b]">R$ 79,90</p>
                </div>
                <Crown size={42} className="text-[#E6B800]" />
              </div>
              <div className="space-y-3">
                {valueComparisons.map((item) => (
                  <div key={item} className="flex gap-3 border-b border-[#E6B800]/10 pb-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#E6B800]" />
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

        <section className="bg-[#090806] py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8">
            <div className="relative overflow-hidden border border-[#FFD700]/20 bg-[#11100d]">
              <img src="/images/antes-depois-protocolo.png" alt="Antes e depois do protocolo Magnetus" className="h-full min-h-[360px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090806] to-transparent p-6 pt-24">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Antes e depois</p>
                <p className="mt-2 max-w-md text-lg font-black uppercase leading-tight text-[#f4ead8]">Da reatividade para o comando de si.</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Transformação prática</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">
                Você não muda virando outra pessoa. Muda parando de se abandonar.
              </h2>
              <div className="mt-8 grid gap-4">
                {[
                  ['Antes do protocolo', 'Impulso, ansiedade, pressa para responder, medo de perder espaço e excesso de explicação.'],
                  ['Durante o protocolo', 'Observação diária, cortes de antivalor, ajuste de postura, voz, olhar e limites.'],
                  ['Depois do protocolo', 'Mais eixo, comunicação direta, presença silenciosa e menor dependência de validação externa.'],
                ].map(([title, text]) => (
                  <div key={title} className="border border-white/10 bg-white/[0.035] p-6">
                    <h3 className="text-lg font-black uppercase text-[#FFD700]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#bdb4a5]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Elegibilidade</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                Para quem é. E para quem não é.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              <div className="border border-[#FFD700]/30 bg-[#090806] p-7 md:p-9">
                <h3 className="mb-7 text-2xl font-black uppercase text-[#FFD700]">É para você se...</h3>
                <ul className="space-y-4">
                  {fitList.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#d8d0c1]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#FFD700]" />
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

        <section id="metodo" className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">O que você recebe</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#f4ead8] md:text-6xl">
                  Diagnóstico para cortar. Protocolo para construir.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#bdb4a5]">
                  O combo une o Magnetus III ao Antivalor. Um material mostra o que te enfraquece por dentro, o outro organiza práticas para você reconstruir presença por repetição.
                </p>
              </div>
              <img src="/images/mockup-premium-magnetus.png" alt="Mockup premium Magnetus III e Antivalor" className="w-full border border-[#FFD700]/20 shadow-[0_28px_90px_rgba(0,0,0,0.5)]" />
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {protocolSteps.map((step) => (
                <article key={step.phase} className="border border-white/10 bg-[#11100d] p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">{step.phase}</p>
                  <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-[#f4ead8]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="autora" className="border-y border-white/5 bg-[#0f0e0b] py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[340px_1fr] md:px-8">
            <div className="relative mx-auto w-72 max-w-full md:mx-0">
              <div className="absolute inset-0 translate-x-4 translate-y-4 border border-[#FFD700]" />
              <img src="/images/autora-sol-lima.jpg" alt="Sol Lima" className="relative aspect-[3/4] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">A criadora do método</span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-[#f4ead8] md:text-6xl">Sol Lima</h2>
              <div className="mt-7 max-w-3xl space-y-5 text-base leading-relaxed text-[#bdb4a5] md:text-lg">
                <p className="text-xl font-bold text-[#f4ead8]">Eu estudo presença, magnetismo e os sinais que mudam a forma como uma pessoa é percebida.</p>
                <p>O Magnetus nasceu da observação de homens capazes que perdiam força social por detalhes de postura, fala, urgência emocional e falta de eixo.</p>
                <p>Meu trabalho é traduzir comportamento, comunicação e autoimagem em práticas aplicáveis, sem vender manipulação e sem prometer controle sobre outras pessoas.</p>
              </div>
              <blockquote className="mt-8 border border-[#FFD700]/25 bg-[#090806] p-6 text-lg font-bold italic leading-relaxed text-[#f4ead8]">
                "Presença não é barulho. É coerência entre corpo, fala, decisão e autocontrole."
              </blockquote>
            </div>
          </div>
        </section>

        <section className="bg-[#090806] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Segurança da compra</span>
                <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                  Compra segura, acesso imediato e garantia real.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[#bdb4a5]">
                  Você recebe os materiais no e-mail após a confirmação. Se dentro de 7 dias perceber que não é para você, solicite o reembolso pela própria plataforma.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-[0.7fr_1fr] md:items-center">
                <img src="/images/garantia-7-dias-premium.png" alt="Selo de garantia de 7 dias" className="mx-auto w-full max-w-xs rounded-full" />
                <img src="/images/selos-premium-magnetus.png" alt="Selos premium, acesso imediato e compra segura" className="w-full border border-[#FFD700]/20" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0f0e0b] py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Prova social</span>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-[#f4ead8] md:text-5xl">
                Homens que aplicaram o protocolo
              </h2>
              <div className="mt-6 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} className="fill-[#FFD700] text-[#FFD700]" />
                ))}
                <span className="ml-2 text-sm text-[#aaa194]">Relatos de compradores</span>
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="relative border border-white/10 bg-[#090806] p-6">
                  <MessageSquareQuote size={24} className="absolute right-5 top-5 text-[#FFD700]/35" />
                  <div className="mb-5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className="fill-[#FFD700] text-[#FFD700]" />
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
            <div className="relative overflow-hidden border border-[#FFD700]/40 bg-[linear-gradient(180deg,#14120e_0%,#080705_100%)] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.58)] md:p-14">
              <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#FFD700]/15 blur-3xl" />
              <div className="relative grid gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div>
                  <div className="mb-6 inline-flex bg-[#FFD700] px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#090806]">
                    Lote promocional disponível
                  </div>
                  <img src="/images/combo-magnetus-masculino-original.jpeg" alt="Combo completo Magnetus Masculino" className="w-full border border-[#FFD700]/20 shadow-[0_26px_80px_rgba(0,0,0,0.45)]" />
                </div>

                <div>
                  <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#f4ead8] md:text-6xl">
                    Acesso completo ao Magnetus III
                  </h2>
                  <div className="mt-7 space-y-3">
                    {receiveStack.map((row) => (
                      <div key={row.item} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#FFD700]" />
                          <span className="text-sm leading-relaxed text-[#d8d0c1]">{row.item}</span>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-[#7e7568] line-through">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-b-2 border-[#FFD700]/30 pb-4">
                    <span className="text-base font-black uppercase text-[#f4ead8]">Valor total</span>
                    <span className="text-base font-black text-[#7e7568] line-through">R$ 288,00</span>
                  </div>

                  <div className="mt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FFD700]">Hoje por apenas</p>
                    <p className="mt-1 text-6xl font-black tracking-tight text-[#FFD700] md:text-8xl">R$ 79,90</p>
                    <p className="mt-2 text-sm font-bold text-[#aaa194]">ou 6x de R$ 13,32 no cartão</p>
                  </div>

                  <button type="button" onClick={handleCheckout} className="group mt-8 flex w-full items-center justify-center gap-3 rounded-sm bg-[#FFD700] px-8 py-6 text-lg font-black uppercase tracking-wide text-[#090806] shadow-[0_18px_46px_rgba(255,215,0,0.35)] transition-all hover:bg-[#FFF44F] active:translate-y-px">
                    Quero começar agora
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
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FFD700]">Dúvidas frequentes</span>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4ead8] md:text-4xl">Antes de entrar</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={faq.q} className={`overflow-hidden border bg-[#11100d] transition-colors ${openFaq === idx ? 'border-[#FFD700]/45' : 'border-white/10'}`}>
                  <button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span className="text-sm font-black text-[#f4ead8] md:text-base">{faq.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-[#FFD700] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
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
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD700] text-sm font-black italic text-[#090806]">M</span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#FFD700]">Magnetus III</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7e7568]">
            <a href="/politica-de-privacidade.html" className="transition-colors hover:text-[#FFD700]">Política de Privacidade</a>
            <a href="/termos-de-uso.html" className="transition-colors hover:text-[#FFD700]">Termos de Uso</a>
            <a href="mailto:contato@sollimastudio.com" className="transition-colors hover:text-[#FFD700]">Contato</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-4xl px-5 text-center text-[10px] leading-relaxed text-[#686054]">
          Magnetus III &copy; {new Date().getFullYear()} Sollima Studio. Este produto não garante resultados específicos. Resultados variam conforme aplicação individual.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#FFD700]/30 bg-[#090806]/96 px-4 py-3 backdrop-blur-md md:hidden">
        <button type="button" onClick={handleCheckout} className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#FFD700] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#090806] shadow-[0_10px_30px_rgba(255,215,0,0.3)]">
          Começar agora - R$ 79,90
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default App;
