let login = document.getElementById("loginForm");
login.addEventListener("submit",async function(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let role = document.getElementById("Role").value;
  let password = document.getElementById("password").value;
  let warning = document.getElementById("warning");
  if(!username || !role || !password){
    warning.classList.remove("hidden");
    warning.innerText = "Enter all the details to login";
    return;
  }
  else{
    warning.innerText = "";
    try{
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({username,password,role}),
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        if(role=="admin"){
          window.location.href="adminDashBoard.html";
        }
        else if(role=="siteLead"){
          window.location.href="siteLeadDashBoard.html";
        }
        else{
          window.location.href="workerDashboard.html";
        }
      }
    }
    catch{
      alert("Cannot fetch data");
    }
  }
})