# Etapa 5 — Verificação e lançamento

Data: 15 de julho de 2026
Status: **GO técnico para publicação monitorada — `Purchase` será confirmado na primeira compra aprovada**

## Resultado executivo

O build local está pronto para release. O checkout real foi confirmado com Pixel Meta `630829586054528` e API de Conversões ativa. A Meta recebeu e processou `PageView` e `InitiateCheckout` do checkout da Kiwify. O site pode ser publicado de forma monitorada; `Purchase` será validado somente após uma compra realmente aprovada.

## Correções realizadas durante a verificação

1. O menu mobile foi movido para fora do contexto de posicionamento da barra com `backdrop-filter`. Antes da correção, itens visíveis podiam ficar fora da área clicável em 390 px.
2. O FAQ passou a informar `aria-expanded`, `aria-controls` e `aria-hidden`.
3. O nome do material complementar foi centralizado em `PRODUCT.bonusName`.
4. Foi criada uma imagem social JPEG de 1200×630 e 65,9 KB para WhatsApp/Open Graph.
5. Metadados `og:image`, tipo, dimensões, texto alternativo, URL canônica e Twitter Card foram alinhados.
6. Foi criado `npm run release:check` e o gate agregado `npm run verify:release`.

## Matriz de viewport

Testes executados no build de produção servido localmente. Os perfis mobile usam Chromium nas larguras solicitadas; isso valida CSS, viewport e interação, mas não substitui uma passada final no WebKit/Safari de um iPhone real.

| Perfil | Viewport | Conteúdo | Overflow horizontal | CTA na primeira dobra | Console |
| --- | ---: | --- | ---: | --- | --- |
| Android compacto | 360×800 | aprovado | 0 px | aprovado | sem erros |
| iPhone — largura simulada | 390×844 | aprovado | 0 px | aprovado | sem erros |
| Android grande | 430×932 | aprovado | 0 px | aprovado | sem erros |
| Desktop | 1366×768 | aprovado | 0 px | aprovado | sem erros |
| Desktop amplo | 1920×1080 | aprovado | 0 px | aprovado | sem erros |

## Interações e mensuração

| Verificação | Resultado |
| --- | --- |
| Menu mobile: abrir, fechar e navegar | aprovado após correção |
| Menu desktop e seis destinos | aprovado |
| FAQ: abrir e expor estado acessível | aprovado |
| CTA do hero mobile | aprovado |
| CTA da oferta | aprovado |
| CTA fixo mobile | aprovado |
| Checkout de todos os CTAs | URL oficial `https://pay.kiwify.com.br/TX2Ao2R` |
| UTMs na primeira visita | aprovado |
| Persistência de UTMs no retorno sem parâmetros | aprovado |
| `landing_view` | aprovado |
| `section_view` | aprovado |
| `cta_click` com posição | aprovado |
| `faq_open` | aprovado |
| Log first-party `/api/funnel-event` | payload aprovado em ambiente de teste |

Parâmetros exercitados: `src`, `sck`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `s1`, `s2` e `s3`.

Posições de checkout validadas: `hero_mobile_primary`, `offer_primary` e `sticky_mobile`. Também foram validadas posições de navegação mobile e desktop.

## Compartilhamento no WhatsApp

Validação local aprovada:

- título e descrição oficiais;
- `og:url` absoluto e canônico;
- `og:image` absoluto em HTTPS;
- JPEG 1200×630;
- tipo `image/jpeg`;
- 65,9 KB;
- texto alternativo;
- Twitter Card alinhado.

Arquivo: `public/images/optimized/og-magnetus.jpg`.

O preview real do WhatsApp deve ser conferido depois do deploy, porque a produção ainda serve os metadados antigos e o cache do WhatsApp só pode ser avaliado na URL pública final.

## Build e consistência

`npm run verify:release` aprovado com:

- 12 testes automatizados;
- ESLint;
- consistência da comunicação;
- credibilidade;
- orçamento de performance;
- consistência de release;
- build Vite de produção.

Padrão validado no código:

- **Nome:** Magnetus III — Protocolo de Presença Masculina em 15 Dias
- **Preço:** R$ 79,90 ou 6x de R$ 13,32
- **Material complementar:** Antídoto do Antivalor
- **Garantia:** 7 dias

As páginas `/suporte.html`, `/politica-de-privacidade.html` e `/termos-de-uso.html` responderam HTTP 200 no build local em 360 px e mantêm o nome oficial.

## Estado atual da produção

A integração da Vercel confirmou que `https://magnetus-homens.vercel.app/` responde HTTP 200, mas ainda entrega a versão anterior:

- título antigo “Magnetus III — Método de Presença Masculina”;
- Open Graph antigo com imagem relativa;
- `/suporte.html` ainda retorna 404;
- a nova imagem `/images/optimized/og-magnetus.jpg` ainda retorna 404;
- Termos e Privacidade ainda são versões anteriores.

Esse estado é esperado porque nenhuma alteração desta auditoria foi publicada.

## Verificações externas de acompanhamento

### 1. Checkout da Kiwify

O checkout público está acessível e os eventos básicos foram processados. Ainda é necessário conferir no painel administrativo:

- nome completo do produto;
- promessa;
- preço R$ 79,90 e parcelamento;
- Antídoto do Antivalor;
- dois materiais em PDF;
- garantia de 7 dias;
- ausência de cronômetro, desconto ou urgência divergente;
- UTMs visíveis na URL de entrada.

### 2. Evento de compra

O Pixel Meta e a API de Conversões já estão configurados. Na primeira compra aprovada, confirmar:

- `Purchase` disparar após pagamento aprovado;
- valor for `79.90`;
- moeda for `BRL`;
- produto corresponder ao Magnetus III;
- pagamento recusado não gerar compra;
- cartão e PIX aprovados não gerarem duplicidade;
- a venda existir simultaneamente na Kiwify e na plataforma de anúncios.

### 3. Dispositivos reais

Executar uma passada curta em:

- iPhone com Safari/WebKit em 390 ou 430 px;
- Android com Chrome em 360 ou 430 px.

Conferir menu, FAQ, rolagem, vídeo, CTA fixo, teclado, abertura do checkout e retorno pelo botão voltar.

### 4. WhatsApp após deploy

Enviar a URL final em uma conversa de teste e confirmar título, descrição e imagem. Se o card antigo aparecer, atualizar o cache do compartilhamento antes da campanha.

### 5. Pendências de credibilidade da Etapa 4

Ainda faltam os ativos que não podem ser inferidos pelo código:

- fotografia real da autora com autorização comercial registrada;
- credenciais formais acompanhadas de documento ou link de validação, caso sejam anunciadas;
- identificação legal/fiscal autorizada para publicação e revisão jurídica das políticas.

O site permanece sem afirmações não comprovadas enquanto esses dados não forem fornecidos.

## Sequência de liberação

1. Executar `npm run verify:release` novamente.
2. Publicar o mesmo commit aprovado na Vercel.
3. Validar produção, páginas legais, console, eventos e card do WhatsApp.
4. Fazer o teste rápido em iPhone e Android reais.
5. Confirmar `Purchase` na primeira venda aprovada e reconciliar com a Kiwify.
6. Registrar o deployment anterior como rollback.

Ativos de prova, fotografia e credenciais continuam fora da interface até receberem documentação e autorização. Essa pendência não bloqueia a versão atual porque o site não faz as afirmações nem exibe os ativos não comprovados.
