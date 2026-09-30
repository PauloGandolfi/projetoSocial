# Instituto Novo Horizonte

## Sobre

Site demonstrativo de uma ONG, feito com HTML, CSS e Vanilla JavaScript. Não usa backend nem bibliotecas externas.

## Estrutura

```text
html/
  index.html
  projetos.html
  cadastro.html
css/
  style.css
images/
  logo.svg, banner.svg, ilustrações e imagens locais
js/
  main.js       ponto de entrada
  navigation.js navegação SPA e menu mobile
  templates.js  dados e renderização de cards
  form.js       máscaras, validação e envio demonstrativo
  modal.js      abertura e fechamento do modal
  toast.js      avisos de sucesso, erro e informação
  storage.js    leitura e gravação no localStorage
```

## Como executar

Sirva a pasta do projeto em um servidor local simples, por exemplo com a extensão Live Server do VS Code, e abra `/html/index.html`. É necessário usar um servidor local porque os módulos ES e o carregamento SPA usam `import` e `fetch`; abrir o arquivo diretamente com `file://` bloqueia esses recursos em alguns navegadores.

## Como a aplicação funciona

`main.js` inicializa os módulos e renderiza a página atual. `navigation.js` intercepta links internos, carrega o próximo HTML com `fetch`, atualiza somente o `<main>` e registra o endereço com History API; voltar e avançar no navegador também atualiza a seção.

`templates.js` mantém os projetos como objetos e usa `map()` e template literals para gerar cards nas páginas inicial e de projetos. `form.js` valida os campos no evento `input`, usa uma expressão regular simples para e-mail, bloqueia envios inválidos, mostra mensagens por campo e apresenta o toast quando o cadastro é aceito.

`storage.js` grava e recupera os cadastros demonstrativos por `localStorage`, usando `JSON.stringify()` e `JSON.parse()`. São guardados nome, e-mail, área de interesse, disponibilidade e data do envio. CPF, telefone e endereço não são persistidos. Ao abrir a página de cadastro, uma mensagem informa a quantidade de registros salvos neste navegador. Os dados podem ser limpos em DevTools → Application/Armazenamento → Local Storage.

## Teste manual

1. Reduza a largura da janela para até 760 px, abra o menu hambúrguer e escolha uma opção; o menu deve fechar.
2. Abra **Quero participar**. Feche pelo botão ×, clique fora do diálogo ou pressione Esc. Teste os links do modal.
3. Navegue entre Início, Projetos e Cadastro. O conteúdo principal deve mudar sem recarregar a página; teste também Voltar e Avançar.
4. Em Cadastro, deixe campos vazios, digite um e-mail inválido e um nome curto para conferir os erros em tempo real. Um envio inválido não deve limpar o formulário.
5. Preencha todos os campos obrigatórios, use os formatos de CPF, telefone e CEP mostrados, aceite o consentimento e envie. O toast deve confirmar o cadastro.
6. Visite outra página e volte a Cadastro; a mensagem de registros salvos deve continuar. Atualize a página e confirme novamente.
7. Abra o Console do DevTools (F12) durante os passos. A navegação e a renderização devem ocorrer sem erros em vermelho.
