import assert from 'node:assert/strict';
import {
  EXPERIMENTS,
  EXPERIMENT_STATUS,
  getActiveExperimentDefinition,
} from '../src/config/experiments.js';

const experiments = Object.values(EXPERIMENTS).sort((left, right) => left.order - right.order);
const activeExperiment = getActiveExperimentDefinition();

assert.ok(activeExperiment, 'Deve existir exatamente um experimento ativo durante a rodada.');
assert.equal(activeExperiment.id, 'headline_presence_loss', 'A primeira rodada deve testar somente a headline.');
assert.equal(
  experiments.filter((experiment) => experiment.status === EXPERIMENT_STATUS.active).length,
  1,
  'Mais de um experimento ativo contamina o teste.',
);

for (const experiment of experiments) {
  assert.ok(experiment.hypothesis, `Hipótese ausente: ${experiment.id}`);
  assert.equal(experiment.primaryMetric, 'approved_purchase', `Métrica primária inválida: ${experiment.id}`);

  if (experiment.status === EXPERIMENT_STATUS.blocked) {
    assert.ok(experiment.blockReason, `Motivo do bloqueio ausente: ${experiment.id}`);
    assert.equal(experiment.previewable, false, `Experimento bloqueado não pode ter preview: ${experiment.id}`);
    continue;
  }

  const variants = Object.values(experiment.variants);
  assert.ok(variants.length >= 2, `Experimento precisa de pelo menos duas variantes: ${experiment.id}`);
  const totalWeight = variants.reduce((total, variant) => total + variant.weight, 0);
  assert.ok(Math.abs(totalWeight - 1) < Number.EPSILON, `Pesos devem somar 1: ${experiment.id}`);
}

assert.equal(EXPERIMENTS.proof_print_vs_video.status, EXPERIMENT_STATUS.blocked);
assert.match(EXPERIMENTS.proof_print_vs_video.blockReason, /autoriza[cç][aã]o/i);
assert.equal(EXPERIMENTS.offer_real_discount.status, EXPERIMENT_STATUS.blocked);
assert.match(EXPERIMENTS.offer_real_discount.blockReason, /pre[cç]o anterior praticado/i);

console.log(`Experimento ativo: ${activeExperiment.id} v${activeExperiment.version}.`);
console.log('Fila validada: uma variável por rodada; prova e desconto permanecem bloqueados.');
