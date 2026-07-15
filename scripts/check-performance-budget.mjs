import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const oneMegabyte = 1_000_000;

const assets = {
  favicon: 'public/images/optimized/favicon-48.png',
  logo: 'public/images/optimized/logo-96.webp',
  heroMobile: 'public/images/optimized/hero-mobile.webp',
  heroDesktop: 'public/images/optimized/hero-desktop.webp',
  ogImage: 'public/images/optimized/og-magnetus.jpg',
  combo: 'public/images/optimized/combo-800.webp',
  motionVideo: 'public/images/optimized/mobile-presence-motion.mp4',
};

const sizes = Object.fromEntries(
  await Promise.all(
    Object.entries(assets).map(async ([name, path]) => [name, (await stat(path)).size]),
  ),
);

const initialMobileImages = sizes.favicon + sizes.logo + sizes.heroMobile;
const initialDesktopImages = sizes.favicon + sizes.logo + sizes.heroDesktop;

assert.ok(initialMobileImages < oneMegabyte, `Imagens iniciais mobile excederam 1 MB: ${initialMobileImages} bytes`);
assert.ok(initialDesktopImages < oneMegabyte, `Imagens iniciais desktop excederam 1 MB: ${initialDesktopImages} bytes`);
assert.ok(sizes.combo < 250_000, `Combo otimizado excedeu 250 KB: ${sizes.combo} bytes`);
assert.ok(sizes.ogImage < 300_000, `Imagem de compartilhamento excedeu 300 KB: ${sizes.ogImage} bytes`);
assert.ok(sizes.motionVideo < oneMegabyte, `Vídeo mobile excedeu 1 MB: ${sizes.motionVideo} bytes`);

const source = await Promise.all([
  readFile('src/App.jsx', 'utf8'),
  readFile('src/components/MobileMotionStory.jsx', 'utf8'),
]);
const clientSource = source.join('\n');

assert.equal(
  clientSource.includes('mobile-scroll-sequence'),
  false,
  'A aplicação ainda referencia a sequência de 192 frames.',
);
assert.equal(
  clientSource.includes('new Image('),
  false,
  'A aplicação ainda pré-carrega imagens via JavaScript.',
);

const kb = (bytes) => `${(bytes / 1000).toFixed(1)} KB`;
console.log(`Imagens iniciais mobile: ${kb(initialMobileImages)}`);
console.log(`Imagens iniciais desktop: ${kb(initialDesktopImages)}`);
console.log(`Animação sob demanda: ${kb(sizes.motionVideo)}`);
console.log(`Combo: ${kb(sizes.combo)}`);
console.log(`Compartilhamento: ${kb(sizes.ogImage)}`);
