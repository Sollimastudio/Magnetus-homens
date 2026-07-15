const baselineRate = Number(process.argv[2]);
const relativeMinimumDetectableEffect = Number(process.argv[3]);

if (
  !Number.isFinite(baselineRate)
  || baselineRate <= 0
  || baselineRate >= 1
  || !Number.isFinite(relativeMinimumDetectableEffect)
  || relativeMinimumDetectableEffect <= 0
) {
  console.error('Uso: npm run experiment:sample -- <taxa_base_decimal> <mde_relativo_decimal>');
  console.error('Exemplo: npm run experiment:sample -- 0.02 0.25');
  process.exit(1);
}

const controlRate = baselineRate;
const treatmentRate = baselineRate * (1 + relativeMinimumDetectableEffect);

if (treatmentRate >= 1) {
  console.error('A taxa esperada da variante deve ser menor que 1.');
  process.exit(1);
}

const alphaZ = 1.96;
const powerZ = 0.84;
const pooledRate = (controlRate + treatmentRate) / 2;
const absoluteDifference = treatmentRate - controlRate;
const pooledTerm = alphaZ * Math.sqrt(2 * pooledRate * (1 - pooledRate));
const unpooledTerm = powerZ * Math.sqrt(
  controlRate * (1 - controlRate) + treatmentRate * (1 - treatmentRate),
);
const samplePerVariant = Math.ceil(((pooledTerm + unpooledTerm) ** 2) / (absoluteDifference ** 2));

console.log(`Taxa base: ${(controlRate * 100).toFixed(2)}%`);
console.log(`Efeito mínimo detectável: +${(relativeMinimumDetectableEffect * 100).toFixed(1)}% relativo`);
console.log(`Taxa esperada da variante: ${(treatmentRate * 100).toFixed(2)}%`);
console.log(`Amostra aproximada: ${samplePerVariant.toLocaleString('pt-BR')} visitantes por variante (${(samplePerVariant * 2).toLocaleString('pt-BR')} no total).`);
console.log('Parâmetros: teste bilateral, 95% de confiança e 80% de poder.');
