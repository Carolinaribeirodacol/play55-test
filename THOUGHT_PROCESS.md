### 1. Design do Fluxo de Checkout
Quando o usuário clicar em "Confirmar Compra":
  1° A UI mostra uma mensagem ou indicador: "Verificando estoque..." com um spinner de carregamento.
  2° Faço a chamada para a API que valida o estoque de cada item do carrinho.
  3° Se tudo estiver ok, a UI muda para: "Validando cupom..." se o usuário tiver inserido um código. Junto com um spinner de carregamento.
  4° Verifico se o cupom é válido e aplico o desconto, mostrando um check na tela e um texto de cupom aplicado com sucesso.

  Observações:
  - Se algum produto estiver sem estoque, a UI mostra o produto na forma de "disabled" com o ícone de lixeira para a exclusão.
  - Se o cupom for inválido, uma mensagem aparece embaixo do campo do cupom: "Cupom inválido, tente outro."
  - A ideia é deixar o usuário ter um feedback visual de cada etapa, para não parecer que o app travou.

### 2. Gerenciamento de Estado para um processo complexo
Eu optaria por criar um store específico para o checkout, separado do store do carrinho.
  O carrinho guarda o estado dos produtos, quantidades, preços, etc.
  O checkout envolve um processo mais complexo: validações, estados de loading, mensagens de erro específicas, resultado da aplicação do cupom, etc.
  Separar esses estados ajuda a manter o código organizado e claro, além de facilitar testes.
  No store do checkout eu teria, por exemplo:
  - isLoading
  - coupon

### 3. Estratégia de API e Tratamento de Falhas
Minha estratégia seria fazer uma única chamada para a API enviando todos os IDs e quantidades dos produtos para verificar o estoque.
  Vantagens: Menos requisições HTTP

  Desvantagens: Depende que a API suporte esse formato

Experiência ideal para usuário se alguns produtos estão sem estoque:
  - Avisar quais produtos não estão disponíveis
  - Bloquear a finalização da compra ou avisar que os produtos sem estoque não serão incluídos. Sem acrescentar no total também.
  - Mostrar opções para remover ou alterar a quantidade dos produtos em falta
  - Manter os outros produtos no carrinho sem perder nada
  - O cupom só será aplicado se o carrinho estiver válido

### 4. Abstração e Reutilização de Lógica
Para evitar repetir código, eu organizaria assim:

  - Criaria composables para lógica comum de formulários, como validação, loading, error handling — por exemplo useForm.
  - Teria componentes genéricos para campos de formulário, mensagens de erro e feedback visual, para usar em qualquer formulário (carrinho, fale conosco, newsletter).
  - O gerenciamento de estado de chamadas API (loading, error, success) ficaria dentro dos composables, expondo estados para os componentes consumirem.

### Considerações finais
Pensar no checkout como um fluxo com vários estados e possíveis erros é essencial para dar uma boa experiência para o usuário — ninguém gosta de tentar comprar e receber erro sem saber o que aconteceu.

Separar as responsabilidades entre stores ajuda na organização e manutenção do código, especialmente quando o projeto crescer.

Criar arquivos/formatadores/componentes utilitários e reutilizáveis
