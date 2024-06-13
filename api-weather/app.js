const opc = ["London","Juarez","Kano","Mexico"];
const select = document.getElementById("cars");
const info = document.getElementById("info");
const btn = document.getElementById("btn-save");

for(let i=0; i<opc.length; i++){
    select.innerHTML += `<option value=${opc[i]}>${opc[i]}</option>`
}

btn.addEventListener("click",async ()=>{
    const selectedValue = select.value;
    localStorage.setItem('selectedValue', selectedValue);
    let rel = await apiCall(`https://api.openweathermap.org/data/2.5/weather?q=${selectedValue}&appid=b13f519ff57455e0755bf9f85f06e6aa`);
    console.log(rel)
    info.innerHTML = "";
    showDetails(rel);
})

async function apiCall(url){
    try{
        let connection = await fetch(url)
        return connection.status === 200 ? connection.json() : "Falied"
    }catch(e){
        console.log("Error ", e);
    }
};

function kelvinToCelsius(temp){
    return Math.round((temp - 273.15)* 100) / 100;
}

function showDetails(result){
    info.innerHTML += `<p>Ciudad : ${result.name}</p>`;
    info.innerHTML += `<p>Temperatura : ${kelvinToCelsius(result.main.temp)} °C</p>`
    info.innerHTML += `<p>Maxima : ${kelvinToCelsius(result.main.temp_max)} °C</p>`
    info.innerHTML += `<p>Minima : ${kelvinToCelsius(result.main.temp_min)} °C</p>`
}
