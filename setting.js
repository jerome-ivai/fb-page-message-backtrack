
if (process.env.LOG_LEVEL === undefined) {
    const dotenv = require('dotenv')
    dotenv.config()
  }
  

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''
const  PAGE_ID = process.env.PAGE_ID || ''


module.exports  = {ACCESS_TOKEN,PAGE_ID}