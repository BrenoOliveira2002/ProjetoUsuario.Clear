var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};
fields.forEach(function(fields, index, ){

    if (fields.name == "gender") {
        if (fields.checked) {

            console.log("Sim", fields);
            user[fields.name] = fields.value;

 }
    }
    else {

        console.log("Não");
        user[fields.name] = fields.value;
    }

    //console.log(fields);

});

console.log(user);