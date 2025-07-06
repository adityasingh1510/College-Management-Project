const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentsTable tbody");
const noDataMessage = document.getElementById("noDataMessage");
const formTitle = document.getElementById("formTitle");

document.addEventListener("DOMContentLoaded", loadStudents);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();
  const department = document.getElementById("department").value;

  if (!name || !email || !rollNo || !department) {
    alert("Please fill all fields.");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];
  const editIndex = form.getAttribute("data-edit-index");

  if (editIndex !== null) {
    // Update existing student
    students[editIndex] = { name, email, rollNo, department };
    localStorage.setItem("students", JSON.stringify(students));
    form.removeAttribute("data-edit-index");

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.textContent = "Register Student";
    formTitle.textContent = "Register New Student";
  } else {
    // Add new student
    const student = { name, email, rollNo, department };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  }

  form.reset();
  loadStudents();
});

function loadStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  tableBody.innerHTML = "";

  if (students.length === 0) {
    noDataMessage.style.display = "block";
    return;
  } else {
    noDataMessage.style.display = "none";
  }

  students.forEach((student, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = student.name;
    row.insertCell(1).textContent = student.email;
    row.insertCell(2).textContent = student.rollNo;
    row.insertCell(3).textContent = student.department;

    const actionCell = row.insertCell(4);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editStudent(index);
    actionCell.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteStudent(index);
    actionCell.appendChild(deleteBtn);
  });
}

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("rollNo").value = student.rollNo;
  document.getElementById("department").value = student.department;

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.textContent = "Update Student";
  formTitle.textContent = "Edit Student";

  form.setAttribute("data-edit-index", index);
}

function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
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
