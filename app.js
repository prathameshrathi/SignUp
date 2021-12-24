const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public")); //use to include all the static files and images
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            update_existing: true,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
            }

        ]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us20.api.mailchimp.com/3.0/lists/08679061b3'; 
    const options = {
        method: "POST",
        auth: "pratham:8f241dad771cd355de15854cc788a0fe-us20"
    }; 

    const request1 = https.request(url,options,function(response){
        var receivedData;
        if(response.statusCode==200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            receivedData = JSON.parse(data);
            console.log(receivedData);
         });
    });

    request1.write(jsonData);
    request1.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.post("/success",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});

//8f241dad771cd355de15854cc788a0fe-us20 apikey
//08679061b3