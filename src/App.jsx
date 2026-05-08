import React, { useState, useEffect } from 'react';
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
  EyeOff
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Controla o scroll do body quando o menu está aberto
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleCheckout = () => {
    window.open('https://pay.kiwify.com.br/TX2Ao2R', '_blank');
  };

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
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
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
          
          <p className="text-lg md:text-3xl font-light text-gray-300 mb-10 max-w-xl">
            Dirija a sua vida. <span className="text-[#c5a059] font-bold italic">Seja o destino.</span>
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
      </section>

      {/* METODO SECTION */}
      <section id="metodo" className="py-24 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">O Protocolo de <span className="text-[#c5a059]">Elite</span></h2>
          <div className="w-12 h-1 bg-[#c5a059] mx-auto mt-4"></div>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          <div className="bg-black border border-[#c5a059]/20 p-8 rounded-2xl text-center flex flex-col items-center">
            <div className="w-40 h-56 bg-[#1a1a1a] rounded shadow-2xl mb-8 flex flex-col justify-center items-center border border-[#c5a059]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather-black.png')] opacity-40"></div>
              <h4 className="text-[#c5a059] font-black text-lg tracking-widest uppercase relative z-10">MAGNETUS III</h4>
            </div>
            <h3 className="text-2xl font-bold mb-3">Manual do Comando</h3>
            <p className="text-gray-500 text-sm">Reestruture o seu eixo biológico e instale a presença que impõe respeito imediato.</p>
          </div>

          <div className="bg-black border border-[#c5a059]/20 p-8 rounded-2xl text-center flex flex-col items-center">
            <div className="w-40 h-56 bg-[#d4b477]/5 rounded shadow-2xl mb-8 flex flex-col justify-center items-center border border-[#c5a059]/30 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] opacity-30"></div>
               <h4 className="text-[#8b6b2c] font-black text-sm tracking-widest uppercase relative z-10 text-center px-4">ANTÍDOTO DO ANTIVALOR</h4>
            </div>
            <h3 className="text-2xl font-bold mb-3">O Antídoto</h3>
            <p className="text-gray-500 text-sm">Erradique os comportamentos silenciosos que drenam o seu valor social.</p>
          </div>
        </div>
      </section>

      {/* AUTORA SECTION */}
      <section id="autora" className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-60 h-60 md:w-72 md:h-72 shrink-0 relative">
               <div className="absolute inset-0 border-2 border-[#c5a059] translate-x-3 translate-y-3 rounded-2xl"></div>
               <div className="absolute inset-0 bg-[#1a1a1a] rounded-2xl overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
                    alt="Sol Lima" 
                    className="w-full h-full object-cover grayscale"
                 />
               </div>
            </div>
            <div>
              <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-widest">A Arquiteta do Método</span>
              <h2 className="text-4xl font-black mt-2 mb-6 uppercase">Sol <span className="italic">Lima.</span></h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Especialista em comportamento e neurociência. A minha missão é transformar a dor em método e ensinar que antes de abraçar o mundo, precisas de te relacionar contigo mesmo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section id="oferta" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-5 max-w-4xl">
          <div className="bg-gradient-to-b from-[#111] to-black border border-[#c5a059]/40 rounded-[32px] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
            
            <div className="bg-[#c5a059] text-black px-6 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mx-auto inline-block mb-10">
              Oferta válida por tempo limitado
            </div>

            <h2 className="text-[80px] md:text-[120px] font-black text-[#c5a059] leading-none mb-2">60%</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-10 tracking-[0.2em] uppercase">de desconto</h3>
            
            <p className="text-[#c5a059] text-[10px] font-black tracking-[0.2em] mb-12 uppercase border-y border-[#c5a059]/20 py-4 max-w-xs mx-auto">
              TRANSFORME A SUA PRESENÇA. DOMINE A REALIDADE.
            </p>

            <div className="flex flex-col items-center gap-2 mb-12">
              <span className="text-gray-600 line-through text-xl">De R$ 199,90</span>
              <span className="text-white text-xs uppercase font-bold tracking-widest">Por apenas</span>
              <span className="text-[#c5a059] text-7xl md:text-9xl font-black">R$ 79,90</span>
              <span className="text-white text-sm font-bold tracking-widest mt-4 uppercase">Em até 6x no cartão</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="group w-full max-w-md bg-[#c5a059] text-black py-7 rounded-sm font-black text-xl hover:bg-[#d4b477] transition-all flex items-center justify-center gap-4 mb-6 shadow-[0_15px_40px_rgba(197,160,89,0.3)] mx-auto cursor-pointer"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight size={24} />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-white/5 pt-12">
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

      {/* FOOTER */}
      <footer className="py-12 bg-black text-center opacity-30 border-t border-white/5">
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold">Magnetus III &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
};

export default App;
