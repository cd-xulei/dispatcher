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

class Machine {
    static getAvailable (cpus) {
        return machines.filter(machine => {
            return (machine.cpus - machine.usedCpus) >= cpus;
        });
    }
    static updateUsedCpus (machineId, usedCpus) {
        return machines.find(val => {
            if (val.id === machineId) {
                val.usedCpus += usedCpus;
                return true;
            }
        });
    }
}

module.exports = Machine;
