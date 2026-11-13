// =============================================================================
// Task Master - Aplicação de Exemplo para Treinamento de Git
// =============================================================================

// Estado da Aplicação
let tasks = [
  { id: 1, text: "Aprender git init e git status", completed: true },
  { id: 2, text: "Fazer commit atômico das alterações", completed: false },
  { id: 3, text: "Criar uma branch para nova funcionalidade", completed: false }
];

let currentFilter = "all";

// Elementos da DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCounter = document.getElementById("task-counter");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  setupEventListeners();
});

// Configuração de Eventos
function setupEventListeners() {
  taskForm.addEventListener("submit", handleAddTask);
  clearCompletedBtn.addEventListener("click", handleClearCompleted);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });
}

// Manipulador de Adicionar Tarefa
function handleAddTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

// Alternar status da tarefa
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

// Remover tarefa
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Limpar tarefas concluídas
function handleClearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

// Atualizar contador de pendências
function updateCounter() {
  const pendingCount = tasks.filter((t) => !t.completed).length;
  taskCounter.textContent = `${pendingCount} tarefa${pendingCount !== 1 ? "s" : ""} pendente${pendingCount !== 1 ? "s" : ""}`;
}

// Renderizar lista na tela
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li class="task-item" style="justify-content: center; color: var(--text-muted);">Nenhuma tarefa encontrada.</li>`;
    updateCounter();
    return;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.title = "Excluir tarefa";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounter();
}

