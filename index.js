require("dotenv").config();
const statusCheck = require("./statusCheck")

const hostnames = ['www.cbtseminary.org', 'passwords.cbtseminary.com', 'prf.cbtseminary.com']

const checkHosts = (() => {
    try {
        hostnames.map(x => {
            statusCheck(x)
        })
    } catch (err) {
        console.log(err)
    }
})()