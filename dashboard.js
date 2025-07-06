window.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});

function updateDashboard() {
  // Fetch students
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const studentCount = students.length;
  document.querySelector("#studentsCount p").textContent = studentCount;

  // Fetch courses
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const courseCount = courses.length;
  document.querySelector("#coursesCount p").textContent = courseCount;

  // Build department-wise student count
  const deptCounts = {};

  students.forEach(student => {
    if (deptCounts[student.department]) {
      deptCounts[student.department]++;
    } else {
      deptCounts[student.department] = 1;
    }
  });

  const labels = Object.keys(deptCounts);
  const data = Object.values(deptCounts);

  // Draw pie chart
  const ctx = document.getElementById('deptChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Students by Department',
        data,
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#ffc107',
          '#dc3545'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
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
