const temp_btn = document.getElementById('temp_btn');
const temp_txt = document.getElementById('temp_txt');
const spinner = document.getElementById('spinner');
console.log('Client-side code running');

function showTemperature() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      let temperatureText = xhr.responseText;
      temp_txt.innerHTML=temperatureText;
      temp_txt.style.display = "block";
      spinner.style.display = "none";
    }
  };
  xhr.open('GET', '/temperature', true)
  xhr.send();
  spinner.style.display = "block";
};

temp_btn.addEventListener('click', function(e) {
  console.log('button was clicked');
  showTemperature()
});
