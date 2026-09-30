# Instituto Novo Horizonte

## Sobre o projeto

Aplicação demonstrativa para uma organização sem fins lucrativos. O site apresenta ações sociais, formas de participação e um cadastro de voluntariado. A interface usa HTML, CSS e JavaScript sem framework de interface ou backend.

## Objetivo da aplicação

Apresentar os projetos do Instituto Novo Horizonte e permitir que visitantes conheçam oportunidades de voluntariado, enviem um cadastro demonstrativo e consultem as informações de contato.

## Tecnologias utilizadas

- HTML semântico;
- CSS responsivo, variáveis de tema e animações reduzidas conforme a preferência do sistema;
- JavaScript moderno com módulos ES;
- Vite para desenvolvimento, build multipágina e pré-visualização;
- `html-minifier-terser` para minificar as páginas HTML após a build.

O Vite 8 requer Node.js 20.19+ ou 22.12+. Instale uma versão compatível antes de executar os comandos abaixo.

## Estrutura de diretórios

```text
html/                  páginas de início, projetos e cadastro
css/style.css          estilos, responsividade e temas
images/                ilustrações SVG e imagens locais
js/                    módulos de navegação, formulário, modal e tema
scripts/               etapa de minificação do HTML de produção
dist/                  arquivos gerados pela build (não versionados)
package.json           dependências e comandos npm
vite.config.js         entradas HTML da build multipágina
.gitignore             saídas e arquivos locais ignorados pelo Git
```

## Funcionalidades

- Navegação entre as três páginas sem recarregar a janela, com suporte aos botões voltar e avançar do navegador;
- menu compacto para celular e tablets, com estado anunciado e fechamento pela tecla Escape;
- cards de projetos gerados a partir de dados em JavaScript;
- modal de participação com links para cadastro e projetos;
- formulário de voluntariado com máscaras, validação por campo e resumo de erros;
- confirmação por toast e armazenamento local dos cadastros demonstrativos;
- tema claro e escuro com preferência salva neste navegador.

O formulário é apenas demonstrativo. Os dados não são enviados a um servidor. O navegador guarda somente nome, e-mail, área de interesse, disponibilidade e data do envio.

## Acessibilidade

O site usa regiões semânticas, link para pular ao conteúdo, rótulos associados aos campos, foco visível, navegação por teclado, estado acessível do menu, mensagens de validação ligadas aos campos e avisos dinâmicos com regiões de status. O modal usa o elemento nativo `<dialog>`, recebe foco ao abrir, fecha com Escape e devolve o foco ao acionador. As ilustrações informativas têm texto alternativo; imagens decorativas usam texto alternativo vazio ou são ocultadas da árvore acessível.

O tema escuro mantém as cores em variáveis CSS e atualiza a preferência no `localStorage`. A interface continua operável se o navegador bloquear esse armazenamento, mas a escolha não será preservada entre visitas.

## Como executar localmente

Na pasta do projeto, instale as dependências uma vez e inicie o servidor Vite:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173/`. As páginas `projetos.html` e `cadastro.html` ficam em `/projetos.html` e `/cadastro.html`.

## Versionamento

O projeto utiliza Git e pode ser hospedado no GitHub. A estratégia recomendada é manter `main` como versão estável, integrar mudanças em uma branch `develop` quando ela for útil e criar branches `feature/nome-da-funcionalidade` para novas funcionalidades. Correções urgentes podem usar `hotfix/descricao`.

Prefira mensagens de commit no formato Conventional Commits, por exemplo `feat: adicionar tema escuro` ou `fix: devolver foco ao fechar modal`. Esta seção documenta uma estratégia recomendada; não descreve um histórico de branches ou commits.

## Build de produção

Gere a versão pronta para hospedagem estática com:

```bash
npm run build
```

A build multipágina é gravada em `dist/`. O Vite minifica JavaScript e CSS; a etapa seguinte minifica HTML sem remover os atributos de acessibilidade.

## Roteiro de verificação manual

1. Navegue entre Início, Projetos e Cadastro; use Voltar e Avançar e confira se o foco acompanha a página.
2. Em uma janela estreita, abra o menu pelo teclado, confirme `aria-expanded="true"`, feche com Escape e confira o foco no botão do menu.
3. Abra o modal pelos dois acionadores; confirme o foco inicial, o fechamento por Escape e o retorno do foco ao acionador.
4. Envie o formulário vazio, corrija os campos e envie dados fictícios válidos; confira os erros associados, o toast e o contador salvo no navegador.
5. Alterne o tema, atualize a página e confirme que a preferência e o estado do botão foram restaurados.
6. Confira o console do navegador e rode Lighthouse ou WebAIM Contrast Checker em telas desktop e móvel.

## Deploy

Na Vercel, use a raiz do repositório como diretório do projeto, `npm run build` como comando de build e `dist` como diretório de saída. Para conferir a saída localmente, execute:

```bash
npm run preview
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:4173/`, e confira também `/projetos.html` e `/cadastro.html`. A pasta `dist/` é a saída a publicar. Nenhum deploy é executado por estes comandos.
