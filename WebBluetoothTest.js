//A FEW TEST I WAS DOING....
var button = document.querySelector('.foo-button');

button.addEventListener('click', function(event) {

//get device by using sevice UUID
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })


.then(device => {
  console.log('connecting...');
  return device.gatt.connect()

})
.then(server => {
  // Getting Battery Service...
  return server.getPrimaryService('battery_service');
})
.then(service => {
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {

  // Set up event listener for when characteristic value changes.
 characteristic.addEventListener('characteristicvaluechanged',
                                 handleBatteryLevelChanged);

  // Reading Battery Level...
  return characteristic.readValue();
})
.then(value => {
  console.log('Battery percentage is ' + value.getUint8(0));
})
.catch(error => { console.log(error); });

function handleBatteryLevelChanged(event) {
  let batteryLevel = event.target.value.getUint8(0);
  console.log('Battery percentage is ' + batteryLevel);
}

});
