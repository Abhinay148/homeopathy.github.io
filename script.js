    if (localStorage.getItem("authToken")) {
      const name=localStorage.getItem("name")
        document.getElementById("userNaam").innerHTML=name
        document.getElementById("exit").style.display = "inline-block";

    }
    else { document.getElementById("userNaam").innerHTML="Login/Sign-Up" }

    function fun(){
        localStorage.removeItem("authToken");
        location.href="login.html";

    }

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

        async function login() {
            var email = document.getElementById("useremail").value
            var password = document.getElementById("userpassword").value

            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            try {
                const result = await response.json()
                const authToken=result.token
                localStorage.setItem("authToken", authToken)
                localStorage.setItem("name", result.user.name)
                console.log(authToken);
                console.log(result);
                console.log(result.user);
                console.log(result.user.access)
                if(result.user.access==="admin"){
                    location.href = "admin2.html"
                }
                if(result.user.access==="user"){
                    location.href = "book.html"
                }
                // document.getElementById("userNaam").innerHTML=result.user.name
            } catch (error) {
                console.log(error);
            }

        }
        function check() {
            console.log("check");
            if (localStorage.getItem("authToken")) {
                return true;
            }
            else { return false; }
        }
  
        // console.log("check");
        // if (localStorage.getItem("authToken")) {
        //     location.href = "index.html"
        // }
        // else {
                
        // }