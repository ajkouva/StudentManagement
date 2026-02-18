
const EmailE1=document.querySelector(".Email");
const PasswordE1=document.querySelector(".Password");
const loginBtn=document.querySelector("#login-btn");
loginBtn.addEventListener("click",(e)=>{
    loginwork();
})
async function loginwork(){
    const Email=EmailE1.value;
    const Password=PasswordE1.value;
    try {
        const rse = await fetch("http://localhost:3000/api/auth/login",{
            "Email":Email,
            "Password":Password
        },{
            method:"POST",
             headers: {
                "Content-Type": "application/json",
        }})
        const data = await rse.json();
        console.log(data);
    } catch (error) {
        
    }
     
}