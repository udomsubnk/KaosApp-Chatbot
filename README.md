## Kao's - Messenger Chatbot

This app is a chat bot service for Facebook Messenger.

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
	
Or install `disable-content-security` Chrome extension 
> https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden
