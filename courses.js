const form = document.getElementById("courseForm");
const tableBody = document.querySelector("#coursesTable tbody");
const noCourseMessage = document.getElementById("noCourseMessage");
const formTitle = document.getElementById("formTitle");

document.addEventListener("DOMContentLoaded", loadCourses);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("courseName").value.trim();
  const code = document.getElementById("courseCode").value.trim();
  const department = document.getElementById("courseDept").value;
  const credits = document.getElementById("courseCredits").value.trim();

  if (!name || !code || !department || !credits) {
    alert("Please fill all fields.");
    return;
  }

  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  const editIndex = form.getAttribute("data-edit-index");

  if (editIndex !== null) {
    courses[editIndex] = { name, code, department, credits };
    localStorage.setItem("courses", JSON.stringify(courses));
    form.removeAttribute("data-edit-index");

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.textContent = "Add Course";
    formTitle.textContent = "Add New Course";
  } else {
    const course = { name, code, department, credits };
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }

  form.reset();
  loadCourses();
});

function loadCourses() {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  tableBody.innerHTML = "";

  if (courses.length === 0) {
    noCourseMessage.style.display = "block";
    return;
  } else {
    noCourseMessage.style.display = "none";
  }

  courses.forEach((course, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = course.name;
    row.insertCell(1).textContent = course.code;
    row.insertCell(2).textContent = course.department;
    row.insertCell(3).textContent = course.credits;

    const actionCell = row.insertCell(4);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editCourse(index);
    actionCell.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteCourse(index);
    actionCell.appendChild(deleteBtn);
  });
}

function editCourse(index) {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  const course = courses[index];

  document.getElementById("courseName").value = course.name;
  document.getElementById("courseCode").value = course.code;
  document.getElementById("courseDept").value = course.department;
  document.getElementById("courseCredits").value = course.credits;

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.textContent = "Update Course";
  formTitle.textContent = "Edit Course";

  form.setAttribute("data-edit-index", index);
}

function deleteCourse(index) {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses.splice(index, 1);
  localStorage.setItem("courses", JSON.stringify(courses));
  loadCourses();
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
