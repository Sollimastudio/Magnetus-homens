import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Target, 
  Crown, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Menu,
  X,
  Star,
  Brain,
  EyeOff,
  MessageSquareQuote,
  Clock,
  Users,
  Award
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [countdown, setCountdown] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 2; m = 47; s = 33; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCheckout = () => {
    window.open('https://pay.kiwify.com.br/TX2Ao2R', '_blank');
  };

  const pad = (n) => String(n).padStart(2, '0');

  const faqs = [
    { q: "O acesso é imediato?", a: "Sim. Após a confirmação do pagamento, receberás o acesso completo directamente no teu e-mail. Podes começar o protocolo hoje mesmo." },
    { q: "É em formato de vídeo ou PDF?", a: "O Magnetus III e o Antivalor são em formato digital (PDF) — optimizados para leitura no telemóvel, tablet ou computador. Práticos, directos e sem enrolação." },
    { q: "Funciona mesmo ou é mais do mesmo?", a: "O protocolo é baseado em neurociência aplicada, não em \"dicas de coach\". São técnicas comportamentais testadas que alteram a forma como o teu sistema nervoso projecta presença. Os resultados começam a surgir nos primeiros 7 dias." },
    { q: "Tenho vergonha, o nome aparece na fatura?", a: "Não. A compra aparecerá discretamente como \"Compra Digital\" na tua fatura. Total privacidade." },
    { q: "Serve para reconquistar alguém?", a: "O protocolo não é sobre manipulação. É sobre reconstruir o teu eixo e a tua presença. Quando isso acontece, a percepção que os outros têm de ti muda naturalmente — incluindo ex-parceiras." },
    { q: "Posso pedir reembolso?", a: "Sim. Tens 7 dias de garantia incondicional. Se não sentires resultados, devolvemos cada centavo sem perguntas." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-[#c5a059] selection:text-black overflow-x-hidden">
      
      {/* HEADER TÁTICO */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-black/95 border-b border-[#c5a059]/30 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-5 flex justify-between items-center">
          
          {/* Logo / Identidade */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c5a059] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.3)]">
              <span className="text-black font-black text-base italic">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#c5a059] font-black tracking-[0.1em] text-xs md:text-sm uppercase leading-none">MAGNETUS III</span>
              <span className="text-[8px] text-gray-500 font-bold tracking-[0.1em] uppercase mt-1">PROTOCOLO DE PRESENÇA</span>
            </div>
          </div>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase">
            <button onClick={() => scrollToSection('problema')} className="hover:text-[#c5a059] transition-colors cursor-pointer">O Conflito</button>
            <button onClick={() => scrollToSection('metodo')} className="hover:text-[#c5a059] transition-colors cursor-pointer">O Protocolo</button>
            <button onClick={() => scrollToSection('autora')} className="hover:text-[#c5a059] transition-colors cursor-pointer">A Autora</button>
            <button 
              onClick={() => scrollToSection('oferta')}
              className="bg-[#c5a059] text-black px-6 py-2 rounded-sm font-black hover:bg-[#d4b477] transition-all cursor-pointer"
            >
              ACESSO AGORA
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <button 
            className="md:hidden text-[#c5a059] p-2 relative z-[110] cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MENU MOBILE OVERLAY - SOLUÇÃO DEFINITIVA */}
        <div className={`fixed inset-0 bg-black z-[105] flex flex-col items-center justify-center gap-10 text-center transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
            <span className="text-[120px] font-black text-[#c5a059] leading-none">M</span>
          </div>
          
          <button onClick={() => scrollToSection('problema')} className="text-3xl font-black tracking-[0.1em] uppercase text-white hover:text-[#c5a059] transition-colors cursor-pointer">O CONFLITO</button>
          <button onClick={() => scrollToSection('metodo')} className="text-3xl font-black tracking-[0.1em] uppercase text-white hover:text-[#c5a059] transition-colors cursor-pointer">O PROTOCOLO</button>
          <button onClick={() => scrollToSection('autora')} className="text-3xl font-black tracking-[0.1em] uppercase text-white hover:text-[#c5a059] transition-colors cursor-pointer">A AUTORA</button>
          
          <div className="w-12 h-1 bg-[#c5a059]/30 my-2"></div>
          
          <button 
            onClick={() => scrollToSection('oferta')}
            className="bg-[#c5a059] text-black w-[80%] py-5 rounded-sm font-black text-xl shadow-[0_10px_30px_rgba(197,160,89,0.3)] cursor-pointer"
          >
            QUERO MEU ACESSO
          </button>
          
          <p className="text-[10px] text-gray-600 uppercase tracking-widest absolute bottom-10">Instale seu novo eixo biológico.</p>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-10"></div>
          {/* Imagem do Carro - Ajustada para Mobile */}
          <img 
            src="/images/hero.png" 
            alt="Interior do carro tático" 
            className="w-full h-full object-cover object-center scale-125 md:scale-100 opacity-60"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center md:text-left pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#c5a059]/40 rounded-full bg-black/60 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse"></span>
            <span className="text-[#c5a059] text-[9px] font-black tracking-[0.2em] uppercase">Comando Ativado</span>
          </div>
          
          <h1 className="text-[40px] md:text-8xl font-black mb-6 leading-[1] tracking-tighter">
            ASSUMA O <br /> <span className="text-[#c5a059]">CONTROLE.</span>
          </h1>
          
          <p className="text-base md:text-xl font-light text-gray-400 mb-4 max-w-xl">
            O protocolo de 15 dias baseado em neurociência que transforma homens comuns em <span className="text-[#c5a059] font-bold">presenças magnéticas</span>.
          </p>
          <p className="text-sm md:text-base text-gray-500 mb-10 max-w-xl flex items-center gap-2 justify-center md:justify-start">
            <Users size={14} className="text-[#c5a059]" /> <span>Mais de <strong className="text-white">1.200 homens</strong> já activaram o protocolo</span>
          </p>

          {/* Grid de Ícones - Limpo e Espaçado */}
          <div className="grid grid-cols-2 gap-3 md:gap-8 mb-12 w-full max-w-2xl mx-auto md:mx-0">
            {[
              { icon: <Crown size={18} />, label: "Presença Magnética" },
              { icon: <Target size={18} />, label: "Atração Natural" },
              { icon: <Zap size={18} />, label: "Mentalidade de Elite" },
              { icon: <ShieldCheck size={18} />, label: "Comando Inabalável" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start gap-2 p-4 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-[#c5a059]">{item.icon}</div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.05em] text-gray-400 leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scrollToSection('oferta')}
            className="group relative w-full md:w-auto px-10 py-6 bg-[#c5a059] text-black font-black text-lg rounded-sm hover:bg-[#d4b477] transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(197,160,89,0.3)] cursor-pointer"
          >
            QUERO O MEU ACESSO AGORA
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problema" className="py-24 bg-[#0a0a0a] relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <span className="text-[#c5a059] font-bold tracking-[0.2em] uppercase text-[10px]">O Conflito Interno</span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 mb-10 leading-tight">Você domina o território, mas quem domina o seu código?</h2>
            
            <div className="space-y-6 text-base md:text-xl text-gray-400 leading-relaxed font-light">
              <p className="border-l-2 border-[#c5a059] pl-5 italic text-gray-200">
                "O mundo ensinou-te a construir património. A gerir o gado, a terra, as máquinas. Mas no meio da estrada, instalou em ti um software obsoleto."
              </p>
              <p>
                És o gigante que performa força, mas sangra autoridade. Sentes o peso da chave no bolso, mas não sentes o peso da tua presença.
              </p>
              <p className="text-[#c5a059] font-bold">
                O Magnetus III não é sobre o que tens. É sobre quem voltaste a ser.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121212] p-8 border border-white/5 rounded-2xl">
                <EyeOff className="text-[#c5a059] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Invisibilidade</h3>
                <p className="text-gray-500 text-sm">Passas despercebido nos lugares onde deverias ser o centro gravitacional.</p>
              </div>
              <div className="bg-[#121212] p-8 border border-white/5 rounded-2xl">
                <Brain className="text-[#c5a059] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Declínio de Eixo</h3>
                <p className="text-gray-500 text-sm">Tentas usar táticas rasas enquanto a tua biologia implora por um comando real.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA INTERMEDIÁRIO */}
        <div className="container mx-auto px-6 mt-12 text-center">
          <button onClick={() => scrollToSection('oferta')} className="group px-10 py-5 bg-transparent border-2 border-[#c5a059] text-[#c5a059] font-black text-sm uppercase tracking-widest rounded-sm hover:bg-[#c5a059] hover:text-black transition-all cursor-pointer inline-flex items-center gap-3">
            QUERO SAIR DA INVISIBILIDADE
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* METODO SECTION */}
      <section id="metodo" className="py-24 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">O Protocolo de <span className="text-[#c5a059]">Elite</span></h2>
          <div className="w-12 h-1 bg-[#c5a059] mx-auto mt-4"></div>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          <div className="bg-black border border-[#c5a059]/20 p-8 rounded-2xl text-center flex flex-col items-center">
            <img src="/images/ebook-magnetus-3.jpeg" alt="Manual do Comando" className="w-40 h-56 object-cover rounded shadow-2xl mb-8 border border-[#c5a059]/30" />
            <h3 className="text-xl font-black mb-3 uppercase tracking-wide text-[#c5a059]">MAGNETUS III:<br/><span className="text-white text-lg">A Engenharia da Presença</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              O protocolo de 15 dias para instalar soberania biológica. Este manual de engenharia comportamental ensina a regular o sistema nervoso para <strong className="text-white">projectar um valor social inquestionável</strong>. É a ferramenta definitiva para quem deseja deixar de ser um "caçador" e tornar-se o destino final: a Fonte.
            </p>
          </div>

          <div className="bg-black border border-[#c5a059]/20 p-8 rounded-2xl text-center flex flex-col items-center">
             <img src="/images/bonus-antidoto.jpeg" alt="O Antídoto" className="w-40 h-56 object-cover rounded shadow-2xl mb-8 border border-[#c5a059]/30" />
            <h3 className="text-xl font-black mb-3 uppercase tracking-wide text-[#c5a059]">ANTIVALOR:<br/><span className="text-white text-lg">O Extermínio da Sabotagem</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              O diagnóstico brutal dos pontos cegos que repelem os teus resultados. Este guia identifica e elimina os <strong className="text-white">vazamentos invisíveis de insegurança</strong> e reatividade que comunicam carência. É o antídoto necessário para remover o "travão de mão" que sabota o teu magnetismo antes de abrires a boca.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-8 max-w-5xl">
          <div className="bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] border border-[#c5a059]/30 p-8 md:p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-widest text-[#c5a059]">O COMBO: <span className="text-white">Sistema Operacional de Alto Valor</span></h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              A solução completa que une a <strong className="text-[#c5a059]">poda estratégica</strong> à <strong className="text-[#c5a059]">construção de poder</strong>. Enquanto o <em className="italic text-gray-400">Antivalor</em> limpa o terreno e estanca a perda de autoridade, o <em className="italic text-gray-400">Magnetus III</em> edifica a estrutura da presença magnética. É o equilíbrio perfeito entre parar de errar e começar a dominar.
            </p>
            <div className="inline-block border-t border-white/10 pt-4">
              <p className="text-white font-bold tracking-wide uppercase text-sm md:text-base">
                O resultado? Atração real como consequência biológica, não como esforço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTORA SECTION */}
      <section id="autora" className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-60 h-60 md:w-80 md:h-auto md:aspect-[3/4] shrink-0 relative mx-auto md:mx-0 sticky top-24">
               <div className="absolute inset-0 border-2 border-[#c5a059] translate-x-3 translate-y-3 rounded-2xl"></div>
               <div className="absolute inset-0 bg-[#1a1a1a] rounded-2xl overflow-hidden">
                 <img 
                    src="/images/autora-sol-lima.jpg" 
                    alt="Sol Lima" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                 />
               </div>
            </div>
            <div className="w-full md:flex-1">
              <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-widest">A Arquiteta do Método</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2 mb-8 uppercase">Sol <span className="italic">Lima.</span></h2>
              
              <div className="space-y-5 text-gray-400 text-base md:text-lg font-light leading-relaxed">
                <p className="font-bold text-white text-xl">Eu sobrevivi ao que chamo de Feminicídio Emocional.</p>
                <p>Por anos, eu fui a sombra de quem eu deveria ser. Vivi em estado de hipervigilância crônica, onde cada passo meu era calculado para não desagradar, para não ser notada, para não incomodar. Minha voz era um sussurro abafado por uma religiosidade que me ensinou a anular o "eu".</p>
                <p>Eu não tinha amor-próprio. Minha autoestima era um deserto. Mas a dor me levou ao estudo. Mergulhei na neurociência para entender por que meu cérebro me mantinha refém do medo.</p>
                
                <blockquote className="border-l-2 border-[#c5a059] pl-6 my-8 italic text-gray-200 py-2 bg-white/5 rounded-r-lg">
                  "No meu TCC sobre Presença e Magnetismo, descobri que a atração não é um dom místico, mas um padrão de sinais químicos e comportamentais que qualquer pessoa pode activar."
                </blockquote>
                
                <p>Hoje, como Sol Lima, eu não apenas recuperei minha luz; eu criei o Protocolo Magnetus para que você não precise levar décadas para fazer o mesmo. É a ciência da ressurreição da sua presença.</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10 mb-10 border-y border-white/5 py-8">
                <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                  <h4 className="text-[#c5a059] font-bold mb-2 uppercase tracking-wider text-sm">Neurociência</h4>
                  <p className="text-sm text-gray-500">Base científica em cada técnica.</p>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                  <h4 className="text-[#c5a059] font-bold mb-2 uppercase tracking-wider text-sm">Blindagem</h4>
                  <p className="text-sm text-gray-500">Proteção contra a autoanulação.</p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#c5a059]/20 shadow-[0_0_30px_rgba(197,160,89,0.05)]">
                <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">A Metamorfose em 7 Dias:</h4>
                <ul className="space-y-4">
                  {[
                    "Quebra do estado de hipervigilância",
                    "Ressignificação da autoimagem neural",
                    "Domínio da linguagem corporal de alto valor",
                    "Ativação do 'Efeito Imã' social",
                    "Comunicação visceral e assertiva",
                    "Eliminação de bloqueios religiosos limitantes",
                    "Protocolo de Presença Inabalável"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-base text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-[#c5a059]/10 flex items-center justify-center shrink-0">
                        <Zap size={14} className="text-[#c5a059]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA APÓS AUTORA */}
        <div className="container mx-auto px-6 mt-12 text-center">
          <button onClick={() => scrollToSection('oferta')} className="group px-10 py-5 bg-[#c5a059] text-black font-black text-sm uppercase tracking-widest rounded-sm hover:bg-[#d4b477] transition-all cursor-pointer inline-flex items-center gap-3 shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
            QUERO ACTIVAR O MEU MAGNETISMO
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-24 bg-[#0d0d0d] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-widest">Resultados Reais</span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 uppercase tracking-tight">Homens que <span className="text-[#c5a059]">Activaram o Comando</span></h2>
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#c5a059] fill-[#c5a059]" />)}
              <span className="text-sm text-gray-400 ml-2">4.9/5 — baseado em 847 avaliações</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ricardo M.", age: "34 anos", text: "Em 10 dias, a forma como as pessoas me olham mudou completamente. Não mudei de roupa, não mudei de carro. Mudei de eixo. A minha ex mandou-me mensagem sem eu fazer nada." },
              { name: "André S.", age: "28 anos", text: "Sempre fui o 'bom rapaz' que ninguém levava a sério. O Antivalor mostrou-me exactamente os 3 comportamentos que me sabotavam. Brutal. Resultados na primeira semana." },
              { name: "Paulo F.", age: "41 anos", text: "Cego. Eu estava completamente cego. Achava que o problema era falta de dinheiro ou de físico. O protocolo mostrou que era falta de presença. Hoje entro num lugar e as pessoas sentem." }
            ].map((t, idx) => (
              <div key={idx} className="bg-black border border-white/5 p-6 rounded-2xl relative">
                <MessageSquareQuote size={24} className="text-[#c5a059]/30 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[#c5a059] fill-[#c5a059]" />)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-white/5 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] font-black text-sm">{t.name[0]}</div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest">Compra verificada via Kiwify • Identidades parcialmente ocultas por privacidade</p>
          </div>
        </div>
      </section>

      {/* OFFER SECTION - REESTRUTURADA */}
      <section id="oferta" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-5 max-w-4xl">
          <div className="bg-gradient-to-b from-[#111] to-black border border-[#c5a059]/40 rounded-[32px] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
            
            <div className="bg-[#c5a059] text-black px-6 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mx-auto inline-block mb-6">
              Oferta válida por tempo limitado
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <Clock size={16} className="text-[#c5a059]" />
              <div className="flex items-center gap-1">
                {[{ v: countdown.h, l: 'h' }, { v: countdown.m, l: 'm' }, { v: countdown.s, l: 's' }].map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="bg-[#1a1a1a] border border-[#c5a059]/30 px-3 py-2 rounded text-center min-w-[48px]">
                      <span className="text-[#c5a059] font-black text-xl">{pad(t.v)}</span>
                      <span className="text-gray-600 text-[8px] uppercase block">{t.l}</span>
                    </div>
                    {i < 2 && <span className="text-[#c5a059] font-black text-xl">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <img src="/images/combo-magn-masc.png" alt="Combo Magnetus Masculino" className="w-full max-w-sm mx-auto mb-10 rounded-xl shadow-lg" />

            {/* VALUE STACK */}
            <div className="max-w-md mx-auto mb-10 text-left">
              <h3 className="text-lg font-black text-white uppercase tracking-wide mb-6 text-center">O que recebes hoje:</h3>
              {[
                { item: "Magnetus III — A Engenharia da Presença", valor: "R$ 127,00" },
                { item: "Antídoto do Antivalor — Extermínio da Sabotagem", valor: "R$ 67,00" },
                { item: "Acesso Vitalício + Actualizações Futuras", valor: "R$ 47,00" }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                    <span className="text-gray-300 text-sm">{s.item}</span>
                  </div>
                  <span className="text-gray-600 line-through text-sm shrink-0 ml-4">{s.valor}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 border-b-2 border-[#c5a059]/30">
                <span className="text-white font-bold">Valor Total</span>
                <span className="text-gray-500 line-through font-bold">R$ 241,00</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mb-10">
              <span className="text-white text-xs uppercase font-bold tracking-widest">Hoje, leva tudo por apenas</span>
              <span className="text-[#c5a059] text-6xl md:text-8xl font-black">R$ 79,90</span>
              <span className="text-gray-400 text-sm font-bold mt-2">ou 6x de R$ 13,32 no cartão</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="group w-full max-w-md bg-[#c5a059] text-black py-7 rounded-sm font-black text-xl hover:bg-[#d4b477] transition-all flex items-center justify-center gap-4 mb-4 shadow-[0_15px_40px_rgba(197,160,89,0.3)] mx-auto cursor-pointer animate-pulse hover:animate-none"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight size={24} />
            </button>
            <p className="text-gray-600 text-xs mb-8"><Lock size={12} className="inline mr-1" />Pagamento 100% seguro via Kiwify • Ambiente criptografado</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-white/5 pt-8">
              {[
                { icon: <Lock size={16}/>, label: "Acesso Imediato" },
                { icon: <ShieldCheck size={16}/>, label: "Pagamento Seguro" },
                { icon: <Star size={16}/>, label: "7 Dias Garantia" },
                { icon: <CheckCircle2 size={16}/>, label: "Conteúdo Prático" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="text-[#c5a059]">{item.icon}</div>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* GARANTIA DEDICADA */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-[#111] border border-[#c5a059]/20 rounded-2xl p-10 md:p-16">
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">Garantia Blindada de <span className="text-[#c5a059]">7 Dias</span></h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              Se em 7 dias não sentires a tua presença a mudar, se não notares as pessoas a olhar-te de forma diferente, se não sentires o teu eixo a reposicionar-se — <strong className="text-white">devolvemos cada centavo</strong>.
            </p>
            <p className="text-[#c5a059] font-bold uppercase tracking-wider text-sm">Sem perguntas. Sem burocracia. O risco é todo nosso.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-widest">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 uppercase">Ainda tens questões?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`bg-[#111] border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'border-[#c5a059]/40' : 'border-white/5'}`}>
                <button className="w-full flex items-center justify-between p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span className="font-bold text-white text-sm md:text-base pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-[#c5a059] shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-[200px] pb-5 px-5' : 'max-h-0'}`}>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA FINAL */}
          <div className="text-center mt-16">
            <button onClick={handleCheckout} className="group px-10 py-6 bg-[#c5a059] text-black font-black text-lg uppercase rounded-sm hover:bg-[#d4b477] transition-all cursor-pointer inline-flex items-center gap-3 shadow-[0_15px_40px_rgba(197,160,89,0.3)]">
              QUERO ACTIVAR MEU MAGNETISMO
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-gray-600 text-xs mt-4">Acesso imediato • Garantia de 7 dias • Pagamento seguro</p>
          </div>
        </div>
      </section>

      {/* FOOTER PROFISSIONAL */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#c5a059] rounded-full flex items-center justify-center">
                <span className="text-black font-black text-sm italic">M</span>
              </div>
              <span className="text-[#c5a059] font-black tracking-widest text-xs uppercase">Magnetus III</span>
            </div>
            <div className="flex items-center gap-6 text-gray-600 text-[10px] uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-[#c5a059] transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-[#c5a059] transition-colors">Termos de Uso</a>
              <a href="mailto:contato@sollimastudio.com" className="hover:text-[#c5a059] transition-colors">Contacto</a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-700">Magnetus III &copy; {new Date().getFullYear()} — Sollima Studio • Todos os direitos reservados</p>
            <p className="text-[8px] text-gray-800 mt-2">Este produto não garante resultados específicos. Os resultados variam de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
