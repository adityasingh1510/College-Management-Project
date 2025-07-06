window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Not logged in!");
    window.location.href = "login.html";
    return;
  }

  showProfile(user);

  document.getElementById("editBtn").addEventListener("click", () => {
    showEditForm(user);
  });

  document.getElementById("cancelEditBtn").addEventListener("click", () => {
    document.getElementById("editProfileView").style.display = "none";
    document.getElementById("profileView").style.display = "block";
  });

  document.getElementById("editProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: document.getElementById("editName").value.trim(),
      email: document.getElementById("editEmail").value.trim(),
      department: document.getElementById("editDepartment").value.trim(),
    };

    // Update user in the students array
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const index = students.findIndex((s) => s.email === user.email);

    if (index !== -1) {
      students[index] = updatedUser;
      localStorage.setItem("students", JSON.stringify(students));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      alert("Profile updated!");
      window.location.reload();
    } else {
      alert("User not found!");
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});

function showProfile(user) {
  document.getElementById("username").textContent = user.name;
  document.getElementById("email").textContent = user.email;
  document.getElementById("department").textContent = user.department;
  document.getElementById("role").textContent = user.role;
}

function showEditForm(user) {
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editDepartment").value = user.department;

  document.getElementById("profileView").style.display = "none";
  document.getElementById("editProfileView").style.display = "block";
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
