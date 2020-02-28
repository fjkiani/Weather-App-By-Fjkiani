//get the latitute and longtitude
//after page loads, get location
window.addEventListener("load", () => {
  let long;
  let lat;

  //pull out html elements
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  //if this exists in browser, find position of user
  //pop up will ask allow geo location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //this proxy will allow access to the server from local host
      const proxy = "https://cors-anywhere.herokuapp.com/";

      //uses first numbr as latitude and second as longitude
      const api = `${proxy}https://api.darksky.net/forecast/2cf96907ecfa85359da71636ca546778/${lat},${long}`;

      fetch(api)
        .then(response => {
          //take this information and convert it into JSON
          return response.json();
        })
        .then(data => {
          console.log(data);

          //pulls out temperature
          const { temperature, summary, icon } = data.currently;
          //set DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone.replace(/_/g, ' ');

          //convert temperature 

          let celsius = (temperature - 32 ) * (5/9);

          //set Icon
          setIcons(icon, document.querySelector(".icon"));


            //change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === 'F') {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
              }
            })


        });
    });
  } else {
    alert("Enable your Geo!");
  }


      // set icons -> check documentations for skycons
      //defined a function with iconId 
        function setIcons(icon, iconID) {
          const skycons = new Skycons({ color: "red" });

          //look for every line and replace it with underscore ex. jay-w to jay_w
          //uppercase since every skycon is uppercase
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          //animates the icon 
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
          

        }
      });
