const axios = require('axios')
const querystring = require('querystring')

async function requestOauth(token){
    let authCode = token
    const oauth2Url = 'https://api.nightbot.tv/oauth2/token'
    const reqBody = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: authCode,
        grant_type: "authorization_code"
    }
    try{
        const result = await axios.post(oauth2Url, querystring.stringify(reqBody))
        return result.data
    } catch (err) {
        console.error(err)
    }
    return false
}

async function fetchSongQueue(oauth){
    const baseUrl = 'https://api.nightbot.tv/1/song_requests/queue'
    try {
        const result = await axios.get(baseUrl, {headers: {'Authorization': `Bearer ${oauth}`}})
        return result.data
    } catch (err){
        console.error(err)
        return false
    }
}

module.exports = {requestOauth, fetchSongQueue}