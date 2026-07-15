# Magnetus III — Linha de base de mensuração

Data da auditoria: 14 de julho de 2026
Página: https://magnetus-homens.vercel.app
Checkout: https://pay.kiwify.com.br/TX2Ao2R

## Nomenclatura oficial

**Magnetus III — Protocolo de Presença Masculina em 15 Dias**

- Identificador analítico: `magnetus_iii`
- Moeda: `BRL`
- Preço da oferta auditada: `R$ 79,90`

Essa nomenclatura deve ser repetida sem variações na landing page, checkout, área de membros, e-mail de acesso e materiais de campanha.

## Linha de base anterior à instrumentação

| Indicador | Situação em 14/07/2026 |
| --- | --- |
| Sessões e pageviews | Vercel Web Analytics já instalado; o total histórico deve ser exportado do painel antes do primeiro deploy instrumentado. |
| Cliques no checkout | Não eram medidos. Ausência de dado histórico não significa zero cliques. |
| Vendas | Devem ser exportadas da área **Vendas** da Kiwify para o mesmo intervalo da Vercel. |
| Eventos por posição de CTA | Não existiam. |
| Atribuição no checkout | UTMs/SRC/SCK não eram transportados pela landing page. |
| Pixel Meta no checkout | Configurado em 15/07/2026 com o ID `630829586054528`; API de Conversões reconhecida pela Kiwify. |

## Eventos implementados

| Evento | Quando dispara | Propriedades principais |
| --- | --- | --- |
| `landing_view` | A landing page é inicializada | produto, preço, sessão anônima e atribuição |
| `section_view` | Diagnóstico, método ou oferta atingem 35% de visibilidade | seção e atribuição |
| `cta_click` | Um CTA é acionado | posição, destino e atribuição |
| `faq_open` | Uma resposta do FAQ é aberta | índice e pergunta |

Os eventos são enviados para:

1. Vercel Web Analytics, por evento personalizado.
2. `dataLayer`, para futura conexão com Google Tag Manager.
3. `/api/funnel-event`, que grava um log estruturado sem nome, e-mail, telefone ou outro dado pessoal.

## Parâmetros preservados até a Kiwify

`src`, `sck`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `s1`, `s2` e `s3`.

A landing page usa os parâmetros da visita atual. Quando o usuário volta sem parâmetros, reutiliza a última origem conhecida armazenada no navegador.

## Validação do pixel Meta na Kiwify

Validação realizada em 15/07/2026:

1. Pixel Meta `630829586054528` salvo no produto da Kiwify.
2. Token da API de Conversões reconhecido pela configuração pública do checkout, sem exposição do segredo.
3. Meta Eventos de Teste recebeu e processou `PageView` e `InitiateCheckout` de `pixels.kiwify.com.br`.
4. As opções de disparar `Purchase` para Pix ou boleto apenas gerados permanecem desligadas.

O evento `Purchase` deve ser conferido na primeira compra realmente aprovada: valor `79.90`, moeda `BRL`, produto Magnetus III e ausência de duplicidade entre navegador e servidor.

## Comparação após o deploy

Registrar diariamente, sempre no mesmo fuso e intervalo:

| Data | Sessões | `section_view:oferta` | Cliques Kiwify | Vendas aprovadas | CTR para checkout | Conversão da landing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
|  |  |  |  |  |  |  |

- CTR para checkout = cliques Kiwify ÷ sessões.
- Conversão da landing = vendas aprovadas ÷ sessões.
- Conversão do checkout = vendas aprovadas ÷ cliques Kiwify.
