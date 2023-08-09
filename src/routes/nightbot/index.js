const express = require('express')
const nightbot = require('./nightbot-api')

module.exports = function(){
    const router = new express.Router()

    router.route('/authorize')
        .get(nightbot.getAuthCode)

    return router
}