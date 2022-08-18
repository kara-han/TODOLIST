const weather = document.querySelector(".js-weather");

// coord : 좌표
const API_KEY = "449e1de2026658b7c7a2066d20fb0fce";
const COORDS = "coords";

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function getWeather(lat, lng){
  fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
      return response.json();
  })
  .then(function(json){
      const temp = json.main.temp;
      const place = json.name;
      // console.log(json);
      const skyCondition = json.weather[0].main;
      const nation = json.sys.country;
      weather.innerText = `${skyCondition} ${temp} @${place} in ${nation}`;

      const bgimg = (json.weather[0].icon).substr(0,2); //배경화면
      const createImgName = `img/pexels-${bgimg}.jpg`;
      createImg(createImgName);      
  });
}

function createImg(imgname) {
  const body = document.querySelector('#backDIV1');
  // <img> 요소를 만듭니다.
  const img = document.createElement('img');
  // <img> src, alt 값을 지정하고 'bgImg' 클래스를 추가합니다.
  img.src = imgname;
  img.alt = 'background images';
  img.classList.add('bgIme');
  // <body>에 <img> 삽입
  body.prepend(img);
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //console.log(latitude);
  //console.log(longitude);
  const coordsObj = {
      latitude,
      longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

function handleGeoError(){
  console.log("Can not access geo location");
};

function askForCoords(){
  // https://developer.mozilla.org/ko/docs/Web/API/Navigator/geolocation
  // 읽기 전용 속성! 웹에서 장치의 위치를 알아낼 때 사용할 수 있는 Geolocation 객체를 반환한다.
  // getCurrentPosition : 장치의 현재 위치를 가져온다. navigator.geolocation.getCurrentPosition(success함수, error함수)
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

function loadCoords(){
  const loadedcoords = localStorage.getItem(COORDS);
  if(loadedcoords === null){
      askForCoords();
  }else{
      //getWeather
      const parseCoords = JSON.parse(loadedcoords);
      getWeather(parseCoords.latitude, parseCoords.longitude);
  }
};

function init(){
  loadCoords();
};

init();