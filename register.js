const form = document.getElementById("studentForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const department = document.getElementById("department").value.trim();

  if (!name || !email || !password || !department) {
    alert("Please fill all fields.");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];

  const existing = students.find((s) => s.email === email);
  if (existing) {
    alert("Email already registered!");
    return;
  }

  const student = {
    name,
    email,
    password,
    department,
    role: "student",
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  alert("Registration successful!");
  form.reset();
  window.location.href = "login.html";
});
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
