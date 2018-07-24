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

const {groupBy, minItem} = require('../util/func');

function onTaskSchedule (task) {
    // 排除 cpu 不足的机器
    const available = machines.filter(machine => {
        return (machine.cpus - machine.usedCpus) >= task.cpus;
    });
    // 没有可用的机器
    if (!available.length) return null;
    const group = groupBy(available, 'group');
    let machine = null;
    // 满足分组条件下 使用最小 id 机器
    machine = minItem(group[task.group] || group[''], 'id');
    return machines.find(val => {
        if (val.id === machine.id) {
            val.usedCpus += task.cpus;
            return true;
        }
    });
};

module.exports = onTaskSchedule;
