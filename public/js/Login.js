let userLogin = document.getElementById("userLogin");
let pswLogin = document.getElementById("pswLogin");
let btnLogin = document.getElementById("btnLogin");


let credentials = null;

btnLogin.addEventListener('click', async function (evt) {

    let username = userLogin.value
    let password = pswLogin.value


    credentials = "Basic " + window.btoa(`${username}:${password}`)

    const headers = {
        "content-type": "application/json",
        "authorization": credentials
    }

    let cfg = {
        method: "POST",
        headers: headers
    }


    let response = await fetch("/login", cfg);
    console.log(response);
    let token = await response.json();

    if (response.status === 200) {
        console.log(token);
        sessionStorage.setItem("token", token);
        location.href = "dashboard.html";
    } 


});
