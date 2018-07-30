// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const {dialogflow,Permission,NewSurface} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});
const https = require('https');
 
var favorites = ["Blaue Tinte", "Druckerpapier", "Schwarzer Edding"];
  
app.intent('Default Welcome Intent', (conv) => {
    conv.ask("Moin und willkommen zu deinen Nachbestellungen! Bitte w‰hle ein Produkt aus deinen Favoriten: " + favorites);
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        conv.ask('Sorry, try this on a screen device or select the ' +
        'phone surface in the simulator.');
        return;
    }

    conv.ask(new Suggestions(favorites[0], favorites[1], favorites[2]));


 });

app.intent('Default Fallback Intent', (conv) => {
    conv.ask("Ups, da ist etwas schief gegangen");
 });

app.intent('Reordering', (conv, {favorites, confirmation}) => {
    if (confirmation == "Ja"){
        conv.close("Bestellung war erfolgreich. Viel Spaﬂ mit dem Produkt. Die Bestellung kannst du jederzeit in deinem Kundenkonto nachverfolgen.")
    }
    
 });
 
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);