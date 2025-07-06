window.addEventListener("DOMContentLoaded", () => {
  initializeDate();
  loadStudents();
  loadAttendanceRecords();
  populateDepartments();
});

// Set date input to today by default
function initializeDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("attendanceDate").value = today;
}

function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const tbody = document.querySelector("#attendanceTable tbody");

  tbody.innerHTML = "";

  students.forEach(student => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = student.name;
    row.insertCell(1).textContent = student.department;

    const selectCell = row.insertCell(2);
    const select = document.createElement("select");
    select.innerHTML = `
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    `;
    selectCell.appendChild(select);
  });
}

document.getElementById("saveAttendanceBtn").addEventListener("click", () => {
  const dateInput = document.getElementById("attendanceDate").value;
  const formattedDate = formatDate(dateInput);
  const rows = document.querySelectorAll("#attendanceTable tbody tr");

  let records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  rows.forEach(row => {
    const name = row.cells[0].textContent;
    const department = row.cells[1].textContent;
    const status = row.cells[2].querySelector("select").value;

    const record = {
      date: formattedDate,
      name,
      department,
      status
    };

    records.push(record);
  });

  localStorage.setItem("attendanceRecords", JSON.stringify(records));
  alert("Attendance saved!");
  loadAttendanceRecords();
  loadSummary();
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function populateDepartments() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const deptSelect = document.getElementById("filterDept");
  const departments = new Set();

  students.forEach(student => {
    if (student.department) {
      departments.add(student.department);
    }
  });

  departments.forEach(dept => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    deptSelect.appendChild(option);
  });
}

document.getElementById("applyFiltersBtn").addEventListener("click", () => {
  loadAttendanceRecords();
});

function loadAttendanceRecords() {
  const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";

  const selectedDate = document.getElementById("filterDate").value;
  const selectedDept = document.getElementById("filterDept").value;

  const filtered = records.filter(record => {
    const matchDate = selectedDate
      ? record.date === formatDate(selectedDate)
      : true;
    const matchDept = selectedDept
      ? record.department === selectedDept
      : true;
    return matchDate && matchDept;
  });

  filtered.forEach(record => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = record.date;
    row.insertCell(1).textContent = record.name;
    row.insertCell(2).textContent = record.department;
    row.insertCell(3).textContent = record.status;

    if (record.status === "Absent") {
      row.classList.add("absent-row");
    }
  });

  loadSummary();
}

function loadSummary() {
  const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  const summaryTable = document.querySelector("#summaryTable tbody");
  summaryTable.innerHTML = "";

  const summary = {};

  records.forEach(record => {
    const key = record.name + "|" + record.department;
    if (!summary[key]) {
      summary[key] = { present: 0, total: 0, name: record.name, department: record.department };
    }
    if (record.status === "Present") {
      summary[key].present += 1;
    }
    summary[key].total += 1;
  });

  for (const key in summary) {
    const data = summary[key];
    const percent = data.total === 0 ? 0 : Math.round((data.present / data.total) * 100);

    const row = summaryTable.insertRow();
    row.insertCell(0).textContent = data.name;
    row.insertCell(1).textContent = data.department;
    row.insertCell(2).textContent = percent + "%";
  }
}
document.getElementById("exportAttendanceBtn").addEventListener("click", exportAttendanceToCsv);

function exportAttendanceToCsv() {
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  if (attendanceRecords.length === 0) {
    alert("No attendance records to export.");
    return;
  }

  let csvContent = "Date,Name,Department,Status\n";

  attendanceRecords.forEach(record => {
    const row = [
      record.date,
      record.name,
      record.department,
      record.status
    ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(",");
    csvContent += row + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "attendance_records.csv");
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
