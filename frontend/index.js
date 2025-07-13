let login = document.getElementById("login-button");

login.addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let role = document.getElementById("Role").value;
  let password = document.getElementById("password").value;
  let warning = document.getElementById("warning").value;
   
  if(!username || !role || !password || !warning){
    warning.innerText = "Enter all the details to login";
  }
  else{
    try{
      fetch("http://localhost:5000/api/auth/login")
    }
    catch{
      alert("Cannot fetch data");
    }
  }
})