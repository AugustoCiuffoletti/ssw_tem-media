// Import stylesheets
import "./style.css"; 

var cityElems = document.getElementsByClassName("città");
for (let elem of cityElems ) {
  elem.onclick = () => display(elem.innerHTML);
}
media();

// Funzione collegata ai bottoni
// "window" necessario in StackBlitz, può essere
// omesso altrimenti
function display(city) {
  var request = new XMLHttpRequest(); // Costruzione dell'oggetto "request"

  // Funzione callback invocata quando la request termina
  request.onload = function() {
    // funzione definita arrow
    if (request.status === 200) {
      var dataObject = JSON.parse(request.response);
      document.getElementById("risposta").innerHTML =
        "A " + city + " ci sono " + dataObject.main.temp + " gradi";
    } else {
      document.getElementById("risposta").innerText = "Errore";
    }
  };

  // Applico il metodo "open"
  request.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?APPID=d0fda39104b3c7c45fe031a5392964c1&units=metric&q=" +
      city,
    true
  );
  // Applico il metodo send (al termine chiamerà il callback "onload")
  request.send();
};

function media()  {
  var c;
  var t=0;
  for ( let c of cityElems ) {
    let request = new XMLHttpRequest(); // Costruzione dell'oggetto "request"

  // Funzione callback invocata quando la request termina
    request.onload = function() {
    // funzione definita arrow
      if (request.status === 200) {
        var dataObject = JSON.parse(request.response);
        console.log(dataObject.main.temp);
        t += dataObject.main.temp/cityElems.length;
        document.getElementById("media").innerText = t;
      } else {
        document.getElementById("risposta").innerText = "Errore";
      }
    };
    request.open(
      "GET",
      "https://api.openweathermap.org/data/2.5/weather?APPID=d0fda39104b3c7c45fe031a5392964c1&units=metric&q=" +
      c.innerHTML,
      true
    );
    request.send()
  }
}