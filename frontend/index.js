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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, role })
      });
      const data = await response.json();
      console.log(data?.user[0]?._id);
      if (response.ok) {
        
        if (data?.user[0].role == "admin") {
          window.open(`adminDashboard.html?adminId=${data?.user[0]?._id}`,"_blank");
        }
        else if (data?.user[0].role == "siteLead") {
          window.open(`siteLeadDashBoard.html?siteLeadId=${data?.user[0]?._id}`, "_blank");
        }
        else {
          window.open(`workerDashboard.html?employeeId=${data?.user[0]?._id}`, "_blank");
        }
      }
      else if(response.status===401){
        warning.classList.remove("hidden");
  warning.innerText = data?.message || "Invalid username, role, or password.";
      }
    }
    catch {
      alert("500 Server not found");
    }
  }
})