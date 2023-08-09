const express = require('express')

module.exports = function(){
    const router = new express.Router()
    const nightbot = require('./nightbot')()
    const generic = require('./generic')()

    router.use('/nightbot', nightbot)
    router.use('/generic', generic)

    return router
}