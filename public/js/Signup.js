const usernameInp = document.getElementById("username");
    const pswInp = document.getElementById("password");
    const createUser = document.getElementById("submit");

    
    createUser.addEventListener('click', async function (evt) {
         

    


        let body = {
            username: usernameInp.value,
            password: pswInp.value
        }

        let cfg = {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(body)
        }

        
       

        let response = await fetch("/user", cfg); 
        let data = await response.json(); 

        if (data === "success!"){
            location.href="index.html"; 
        }
        


    }); 