const myMap = L.map('map').setView([18.1124,79.0193], 10);
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles= L.tileLayer(tileUrl,{attribution,maxZoom:9,minZoom:5});
tiles.addTo(myMap);

let search=document.querySelector(".search-input");
let searchIcon=document.querySelector(".fas");
searchIcon.addEventListener("click",findlocation);
const mapp=document.querySelector('#map');


function getcoords(e){
    var coord=e.latlng.toString().split(','); 
        console.log(coord);
    var latt=coord[0].split('(');
    var longg=coord[1].split(')');
    var lat=latt[1];
    var long=longg[0];
    getCrimes(lat,long);
}

function getCrimes(lat,long){
    for(var i=0;i<districtList.length;i++){
        if(districtList[i].geometry.coordinates[1]==lat && districtList[i].geometry.coordinates[0]==long ){
          // var crimes= Object.keys(districtList[i].properties);
           createMarkers(lat,long,districtList[i]);
          }
    }
}

function createMarkers(lat,long,district){
          search.value="";
        let customPopup=`<div class="container-5 width:250px">
                    <h4>${district.properties.name}</h4>
                    <img src='./images/3.svg' width='15px'/>&#160&#160<h4 style="display:inline-block;font-weight:bold;"> 
                    Riotings: ${district.properties.Riotings}</h4><br>
                    <img src='./images/12.svg' width='15px'/>&#160&#160<h4 style="display:inline-block;"> 
                    Thefts: ${district.properties.Thefts}</h4><br>
                    <img src='./images/20.png' width='15px'/>&#160&#160<h4 style="display:inline-block;"> 
                    Murders: ${district.properties.murder}</h4><br>
                    <img src='./images/6.svg' width='15px'/>&#160&#160<h4 style="display:inline-block;"> 
                    Kidnappings: ${district.properties.kidnapping}</h4><br>
                    <img src='./images/15.svg' width='15px'/>&#160&#160<h4 style="display:inline-block;"> 
                    Hurt Cases: ${district.properties.hurtCases}</h4><br>                 
                    <img src='./images/4.svg' width='15px'/>&#160&#160<h4 style="display:inline-block;"> 
                    Rapes: ${district.properties.rapes}</h4><br>
                    </div>`
    L.circleMarker([lat,long]).addTo(myMap).bindPopup(customPopup).openPopup();
    play();
    let stats=document.querySelector(".statistics");
    stats.style.visibility="visible";
    stats.addEventListener('click',()=>{
    generateCharts(district);
});
}

var myIcon = L.icon({
    iconUrl: 'locationIcon.png',
    iconSize: [30, 40]
});
function style(feature) {
  return {
    fillColor: "#FCB81E",
    weight: 2,
    opacity: 1,
    color: "#CCCCCC",
    fillOpacity: 0.7
  };
}

L.geoJSON(districtList, {
   // onEachFeature: onEachFeature,
   style:style,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng,{ icon: myIcon });
    }
}).addTo(myMap)
 .addEventListener('click',getcoords);


function findlocation(){
    const toSearch= search.value;
    for(var i=0;i<districtList.length;i++){
        if(districtList[i].properties.name.toUpperCase()==toSearch.toUpperCase()){
            var lathere=districtList[i].geometry.coordinates[1];
            var longhere=districtList[i].geometry.coordinates[0];
           myMap.flyTo([parseInt(lathere), parseInt(longhere)],9, {
            duration: 3
    });
            createMarkers(lathere,longhere,districtList[i]);
           // generateCharts(districtList[i]);
        }
    }

}

function generateCharts(district){
    
  mapp.innerHTML="";
  mapp.style.width="70%";
  mapp.style.height="100%";
  mapp.style.backgroundColor="white";
  mapp.innerHTML=`
  <div class="charts">
        <canvas id="bar-chart" width="800" height:1000px></canvas>

  </div>`;
  new Chart(document.getElementById("bar-chart"), {
  type: 'line',
    data: {
      labels: ["Murders", "Kidnapping", "Rapes", "HurtCases", "Riotings","Thefts"],
      datasets: [
        {
          label: `${district.properties.name}`,
          backgroundColor: ["#00487C", "#8e5ea2","#FFCBDD","#7C0B2B","#EE6C4D","#FF2C55"],
          data: [`${parseInt(district.properties.murder)}`,
          `${parseInt(district.properties.kidnapping)}`,
          `${parseInt(district.properties.Thefts)}`,
          `${parseInt(district.properties.hurtCases)}`,
          `${parseInt(district.properties.Riotings)}`,
          `${parseInt(district.properties.rapes)}`]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Crime Rate statistics'
      },
      scaleShowValues: true,
 scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        autoSkip:false
      }
    }],
    xAxes: [{
ticks: {
    beginAtZero: true,
    autoSkip: false
      }
    }]
  }
    }
});
}


function play() {
        var audio = new Audio("sound.mp3");
        audio.play();
      }



























/*





const quotes=["Rape is the only crime in which the victim becomes the accused.\n-Freda Adler",
              'He who helps the guilty, shares the crime.-PUBLILIUS SYRUS',
              'To revenge crime is important, but to prevent it is more so.-ARTHUR CONAN DOYLE',
              'For centuries the death penalty, often accompanied by barbarous refinements, has been trying to hold crime in check; yet crime persists.-ALBERT CAMUS',
              'Pardon one offence and you encourage the commission of many.-PUBLILIUS SYRUS',
              'Disgrace does not consist in the punishment, but in the crime.-VITTORIO ALFIERI'];

window.onload=function(){
  let index=Math.floor(Math.random()*quotes.length);
let div=document.querySelector('#quote');
let quote=`<div class="card">
          <p>${quotes[index]}</p>
          </div>`;
          div.innerHTML=quote;

}*/

