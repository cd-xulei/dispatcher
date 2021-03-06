'use strict';

const joi = require('joi');

const onTaskDone = require('../lib/onTaskDone');
const onTaskSchedule = require('../lib/onTaskSchedule');

const dispatcher = async function (tasks, count) {
    count.counter++;
    console.log(`\r\n第${count.counter}轮分配`);
    console.log(`task =======> machine`);
    for (let task of tasks) {
        const machine = await onTaskSchedule(task);
        // 注册回调
        Object.assign(task, { machineId: machine && machine.id });
        machine && setTimeout(onTaskDone.bind(null, task, machine), task.times * 1000);
        console.log(`${task.id}    =======>    ${machine && machine.id}`);
    }
    tasks = tasks.filter(task => task.machineId === null);
    if (tasks.length) {
        setTimeout(dispatcher.bind(null, tasks, count), 10 * 1000);
    } else {
        count.counter = 0;
        console.log(`\r\n全部任务分配结束`);
    }
};

module.exports = {
    method: 'post',
    path: '/dispatch',
    config: {
        description: '任务调度',
        tags: ['api', 'task'],
        validate: {
            payload: joi.array().items(
                joi.object({
                    id: joi.number().description('任务 id'),
                    group: joi.string().description('分组'),
                    cpus: joi.number().description('所需要 cpu数量'),
                    times: joi.number().description('执行时间')
                })
            )
        }
    },
    handler: async function (req, h) {
        const tasks = req.payload;
        let count = {counter: 0};
        dispatcher(tasks, count);
        return h.response('success');
    }
};
