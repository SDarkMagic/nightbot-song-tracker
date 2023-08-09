const express = require('express')
const { createServer } = require('http')
const path = require('path')
const {AppData} = require('./util/appData')
const {requestOauth} = require('./util/nightbot')
const {WS} = require('./webSocket')

require('dotenv-safe').config({path: `${__dirname}/../.env`})

const app = express()
const port = 3000
const appData = new AppData()

const router = require('./routes')()
app.use('/api', router)

const server = createServer(app)
const ws = WS(server, appData).then(io => io)


app.get('/authorize', (req, res) => {
    const authToken = req.query.code
    if (req.query.state !== 'song-tracker'){
        res.send('The original location used to generate the token was not valid...')
        return
    }
    requestOauth(authToken).then(oauth => {
        if (oauth === false){
            res.status(500).send()
            return
        }
        Object.assign(appData.config.tokens, oauth)
        appData.config.tokens.timeObtained = Date.now() / 1000
        appData.save()
        res.send('Authorized successfully')
    }).catch(err =>{
        console.error(err)
    })
    return
})

const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))
app.get('/widget', (req, res) => {
    res.sendFile(path.join(staticDir, 'widget.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'))
})


server.listen(port, () => {
    console.log('Server listening on port ' + port)
})