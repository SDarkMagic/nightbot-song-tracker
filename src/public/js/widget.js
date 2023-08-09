function setTitle(title){
    let element = document.getElementById('title-name')
    element.innerText = title
}

function setArtist(artist){
    let element = document.getElementById('artist-name')
    element.innerText = artist
}

function setImg(url){
    let element = document.getElementById('song-thumbnail')
    element.src = url
}

function setUser(name){
    let element = document.getElementById('requester-name')
    element.innerText = name
}

function initProgressBar(max){
    let element = document.getElementById('song-duration')
    element.max = max
    element.value = 0
    let progessId = setInterval((element, max) => {
        if (max > element.value){
            let currentValue = element.value
            element.value = currentValue + 1
        }
    }, 1000, element, max)

    setTimeout((id) => {
        clearInterval(id)
        socket.emit('request_current_queue_state')
    }, max * 1000, progessId)
}

function updateWidget(songData){
    let song = songData.track
    setTitle(song.title)
    setArtist(song.artist)
    setUser(songData.user.displayName)

    if (song.provider === 'youtube'){
        let url = `https://img.youtube.com/vi/${song.providerId}/hqdefault.jpg`
        setImg(url)
    }

    initProgressBar(song.duration)
}