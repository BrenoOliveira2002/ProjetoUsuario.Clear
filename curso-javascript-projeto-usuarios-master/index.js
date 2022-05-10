var fields = document.querySelectorAll("#form-user-create [name]");
fields.forEach(function(fields, index, ){

    if (fields.name == "gender") {
        if (fields.checked) {

            console.log("Sim", fields);

 }
    }
    else {

        console.log("Não");
    }

    //console.log(fields);

});