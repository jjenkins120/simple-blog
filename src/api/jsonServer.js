import axios from 'axios'

export default axios.create({
    baseURL: 'http://d7f68f67b777.ngrok.io'
})
//HUGE PAIN POINT - ngrok has a time limitation on the url - which means you will need to recopy the url every 8 hours (ngroks time limitation)