// Import stylesheets
import "./style.css"; 

var cityElems = document.getElementsByClassName("città");
for (let elem of cityElems ) {
  elem.onclick = () => display(elem.innerHTML);
}
var t=0;
media();

function doCity(city, callback) {
  console.log(city)
  var request = new XMLHttpRequest(); // Costruzione dell'oggetto "request"
  // Funzione callback invocata quando la request termina
  request.onload = function() {
    // funzione definita arrow
    if (request.status === 200) {
      var dataObject = JSON.parse(request.response);
      callback(dataObject)
    } else {
      document.getElementById("risposta").innerText = "Errore";
    }
  }
  // Applico il metodo "open"
  request.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?APPID=d0fda39104b3c7c45fe031a5392964c1&units=metric&q=" + city,
    true
  );
  // Applico il metodo send (al termine chiamerà il callback "onload")
  request.send();
}

// Funzione collegata ai bottoni
// "window" necessario in StackBlitz, può essere
// omesso altrimenti
function display(city) {
  doCity( city, (data) => { 
    document.getElementById("risposta").innerHTML =
        "A " + city + " ci sono " + data.main.temp + " gradi";return 1 } ) ;
}

function media()  {
  for ( let city of cityElems ) {
    doCity( city, (data) => {
      t += data.main.temp/cityElems.length;
      document.getElementById("media").innerText = t;
    })
  }
}