const active = 'active';
const queued = 'queued';
const blocked = 'blocked';

export const EXPERIMENT_STATUS = Object.freeze({ active, queued, blocked });

export const EXPERIMENTS = Object.freeze({
  headline_presence_loss: Object.freeze({
    id: 'headline_presence_loss',
    version: 1,
    status: active,
    order: 1,
    surface: 'hero_headline',
    hypothesis: 'Nomear a perda de presença quando existe interesse aumenta a identificação sem ampliar a promessa do produto.',
    primaryMetric: 'approved_purchase',
    diagnosticMetric: 'checkout_click_through_rate',
    previewable: true,
    variants: Object.freeze({
      control: Object.freeze({
        weight: 0.5,
        values: Object.freeze({
          headlineLead: 'Ajuste os sinais de insegurança.',
          headlineAccent: 'Construa presença.',
        }),
      }),
      presence_loss: Object.freeze({
        weight: 0.5,
        values: Object.freeze({
          headlineLead: 'Pare de perder a presença quando gosta.',
          headlineAccent: 'Mantenha seu eixo.',
        }),
      }),
    }),
  }),
  cta_protocol_vs_result: Object.freeze({
    id: 'cta_protocol_vs_result',
    version: 1,
    status: queued,
    order: 2,
    surface: 'checkout_cta_copy',
    hypothesis: 'Um CTA orientado ao resultado aumenta os cliques qualificados no checkout em relação ao CTA orientado ao protocolo.',
    primaryMetric: 'approved_purchase',
    diagnosticMetric: 'checkout_click_through_rate',
    previewable: true,
    variants: Object.freeze({
      protocol: Object.freeze({
        weight: 0.5,
        values: Object.freeze({
          checkoutCtaLabel: 'Acessar o protocolo',
          heroSectionCtaLabel: 'Ver oferta completa',
          stickyCtaLabel: 'Acessar protocolo',
        }),
      }),
      result: Object.freeze({
        weight: 0.5,
        values: Object.freeze({
          checkoutCtaLabel: 'Construir minha presença',
          heroSectionCtaLabel: 'Construir minha presença',
          stickyCtaLabel: 'Construir minha presença',
        }),
      }),
    }),
  }),
  hero_static_vs_cinematic: Object.freeze({
    id: 'hero_static_vs_cinematic',
    version: 1,
    status: queued,
    order: 3,
    surface: 'hero_media',
    hypothesis: 'Uma cena curta e silenciosa aumenta a compreensão e o interesse sem prejudicar desempenho ou acessibilidade.',
    primaryMetric: 'approved_purchase',
    diagnosticMetric: 'checkout_click_through_rate',
    previewable: true,
    variants: Object.freeze({
      static: Object.freeze({
        weight: 0.5,
        values: Object.freeze({ heroMedia: 'static' }),
      }),
      cinematic: Object.freeze({
        weight: 0.5,
        values: Object.freeze({ heroMedia: 'cinematic' }),
      }),
    }),
  }),
  proof_print_vs_video: Object.freeze({
    id: 'proof_print_vs_video',
    version: 1,
    status: blocked,
    order: 4,
    surface: 'authorized_proof',
    hypothesis: 'A prova em vídeo pode transmitir mais contexto e autenticidade do que um print autorizado.',
    primaryMetric: 'approved_purchase',
    diagnosticMetric: 'checkout_click_through_rate',
    previewable: false,
    blockReason: 'Faltam um print e um vídeo com origem, vínculo com a compra e autorização de uso registrados.',
    variants: Object.freeze({}),
  }),
  offer_real_discount: Object.freeze({
    id: 'offer_real_discount',
    version: 1,
    status: blocked,
    order: 5,
    surface: 'offer_price',
    hypothesis: 'Um desconto verdadeiro, com preço anterior comprovável e período definido, pode aumentar compras aprovadas.',
    primaryMetric: 'approved_purchase',
    diagnosticMetric: 'checkout_click_through_rate',
    previewable: false,
    blockReason: 'Faltam preço anterior praticado, valor promocional, período da promoção e configuração equivalente no checkout Kiwify.',
    variants: Object.freeze({}),
  }),
});

export function getActiveExperimentDefinition(experiments = EXPERIMENTS) {
  const activeExperiments = Object.values(experiments).filter(
    (experiment) => experiment.status === EXPERIMENT_STATUS.active,
  );

  if (activeExperiments.length > 1) {
    throw new Error('Apenas um experimento pode estar ativo por vez.');
  }

  return activeExperiments[0] ?? null;
}
