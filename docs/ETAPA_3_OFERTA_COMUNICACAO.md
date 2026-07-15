# Etapa 3 — Oferta e comunicação

Implementada na landing page em 14 de julho de 2026.

## Padrão oficial

- **Nome:** Magnetus III
- **Subtítulo:** Protocolo de Presença Masculina em 15 Dias
- **Nome completo:** Magnetus III — Protocolo de Presença Masculina em 15 Dias
- **Promessa:** Ajuste os sinais de pressa e insegurança para construir uma presença mais firme em 15 dias.
- **Formato:** 2 materiais digitais em PDF
- **Preço:** R$ 79,90 ou 6x de R$ 13,32
- **Garantia:** 7 dias, processada pela Kiwify

Nome, subtítulo, promessa, formato e garantia foram centralizados em `src/config/product.js` e usados na landing.

## Entregáveis apresentados

1. **Magnetus III — Protocolo de Presença Masculina em 15 Dias:** material principal em PDF, estruturado em três fases.
2. **Antídoto do Antivalor:** material complementar em PDF sobre pressa, carência e reatividade.
3. **Roteiro de aplicação em 15 dias:** integrado ao protocolo.
4. **Acesso digital:** enviado por e-mail após a confirmação do pagamento.
5. **Garantia de 7 dias:** solicitação e processamento pela Kiwify.

Não são anunciados quantidade de páginas, vídeos, comunidade, suporte, certificado ou atualizações vitalícias porque esses itens não foram confirmados por um ativo do produto.

## Sumário publicado

| Fase | Conteúdo confirmado |
| --- | --- |
| Dias 1–5 | Impulso, explicação excessiva, disponibilidade e aprovação |
| Dias 6–10 | Postura, voz, olhar, silêncio e limites |
| Dias 11–15 | Conversas, encontros, trabalho e redes sociais |

## Fluxo da página

`Problema → Mecanismo → Conteúdo → Prova → Garantia → Oferta`

Foram removidos:

- comparação com barbeiro, perfume e jantar;
- valores arbitrários riscados;
- “lote promocional disponível”;
- “hoje por apenas”;
- avaliação de cinco estrelas sem base quantitativa;
- mockups visíveis com o subtítulo divergente “Manual de Atração para Homens”.

## Páginas internas do produto

Não existem PDF, DOCX ou imagens de páginas internas no repositório ou no histórico disponível. Por isso, nenhuma página fictícia foi criada ou apresentada como real.

Para concluir esse item, adicionar de 2 a 4 exportações PNG/WebP das páginas finais do PDF, sem dados pessoais, e vinculá-las à seção de conteúdo. As páginas devem corresponder exatamente ao material entregue na Kiwify.

## Alinhamento da Kiwify

A landing está alinhada. Checkout e pop-up exigem acesso administrativo à Kiwify e não podem ser alterados por este repositório. Aplicar no painel:

### Checkout

- **Nome do produto:** `Magnetus III — Protocolo de Presença Masculina em 15 Dias`
- **Descrição curta:** `Ajuste os sinais de pressa e insegurança para construir uma presença mais firme em 15 dias.`
- **Resumo:** `Inclui 2 materiais digitais em PDF, roteiro de aplicação em 15 dias, acesso por e-mail e garantia de 7 dias.`
- **Preço:** `R$ 79,90`
- **Garantia:** `7 dias`

### Pop-up de saída

Desativar o pop-up promocional atual, incluindo cronômetro, desconto de 10% no texto e desconto de 15% no botão. Esses elementos não correspondem à oferta da landing.

Se um pop-up informativo for mantido, usar sem desconto ou contagem regressiva:

- **Título:** `Ainda está avaliando?`
- **Texto:** `Revise o que está incluído no Magnetus III e como funciona a garantia de 7 dias.`
- **Botão:** `Voltar e revisar a oferta`

### Validação

1. Abrir o checkout em janela anônima.
2. Confirmar nome, promessa, entregáveis, preço e garantia.
3. Tentar sair e verificar que não há desconto ou cronômetro artificial.
4. Confirmar que UTMs continuam na URL.
5. Confirmar que o Pixel Meta `630829586054528` continua recebendo `PageView` e `InitiateCheckout`; validar `Purchase` na primeira compra aprovada.

## Proteção contra regressão

Executar `npm run communication:check`. O comando falha se o fluxo for alterado, se a nomenclatura deixar de aparecer ou se urgências, comparações e valores riscados voltarem ao site.
