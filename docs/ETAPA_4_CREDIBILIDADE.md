# Etapa 4 — Credibilidade

Implementada na landing page em 14 de julho de 2026.

## Alterações publicadas no código

- seção da autora reescrita em terceira pessoa, com função e limites explícitos;
- autoria identificada como Sol Lima, criadora e responsável editorial;
- atuação pública vinculada ao perfil público da autora;
- depoimentos e avatares retirados da interface por falta de autorização e vínculo de compra documentados;
- seção de prova refeita com evidências verificáveis: escopo, checkout, garantia, identidade, políticas e suporte;
- garantia de 7 dias vinculada ao portal e às orientações oficiais da Kiwify;
- criada uma Central de Suporte para acesso, reembolso e privacidade;
- Termos de Uso e Política de Privacidade revisados;
- rodapé atualizado com suporte e responsabilidade editorial.

## Critério aplicado às credenciais

O perfil público de Sol Lima apresenta sua atuação com protocolos, livros e conteúdos sobre relacionamentos e cita o Magnetus III. Isso comprova a presença e o posicionamento públicos, mas não é uma validação independente de formação acadêmica ou certificação.

Por esse motivo, a página não usa títulos como “psicóloga”, “terapeuta”, “especialista certificada” ou anos de experiência. Esses atributos só devem ser adicionados depois de receber documento, entidade emissora e, quando existir, URL pública de validação.

## Foto da autora — pendência de origem

O arquivo `public/images/autora-sol-lima.jpg` não foi usado. Ele contém marca visível de geração e o repositório não registra autorização, origem ou confirmação de que representa a autora real.

Para concluir a foto, substituir por uma imagem real e autorizada com:

1. arquivo original em boa resolução;
2. confirmação escrita de autorização para uso comercial;
3. nome da pessoa retratada;
4. nome do fotógrafo ou origem do arquivo;
5. data da autorização.

Até essa comprovação, a interface usa um cartão de identidade editorial com as iniciais “SL”, sem apresentá-lo como fotografia.

## Regra para depoimentos futuros

Cada prova social deve ter um registro interno contendo:

- identificação do comprador ou ID da transação;
- texto original do relato;
- autorização explícita para uso do texto;
- autorização separada para nome, foto, profissão ou idade;
- data, canal e escopo da autorização;
- versão editada aprovada, se houver edição.

Sem esses dados, o depoimento não deve ser publicado.

## Identidade legal — pendência

A página agora informa a identidade editorial disponível: Sollima Studio e Sol Lima. O repositório não contém razão social ou nome civil autorizado para publicação, CPF/CNPJ, endereço comercial ou identificação fiscal do vendedor. Esses dados não foram inferidos de metadados técnicos.

Antes da publicação definitiva, confirmar com o responsável jurídico quais dados precisam aparecer na landing, nas políticas e no checkout e substituir a identificação editorial pela identificação legal adequada quando necessário.

## Validação

Executar `npm run credibility:check`. O comando falha se depoimentos antigos, avatares ou a imagem de autora sem autorização voltarem à interface, e exige os blocos de autoria, garantia, suporte e identidade.

O Pixel Meta `630829586054528` e a API de Conversões foram configurados na Kiwify em 15/07/2026. `PageView` e `InitiateCheckout` foram processados; `Purchase` permanece como verificação da primeira compra realmente aprovada.
