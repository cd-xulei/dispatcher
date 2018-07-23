'use strict'
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const fs = require('fs')
const path = require('path')

const server = Hapi.Server({ host: '127.0.0.1', port: 3000 })
const basePath = '/api/v1'

async function start () {
  const swaggerOptions = {
    info: {
      title: '任务调度',
      version: '1.0.0'
    },
    basePath: '/api/v1',
    tags: [{
      name: 'dispatch',
      description: '调度'
    }, {
      name: 'test',
      description: ' 测试'
    }]
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  try {
    const routeFiles = fs.readdirSync(path.join(__dirname, 'Routes'))

    routeFiles.forEach(filename => {
      const route = require(path.join(__dirname, 'Routes', filename))
      server.route({...route, path: basePath + route.path})
    })

    await server.start()
    console.log('Server running at:', server.info.uri)
  } catch (err) {
    console.log(err)
  }
}

start()

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})