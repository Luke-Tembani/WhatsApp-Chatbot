const express=require("express");
const body_parser=require("body-parser");
const axios=require("axios");
require('dotenv').config();

const app=express().use(body_parser.json());

const token=process.env.TOKEN;
const mytoken=process.env.MYTOKEN;//prasath_token

app.listen(process.env.PORT,()=>{
    console.log("webhook is listening");
});



//to verify the callback url from dashboard side - cloud api side
app.get("/webhook",(req,res)=>{
   let mode=req.query["hub.mode"];
   let challange=req.query["hub.challenge"];
   let token=req.query["hub.verify_token"];


    if(mode && token){

        if(mode==="subscribe" && token===mytoken){
            res.status(200).send(challange);
        }else{
            res.status(403);
        }

    }

});





app.post("/webhook",(req,res)=>{ //i want some 

    let body_param=req.body;

    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){

        console.log("inside body param");
        if(body_param.entry && 
            body_param.entry[0].changes && 
            body_param.entry[0].changes[0].value.messages && 
            body_param.entry[0].changes[0].value.messages[0]  
            ){
               let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
               let from = body_param.entry[0].changes[0].value.messages[0].from; 
               let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

               console.log("phone number "+phon_no_id);
               console.log("from "+from);
               console.log("boady param "+msg_body);


               if(msg_body === "Hie" || "Hello" || "Hey" || "Howdy" || "Hi" || "hie" || "hi" || "hello" || "howdy"){

                greeting(phon_no_id, from);
                sendMenu(phon_no_id, from);
               }

               res.sendStatus(200);
            }
            
            else{
                res.sendStatus(404);
            }

    }

});

app.get("/",(req,res)=>{
    res.status(200).send("Hi This is Code Dev WebHook Setup");
});

function greeting(phon_no_id, from) {
    axios({
        method: "POST",
        url: "https://graph.facebook.com/v13.0/" + phon_no_id + "/messages?access_token=" + token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            text: {
                body: "Hello, how are you?"
            }
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
}


function sendMenu(phon_no_id, from){
    axios({
        method: "POST",
        url: "https://graph.facebook.com/v13.0/" + phon_no_id + "/messages?access_token=" + token,
        data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: from,
            type: "interactive",
            interactive: {
                type: "list",
                header: {
                    type: "text",
                    text: "What would you like to do today?"
                },
                body: {
                    text: "To begin, tap menu and select one of the options"
                },
                footer: {
                    text: "Code Dev 2023"
                },
                action: {
                    button: "OPTIONS",
                    sections: [
                        {
                            title: "NEW ORDER",
                            rows: [
                                {
                                    id: "<LIST_SECTION_1_ROW_1_ID>",
                                    title: "Upload Prescription",
                                    description: "Upload an image of the medications you want to order"
                                },
                                {
                                    id: "<LIST_SECTION_1_ROW_2_ID>",
                                    title: "Over The Counter",
                                    description: "Enter name of medications you want to order"
                                }
                            ]
                        },
                        {
                            title: "Book Appointment",
                            rows: [
                                {
                                    id: "<LIST_SECTION_2_ROW_1_ID>",
                                    title: "Dr. Luke",
                                    description: "Dentist"
                                },
                                {
                                    id: "<LIST_SECTION_2_ROW_2_ID>",
                                    title: "Dr. Tembani",
                                    description: "Optician"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
}
