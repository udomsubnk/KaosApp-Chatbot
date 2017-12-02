## Kao's - Messenger Chatbot

This app is a chat bot service for Facebook Messenger.

> Facebook Mesenger customer-plugin `at first`
![alt text](https://raw.githubusercontent.com/udomsubnk/Homework/master/screenshort/customerPlugin-atFirst.png)

> Facebook Mesenger customer-plugin `chatting`
![alt text](https://raw.githubusercontent.com/udomsubnk/Homework/master/screenshort/customerPlugin-chatting.png)

> Directly chatting
![alt text](https://github.com/udomsubnk/KaosApp-Chatbot/blob/master/screenshorts/chatting%20directly.png)

## Try it

Try it for Messenger customer-Plugin >> https://kaosbot.herokuapp.com/customer 

or message directly >> https://www.messenger.com/t/kaosbot

## Implementation

* Change token, app_id, page_id

* Whitelist your domain

``` bash
curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
  	"http://localhost:3000",
  	"https://kaosbot.herokuapp.com/customer"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"
```

* Have fun!

> Don't forgot my Facebook app is not released yet, So it will response me only.