const { Schema, model } = require('mongoose');

const basicSettings = new Schema({
    guildId: { type: String, required: true},
    prefix: { type: String, default: "," },

});

module.exports = model("BasicSettings", basicSettings, "BasicSettings"); 