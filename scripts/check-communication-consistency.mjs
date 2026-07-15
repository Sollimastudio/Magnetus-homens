import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PRODUCT } from '../src/config/product.js';

const [app, index, terms, privacy, support, bundleVisual] = await Promise.all([
  readFile('src/App.jsx', 'utf8'),
  readFile('index.html', 'utf8'),
  readFile('public/termos-de-uso.html', 'utf8'),
  readFile('public/politica-de-privacidade.html', 'utf8'),
  readFile('public/suporte.html', 'utf8'),
  readFile('src/components/ProductBundleVisual.jsx', 'utf8'),
]);

const publicCopy = [app, index, terms, privacy, support, bundleVisual].join('\n').toLocaleLowerCase('pt-BR');
const forbiddenPhrases = [
  'lote promocional',
  'hoje por apenas',
  'barbershop',
  'menos que um perfume',
  'menos que um jantar',
  'r$ 127,00',
  'r$ 67,00',
  'r$ 47,00',
  '/images/ebook-magnetus-3.jpeg',
  '/images/combo-atual.png',
];

for (const phrase of forbiddenPhrases) {
  assert.equal(publicCopy.includes(phrase), false, `Comunicação proibida voltou ao site: ${phrase}`);
}

for (const source of [index, terms, privacy, support]) {
  assert.ok(source.includes(PRODUCT.canonicalName), `Nome oficial ausente em ${source.slice(0, 40)}`);
}

assert.ok(index.includes(PRODUCT.promise), 'A promessa oficial não está alinhada nos metadados.');
assert.ok(app.includes('PRODUCT.promise'), 'A landing não usa a promessa centralizada.');
assert.ok(app.includes('PRODUCT.subtitle'), 'A landing não usa o subtítulo centralizado.');

const requiredFlow = ['diagnostico', 'mecanismo', 'conteudo-protocolo', 'prova', 'garantia', 'oferta'];
let previousPosition = -1;
for (const sectionId of requiredFlow) {
  const position = app.indexOf(`id="${sectionId}"`);
  assert.ok(position > previousPosition, `Fluxo incorreto ou seção ausente: ${sectionId}`);
  previousPosition = position;
}

console.log(`Nome: ${PRODUCT.canonicalName}`);
console.log(`Fluxo validado: ${requiredFlow.join(' → ')}`);
console.log('Urgência artificial, comparações fracas e valores riscados: ausentes.');
