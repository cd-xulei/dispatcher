'use strict'
const joi = require('joi')

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
    return h.response('success')
  }
}
