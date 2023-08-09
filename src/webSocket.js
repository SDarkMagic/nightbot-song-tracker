const { Server } = require('socket.io')
const {fetchSongQueue} = require('./util/nightbot')

async function WS(httpServer, appData){
    const io = new Server(httpServer)

    io.on('connection', soc => {
        fetchSongQueue(appData.config.tokens.access_token).then(queue => {
            soc.emit('init_queue_data', queue)
            return
        })

        soc.on('request_current_queue_state', data => {
            fetchSongQueue(appData.config.tokens.access_token).then(queue => {
                console.log('Song queue requested')
                soc.emit('queue_data', queue)
            })
        })
    })


    return io
}

module.exports = {WS}