///CODE IN WORK FOR TESTING

mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'))

var button = document.querySelector('.foo-button')

button.addEventListener('click', function(event){

  navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
  .then(device => device.gatt.connect())
  .then(server => server.getPrimaryService('health_thermometer'))
  .then(service => service.getCharacteristic('measurement_interval'))
  .then(characteristic => characteristic.getDescriptor('gatt.characteristic_user_description'))
  .then(descriptor => descriptor.readValue())
  .then(value => {
  let decoder = new TextDecoder('utf-8');
  console.log('User Description: ' + decoder.decode(value));
  })
  .then(descriptor => {
    let encoder = new TextEncoder('utf-8');
    let userDescription = encoder.encode('Defines the time between measurements.');
    return descriptor.writeValue(userDescription);
  })
  .catch(error => { console.log(error); });



});
