
const loginBtn = document.getElementById("btn");
const checkBox = document.getElementById('remember');
const username = document.getElementById('username');

if(localStorage.getItem('username')!=null){
    username.value = localStorage.getItem('username');
}

loginBtn.addEventListener('click', ()=>{
         
    localStorage.setItem("username", username.value);
    if(checkBox.checked){
        localStorage.setItem("remember", 'true');
    } else {
        localStorage.setItem("remember", 'false');
    }
})

    

    
    

/////////////////////////////////////////////////




/////////////////////////////////////////////////////
function myfunction() {
    const loginForm =document.getElementById("login-form")
    
    loginForm.classList.toggle("show"); 
}

