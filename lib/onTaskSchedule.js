'use strict';

const Machine = require('../lib/Machine');

const { groupBy, minItem } = require('../util/func');

function onTaskSchedule (task) {
    let machine = null;
    // 排除 cpu 不足的机器
    const available = Machine.getAvailable(task.cpus);
    // 没有可用的机器
    if (!available.length) return machine;
    const group = groupBy(available, 'group');
    // 满足分组条件下 使用最小 id 机器
    machine = minItem(group[task.group] || group[''], 'id');

    // 更新机器被使用的 cpu
    return Machine.updateUsedCpus(machine.id, task.cpus);
};

module.exports = onTaskSchedule;
