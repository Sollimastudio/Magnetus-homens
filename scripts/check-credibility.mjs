import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [app, terms, privacy, support] = await Promise.all([
  readFile('src/App.jsx', 'utf8'),
  readFile('public/termos-de-uso.html', 'utf8'),
  readFile('public/politica-de-privacidade.html', 'utf8'),
  readFile('public/suporte.html', 'utf8'),
]);

const publicCopy = [app, terms, privacy, support].join('\n').toLocaleLowerCase('pt-BR');
const unsupportedProof = [
  'ricardo m.',
  'andré s.',
  'paulo f.',
  'profile-ricardo',
  'profile-andre',
  'profile-paulo',
  'relatos informados por clientes',
  'autora-sol-lima.jpg',
];

for (const phrase of unsupportedProof) {
  assert.equal(publicCopy.includes(phrase), false, `Prova não documentada voltou ao site: ${phrase}`);
}

for (const phrase of [
  'criadora e responsável editorial',
  'depoimentos só serão publicados quando houver origem e autorização de uso registradas',
  'https://reembolso.kiwify.com.br/',
  'https://wa.me/5562991879936',
  'contato@sollimastudio.com',
  'sol lima',
  'sollima studio',
]) {
  assert.ok(publicCopy.includes(phrase), `Informação de credibilidade ausente: ${phrase}`);
}

assert.ok(app.includes('id="prova"'), 'Bloco de evidências verificáveis ausente.');
assert.ok(app.includes('id="garantia"'), 'Bloco de garantia ausente.');
assert.ok(app.includes('href="/suporte.html"'), 'Central de suporte não está vinculada à landing.');

console.log('Autoria, evidências documentais, garantia, suporte e identidade: presentes.');
console.log('Depoimentos e imagem de autora sem autorização: ausentes da interface.');
