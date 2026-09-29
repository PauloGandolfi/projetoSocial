# Instituto Novo Horizonte

## Sobre o projeto

Site institucional de uma ONG fictícia que promove inclusão social, educação e apoio comunitário. O projeto é feito com HTML, CSS e JavaScript puros, sem dependências ou backend.

## Tecnologias e estrutura

- `index.html`: apresentação, projetos em destaque, indicadores de impacto, exemplos de alertas e contato.
- `projetos.html`: projetos sociais, voluntariado, doações e campanhas.
- `cadastro.html`: formulário acessível para cadastro de voluntários.
- `css/style.css`: identidade visual, componentes e regras responsivas.
- `js/script.js`: menu móvel, modal, toast, máscaras e validação do formulário.
- `imagens/`: ilustrações e identidade visual locais.

## Layout e acessibilidade

Os blocos principais usam CSS Grid com 12 colunas. Flexbox organiza navegação, ações, botões, cards e mensagens. O CSS define cores, espaçamentos, tipografia, bordas, sombras e transições em `:root`.

Os breakpoints são desktop (acima de 1024px), tablet (701px a 1024px) e mobile (até 700px). O menu recolhe em telas de até 760px. O site inclui link para pular ao conteúdo, navegação por teclado, foco visível, labels associadas aos campos, mensagens anunciadas por leitores de tela e suporte a preferência por movimento reduzido.

## Como executar e conferir os componentes

Abra `index.html` no navegador ou use uma extensão como Live Server. Não é necessário instalar dependências.

1. Em uma janela estreita (até 760px), use o botão hambúrguer para abrir e fechar o menu.
2. Selecione **Quero participar** para abrir o modal; feche pelo botão ×, clicando fora ou pressionando Esc. Teste os links para voluntariado e doações.
3. Na página inicial, confira os exemplos de alerta informativo e de erro.
4. Abra `cadastro.html` e tente enviar o formulário vazio para ver o alerta de erro e os campos inválidos. Preencha os dados, incluindo CPF, telefone e CEP nos formatos indicados, aceite o consentimento e envie para ver o toast de sucesso.
5. No formulário, teste foco com Tab e os estados de erro e sucesso dos campos.

O cadastro é demonstrativo: como não existe servidor, o envio válido é confirmado localmente e os dados não são armazenados.
