const socket = io()
let song = {}
socket.on('connect', () => {
    console.log('Successfully connected to the server!')
})

socket.on('init_queue_data', data => {
    socket.emit('request_current_queue_state')
    console.log(data)
    return
})

socket.on('queue_data', data => {
    let currentSong = data._currentSong
    console.log('Received queue data')
    if (currentSong._id !== song._id){
        Object.assign(song, data._currentSong)
        updateWidget(data._currentSong)
    } else {

    }
    return
})