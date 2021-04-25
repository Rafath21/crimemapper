const myMap = L.map('map').setView([18.1124,79.0193], 7);
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tiles= L.tileLayer(tileUrl,{attribution,maxZoom:9,minZoom:7});
tiles.addTo(myMap);

const search=document.querySelector(".search-input");
const searchIcon=document.querySelector(".fas");
searchIcon.addEventListener("click",findlocation);
const mapp=document.querySelector('#map');

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

}

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
           var crimes= Object.keys(districtList[i].properties);
           createMarkers(lat,long,districtList[i]);
          }
    }
}

function createMarkers(lat,long,district){
    play();
   // initialize();
    L.circleMarker([parseInt(lat)+1.2,parseInt(long)+0.1],{radius:"70", color:	"rgb(184,0,0)"}).addTo(myMap);
    L.circleMarker([parseInt(lat)+1.42,parseInt(long)+1.2],{radius:"44", color:"rgb(208,0,0)"}).addTo(myMap);
    L.circleMarker([parseInt(lat)+1.1,parseInt(long)+0.9],{radius:"39", color:"rgb(224,0,0)"}).addTo(myMap);
    L.circleMarker([parseInt(lat)-0.08,parseInt(long)-0.94],{radius:"60", color:"	rgb(240,0,0)"}).addTo(myMap);
    L.circleMarker([parseInt(lat)+1.15,parseInt(long)+1.6],{radius:"40", color:"rgb(176,0,0)"}).addTo(myMap);
    L.circleMarker([parseInt(lat)+0.6,parseInt(long)+0.16],{radius:"55", color:"	rgb(112,0,0)"}).addTo(myMap);
    generateCharts(district);
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
            myMap.flyTo([parseInt(lathere), parseInt(longhere)],7, {
            duration: 3
    });
            createMarkers(lathere,longhere,districtList[i]);

        }
    }

}

function generateCharts(district){
    new Chart(document.getElementById("bar-chart"), {

    type: 'bar',
    data: {
      labels: ["Murders", "Kidnapping", "Rapes", "HurtCases", "Riotings","Thefts"],
      datasets: [
        {
          label: `${district.properties.name}`,
          backgroundColor: ["#00487C", "#8e5ea2","#FFCBDD","#7C0B2B","#EE6C4D","#FF2C55"],
          data: [`${parseInt(district.properties.murder)}`,
          `${parseInt(district.properties.kidnapping)}`,
          `${parseInt(district.properties.rapes)}`,
          `${parseInt(district.properties.hurtCases)}`,
          `${parseInt(district.properties.Riotings)}`,
          `${parseInt(district.properties.Thefts)}`]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Crime Rate statistics'
      }
    }
});

}

function play() {
        var audio = new Audio("sound.mp3");
        audio.play();
      }
