const func = require("./functions/func");

function switchMater(msg_body, phon_no_id, from){
    switch (msg_body) {
        case "meds": func.medication(phon_no_id, from);
            break;

        case "Hi": func.greeting(phon_no_id, from);
            break;


        case "Menu": func.menu(phon_no_id, from);
            break;


        default: func.notFound(phon_no_id, from);
    }
}






module.exports = {
    switchMatcher:switchMater
}