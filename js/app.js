document.addEventListener("DOMContentLoaded", () => {
  const byId = id => document.getElementById(id);
  if (byId("showGreeting")) {
    const greeting = () => alert("Hello, JavaScript World!");
    greeting();
    byId("showGreeting").addEventListener("click", greeting);
    console.log("Student: Abdraisov Altair");
    console.log("Group: SE-2528");
    byId("task0Status").textContent = "Greeting alert displayed. Check the console for student details.";
  }
  if (byId("runVariables")) {
    byId("runVariables").addEventListener("click", () => {
      const student = "Abdraisov Altair";
      const age = 18;
      const isLearning = true;
      const a = 12, b = 4;
      const lines = ["String: " + student, "Number: " + age, "Boolean: " + isLearning, a + " + " + b + " = " + (a + b), a + " - " + b + " = " + (a - b), a + " * " + b + " = " + (a * b), a + " / " + b + " = " + (a / b), "Hello, " + student + "!"];
      byId("variablesOutput").textContent = lines.join("\n");
      byId("variablesOutput").style.whiteSpace = "pre-line";
      lines.forEach(line => console.log(line));
    }
    );
  }
  if (byId("changeButton")) {
    byId("changeButton").addEventListener("click", () => {
      byId("message").textContent = "JavaScript works!";
    }
    );
    byId("resetText").addEventListener("click", () => {
      byId("message").textContent = "Hello! This is the original paragraph.";
    }
    );
  }
  if (byId("styleBox")) {
    const box = byId("styleBox");
    let colorIndex = 0;
    const colors = ["#d6f5e8", "#ffe2c6", "#dce5ff", "#f5dafa"];
    byId("changeColor").addEventListener("click", () => {
      box.style.backgroundColor = colors[colorIndex % colors.length]; colorIndex++;
    }
    );
    byId("changeFont").addEventListener("click", () => {
      box.style.fontSize = (parseFloat(getComputedStyle(box).fontSize) + 2) + "px";
    }
    );
    byId("resetStyle").addEventListener("click", () => {
      box.style.backgroundColor = ""; box.style.fontSize = ""; colorIndex = 0;
    }
    );
  }
  if (byId("addItem")) {
    const input = byId("itemInput"), list = byId("itemList"), status = byId("listStatus");
    byId("addItem").addEventListener("click", () => {
      const value = input.value.trim();
      if (!value) {
        status.textContent = "Enter an item first."; return;
      }
      const item = document.createElement("li");
      item.textContent = value;
      list.appendChild(item);
      input.value = "";
      status.textContent = "Item added.";
      input.focus();
    }
    );
    byId("removeItem").addEventListener("click", () => {
      if (list.lastElementChild) {
        list.lastElementChild.remove(); status.textContent = "Last item removed.";
      }
      else status.textContent = "There are no items to remove.";
    }
    );
  }
  if (byId("mouseBox")) {
    const box = byId("mouseBox");
    box.addEventListener("mouseover", () => {
      box.style.backgroundColor = "#69e0c2"; box.style.color = "#0b1020"; byId("mouseStatus").textContent = "Mouse is over the box.";
    }
    );
    box.addEventListener("mouseout", () => {
      box.style.backgroundColor = ""; box.style.color = ""; byId("mouseStatus").textContent = "Mouse left the box.";
    }
    );
  }
  if (byId("liveInput")) {
    byId("liveInput").addEventListener("keyup", event => {
      byId("liveOutput").textContent = event.currentTarget.value || "Your text will appear here.";
    }
    );
  }
  if (byId("calculatorResult")) {
    document.querySelectorAll("[data-operation]").forEach(button => {
      button.addEventListener("click", () => {
        const aText = byId("numberA").value, bText = byId("numberB").value;
        if (aText === "" || bText === "") {
          byId("calculatorResult").textContent = "Please enter both numbers."; return;
        }
        const a = Number(aText), b = Number(bText);
        let result;
        switch (button.dataset.operation) {
          case "add": result = a + b; break;
          case "subtract": result = a - b; break;
          case "multiply": result = a * b; break;
          case "divide": if (b === 0) {
            byId("calculatorResult").textContent = "Cannot divide by zero."; return;
          }
          result = a / b; break;
        }
        byId("calculatorResult").textContent = "Result: " + result;
      }
      );
    }
    );
  }
  if (byId("todoForm")) {
    const tasks = [];
    let nextId = 1;
    const renderTasks = () => {
      const list = byId("todoList");
      list.replaceChildren();
      tasks.forEach(task => {
        const row = document.createElement("div");
        row.className = "task-row";
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark " + task.text + " completed");
        checkbox.addEventListener("change", () => {
          task.completed = checkbox.checked; renderTasks();
        }
        );
        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) text.className = "completed";
        label.append(checkbox, " ", text);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "secondary";
        remove.textContent = "Delete";
        remove.addEventListener("click", () => {
          const index = tasks.findIndex(item => item.id === task.id); if (index !== -1) tasks.splice(index, 1); renderTasks();
        }
        );
        row.append(label, remove);
        list.appendChild(row);
      }
      );
      byId("todoSummary").textContent = tasks.length + " tasks · " + tasks.filter(task => task.completed).length + " completed";
    }
    ;
    byId("todoForm").addEventListener("submit", event => {
      event.preventDefault();
      const input = byId("todoInput");
      const text = input.value.trim();
      if (!text) {
        byId("todoStatus").textContent = "Enter a task first."; return;
      }
      tasks.push({
        id: nextId++, text, completed: false
      }
      );
      input.value = "";
      byId("todoStatus").textContent = "Task added.";
      renderTasks();
      input.focus();
    }
    );
  }
}
);
