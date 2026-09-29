# Instituto Novo Horizonte

## Sobre o projeto

Site institucional fictício de uma ONG que promove inclusão social, educação e apoio a comunidades em situação de vulnerabilidade. O projeto foi feito como uma página acadêmica simples, sem backend e sem dependências externas.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro

## Estrutura de pastas

```text
projeto-ong/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── imagens/
    ├── logo.svg
    ├── banner.svg
    ├── projeto-social.svg
    └── voluntariado.svg
```

As ilustrações são SVGs locais, portanto o site funciona sem conexão com a internet.

## Páginas

- `index.html`: apresentação, missão, áreas de atuação e contato.
- `projetos.html`: projetos sociais, voluntariado, doações e campanhas.
- `cadastro.html`: formulário acessível para cadastro de voluntários.

## Recursos de acessibilidade

O site usa HTML semântico, textos alternativos descritivos, labels associados aos campos, foco visível para teclado, navegação clara, hierarquia de títulos, `lang="pt-BR"` e um link para pular diretamente ao conteúdo principal. O símbolo do logo é decorativo no cabeçalho e usa `alt=""`.

## Validações do formulário

O cadastro usa validações nativas com `required`, `type="email"`, `type="date"`, `pattern` para CPF, telefone e CEP, e `minlength` para o nome. O JavaScript aplica máscaras enquanto a pessoa digita e impede o envio para um servidor inexistente. Quando os dados são válidos, uma mensagem de sucesso aparece na página.

## Como executar

Abra `index.html` diretamente no navegador ou use uma extensão como Live Server. Não é necessário instalar dependências.

## W3C Validator

Para validar o HTML, acesse o [W3C Markup Validation Service](https://validator.w3.org/) e envie individualmente `index.html`, `projetos.html` e `cadastro.html`. O CSS pode ser revisado no [CSS Validation Service](https://jigsaw.w3.org/css-validator/).
