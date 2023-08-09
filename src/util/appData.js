const fs = require('fs')

const appDataDir = `${process.env.APPDATA}/nightbot-song-tracker`

class AppData{
    constructor(){
        this.appDataDir = appDataDir
        this.configFile = `${this.appDataDir}/config.json`
        this.config = {}
        this.load()
    }

    _fillConfig(){
        const template = {
            tokens: {
                access_token: null,
                token_type: "bearer",
                timeObtained: 0,
                expires_in: 0,
                refresh_token: null,
                scope: "song_requests, song_requests_queue, song_requests_playlist"
            }
        }
        Object.assign(this.config, template)
        return
    }

    load(){
        if (fs.existsSync(this.configFile)){
            Object.assign(this.config, JSON.parse(fs.readFileSync(this.configFile)))
        } else {
            this._fillConfig()
            this.save()
        }
        return
    }

    save(){
        try{
            if (!fs.existsSync(this.appDataDir)){
                fs.mkdirSync(this.appDataDir)
            }
            fs.writeFileSync(this.configFile, JSON.stringify(this.config, null, 2))
            return true
        } catch(err){
            console.error(err)
            return false
        }
    }

    static getData(){
        if (fs.existsSync(this.configFile)){
            return JSON.parse(fs.readFileSync(this.configFile))
        } else {
            return null
        }
    }
}

module.exports = {AppData}