'use strict';

let machines = [
    {
        'cpus': 2,
        'usedCpus': 0,
        'id': 0,
        'group': ''
    },
    {
        'cpus': 1,
        'usedCpus': 0,
        'id': 1,
        'group': 'group1'
    },
    {
        'cpus': 1,
        'usedCpus': 0,
        'id': 2,
        'group': 'group1'
    }
];

const MachineModel = require('../database/model/machine');

class Machine {
    static async getAvailable (cpus) {
        const machines = await MachineModel.find().exec();
        return machines.filter(machine => {
            return (machine.cpus - machine.usedCpus) >= cpus;
        });
    }
    static async updateUsedCpus (machineId, usedCpus) {
        const machine = await MachineModel.findOne({ id: machineId }).exec();
        await machine.update({ $inc: { usedCpus: usedCpus } }).exec();
        return MachineModel.findOne({id: machineId}).exec();
    }
}

(async function () {
    await MachineModel.remove({}).exec();
    await MachineModel.create(machines);
    const data = await MachineModel.find().exec();
    console.log(data);
    console.log('初始数据完成!');
})();

module.exports = Machine;
