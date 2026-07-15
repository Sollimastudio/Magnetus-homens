# Etapa 2 — Correção mobile e desempenho

Implementada em 14 de julho de 2026.

## Alterações aplicadas

- A abertura mobile agora apresenta problema, promessa, formato, prazo, preço, garantia e CTA na primeira dobra.
- A sequência de `430svh` foi removida. A animação passou a ser um vídeo de 4 segundos em uma seção posterior.
- O vídeo só é inserido quando a seção entra na viewport, pausa fora dela e não é renderizado quando o usuário prefere movimento reduzido.
- Nenhum componente referencia ou pré-carrega os 192 JPEGs da sequência original.
- O menu mobile mantém o botão de fechar acima do painel, informa estado com `aria-expanded`, retira itens fechados da ordem de foco e fecha com `Esc`.
- Rolagem programática respeita `prefers-reduced-motion`.
- Rótulos antes renderizados com 8–10 px passaram a ter pelo menos 12 px no mobile.
- Imagens abaixo da dobra usam `loading="lazy"`, `decoding="async"` e dimensões explícitas.
- A imagem principal tem preload responsivo; apenas a variação correspondente ao viewport é solicitada.
- A fonte externa não utilizada foi removida do caminho crítico.

## Orçamento de mídia

| Grupo | Antes | Depois |
| --- | ---: | ---: |
| Logo de navegação | 1,72 MB | 0,95 KB |
| Hero mobile | sequência de 15 MB pré-carregada | 51,17 KB na primeira dobra |
| Hero desktop | 1,90 MB | 45,56 KB |
| Combo | 2,37 MB | 77,53 KB |
| Três fotos de perfil | 6,66 MB | 11,99 KB |
| Animação mobile | 192 arquivos / 15 MB | MP4 de 563,91 KB, sob demanda |
| Imagens iniciais mobile | mais de 16 MB | 54,84 KB, incluindo favicon |

O comando `npm run performance:budget` impede regressões nos limites de mídia e falha se o código voltar a referenciar a sequência antiga.

## Pendência obrigatória de fechamento do projeto

Ao concluir todas as etapas recomendadas, configurar e validar o pixel de compra na Kiwify continua sendo o último gate antes de tráfego pago. A validação exige um ID de pixel e uma compra aprovada de teste, conforme `docs/MENSURACAO_BASELINE.md`.
