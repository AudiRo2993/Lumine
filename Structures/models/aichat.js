const { Schema, model } = require('mongoose');

const Aichat = new Schema({

   guildId: { type: String},
   enabled: { type: Boolean, default: false},
   channel: { type: String, default: ""},
   personality: {type: String},
   model: {Type: String},
   accuracy: {Type: Number}

});

module.exports = model("Aichat", Aichat, "Aichat"); 