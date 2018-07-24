'use strict';

const {expect} = require('chai');

const rq = require('request-promise');

const tasks = [
    {
        'id': 0,
        'group': 'group2',
        'cpus': 1,
        'times': 10
    },
    {
        'id': 1,
        'group': 'group1',
        'cpus': 1,
        'times': 11
    },
    {
        'id': 2,
        'group': 'group1',
        'cpus': 1,
        'times': 10
    },
    {
        'id': 3,
        'group': 'group2',
        'cpus': 1,
        'times': 10
    },
    {
        'id': 4,
        'group': 'group2',
        'cpus': 1,
        'times': 10
    },
    {
        'id': 5,
        'group': 'group1',
        'cpus': 1,
        'times': 10
    }
];

describe('任务执行', () => {
    it('dispatch', () => {
        const options = {
            method: 'POST',
            uri: 'http://127.0.0.1:3000/api/v1/dispatch',
            body: tasks,
            json: true
        };
        return rq(options)
            .then((body) => {
                expect(body).to.equal('success');
            });
    });
});
