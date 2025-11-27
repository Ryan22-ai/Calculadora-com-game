// ===== Display =====
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
let history = [];

// ===== Adicionar no Display =====
function appendToDisplay(value) {
    display.value += value;
}

// ===== Limpar =====
function clearDisplay() {
    display.value = "";
}
// ===== Apagar último caractere (Backspace via botão) =====
function deleteLastChar() {
    // se estiver em estado de erro, limpa tudo
    if (display.value === "Erro") {
        display.value = "";
        return;
    }
    display.value = display.value.slice(0, -1);
}

// ===== Calcular =====
function calculateResult() {
    try {
        if (display.value.includes("%")) {
            display.value = percentage(display.value);
        } else {
            const result = eval(display.value);
            addToHistory(display.value + " = " + result);
            display.value = result;
        }
    } catch {
        display.value = "Erro";
    }
}

// ===== Raiz Quadrada =====
function calcularRaiz() {
    try {
        const num = parseFloat(display.value);
        const result = Math.sqrt(num);
        addToHistory("√" + num + " = " + result);
        display.value = result;
    } catch {
        display.value = "Erro";
    }
}

// ===== Cálculo de Porcentagem =====
function percentage(expr) {
    const parts = expr.split("%");
    if (parts.length === 2) {
        return (parseFloat(parts[0]) * parseFloat(parts[1])) / 100;
    }
    return expr;
}

// ===== Histórico =====
function addToHistory(entry) {
    history.push(entry);

    const li = document.createElement("li");
    li.textContent = entry;
    li.onclick = () => {
        display.value = entry.split("=")[1].trim();
    };
    historyList.appendChild(li);
}

function toggleHistory() {
    document.getElementById("history-panel").classList.toggle("open");
}

// ===== Teclado =====
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) appendToDisplay(key);
    if (["+", "-", "*", "/", "."].includes(key)) appendToDisplay(key);
    if (key === "Enter") calculateResult();
    if (key === "Backspace") display.value = display.value.slice(0, -1);
    if (key === "%") appendToDisplay("%");
});
// ===== Gerar Tabuada =====
function gerarTabuada() {
            const n = document.getElementById("num").value;
            const res = document.getElementById("resultado");
            res.innerHTML = "";

            for (let i = 1; i <= 10; i++) {
                const li = document.createElement("li");
                li.textContent = `${n} x ${i} = ${n * i}`;
                res.appendChild(li);
            }
        }
document.getElementById("limpar-historico").addEventListener("click", function () {
    history = []; // limpa o array também
    historyList.innerHTML = ""; // limpa a lista visual
});
