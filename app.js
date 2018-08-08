'use strict';
const fs = require('fs');
const path = require('path');

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dispacther', {
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
});

const server = Hapi.Server({
    port: process.env.PORT || 3000,
    routes: { log: { collect: true } }
});
const basePath = '/api/v1';

async function start () {
    const swaggerOptions = {
        info: {
            title: '任务调度',
            version: '1.0.0'
        },
        tags: [{
            name: 'task',
            description: '调度'
        }, {
            name: 'test',
            description: '---'
        }],
        expanded: 'list',
        basePath: '/api/v1',
        grouping: 'tags',
        lang: 'zh-cn'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        {
            plugin: require('good'),
            options: {
                reporters: {
                    myConsoleReporter: [{
                        module: 'good-console',
                        args: [{ log: '*', response: '*' }]
                    }, 'stdout']
                }
            }
        }
    ]);

    try {
        const routeFiles = fs.readdirSync(path.join(__dirname, 'Routes'));

        routeFiles.forEach(filename => {
            const route = require(path.join(__dirname, 'Routes', filename));
            server.route({...route, path: basePath + route.path});
        });

        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }
}

start();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
