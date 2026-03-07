const attendence=document.querySelector(".attendance-percent");
const dataE1=document.querySelectorAll(".date")
const mounthE1=document.querySelector(".mounth");
const calender=document.querySelector(".calender")
const code=document.getElementById("code");
const subject=document.getElementById("subject");
const roll_no=document.getElementById("roll_no");
let month;
let year;
// let mounth=document.querySelector(".mounth");
//  const now=new Date();
//  mounth.value=now.getMonth();
//  console.log(mounth)
//  console.log(now)
//  month=now.getMonth()+1;
//  year = now.getFullYear();
document.addEventListener("DOMContentLoaded",()=>{
    const today=new Date().toISOString().split("T")[0];
    mounthE1.value=today;
    work();
    changeper();
   

}) 

async function changeper(){
    try {
        const res = await fetch("http://127.0.0.1:3000/api/student/studentDetails");

        const data = await res.json();
        console.log(data);
        addDetails(data);
       

    } catch (error) {
        console.error(error);
    }
}

function addDetails(data){
   code.textContent=`${data.profile.id_code}`;
   subject.textContent=`${data.profile.subject}`;
   roll_no.textContent=`${data.profile.roll_no}`;

}
function work(){
    
    calender.innerHTML=`
    <div class="day-name">SUN</div>
  <div class="day-name">MON</div>
  <div class="day-name">TUE</div>
  <div class="day-name">WED</div>
  <div class="day-name">THU</div>
  <div class="day-name">FRI</div>
  <div class="day-name">SAT</div>`;


    let monval=mounthE1.value;
     month=new Date(`${monval} 00:00:00`).getMonth();
     year=new Date(`${monval} 00:00:00`).getFullYear();
    var date=new Date(year,month+1,0).getDate();
    var day=new Date(year,month,1).getDay();
    
    console.log(day);
    for(i=0;i<day;i++){
        let div=document.createElement("div");
        div.classList.add("hidden");
        div.classList.add("dated");
        calender.appendChild(div);    
    }
    for(i=1;i<=date;i++){
         let div=document.createElement("div");
        div.innerHTML=i;
        div.classList.add("date");
        calender.appendChild(div);   
    }
    converting();

}








mounthE1.addEventListener("input",work);

 async function converting(){
    try {
        const res=await fetch('http://127.0.0.1:3000/api/student/attendanceCalendar',
     {
       method:"POST",
       credentials:"include",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ "month":month, "year":year})
     });
     const data=await res.json();
        console.log(data);

      const date=document.querySelectorAll(".date")
                // console.log(date.length)
      date.forEach(function(elem){
                    for(i=0;i<date.length;i++){
                if(data.coloredRows[i].color==="green"){
                           date.classList.add("present") 
                }
                else if(data.coloredRows[i].color==="red"){
                    date.classList.add("absent");
                }
                else{
                        pass
                }

             }
    })

    }


         catch (error) {
        console.error(error);
    }
}


   

