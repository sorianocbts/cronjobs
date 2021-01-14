const http = require('http')
//Make POST req with err msg
const sendErr = (hostname, sc) => {
    const data = JSON.stringify({
        "pass": `${process.env.TEMP_POST_PASS}`,
        "service": `${hostname}`,
        "statusCode": sc
    })
    const options = {
        hostname: `${process.env.NOTIFICATIONS_API}`,
        port: 80,
        path: '/api/send-notification',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        // res.on('data', d => {
        //   process.stdout.write(d)
        // })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

//Check Http status codes

const statusCheck = (hn) => {
    const options = {
        hostname: hn,
        port: 80,
        path: '/',
        method: 'GET'
    }

    const req = http.request(options, res => {
        console.log(`${hn}, statusCode: ${res.statusCode}`)
        if (res.statusCode !== 200) {
            console.log(`Something went wrong! Status code is ${res.statusCode}`)
            sendErr(hn, res.statusCode)
        }

        // res.on('data', d => {
        //     process.stdout.write(d)
        // })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

module.exports = statusCheck;