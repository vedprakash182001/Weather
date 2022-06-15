const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
//Date and Day
const ArrDay = ["Sunday", "Monday","Tuesday","Wednesday","Thrusday","Friday","Ssaturday"];
const ArrMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const day = document.getElementById("day");
const Curr_date = document.getElementById("date");
const date = new Date();
const Present_day = date.getDay();
day.innerHTML = ArrDay[Present_day];
Curr_date.innerHTML = date.getDate()+" "+ArrMonth[date.getMonth()];

//Time for first second



// Update Time after every second
const time = () => {
    const currTime = new Date();
    var phase = "AM";
    if (currTime.getHours() > 11) {
        phase = "PM";
    }
    var a = currTime.getHours();
    if (a > 12) {
        a = a - 12;
    }
    var time = a + ":" + currTime.getMinutes() + ":" + currTime.getSeconds() + " " + phase;
    return time;
}
setInterval(printTime, 10);
    function printTime() {
        const date = new Date();
        document.getElementById('time').innerHTML = time();
    }
//Temperature Status

const temperature_status = (tempMood)=>{
    const temp_status = document.getElementById("temp_status");
    if(tempMood=="Clear"){
        temp_status.innerHTML = "<i class='fas fa-sun' style ='color:#eccc68;'></i>";
    }
    else if(tempMood=="Clouds"){
        temp_status.innerHTML = "<i class='fas fa-cloud' style ='color:#f1f2f6;'></i>";
    }
    else if(tempMood=="Rain"){
        temp_status.innerHTML = "<i class='fas fa-cloud-rain' style ='color:#a4b0be;'></i>";
    }
    else{
        temp_status.innerHTML = "<i class='fas fa-cloud' style ='color:#f1f2f6;'></i>";
    }
    return;
}

// fetching data 
const getInfo = async(event)=>{
    event.preventDefault();
    const cityName = document.getElementById("cityName").value;
    const temp = document.getElementById("temp").children[0];
    const data_hide = document.getElementsByClassName("data_hide")[0];
    console.log(data_hide);
    if(cityName==""){
        city_name.innerText = "Please Enter City Name";
        data_hide.style.visibility = "hidden";
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a411af2edaeff02a62534d2f5b296174`
            const response = await fetch(url);
            const data = await response.json();
            const ArrData = [data];
            const city = ArrData[0].name;
            const country = ArrData[0].sys.country;
            const temperature = ArrData[0].main.temp;
            const status = ArrData[0].weather[0].main;
            temperature_status(status);
            //document.getElementById("data_hide").style.visibility = "visible"
            temp.innerHTML = temperature;
            city_name.innerText = `${city} , ${country}`;
            data_hide.style.visibility = "visible";
        }
        catch{
            city_name.innerText = "Please Enter Correct City Name";
            data_hide.style.visibility = "hidden";
        }
    }
}
submitBtn.addEventListener('click', getInfo);



