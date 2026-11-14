// =============================================================================
// Git & GitHub Teacher - Script Principal (Abas, Simulador, Pesquisa e Tarefas)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTabs();
  initLessonsSearch();
  initCopyButtons();
  initSimulator();
  initMergeLab();
  initTaskMaster();
});

/* =============================================================================
   1. TEMA ESCURO / CLARO
   ============================================================================= */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("git_teacher_theme") || "theme-light";
  document.body.className = savedTheme;
  themeToggle.textContent = savedTheme === "theme-dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    if (isDark) {
      document.body.className = "theme-light";
      themeToggle.textContent = "🌙";
      localStorage.setItem("git_teacher_theme", "theme-light");
    } else {
      document.body.className = "theme-dark";
      themeToggle.textContent = "☀️";
      localStorage.setItem("git_teacher_theme", "theme-dark");
    }
  });
}

/* =============================================================================
   2. NAVEGAÇÃO POR ABAS
   ============================================================================= */
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = `tab-${tab.dataset.tab}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

/* =============================================================================
   3. BUSCA E FILTROS DE LIÇÕES
   ============================================================================= */
function initLessonsSearch() {
  const searchInput = document.getElementById("lesson-search");
  const tagButtons = document.querySelectorAll(".tag-btn");
  const cards = document.querySelectorAll(".lesson-card");

  let currentCategory = "all";
  let currentSearchText = "";

  function filterCards() {
    cards.forEach((card) => {
      const category = card.dataset.category;
      const cardContent = card.innerText.toLowerCase();

      const matchesCat = currentCategory === "all" || category === currentCategory;
      const matchesSearch = cardContent.includes(currentSearchText);

      if (matchesCat && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchText = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  tagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.filter;
      filterCards();
    });
  });
}

/* =============================================================================
   4. BOTÕES DE COPIAR CÓDIGO
   ============================================================================= */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.dataset.copy || btn.parentElement.querySelector("pre")?.innerText;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copiado! ✓";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });
}

/* =============================================================================
   5. SIMULADOR INTERATIVO DE GIT (3 Caixas + Árvore de Commits + Terminal)
   ============================================================================= */
function initSimulator() {
  // Estado interno do Git simulado
  let simState = {
    currentBranch: "main",
    branches: ["main"],
    tags: { "v1.0.0": "c15d5ab" },
    workingFiles: [],
    stagedFiles: [],
    commits: [
      { hash: "c15d5ab", msg: "feat: estrutura inicial do projeto", branch: "main" }
    ],
    headCommitHash: "c15d5ab"
  };

  // Elementos do DOM do Simulador
  const terminalOutput = document.getElementById("sim-terminal-output");
  const cmdInput = document.getElementById("sim-cmd-input");
  const workingList = document.getElementById("working-files-list");
  const stagingList = document.getElementById("staging-files-list");
  const badgeWorking = document.getElementById("badge-working");
  const badgeStaging = document.getElementById("badge-staging");
  const badgeRepo = document.getElementById("badge-repo");
  const headBranchName = document.getElementById("head-branch-name");
  const headHash = document.getElementById("head-hash");
  const commitTree = document.getElementById("commit-tree");
  const resetSimBtn = document.getElementById("sim-reset-btn");
  const actionButtons = document.querySelectorAll(".sim-action-btn");

  // Escrever linha no terminal
  function termLog(text, type = "") {
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Renderizar o estado completo
  function renderSimState() {
    // 1. Working Directory
    workingList.innerHTML = "";
    badgeWorking.textContent = `${simState.workingFiles.length} arquivo${simState.workingFiles.length !== 1 ? "s" : ""}`;
    if (simState.workingFiles.length === 0) {
      workingList.innerHTML = '<li class="empty-msg">Nenhum arquivo modificado</li>';
    } else {
      simState.workingFiles.forEach((f) => {
        const li = document.createElement("li");
        li.className = "untracked";
        li.innerHTML = `<span>📄 ${f.name}</span> <small>${f.type}</small>`;
        workingList.appendChild(li);
      });
    }

    // 2. Staging Area
    stagingList.innerHTML = "";
    badgeStaging.textContent = `${simState.stagedFiles.length} arquivo${simState.stagedFiles.length !== 1 ? "s" : ""}`;
    if (simState.stagedFiles.length === 0) {
      stagingList.innerHTML = '<li class="empty-msg">Nenhum arquivo preparado</li>';
    } else {
      simState.stagedFiles.forEach((f) => {
        const li = document.createElement("li");
        li.className = "staged";
        li.innerHTML = `<span>✓ ${f.name}</span> <small>pronto para commit</small>`;
        stagingList.appendChild(li);
      });
    }

    // 3. Info do HEAD
    headBranchName.textContent = simState.currentBranch;
    headHash.textContent = simState.headCommitHash;
    badgeRepo.textContent = `${simState.commits.length} commit${simState.commits.length !== 1 ? "s" : ""}`;

    // 4. Árvore de Commits
    commitTree.innerHTML = "";
    simState.commits.forEach((c) => {
      const node = document.createElement("div");
      const isHead = c.hash === simState.headCommitHash;
      node.className = `commit-node ${isHead ? "current-head" : ""}`;

      let tagsHtml = `<span class="node-branch-tag">${c.branch}</span>`;
      if (isHead) {
        tagsHtml += ` <span class="node-branch-tag head-tag">HEAD</span>`;
      }
      if (simState.tags) {
        for (const [tagName, tagHash] of Object.entries(simState.tags)) {
          if (tagHash === c.hash) {
            tagsHtml += ` <span class="node-branch-tag tag-pill">${tagName}</span>`;
          }
        }
      }

      node.innerHTML = `
        <div class="node-bullet"></div>
        <span class="node-hash">${c.hash}</span>
        <span class="node-msg">${c.msg}</span>
        <div class="node-tags">${tagsHtml}</div>
      `;
      commitTree.appendChild(node);
    });
  }

  // Comandos e Ações do Simulador
  function executeAction(action) {
    switch (action) {
      case "modify-file":
        if (!simState.workingFiles.some((f) => f.name === "x.txt")) {
          simState.workingFiles.push({ name: "x.txt", type: "untracked file" });
          termLog("$ touch x.txt", "cmd");
          termLog("Criado arquivo 'x.txt' no Working Directory (Untracked).", "warn");
        } else {
          simState.workingFiles.push({ name: `feature_${Date.now().toString().slice(-4)}.js`, type: "modified" });
          termLog("$ echo 'code' >> app.js", "cmd");
          termLog("Arquivo modificado no Working Directory.", "warn");
        }
        break;

      case "git-add":
        termLog("$ git add .", "cmd");
        if (simState.workingFiles.length === 0) {
          termLog("Nada para adicionar: Working directory clean.", "info");
        } else {
          simState.stagedFiles.push(...simState.workingFiles);
          simState.workingFiles = [];
          termLog("Todos os arquivos foram movidos para a Staging Area (prontos para commit!).", "success");
        }
        break;

      case "git-commit":
        termLog('$ git commit -m "feat: nova alteração na branch"', "cmd");
        if (simState.stagedFiles.length === 0) {
          termLog("no changes added to commit (use 'git add' to stage)", "warn");
        } else {
          const newHash = Math.random().toString(16).substring(2, 9);
          simState.commits.push({
            hash: newHash,
            msg: `feat: alterações em [${simState.stagedFiles.map((f) => f.name).join(", ")}]`,
            branch: simState.currentBranch
          });
          simState.headCommitHash = newHash;
          simState.stagedFiles = [];
          termLog(`[${simState.currentBranch} ${newHash}] Commit registrado com sucesso!`, "success");
        }
        break;

      case "switch-branch":
        termLog("$ git switch -c feature-dark", "cmd");
        if (!simState.branches.includes("feature-dark")) {
          simState.branches.push("feature-dark");
        }
        simState.currentBranch = "feature-dark";
        termLog("Switched to a new branch 'feature-dark'", "info");
        break;

      case "switch-main":
        termLog("$ git switch main", "cmd");
        simState.currentBranch = "main";
        termLog("Switched to branch 'main'", "info");
        break;

      case "reset-soft":
        termLog("$ git reset --soft HEAD~1", "cmd");
        if (simState.commits.length <= 1) {
          termLog("Não é possível resetar além do commit inicial.", "warn");
        } else {
          const removedCommit = simState.commits.pop();
          simState.headCommitHash = simState.commits[simState.commits.length - 1].hash;
          // Soft mantém nos stagedFiles!
          simState.stagedFiles.push({ name: "arquivos_do_commit.txt", type: "staged" });
          termLog(`HEAD agora está em ${simState.headCommitHash}.`, "info");
          termLog("Aviso: As alterações do commit desfeito CONTINUAM na Staging Area (--soft)!", "warn");
        }
        break;

      case "reset-hard":
        termLog("$ git reset --hard HEAD~1", "cmd");
        if (simState.commits.length <= 1) {
          termLog("Não é possível resetar além do commit inicial.", "warn");
        } else {
          simState.commits.pop();
          simState.headCommitHash = simState.commits[simState.commits.length - 1].hash;
          // Hard apaga do staging e do working!
          simState.stagedFiles = [];
          simState.workingFiles = [];
          termLog(`HEAD agora está em ${simState.headCommitHash}.`, "info");
          termLog("Reset HARD executado: Staging e arquivos físicos foram descartados com sucesso!", "success");
        }
        break;

      case "cherry-pick":
        termLog("$ git cherry-pick a4f18d2", "cmd");
        const pickedHash = Math.random().toString(16).substring(2, 9);
        simState.commits.push({
          hash: pickedHash,
          msg: "cherry-pick: commit copiado de outra branch",
          branch: simState.currentBranch
        });
        simState.headCommitHash = pickedHash;
        termLog(`[${simState.currentBranch} ${pickedHash}] Commit copiado com sucesso via cherry-pick! 🍒`, "success");
        break;
    }

    renderSimState();
  }

  // Listener para botões rápidos de ação
  actionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      executeAction(btn.dataset.action);
    });
  });

  // Listener para o input de comando
  if (cmdInput) {
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const rawCmd = cmdInput.value.trim();
        cmdInput.value = "";
        if (!rawCmd) return;

        termLog(`$ ${rawCmd}`, "cmd");

        if (rawCmd === "git status") {
          termLog(`On branch ${simState.currentBranch}`, "info");
          if (simState.workingFiles.length === 0 && simState.stagedFiles.length === 0) {
            termLog("nothing to commit, working tree clean", "success");
          } else {
            if (simState.stagedFiles.length > 0) {
              termLog(`Changes to be committed: (${simState.stagedFiles.map(f => f.name).join(", ")})`, "success");
            }
            if (simState.workingFiles.length > 0) {
              termLog(`Untracked files: (${simState.workingFiles.map(f => f.name).join(", ")})`, "warn");
            }
          }
        } else if (rawCmd === "git add ." || rawCmd === "git add -A") {
          executeAction("git-add");
        } else if (rawCmd.startsWith("git commit")) {
          executeAction("git-commit");
        } else if (rawCmd.includes("reset --soft")) {
          executeAction("reset-soft");
        } else if (rawCmd.includes("reset --hard")) {
          executeAction("reset-hard");
        } else if (rawCmd.startsWith("git switch -c") || rawCmd.startsWith("git checkout -b")) {
          const parts = rawCmd.split(" ");
          const branchName = parts[parts.length - 1];
          if (branchName) {
            if (!simState.branches.includes(branchName)) simState.branches.push(branchName);
            simState.currentBranch = branchName;
            termLog(`Switched to a new branch '${branchName}'`, "info");
            renderSimState();
          }
        } else if (rawCmd.startsWith("git switch")) {
          const parts = rawCmd.split(" ");
          const branchName = parts[parts.length - 1];
          simState.currentBranch = branchName;
          termLog(`Switched to branch '${branchName}'`, "info");
          renderSimState();
        } else if (rawCmd === "git log" || rawCmd === "git log --oneline") {
          simState.commits.slice().reverse().forEach((c) => {
            termLog(`${c.hash} (${c.branch}${c.hash === simState.headCommitHash ? ', HEAD' : ''}) ${c.msg}`, "info");
          });
        } else if (rawCmd.startsWith("git remote -v")) {
          termLog("origin  https://github.com/Kevin-Pro-Codes/git-hub-sample.git (fetch)", "info");
          termLog("origin  https://github.com/Kevin-Pro-Codes/git-hub-sample.git (push)", "info");
        } else if (rawCmd.startsWith("git tag -d")) {
          const parts = rawCmd.split(" ");
          const tagName = parts[parts.length - 1];
          if (simState.tags && simState.tags[tagName]) {
            delete simState.tags[tagName];
            termLog(`Deleted tag '${tagName}'`, "info");
            renderSimState();
          } else {
            termLog(`error: tag '${tagName}' not found.`, "warn");
          }
        } else if (rawCmd.startsWith("git tag -a") || rawCmd.startsWith("git tag ")) {
          const parts = rawCmd.split(" ");
          const tagName = parts[rawCmd.includes("-a") ? 2 : 1];
          if (tagName) {
            if (!simState.tags) simState.tags = {};
            simState.tags[tagName] = simState.headCommitHash;
            termLog(`Tag '${tagName}' criada no commit ${simState.headCommitHash}! 🔖`, "success");
            renderSimState();
          }
        } else if (rawCmd === "git tag") {
          const tagNames = Object.keys(simState.tags || {});
          if (tagNames.length === 0) {
            termLog("Nenhuma tag encontrada.", "info");
          } else {
            tagNames.forEach(t => termLog(t, "success"));
          }
        } else if (rawCmd === "git fetch" || rawCmd.startsWith("git fetch")) {
          termLog("Fetching origin...", "info");
          termLog("From https://github.com/Kevin-Pro-Codes/git-hub-sample", "info");
          termLog("* [new branch]      feature/collab -> origin/feature/collab", "success");
          termLog("git fetch concluído: Informações da nuvem baixadas sem alterar seus arquivos locais!", "success");
        } else if (rawCmd === "git pull" || rawCmd.startsWith("git pull")) {
          termLog("git pull executado: Fetch + Merge completado com sucesso!", "success");
          termLog("Current branch is up to date with 'origin/main'.", "info");
        } else if (rawCmd.startsWith("git remove")) {
          termLog("git: 'remove' is not a git command. See 'git --help'. Did you mean 'remote'?", "warn");
        } else {
          termLog("Comando simulado reconhecido. Tente 'git status', 'git add .', 'git commit', 'git reset --hard', etc.", "info");
        }
      }
    });
  }

  // Reiniciar simulador
  if (resetSimBtn) {
    resetSimBtn.addEventListener("click", () => {
      simState = {
        currentBranch: "main",
        branches: ["main"],
        workingFiles: [],
        stagedFiles: [],
        commits: [
          { hash: "c15d5ab", msg: "feat: estrutura inicial do projeto", branch: "main" }
        ],
        headCommitHash: "c15d5ab"
      };
      terminalOutput.innerHTML = "";
      termLog("Simulador reiniciado. Repositório limpo no commit inicial c15d5ab.", "success");
      renderSimState();
    });
  }

  // Render inicial
  renderSimState();
}

/* =============================================================================
   6. TASK MASTER (Sandbox funcional para treinar alterações reais de código)
   ============================================================================= */
function initTaskMaster() {
  let tasks = [
    { id: 1, text: "Aprender git init, git status e git add", completed: true },
    { id: 2, text: "Entender a diferença de reset --soft vs --hard", completed: true },
    { id: 3, text: "Fazer commit atômico e push para o GitHub", completed: false }
  ];

  let currentFilter = "all";

  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const taskCounter = document.getElementById("task-counter");
  const clearCompletedBtn = document.getElementById("clear-completed-btn");

  if (!taskForm) return;

  function renderTasks() {
    taskList.innerHTML = "";

    const filtered = tasks.filter((task) => {
      if (currentFilter === "pending") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    });

    if (filtered.length === 0) {
      taskList.innerHTML = `<li class="task-item" style="justify-content: center; color: var(--text-muted);">Nenhuma tarefa encontrada.</li>`;
      updateCounter();
      return;
    }

    filtered.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      const contentDiv = document.createElement("div");
      contentDiv.className = "task-content";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = task.text;

      contentDiv.appendChild(checkbox);
      contentDiv.appendChild(span);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = "&times;";
      deleteBtn.title = "Excluir tarefa";
      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        renderTasks();
      });

      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    updateCounter();
  }

  function updateCounter() {
    const pendingCount = tasks.filter((t) => !t.completed).length;
    taskCounter.textContent = `${pendingCount} tarefa${pendingCount !== 1 ? "s" : ""} pendente${pendingCount !== 1 ? "s" : ""}`;
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ id: Date.now(), text, completed: false });
    taskInput.value = "";
    renderTasks();
  });

  clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter((t) => !t.completed);
    renderTasks();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  renderTasks();
}

/* =============================================================================
   7. LABORATÓRIO DE MERGE E CONFLITOS (INTERATIVO)
   ============================================================================= */
function initMergeLab() {
  const codeView = document.getElementById("mlab-code-view");
  const statusBadge = document.getElementById("mlab-status-badge");
  const fileStatus = document.getElementById("mlab-file-status");
  const resetBtn = document.getElementById("mlab-reset-btn");

  const btnAcceptCurrent = document.getElementById("mlab-accept-current");
  const btnAcceptIncoming = document.getElementById("mlab-accept-incoming");
  const btnAcceptBoth = document.getElementById("mlab-accept-both");

  const btnGitAdd = document.getElementById("mlab-git-add-btn");
  const btnGitCommit = document.getElementById("mlab-git-commit-btn");

  const stepResolve = document.getElementById("step-resolve");
  const stepStage = document.getElementById("step-stage");
  const stepCommit = document.getElementById("step-commit");

  if (!codeView || !btnAcceptCurrent) return;

  const currentCode = `<header class="main-header">
  <h1>Git Masterclass - Versão Local (HEAD)</h1>
  <p>Versão estável da equipe em produção</p>
</header>`;

  const incomingCode = `<header class="main-header">
  <h1>Git & GitHub Teacher Pro (origin/minha-feature)</h1>
  <p>Novos recursos criados pelo colaborador no Pull Request</p>
</header>`;

  const conflictTemplate = `<<<<<<< HEAD (Current Change: Sua branch local)
${currentCode}
=======
${incomingCode}
>>>>>>> origin/minha-feature (Incoming Change: Branch do Colaborador)`;

  function resetLab() {
    // Renderiza com destaques visuais
    codeView.innerHTML = `&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Change: Sua branch local)\n` +
      `<span class="conflict-line-head">${escapeHtml(currentCode)}</span>\n` +
      `<span class="conflict-line-div">=======</span>\n` +
      `<span class="conflict-line-incoming">${escapeHtml(incomingCode)}</span>\n` +
      `&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/minha-feature (Incoming Change: Branch do Colaborador)`;

    statusBadge.className = "badge-tag in-conflict";
    statusBadge.textContent = "Estado: Em Conflito (MERGING)";
    fileStatus.textContent = "Arquivo aguardando sua resolução";

    btnAcceptCurrent.disabled = false;
    btnAcceptIncoming.disabled = false;
    btnAcceptBoth.disabled = false;

    btnGitAdd.disabled = true;
    btnGitCommit.disabled = true;

    stepResolve.className = "git-step active";
    stepStage.className = "git-step";
    stepCommit.className = "git-step";
  }

  function resolveConflict(choice) {
    let resolvedContent = "";
    if (choice === "current") {
      resolvedContent = currentCode;
    } else if (choice === "incoming") {
      resolvedContent = incomingCode;
    } else if (choice === "both") {
      resolvedContent = `${currentCode}\n\n<!-- Código adicional integrado do colaborador -->\n${incomingCode}`;
    }

    codeView.textContent = resolvedContent;

    statusBadge.className = "badge-tag resolved";
    statusBadge.textContent = "Conflito Resolvido (Não preparado)";
    fileStatus.textContent = "Marcadores removidos! Arquivo limpo.";

    btnAcceptCurrent.disabled = true;
    btnAcceptIncoming.disabled = true;
    btnAcceptBoth.disabled = true;

    stepResolve.className = "git-step completed";
    stepStage.className = "git-step active";
    btnGitAdd.disabled = false;
  }

  btnAcceptCurrent.addEventListener("click", () => resolveConflict("current"));
  btnAcceptIncoming.addEventListener("click", () => resolveConflict("incoming"));
  btnAcceptBoth.addEventListener("click", () => resolveConflict("both"));

  btnGitAdd.addEventListener("click", () => {
    stepStage.className = "git-step completed";
    stepCommit.className = "git-step active";

    statusBadge.className = "badge-tag staged";
    statusBadge.textContent = "Staged: index.html pronto para commit";
    btnGitAdd.disabled = true;
    btnGitCommit.disabled = false;
  });

  btnGitCommit.addEventListener("click", () => {
    stepCommit.className = "git-step completed";
    statusBadge.className = "badge-tag resolved";
    statusBadge.textContent = "Merge Concluído com Sucesso! (Clean)";
    btnGitCommit.disabled = true;
    fileStatus.textContent = "Fusão gravada no histórico! A branch está limpa e sincronizada.";
  });

  resetBtn.addEventListener("click", resetLab);

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Inicializa o estado inicial do laboratório
  resetLab();
}
