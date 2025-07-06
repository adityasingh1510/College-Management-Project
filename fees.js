document.addEventListener("DOMContentLoaded", () => {
  populateStudentsDropdown();
  loadFees();
});

const feesForm = document.getElementById("feesForm");
const feesTableBody = document.querySelector("#feesTable tbody");
const noFeesData = document.getElementById("noFeesData");

feesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value;
  const department = document.getElementById("department").value;
  const paymentDate = document.getElementById("paymentDate").value;
  const amount = document.getElementById("amount").value;
  const mode = document.getElementById("mode").value;
  const remarks = document.getElementById("remarks").value.trim();

  if (!name || !paymentDate || !amount || !mode) {
    alert("Please fill all required fields.");
    return;
  }

  const record = {
    name,
    department,
    date: formatDate(paymentDate),
    amount: parseFloat(amount),
    mode,
    remarks,
  };

  let feesRecords = JSON.parse(localStorage.getItem("feesRecords")) || [];
  feesRecords.push(record);
  localStorage.setItem("feesRecords", JSON.stringify(feesRecords));

  feesForm.reset();
  loadFees();
  alert("Payment saved!");
});

function loadFees() {
  let feesRecords = JSON.parse(localStorage.getItem("feesRecords")) || [];
  feesTableBody.innerHTML = "";

  if (feesRecords.length === 0) {
    noFeesData.style.display = "block";
    return;
  } else {
    noFeesData.style.display = "none";
  }

  feesRecords.forEach((rec, index) => {
    const row = feesTableBody.insertRow();
    row.insertCell(0).textContent = rec.name;
    row.insertCell(1).textContent = rec.department;
    row.insertCell(2).textContent = rec.date;
    row.insertCell(3).textContent = rec.amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    row.insertCell(4).textContent = rec.mode;
    row.insertCell(5).textContent = rec.remarks;

    const actionCell = row.insertCell(6);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteRecord(index);
    actionCell.appendChild(delBtn);
  });
}

function deleteRecord(index) {
  let feesRecords = JSON.parse(localStorage.getItem("feesRecords")) || [];
  feesRecords.splice(index, 1);
  localStorage.setItem("feesRecords", JSON.stringify(feesRecords));
  loadFees();
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function populateStudentsDropdown() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const dropdown = document.getElementById("studentName");

  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.name;
    option.textContent = student.name;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener("change", () => {
    const selectedName = dropdown.value;
    const found = students.find((s) => s.name === selectedName);
    if (found) {
      document.getElementById("department").value = found.department;
    } else {
      document.getElementById("department").value = "";
    }
  });
}
document.getElementById("exportCsvBtn").addEventListener("click", exportFeesToCsv);

function exportFeesToCsv() {
  const records = JSON.parse(localStorage.getItem("feesRecords")) || [];
  if (records.length === 0) {
    alert("No payment records to export.");
    return;
  }

  let csvContent = "Name,Department,Date,Amount,Mode,Remarks\n";

  records.forEach((rec) => {
    const row = [
      rec.name,
      rec.department,
      rec.date,
      rec.amount,
      rec.mode,
      rec.remarks || ""
    ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(",");

    csvContent += row + "\n";
  });

  // Create a download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "fees_records.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.addEventListener("DOMContentLoaded", () => {
  // Check saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  const toggleBtn = document.getElementById("toggleThemeBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  }
});
