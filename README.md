# 🚀 Task Master - Projeto Prático para Treinar Git

Bem-vindo ao **Task Master**, uma aplicação web minimalista (HTML, CSS e JavaScript puro) feita especificamente para treinar comandos, fluxos de trabalho e boas práticas de Git.

---

## 📂 Estrutura do Projeto

```text
GitSample/
├── index.html     # Estrutura visual da aplicação
├── style.css      # Estilização e variáveis de tema
├── app.js         # Lógica de tarefas, filtros e eventos
├── .gitignore     # Regras de arquivos ignorados
└── README.md      # Este guia com exercícios práticos
```

---

## 🎯 Roteiro Prático de Exercícios Git

Siga os cenários abaixo no seu terminal para praticar:

### Exercício 1: Inicializando o Repositório e Primeiro Commit
1. Inicialize o repositório Git:
   ```bash
   git init
   ```
2. Verifique o status dos arquivos:
   ```bash
   git status
   ```
3. Adicione todos os arquivos à staging area:
   ```bash
   git add .
   ```
4. Crie o primeiro commit com uma mensagem convencional:
   ```bash
   git commit -m "feat: estrutura inicial da aplicacao task master"
   ```

---

### Exercício 2: Criando Branches para Novas Funcionalidades
1. Crie e mude para uma nova branch chamada `feature/dark-mode`:
   ```bash
   git switch -c feature/dark-mode
   # ou: git checkout -b feature/dark-mode
   ```
2. Abra `style.css` e mude as variáveis do `:root` ou adicione classes para suporte a tema escuro.
3. Veja o que mudou com `git diff`:
   ```bash
   git diff
   ```
4. Faça o commit da feature:
   ```bash
   git add style.css
   git commit -m "feat(ui): adiciona variaveis de cores para tema escuro"
   ```
5. Volte para a branch principal (`main` ou `master`):
   ```bash
   git switch main
   ```
6. Faça o merge da feature:
   ```bash
   git merge feature/dark-mode
   ```

---

### Exercício 3: Simulando e Resolvendo um Conflito de Merge
1. Crie uma branch para alterar o título:
   ```bash
   git switch -c alteracao-titulo-a
   ```
2. No `index.html`, mude o `<h1>🚀 Task Master</h1>` para `<h1>⚡ Minhas Tarefas</h1>`.
3. Salve e commite:
   ```bash
   git commit -am "chore: altera titulo para Minhas Tarefas"
   ```
4. Volte para a branch `main`:
   ```bash
   git switch main
   ```
5. Crie outra branch a partir da `main`:
   ```bash
   git switch -c alteracao-titulo-b
   ```
6. No `index.html`, mude a mesma linha do `<h1>` para `<h1>🔥 Lista de Foco</h1>`.
7. Salve e commite:
   ```bash
   git commit -am "chore: altera titulo para Lista de Foco"
   ```
8. Volte para a `main`, faça merge da primeira (`alteracao-titulo-a`) e tente fazer merge da segunda (`alteracao-titulo-b`):
   ```bash
   git switch main
   git merge alteracao-titulo-a
   git merge alteracao-titulo-b
   ```
9. **O Git avisará sobre CONFLITO!** Abra o `index.html`, veja os marcadores `<<<<<<<`, `=======` e `>>>>>>>`, escolha a versão desejada, salve e conclua o merge:
   ```bash
   git add index.html
   git commit -m "merge: resolve conflito de titulos no index.html"
   ```

---

### Exercício 4: Praticando `git stash` (Guardar Trabalho Temporário)
1. Modifique `app.js` adicionando um `console.log("Treinando stash");`.
2. Imagine que surgiu um bug urgente na `main` e você não quer commitar essa linha ainda. Guarde a alteração:
   ```bash
   git stash
   ```
3. Verifique que o arquivo voltou ao estado limpo (`git status`).
4. Quando quiser recuperar o código guardado:
   ```bash
   git stash pop
   ```

---

### Exercício 5: Histórico e Limpeza
- Ver histórico formatado e compacto:
  ```bash
  git log --oneline --graph --decorate
  ```
- Deletar branches já mergeadas que não serão mais usadas:
  ```bash
  git branch -d feature/dark-mode
  git branch -d alteracao-titulo-a
  git branch -d alteracao-titulo-b
  ```

---

Divirta-se praticando! Se quiser testar a aplicação visualmente, basta abrir o arquivo [index.html](file:///c:/Users/Kevin/Documents/PROJECTS/GitSample/index.html) diretamente no seu navegador.

