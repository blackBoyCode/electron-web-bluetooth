//sample code generated 
class CustomDeviceX {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }

  request() {
    let options = {
      "filters": [{
        "services": ["df264931-0c69-481f-95e6-456ac7bb886f"]
      }]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    });
  }

  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.connect();
  }

  readCustomCharacteristic() {
    return this.device.gatt.getPrimaryService("df264931-0c69-481f-95e6-456ac7bb886f")
    .then(service => service.getCharacteristic("cf178e50-594e-4599-905e-8b53ab510cb7"))
    .then(characteristic => characteristic.readValue());
  }

  writeCustomCharacteristic(data) {
    return this.device.gatt.getPrimaryService("df264931-0c69-481f-95e6-456ac7bb886f")
    .then(service => service.getCharacteristic("cf178e50-594e-4599-905e-8b53ab510cb7"))
    .then(characteristic => characteristic.writeValue(data));
  }

  startCustomCharacteristicNotifications(listener) {
    return this.device.gatt.getPrimaryService("df264931-0c69-481f-95e6-456ac7bb886f")
    .then(service => service.getCharacteristic("cf178e50-594e-4599-905e-8b53ab510cb7"))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', listener));
  }

  stopCustomCharacteristicNotifications(listener) {
    return this.device.gatt.getPrimaryService("df264931-0c69-481f-95e6-456ac7bb886f")
    .then(service => service.getCharacteristic("cf178e50-594e-4599-905e-8b53ab510cb7"))
    .then(characteristic => characteristic.stopNotifications())
    .then(characteristic => characteristic.removeEventListener('characteristicvaluechanged', listener));
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}

var customDeviceX = new CustomDeviceX();

document.querySelector('button').addEventListener('click', event => {
  customDeviceX.request()
  .then(_ => customDeviceX.connect())
  .then(_ => { /* Do something with customDeviceX... */

  customDeviceX.startCustomCharacteristicNotifications(handleListener);


  })
  .catch(error => { console.log(error) });
});

function handleListener(event){
var value = event.target.value;
console.log('value' + new TextDecoder('utf-8').decode(value));

}
