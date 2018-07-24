'use strict';

const joi = require('joi');

const onTaskDone = require('../lib/onTaskDone');
const onTaskSchedule = require('../lib/onTaskSchedule');

let counter = 0;
const dispatcher = async function (tasks) {
    counter++;
    console.log(`\r\n第${counter}轮分配`);
    console.log(`task =======> machine`);
    for (let task of tasks) {
        const machine = await onTaskSchedule(task);
        // 注册回调
        Object.assign(task, { machineId: machine && machine.id });
        machine && setTimeout(onTaskDone.bind(null, task, machine, tasks, dispatcher), task.times * 1000);
        console.log(`${task.id}    =======>    ${machine && machine.id}`);
    }
    tasks = tasks.filter(task => task.machineId === null);
    if (tasks.length) {
        setTimeout(dispatcher.bind(null, tasks), 10 * 1000);
    } else {
        console.log(`\r\n全部任务分配结束`);
    }
};

module.exports = {
    method: 'post',
    path: '/dispatch',
    config: {
        description: '任务调度',
        tags: ['api', 'dispatch'],
        validate: {
            payload: joi.array().items(
                joi.object({
                    id: joi.number(),
                    group: joi.string(),
                    cpus: joi.number(),
                    times: joi.number()
                })
            )
        }
    },
    handler: async function (req, h) {
        const tasks = req.payload;
        dispatcher(tasks);
        return h.response('success');
    }
};
