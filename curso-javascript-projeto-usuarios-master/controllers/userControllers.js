class UserController { 

    constructor(formId, tableId){

        this.formEl= document.getElementById(formId);
        this.tableEl= document.getElementById(tableId);
        this.onSubmit();

    }
    onSubmit(){

       this.formEl.addEventListener("submit",(event) =>{

            event.preventDefault();

            let bnt = this.formEl.querySelector("[type=submit]")

            bnt.disabled = true; 

            let values = this.getValues();

            this.getPhotos().then(
            (content)=>{

                values.photo = content;

                this.addLine(values);

                this.formEl.reset();

                bnt.disabled = false;
                
            },
            (e)=>{

                console.error(e);


            })
        })
    }

    getPhotos(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

      let elements = [...this.formEl.elements].filter(item => {

        if (item.name === 'photo') {

            return item;

        }
       });

       let file = elements[0].files[0];

       fileReader.onload = () => {

           resolve(fileReader.result);

           
       };

       fileReader.onerror = (e) => {
           reject(e);
       }

       if (file) {
        fileReader.readAsDataURL(file);
       } else {
           resolve('dist/img/index2.png');
       }

        })

       
    }

    getValues(){

        let user = {};

        [...this.formEl.elements].forEach(function(fields, index){

            if (fields.name == "gender") {
                if (fields.checked) {
        
                    user[fields.name] = fields.value;
        
         }
            }
            else if (fields.name == "admin"){

                user[fields.name] = fields.checked;
            } else  {
        
                user[fields.name] = fields.value;
            }
        
        });
    
        return new User ( 
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
            
        );
    }

    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.innerHTML =  `
        <td><img src=${dataUser.photo} class="img-circle img-sm"></td>
         <td>${dataUser.name}</td>
         <td>${dataUser.email}</td>
         <td>${(dataUser.admin) ? 'Sim' : "Não"}</td>
         <td>${Utils.dateFormat(dataUser.register)}</td>
         <td>
              <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
              <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      `;

      this.tableEl.appendChild(tr);
    }


}