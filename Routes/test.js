'use strict'
const joi = require('joi')

const fs = require('fs')
const path = require('path')

module.exports = {
  method: 'get',
  path: '/test',
  config: {
    description: '任务调度',
    tags: ['api', 'dispatch'],
    validate: {
      query: {a: 1}
      // payload,path params
    }
    // response: {schema: responseModel},//responseModel 是joi.object()构造出来的
  },
  handler: async function (req, h) {
    return h.response('success')
  }
}
