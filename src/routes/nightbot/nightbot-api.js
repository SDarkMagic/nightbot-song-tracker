const redirectUri = process.env.OAUTH_REDIRECT
const scopes = ['song_requests', 'song_requests_queue', 'song_requests_playlist']

function getAuthCode(req, res){
    const oauthUrl = 'https://api.nightbot.tv/oauth2/authorize'
    const requestUrl = `${oauthUrl}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join(' ')}&state=song-tracker`
    res.redirect(requestUrl)
    return
}

module.exports = {getAuthCode}
