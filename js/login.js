$(document).ready(function () {
    var loginform = document.getElementById("login");
    var signform = document.getElementById("sign");
    let loginerror = document.getElementById("loginerror");
    function signup(e) {
      e.preventDefault();
      let name = signform.elements["signname"].value;
      let email = signform.elements["signemail"].value;
      let pass = signform.elements["signpass"].value;
    
      console.log(name);
      console.log(email);
      console.log(pass);
      let user = { name: name, email: email, pass: pass };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("Logged In", true)
      window.location.href = "index.html";
    }
    signform.addEventListener("submit", signup);
    function login(e) {
      e.preventDefault();
      let email = loginform.elements["logemail"].value;
      let pass = loginform.elements["logpass"].value;
      var user = localStorage.getItem("user");
      user=JSON.parse(user)
      if (user !== undefined && user !== null) {
        if (user.email === email) {
          if (user.pass === pass) 
          {     localStorage.setItem("Logged In", true)
            window.location.href = "index.html";
          }else{
            loginerror.textContent="Password don't match"
          }
        }else{
            loginerror.textContent="User doesn't exist"
        }
      } else {
        loginerror.textContent = "User not Found";
      }
    }
    loginform.addEventListener("submit", login)
  });