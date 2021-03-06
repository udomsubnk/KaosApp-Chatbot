var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var path = require('path');

app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})
app.get('/customer', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'testnaja') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'hi') {
                sendGenericMessage(sender)
            }
            else sendTextMessage(sender, text)
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
var token = "EAAK9e5TfD2kBAM9rh0sfvyqrJOYtPIwP3GNZCTHbwCxw2c9zCvtQNWIIkoIpyWi3eJYxqwnO9b7ZCVkYJl17Mlq0ZAcbpZC6JYBwfUSAoNG7GWCK2ALMCO31l39thJdVMXZAZAPSGYQlG7cPrcvPyUFYYWzJiz40uBh2F1yKJvZCgZDZD"

function sendTextMessage(sender, text) {
    messageData = {text}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token:token },
        method: 'POST',
        json: {
            recipient: { id:sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Ai Chat Bot Communities",
                    "subtitle": "Communities to Follow",
                    "image_url": "http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/04/chatbot-930x659.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/groups/aichatbots/",
                        "title": "FB Chatbot Group"
                    }, {
                        "type": "web_url",
                        "url": "https://www.reddit.com/r/Chat_Bots/",
                        "title": "Chatbots on Reddit"
                    },{
                        "type": "web_url",
                        "url": "https://twitter.com/aichatbots",
                        "title": "Chatbots on Twitter"
                    }],
                },{
                    "title": "Learning More",
                    "subtitle": "Aking the Deep Questions",
                    "image_url": "http://www.brandknewmag.com/wp-content/uploads/2015/12/cortana.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "AIML",
                        "payload": "Checkout Artificial Intelligence Mark Up Language. Its easier than you think!",
                    },{
                        "type": "postback",
                        "title": "Machine Learning",
                        "payload": "Use python to teach your maching in 16D space in 15min",
                    }, {
                        "type": "postback",
                        "title": "Communities",
                        "payload": "Online communities & Meetups are the best way to stay ahead of the curve!",
                    }],
                }]  
            } 
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}