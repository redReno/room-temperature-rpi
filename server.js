const express = require('express')
const util = require('util');
const bodyParser = require('body-parser');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;
const port = process.env.port || 8082
const rpath = {root: __dirname + '/views'};

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html', rpath);
})

// start c program running in bg
const led_controller = spawn(__dirname + '/src/rpi_temp.out', ['0', '1']);

app.get('/temperature', async function (req, res) {
  var temperature = null
  // send signal to turn on led
  led_controller.kill('SIGINT')
  const { error, stdout, stderr } = await exec(__dirname + '/src/rpi_temp.out', { debug: 1 });
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

var server = app.listen(port, function () {
  console.log(`Temperature app listening on ${port}! PID: ${process.pid}`);
})

function stopServer() {
  console.log('\nSIGINT. Closing server...');
  server.close();
  led_controller.kill('SIGTERM')
  process.exit(0);
}

// callbacks
process.on('SIGINT', () => {
  stopServer()
})

process.on('SIGTERM', () => {
  stopServer()
})
