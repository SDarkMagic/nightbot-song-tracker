const {AppData} = require('../../util/appData')

async function isTokenExpired(req, res){
    const data = new AppData()
    const tokenData = data.config.tokens
    const now = Date.now() / 1000
    if (tokenData.access_token === null){
        res.status(500).json()
    }
    if (tokenData.timeObtained + tokenData.expires_in <= now){
        res.status(200).json({'is_token_expired': true})
    } else {
        res.status(200).json({'is_token_expired': false})
    }
    delete data
    return
}

module.exports = {isTokenExpired}
