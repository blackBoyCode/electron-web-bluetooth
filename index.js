mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'))//google material design function

var button = document.querySelector('.foo-button')
var sendButton = document.getElementById('sendID')
var textFieldInput = document.getElementById('text-field-id')

//UUIDs
var customServiceUUID ='df264931-0c69-481f-95e6-456ac7bb886f';
var customCharacteristicUUID ='cf178e50-594e-4599-905e-8b53ab510cb7';

var characteristicObject = null;

button.addEventListener('click', function(event) {

  var p = document.createElement("p");
  p.innerText = 'Testing stylesheet Electron';
  p.id = "textId";
  document.body.appendChild(p);


  //alert('hey!')
  //starting bluetooth..
  navigator.bluetooth.requestDevice({
  filters: [{
    services: [customServiceUUID]
  }]
})
.then(device => {//don't need return if remove bracker

  console.log(device.name);
  deviceObject = device;

  // Attempts to connect to remote GATT Server.
  console.log('Connecting To Android Device...');
  return device.gatt.connect();

})
.then(server => {
  // get service
  console.log('Getting Custom Service...')
  return server.getPrimaryService(customServiceUUID);
})
.then(service => {
  // get characteristic...
  console.log('Getting Custom Characteristic...')
  return service.getCharacteristic(customCharacteristicUUID);

})
.then(characteristic => {
  characteristicObject = characteristic;
  console.log(characteristic)

  return characteristic;

  //return characteristic.readValue();
})
.then(characteristic => {
  characteristic.startNotifications()//to receiving notification by writting server CCCD
  characteristic.addEventListener('characteristicvaluechanged', valueChanged);
  console.log(characteristic);
})
.catch(error => { console.log(error); });

});


//function to send a string value
function sendStuff(stringToSend){

// prepare words to send on device
var testWriting = Buffer.from(textFieldInput.value);//use our input..

console.log('writting characteristic...');
characteristicObject.writeValue(testWriting);

}

//send somestuff after connecting and getting characteristic
sendButton.addEventListener('click', function(event){

  sendStuff();

})

//for event lister for characteristic changes
function valueChanged(event){
  var value = event.target.value; //are we getting bytes?
  console.log('current value is now :' + value);
  console.log('converted value: ' + new TextDecoder('utf-8').decode(value))
}
