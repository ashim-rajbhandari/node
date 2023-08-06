var events = require('events');
var eventEmitter = new events.EventEmitter();
const { sendEmail } = require('../events/createAccountEvent')

eventEmitter.on('send' , sendEmail);

module.exports = {
    emitter : eventEmitter 
};