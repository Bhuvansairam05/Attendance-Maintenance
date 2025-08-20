let login = document.getElementById("loginForm");
login.addEventListener("submit", async function (e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let role = document.getElementById("Role").value;
  let password = document.getElementById("password").value;
  let warning = document.getElementById("warning");
  if (!username || !role || !password) {
    warning.classList.remove("hidden");
    warning.innerText = "Enter all the details to login";
    return;
  }
  else {
    warning.innerText = "";
    try {
      const response = await fetch("https://attendance-maintenance.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, role })
      });
      const data = await response.json();
      if (data.success) {
        
        if (data?.user[0].role == "admin") {
          window.open(`adminDashBoard.html?adminId=${data?.user[0]?._id}`,"_blank");
        }
        else if (data?.user[0].role == "siteLead") {
          window.open(`siteLeadDashBoard.html?siteLeadId=${data?.user[0]?._id}`, "_blank");
        }
        else {
          window.open(`workerDashboard.html?employeeId=${data?.user[0]?._id}`, "_blank");
        }
      }
      else{
        warning.classList.remove("hidden");
        warning.innerText = "Invalid Credentials.";
      }
    }
    catch {
      alert("500 Server not found");
    }
  }
})