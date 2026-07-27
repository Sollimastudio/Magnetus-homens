import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { trackCtaClick } from '../lib/funnelAnalytics';
import './ConversionContinuityLayer.css';

const ANGLES = Object.freeze({
  M1_POSTURA_MUDA: {
    code: 'M1_POSTURA_MUDA',
    eyebrow: 'Você chegou pela pergunta certa',
    title: 'Quando você gosta, sua postura muda?',
    text: 'Você pode ser firme em outras áreas e ainda deixar pressa, excesso e necessidade de aprovação assumirem sua comunicação quando alguém importa.',
  },
  M2_PROVAR_VALOR: {
    code: 'M2_PROVAR_VALOR',
    eyebrow: 'Presença chega antes da explicação',
    title: 'Quanto mais você tenta provar valor, menos sua presença fala.',
    text: 'A intenção pode ser boa. Mas ritmo acelerado, disponibilidade sem critério e explicação em excesso podem ser lidos como insegurança.',
  },
  M3_SEM_URGENCIA: {
    code: 'M3_SEM_URGENCIA',
    eyebrow: 'Interesse não precisa parecer urgência',
    title: 'Não é ser frio. É parar de transmitir urgência.',
    text: 'Você pode demonstrar interesse com clareza sem sumir, manipular, insistir ou abandonar o próprio ritmo para impedir que a oportunidade desapareça.',
  },
});

const DEFAULT_ANGLE = Object.freeze({
  code: 'ORGANICO',
  eyebrow: 'Magnetus III',
  title: 'Pare de tentar convencer. Faça sua presença falar primeiro.',
  text: 'O protocolo trabalha os sinais que comunicam ansiedade antes mesmo de suas palavras serem avaliadas.',
});

function resolveAngle() {
  if (typeof window === 'undefined') return DEFAULT_ANGLE;
  const code = new URLSearchParams(window.location.search).get('utm_content')?.toUpperCase();
  return ANGLES[code] ?? DEFAULT_ANGLE;
}

function createHost(id, beforeSelector) {
  const target = document.querySelector(beforeSelector);
  if (!target?.parentNode) return null;

  const existing = document.getElementById(id);
  if (existing) return { element: existing, created: false };

  const element = document.createElement('div');
  element.id = id;
  target.parentNode.insertBefore(element, target);
  return { element, created: true };
}

export default function ConversionContinuityLayer() {
  const [angle] = useState(resolveAngle);
  const [hosts, setHosts] = useState({ match: null, decision: null });

  useEffect(() => {
    const match = createHost('magnetus-masculino-message-match', '#diagnostico');
    const decision = createHost('magnetus-masculino-decision-bridge', '#oferta');

    setHosts({ match: match?.element ?? null, decision: decision?.element ?? null });

    return () => {
      if (match?.created) match.element.remove();
      if (decision?.created) decision.element.remove();
    };
  }, []);

  const scrollTo = (selector, location) => {
    trackCtaClick({ location, destination: selector.replace('#', '') });
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {hosts.match && createPortal(
        <section className="magm-continuity-match" aria-labelledby="magm-continuity-match-title">
          <div className="magm-continuity-container">
            <p className="magm-continuity-eyebrow">{angle.eyebrow}</p>
            <h2 id="magm-continuity-match-title">{angle.title}</h2>
            <p>{angle.text}</p>
            <button type="button" onClick={() => scrollTo('#diagnostico', `message_match_${angle.code.toLowerCase()}`)}>
              Fazer o mini diagnóstico <ArrowDown size={18} />
            </button>
          </div>
        </section>,
        hosts.match,
      )}

      {hosts.decision && createPortal(
        <section className="magm-decision-bridge" aria-labelledby="magm-decision-title">
          <div className="magm-decision-container">
            <div className="magm-decision-copy">
              <p className="magm-continuity-eyebrow">Antes da oferta</p>
              <h2 id="magm-decision-title">Você não precisa virar um personagem para deixar de parecer inseguro.</h2>
              <p>O Magnetus III organiza uma sequência prática para identificar vazamentos de presença, ajustar ritmo e comunicação e aplicar os novos sinais em conversas, encontros, redes sociais e situações reais.</p>
              <div className="magm-decision-points">
                <span><CheckCircle2 size={18} /> Reconhecer pressa, excesso e busca de aprovação</span>
                <span><CheckCircle2 size={18} /> Demonstrar interesse sem transmitir urgência</span>
                <span><CheckCircle2 size={18} /> Ajustar postura, voz, pausa, limite e ritmo</span>
                <span><CheckCircle2 size={18} /> Praticar de 10 a 20 minutos por dia durante 15 dias</span>
              </div>
            </div>

            <aside className="magm-decision-card" aria-label="Resumo para decisão">
              <ShieldCheck size={34} />
              <h3>Não é manipulação</h3>
              <p>O produto não promete conquista garantida, controle de mulheres ou personagem de “macho alfa”.</p>
              <h3>É aplicação observável</h3>
              <p>Você recebe dois materiais digitais, roteiro de 15 dias, acesso imediato e 7 dias de garantia por R$ 79,90.</p>
              <button type="button" onClick={() => scrollTo('#oferta', `decision_bridge_${angle.code.toLowerCase()}`)}>Ver o protocolo completo</button>
            </aside>
          </div>
        </section>,
        hosts.decision,
      )}
    </>
  );
}
