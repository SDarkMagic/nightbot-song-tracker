const express = require('express')
const generic = require('./generic')

module.exports = function(){
    const router = new express.Router()

    router.route('/check-token-validity')
        .get(generic.isTokenExpired)

    return router
}