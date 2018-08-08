'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
    cpus: Number,
    usedCpus: Number,
    id: {
        type: Number,
        unique: true
    },
    group: String
}, {
    versionKey: false
});

module.exports = MachineSchema;
