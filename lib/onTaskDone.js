'use strict';

const Machine = require('./Machine');

module.exports = async function onTaskDone (task, machine) {
    // 释放 机器 cpu
    return Machine.updateUsedCpus(machine.id, -task.cpus);
};
