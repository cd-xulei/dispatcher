'use strict';

const joi = require('joi');
const onTaskSchedule = require('../lib/onTaskSchedule');

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
        const results = [];
        for (let task of tasks) {
            const machine = await onTaskSchedule(task);
            results.push({taskId: task.id, machine});
        }
        console.log(results);
        return h.response(results);
    }
};
