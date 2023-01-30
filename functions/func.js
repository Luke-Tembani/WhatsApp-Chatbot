const token=process.env.TOKEN;
const axios=require("axios");
const db = require("../db");

function getMedication(phon_no_id, from){
    db.query("SELECT * FROM medication",(err,results)=>{
        if(err){
            console.log(err);
        }else{

            for(let i =0; i<= results.length-1;i++){
                console.log();
            axios({
                method: "POST",
                url: "https://graph.facebook.com/v13.0/" + phon_no_id + "/messages?access_token=" + token,
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: results[i].name + " "+ "- $"+results[i].price
                    }
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });

        }
           
        }
    })
}


function notFound(phon_no_id, from){

    axios({
        method: "POST",
        url: "https://graph.facebook.com/v13.0/" + phon_no_id + "/messages?access_token=" + token,
        data: {
            messaging_product: "whatsapp",
            to: from,
            text: {
                body: "Invalid Option"
            }
        },
        headers: {
            "Content-Type": "application/json"
        }
    });

}

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



module.exports = {
    greeting:greeting,
    menu:sendMenu,
    medication:getMedication,
    notFound:notFound
}