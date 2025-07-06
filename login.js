const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const students = JSON.parse(localStorage.getItem("students")) || [];

  const foundUser = students.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
  alert("Login successful!");
  window.location.href = "profile.html";
});
// Show forgot password form
document.getElementById("forgotPasswordLink").addEventListener("click", () => {
  document.getElementById("forgotPasswordBox").style.display = "block";
});

// Reset password logic
document.getElementById("resetPasswordBtn").addEventListener("click", () => {
  const email = document.getElementById("resetEmail").value.trim();
  const dept = document.getElementById("resetDepartment").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();

  let students = JSON.parse(localStorage.getItem("students")) || [];

  const index = students.findIndex(
    (user) => user.email === email && user.department === dept
  );

  if (index !== -1) {
    students[index].password = newPass;
    localStorage.setItem("students", JSON.stringify(students));
    alert("Password reset successful! You can now log in.");
    document.getElementById("forgotPasswordBox").style.display = "none";
  } else {
    alert("User not found. Please enter correct details.");
  }
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
