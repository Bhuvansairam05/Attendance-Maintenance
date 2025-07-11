let adminUser = document.getElementById("adminOption");
async function loginUser(username, password, role, warningId) {
    if (!username || !password) {
      document.getElementById(warningId).innerText = "Please enter username and password.";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role })
      });

      const result = await res.json();

      if (res.ok && result.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));
        if (result.user.role === "admin") {
          window.location.href = "adminDashBoard.html";
        } else if (result.user.role === "siteLead") {
          window.location.href = "siteLeadDashBoard.html";
        } else {
          window.location.href = "workerDashboard.html";
        }
      } else {
        document.getElementById(warningId).innerText = result.message || "Login failed!";
      }

    } catch (error) {
      console.error("Login error:", error);
      document.getElementById(warningId).innerText = "Something went wrong. Try again.";
    }
  }

adminUser.addEventListener('click', () => {
    let adminForm = document.getElementById("formDiv");
    let siteLeadForm = document.getElementById("siteLeadForm");
    let employeeForm = document.getElementById("employeeForm");
    siteLeadForm.classList.add("hidden");
    employeeForm.classList.add("hidden");
    adminForm.classList.toggle("hidden");
    let submit = document.getElementById("adminSubmit");
    let username = document.getElementById("adminUsername");
    let password = document.getElementById("adminPassword");
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let user = username.value.trim();
        let pass = password.value.trim();
        loginUser(user,pass,"admin","adminWarning");
    });
});
let siteLeadUser = document.getElementById("siteLeadOption");
siteLeadUser.addEventListener('click', () => {
    let adminForm = document.getElementById("formDiv");
    let siteLeadForm = document.getElementById("siteLeadForm");
    let employeeForm = document.getElementById("employeeForm");
    adminForm.classList.add("hidden");
    employeeForm.classList.add("hidden");
    siteLeadForm.classList.toggle("hidden");
    let submit = document.getElementById("siteLeadSubmit");
    let username = document.getElementById("siteLeadUsername");
    let password = document.getElementById("siteLeadPassword");
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let user = username.value.trim();
        let pass = password.value.trim();
        loginUser(user,pass,"siteLead","siteLeadWarning");
    });
});
let employeeUser = document.getElementById("employeeOption");
employeeUser.addEventListener('click', () => {
    let adminForm = document.getElementById("formDiv");
    let siteLeadForm = document.getElementById("siteLeadForm");
    let employeeForm = document.getElementById("employeeForm");
    adminForm.classList.add("hidden");
    siteLeadForm.classList.add("hidden");
    employeeForm.classList.toggle("hidden");
    let submit = document.getElementById("workerSubmit");
    let username = document.getElementById("workerUsername");
    let password = document.getElementById("workerPassword");
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let user = username.value.trim();
        let pass = password.value.trim();
        loginUser(user,pass,"employee","workerWarning");
    });
});

