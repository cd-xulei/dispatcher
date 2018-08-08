'use strict';

const mongoose = require('mongoose');

const MachineSchema = require('../schema/machine.js');

const MachineModel = mongoose.model('Machine', MachineSchema);

module.exports = MachineModel;
