const { Schema, model } = require('mongoose');

const Intellisense = new Schema({

   guildId: { type: String},
   enabled: { type: Boolean, default: false},

});

module.exports = model("Intellisense", Intellisense, "Intellisense"); 