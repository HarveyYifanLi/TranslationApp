var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    
var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
    
app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.get('*', function(req, res){
    //console.log("Wiseman: the req body is: " + req.body);
    res.send("Hit a route that has not been defined yet...");
});

// Needs to import the google library with command: npm install --save @google-cloud/translate
// Needs to set the key with command first: export GOOGLE_APPLICATION_CREDENTIALS="/home/ec2-user/environment/verb-app/g-prt-key/VocabularyPad-13fb76005990.json"
// function googleTranslate(){
//   const projectId = "vocabularypad";
//   // Imports the Google Cloud client library
//   const {Translate} = require('@google-cloud/translate');
//   // Instantiates a translate client
//   //const keyFilePath = "/home/ec2-user/environment/verb-app/g-prt-key/VocabularyPad-13fb76005990.json";
//   //const translate = new Translate({projectId, keyFilePath});
//   const translate = new Translate({projectId});
//   // The text to translate
//   const text = 'Anthropocene';
//   // The target language
//   const target = 'zh';
//   // Translates some text into Chinese
//   // Note that translate.translate() returns a promise and thus needs to be resolved and handle rejection as well
//   translate
//   .translate(text, target)
//   .then(results => {
//     let translation = results[0];
//     console.log(`Text: ${text}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }
//googleTranslate();
    
app.listen(port, function(){
    console.log("App is running on port: " + process.env.PORT);
});

