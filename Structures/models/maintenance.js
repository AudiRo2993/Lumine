const { Schema, model } = require('mongoose');

const Maintenance = new Schema({

   //guildId: { type: String},
   aichat: {type: Boolean, default: false},
   aicharacter: {type: Boolean, default: false },
   intellisense: {type: Boolean, default: false},
   imagegeneration: {type: Boolean, default: false},
   everything: {type: Boolean, default: false}

});

module.exports = model("Maintenance", Maintenance, "Maintenance"); 