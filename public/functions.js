
function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (localStorage.getItem('mode') == null) {
        localStorage.setItem('mode', 'dark');
        console.log("dark gang")
        var elements = document.getElementsByClassName('carousel-caption');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.color = "#ffffff";
        }

    } else if (localStorage.getItem('mode') == 'dark') {
        localStorage.removeItem('mode');
        var elements = document.getElementsByClassName('carousel-caption');

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.color = "#000000";
        }
        
    }

    if (typeof myDoughnutChart != "undefined") {
        myDoughnutChart.update();
    }
}

function dyslexicfont() {
    var element = document.body;
    element.classList.toggle("dyslexic-font");
    if (localStorage.getItem('font') == null) {
        localStorage.setItem('font', 'dyslexic')
    } else if (localStorage.getItem('font') == 'dyslexic') {
        localStorage.removeItem('font')
    }

}


/**
 * Pulisce il localStorage dopo 1 mese
 */
 const month = 1;
 var now = new Date().getTime();
 var setupTime = localStorage.getItem('setupTime')
 if (setupTime == null) {
     localStorage.setItem('setupTime', now)
 } else if(now - setupTime >= month*1000*60*60*24*30) {
     localStorage.clear()
     localStorage.setItem('setupTime', now);
 }



 var currentTime = new Date().getHours();
if (document.body) {
    if (7 <= currentTime && currentTime < 20) {
        darkmode();
    }
}


/*const sensor = new AmbientLightSensor();
sensor.start();

sensor.addEventListener('activate', () ={
    console.log('Ready to report readings');
});
sensor.addEventListener('error', error => {
    console.error(error);
});


sensor.addEventListener('reading', () => {
    const illuminance = sensor.illuminance;  if (illuminance < 20) {
      darkmode();
    }
});*/


async function getIP() {
    let response1 =  await fetch('https://ipinfo.io?token=b61067be32e796', {method:"GET"});
    //console.log(response1);
    let jsonobjtemp1 =  await response1.json();
    //console.log(jsonobjtemp1);
    //console.log(jsonobjtemp1.country)
    //console.log(jsonobjtemp1.country);
    return jsonobjtemp1.country;
}


 async function getQuality(city, id1, id2) {


    const quality = `https://api.openaq.org/v2/latest?limit=1&page=1&offset=0&sort=desc&radius=1000&city=${city}&order_by=lastUpdated&dumpRaw=false`;
    console.log(quality);
  
    let response =  await fetch(quality, {method:"GET"});
    //console.log(response);

    let jsonobjtemp =  await response.json();
    console.log(jsonobjtemp);
    let measures = "";
   // console.log(measures)
    for (let i = 0; i < jsonobjtemp.results[0].measurements.length; i++) {
        //console.log(jsonobjtemp.results[0].measurements[i].parameter, " = ", jsonobjtemp.results[0].measurements[i].value);
        measures = measures + jsonobjtemp.results[0].measurements[i].parameter + " = " + jsonobjtemp.results[0].measurements[i].value + jsonobjtemp.results[0].measurements[i].unit +"\n";
    }
    //console.log(measures)
    //console.log(jsonobjtemp.results[0].measurements[0].lastUpdated);
    document.getElementById(id2).innerText = jsonobjtemp.results[0].measurements[0].lastUpdated;

    document.getElementById(id1).innerText = measures;
    //document.getElementById(id2).innerText = jsonobjtemp.results[0].measurements[0].lastUpdated;


  }

  var measures = "";

  async function getQualityCity(id) {
    var variable = document.getElementById('city').value;
    const quality = `https://api.openaq.org/v2/latest?limit=1&page=1&offset=0&sort=desc&radius=1000&city=${variable}&order_by=lastUpdated&dumpRaw=false`;
    let response =  await fetch(quality, {method:"GET"});
    let jsonobjtemp =  await response.json();
    //let measures = "Ecco i la qualità dell'aria a " + variable + ": ";
   // console.log(measures)

   if (jsonobjtemp.results.length == 0) {
    console.log("nessuna città trovata");
    document.getElementById('cittàselezionata').innerText = "Nessuna città con questo nome nel database!";
    return;
   };

   measures = measures  + variable + ": ";
    for (let i = 0; i < jsonobjtemp.results[0].measurements.length; i++) {
        //console.log(jsonobjtemp.results[0].measurements[i].parameter, " = ", jsonobjtemp.results[0].measurements[i].value);
        measures = measures + jsonobjtemp.results[0].measurements[i].parameter + " = " + jsonobjtemp.results[0].measurements[i].value + jsonobjtemp.results[0].measurements[i].unit + ", ";
    }
    measures = measures + " Questi valori sono stati raccolti il " + jsonobjtemp.results[0].measurements[0].lastUpdated + "\n";
    document.getElementById('cittàselezionata').innerText = measures;

  }
 
