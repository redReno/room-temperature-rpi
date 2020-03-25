const express = require('express')
const util = require('util');
const bodyParser = require('body-parser');
const exec = util.promisify(require('child_process').exec);
const port = process.env.port || 8082
const rpath = {root: __dirname + '/views'};

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html', rpath);
})

app.get('/temperature', async function (req, res) {
  var temperature = null;
  const { error, stdout, stderr } = await exec(__dirname + '/src/rpi_temp.out', { shell: false });
  if (typeof error !== 'undefined') {
    console.error(stderr);
    res.send(stderr);
  } else {
    console.log(stdout);
    temperature = stdout;
    let temperatureText = `The temperature is ${temperature} °C`;
    res.send(temperatureText);
  }
})

app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});

app.listen(port, function () {
  console.log(`Temperature app listening on ${port}!`);
})
