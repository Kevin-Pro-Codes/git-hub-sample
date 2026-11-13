# 🎓 Git & GitHub Teacher - Masterclass Interativa

Uma aplicação web completa desenvolvida para ensinar, simular e exercitar todos os conceitos fundamentais e avançados de **Git & GitHub** no seu dia a dia.

---

## 🌟 O que a aplicação inclui:

### 1. 📚 Central de Lições e Cenários Práticos
Guia completo e pesquisável com botões para **copiar comandos com 1 clique**:
- **01. Estados do Git & Untracked Files:** Por que arquivos aparecem como *untracked* e como funcionam as 3 caixas (*Working Directory*, *Staging Area* e *Repositório*).
- **02. Dominando Branches:** Criação (`git switch -c`), renomeação (`git branch -m alfa beta`), verificação (`git branch -v`) e a regra de onde os commits são gravados.
- **03. O Mistério do `git reset` e o `HEAD`:** Tabela comparativa e explicação detalhada de por que `--soft` mantém os arquivos na Staging Area vs `--mixed` vs `--hard`.
- **04. Alternativas Seguras ao Reset:** `git revert` (padrão de equipe), `git restore --source` (restaurar arquivos do passado) e `git checkout <hash>` (máquina do tempo temporária).
- **05. Cherry-Pick e Remoção de Commits:** Pescar commits específicos com `git cherry-pick 🍒` e apagar commits com `git reset --hard HEAD~N` e `git rebase -i`.
- **06. Conexão com GitHub & Remotos:** Comandos de configuração de remotos (`git remote add origin`), sincronização com `git push -u origin main` e resolução de erros comuns de digitação.
- **07. Guia de Labels & Conventional Commits:** Tutorial completo da padronização de commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `build:`, `ci:`), escopos `feat(ui):` e quebras de compatibilidade `feat!:`.
- **08. Tags no Git & Versionamento Semântico:** Criação de tags anotadas (`git tag -a v1.0.0 -m "..."`), tags no passado, envio para o GitHub (`git push origin --tags`), deleção de tags e regras do SemVer (`vMAJOR.MINOR.PATCH`).
- **09. Pull Requests (PR), Git Fetch & Colaboração:** Diferença crucial entre `git fetch` (espiar sem alterar arquivos) e `git pull` (`fetch + merge`), ciclo de vida de Pull Request no GitHub e simulação multi-desenvolvedor.

### 2. ⚡ Simulador Visual de Git (Sandbox)
- **Terminal virtual integrado** que responde a comandos como `git status`, `git add .`, `git commit -m "..."`, `git switch`, `git reset --soft` e `git reset --hard`.
- **Visualização das 3 Caixas em tempo real:** Mostra arquivos mudando de *Untracked* para *Staged* e para *Committed*.
- **Árvore Gráfica de Commits:** Renderiza cada nó de commit, os ponteiros de branches e o marcador do **HEAD**.

### 3. 📝 App de Teste (Task Master)
- Uma lista de tarefas real onde você pode adicionar, filtrar e excluir tarefas enquanto edita o código nos arquivos locais para gerar commits de teste.

---

## 🚀 Como Executar

Basta abrir o arquivo [index.html](file:///c:/Users/Kevin/Documents/PROJECTS/GitSample/index.html) no seu navegador:

```powershell
Start-Process .\index.html
```

---

## 🌐 Repositório GitHub Conectado
Este projeto está conectado ao GitHub:
* **Remote:** `https://github.com/Kevin-Pro-Codes/git-hub-sample.git`
* **Branch principal:** `main`
