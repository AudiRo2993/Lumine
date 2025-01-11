const { Schema, model } = require('mongoose');

const Aicharacter = new Schema({

    guildid: {
        type: String,
        required: true,
        unique: true,
    },
    zerotwo: {
        channel: String,
        enabled: Boolean,
        users: [String],
    },
    hutao: {
        channel: String,
        enabled: Boolean,
        users: [String],
    },
    marinKitagawa: {
        channel: String,
        enabled: Boolean,
        users: [String],
    },
    anyaForger: {
        channel: String,
        enabled: Boolean,
        users: [String],
    },
    gawrGura: {
        channel: String,
        enabled: Boolean,
        users: [String],
    },

});

module.exports = model("Aicharacter", Aicharacter, "Aicharacter"); 