import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { PRODUCT } from '../src/config/product.js';

const [app, bundle, index, terms, privacy, support] = await Promise.all([
  readFile('src/App.jsx', 'utf8'),
  readFile('src/components/ProductBundleVisual.jsx', 'utf8'),
  readFile('index.html', 'utf8'),
  readFile('public/termos-de-uso.html', 'utf8'),
  readFile('public/politica-de-privacidade.html', 'utf8'),
  readFile('public/suporte.html', 'utf8'),
]);

assert.equal(PRODUCT.canonicalName, 'Magnetus III — Protocolo de Presença Masculina em 15 Dias');
assert.equal(PRODUCT.priceLabel, 'R$ 79,90');
assert.equal(PRODUCT.installmentLabel, '6x de R$ 13,32');
assert.equal(PRODUCT.bonusName, 'Antídoto do Antivalor');
assert.equal(PRODUCT.guaranteeDays, 7);

for (const [surface, source] of Object.entries({ index, terms, privacy, support })) {
  assert.ok(source.includes(PRODUCT.canonicalName), `Nome oficial ausente em ${surface}.`);
}

for (const token of ['PRODUCT.canonicalName', 'PRODUCT.priceLabel', 'PRODUCT.installmentLabel', 'PRODUCT.bonusName', 'PRODUCT.guaranteeDays']) {
  assert.ok(`${app}\n${bundle}`.includes(token), `Configuração centralizada ausente da landing: ${token}`);
}

const forbiddenVariants = [
  'manual de atração para homens',
  'magnetus ele',
  'r$ 127,00',
  'r$ 67,00',
  'r$ 47,00',
  '30 dias de garantia',
];
const publicCopy = `${app}\n${bundle}\n${index}\n${terms}\n${privacy}\n${support}`.toLocaleLowerCase('pt-BR');
for (const variant of forbiddenVariants) {
  assert.equal(publicCopy.includes(variant), false, `Variação inconsistente encontrada: ${variant}`);
}

for (const location of ['hero_mobile_primary', 'offer_primary', 'sticky_mobile']) {
  assert.ok(app.includes(`handleCheckout('${location}')`), `CTA de checkout sem rastreamento: ${location}`);
}

const anchors = app.match(/<a\b[\s\S]*?<\/a>/g) ?? [];
for (const anchor of anchors) {
  assert.ok(anchor.includes('onClick={() => handleLinkClick('), `Link sem evento de posição: ${anchor.slice(0, 120)}`);
}

const expectedSocialImage = 'https://magnetus-homens.vercel.app/images/optimized/og-magnetus.jpg';
for (const tag of [
  `property="og:image" content="${expectedSocialImage}"`,
  'property="og:image:type" content="image/jpeg"',
  'property="og:image:width" content="1200"',
  'property="og:image:height" content="630"',
  `name="twitter:image" content="${expectedSocialImage}"`,
]) {
  assert.ok(index.includes(tag), `Metadado social ausente: ${tag}`);
}

const socialImage = await stat('public/images/optimized/og-magnetus.jpg');
assert.ok(socialImage.size < 300_000, `Imagem social excede 300 KB: ${socialImage.size} bytes`);

for (const href of ['/suporte.html', '/politica-de-privacidade.html', '/termos-de-uso.html']) {
  assert.ok(app.includes(`href="${href}"`), `Link legal ou de suporte ausente: ${href}`);
}

for (const [surface, source] of Object.entries({ app, terms, privacy, support })) {
  assert.ok(source.includes('https://wa.me/5562991879936'), `WhatsApp oficial ausente em ${surface}.`);
}

console.log(`Oferta: ${PRODUCT.canonicalName} · ${PRODUCT.priceLabel} · ${PRODUCT.bonusName} · ${PRODUCT.guaranteeDays} dias.`);
console.log('CTAs de checkout, links rastreados, superfícies legais e metadados sociais: consistentes.');
