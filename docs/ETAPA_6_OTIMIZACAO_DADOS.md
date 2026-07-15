# Etapa 6 — Otimização por dados

## Estado da rodada

O sistema mantém uma atribuição estável por visitante, registra a exposição e impede mais de um experimento ativo. A primeira rodada está configurada em 50/50 no código; ela só começa a coletar tráfego real depois da publicação da versão aprovada.

| Ordem | Variável | Controle | Variante | Estado |
|---:|---|---|---|---|
| 1 | Headline | “Ajuste os sinais de insegurança. Construa presença.” | “Pare de perder a presença quando gosta. Mantenha seu eixo.” | Ativa no código |
| 2 | CTA | Orientado ao protocolo | Orientado ao resultado: “Construir minha presença” | Na fila |
| 3 | Hero | Imagem estática otimizada | Cena curta, silenciosa, 4 s e 564 KB | Na fila |
| 4 | Prova | Print autorizado | Vídeo autorizado | Bloqueada: faltam ativos e autorizações |
| 5 | Oferta | Preço atual | Desconto real | Bloqueada: faltam histórico, valor, período e checkout equivalente |

O controle do hero preserva as imagens otimizadas. A variante cinematográfica respeita `prefers-reduced-motion`; nessas sessões, a imagem estática permanece visível.

## Mensuração implementada

- `experiment_exposure`: uma vez por sessão, com experimento, variante, versão, bucket, origem da atribuição e indicador de preview.
- `landing_view`, `section_view`, `cta_click` e `faq_open`: recebem automaticamente o mesmo contexto experimental.
- Clique para checkout: recebe `checkout_experiment_tagged`.
- Kiwify: a variante é enviada em `s3` no formato `exp.<id>.v<versão>.<variante>` quando `s3` não veio ocupado pela campanha.
- UTMs e parâmetros existentes continuam prevalecendo; nenhum valor de campanha é sobrescrito.
- Previews de QA são marcados e nunca recebem a etiqueta experimental no checkout.

Durante as rodadas, reserve `s3` para o experimento. Se uma campanha já usa `s3`, a venda continuará com a atribuição original, mas não poderá ser ligada à variante apenas pela exportação da Kiwify.

## Métrica e regra de decisão

1. Métrica primária: compras aprovadas por visitante exposto.
2. Métrica diagnóstica: cliques no checkout por visitante exposto.
3. O clique não declara vencedor; ele serve para localizar atrito enquanto a compra aprovada ainda não está validada.
4. Calcular a amostra antes da rodada com a conversão de base e o menor efeito relevante:

   `npm run experiment:sample -- 0.02 0.25`

5. Manter a rodada por pelo menos sete dias completos e até atingir a amostra pré-calculada.
6. Não encerrar por uma oscilação intermediária. Excluir `experiment_preview=true` da análise.
7. Depois da decisão, publicar a vencedora como novo controle, incrementar a versão quando necessário e só então ativar a variável seguinte.

## QA das variantes prontas

- Headline: `?exp_preview=headline_presence_loss&exp_variant=presence_loss`
- CTA resultado: `?exp_preview=cta_protocol_vs_result&exp_variant=result`
- Hero cinematográfico: `?exp_preview=hero_static_vs_cinematic&exp_variant=cinematic`

O verificador `npm run experiments:check` falha se houver duas rodadas ativas, pesos inválidos, experimento bloqueado em preview ou ausência dos bloqueios éticos de prova e desconto.

## Verificações durante o tráfego real

- Pixel Meta `630829586054528` e API de Conversões estão configurados; `PageView` e `InitiateCheckout` já foram processados.
- Na primeira compra aprovada, confirmar a chegada da variante em `s3` e do evento `Purchase` na Meta, sem duplicidade.
- Registrar a taxa de conversão de base para calcular a amostra.
- Manter prova e desconto fora da página até existir documentação verificável e consistência no checkout.

Sem a compra aprovada mensurável, a rodada pode validar apenas instrumentação e CTR; não pode escolher uma vencedora de negócio.
