const API_URL = "http://localhost:5000/api/transactions";

const form = document.getElementById("transactionForm");
const transactionsEl = document.getElementById("transactions");
const searchEl = document.getElementById("search");
const messageEl = document.getElementById("message");

document.getElementById("date").value = new Date().toISOString().split("T")[0];

let transactions = [];

function money(value) {
  return "৳" + Number(value).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function showMessage(text, isError = true) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? "#d13c3c" : "#14804a";
  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

async function loadTransactions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Could not connect to server.");
    transactions = await response.json();
    updateDashboard();
    renderTransactions();
  } catch (error) {
    showMessage("Backend is not running. Start the Node.js server first.");
  }
}

function updateDashboard() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  document.getElementById("income").textContent = money(income);
  document.getElementById("expense").textContent = money(expense);
  document.getElementById("balance").textContent = money(income - expense);
}

function renderTransactions() {
  const query = searchEl.value.toLowerCase().trim();

  const filtered = transactions.filter(t =>
    t.title.toLowerCase().includes(query) ||
    t.category.toLowerCase().includes(query) ||
    (t.note || "").toLowerCase().includes(query)
  );

  if (!filtered.length) {
    transactionsEl.innerHTML = '<div class="empty">No transactions found.</div>';
    return;
  }

  transactionsEl.innerHTML = filtered.map(t => {
    const sign = t.type === "income" ? "+" : "-";
    const date = new Date(t.date).toLocaleDateString("en-GB");

    return `
      <div class="transaction">
        <div>
          <div class="transaction-title">${escapeHtml(t.title)}</div>
          <div class="transaction-meta">
            ${escapeHtml(t.category)} • ${date}
            ${t.note ? " • " + escapeHtml(t.note) : ""}
          </div>
        </div>
        <div>
          <div class="transaction-amount ${t.type}">
            ${sign}${money(t.amount)}
          </div>
          <button class="delete-btn" onclick="deleteTransaction('${t._id}')">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    title: document.getElementById("title").value.trim(),
    amount: document.getElementById("amount").value,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    note: document.getElementById("note").value.trim()
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Failed to add transaction.");

    form.reset();
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
    showMessage("Transaction added successfully.", false);
    await loadTransactions();
  } catch (error) {
    showMessage(error.message);
  }
});

async function deleteTransaction(id) {
  if (!confirm("Delete this transaction?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete transaction.");

    showMessage("Transaction deleted.", false);
    await loadTransactions();
  } catch (error) {
    showMessage(error.message);
  }
}

searchEl.addEventListener("input", renderTransactions);

loadTransactions();