class DataOfEmployee {
    constructor(id,name,email,address,phone,select){
        this.id = id;
        this.name = name;
        this.email =email;
        this.address = address;
        this.phone = phone;
        this.select = select;
    }
}

class ListOfEmployees{

    employees=[
        new DataOfEmployee(
            1,
            'Momen',
            'Momenhassan1996@gmail.com',
            '1 El-manhael St',
            '01114122469',
            true
        ),
        new DataOfEmployee(
        2,
        'Hassan',
        'HassanMomen@gmail.com',
        '1 El-manhael St',
        '01114122469',
        true
    )
    ];

    setAttribute(el,attrs){
        for(let key in attrs){
            el.setAttribute(key,attrs[key])
        }
    } 
    createCheckBox(index){
        let getTableBody = document.getElementById('table_body');
        let tableRow = document.createElement('tr');
        tableRow.setAttribute('id',index)
        let tableColumn = document.createElement('td');
        let parentSpan = document.createElement('span');
        let input = document.createElement('input');
        let label = document.createElement('label');
        getTableBody.appendChild(tableRow);
        tableRow.appendChild(tableColumn);
        parentSpan.classList.add('parent_check');
        tableColumn.appendChild(parentSpan)
        this.setAttribute(input,{'type':'checkbox','id':`checkbox_${index}`});
        input.classList.add('input_check');
        input.addEventListener('click',this.getAttribute);
        parentSpan.appendChild(input);
        this.setAttribute(label,{'for':`checkbox_${index}`});
        label.classList.add('label_check');
        label.addEventListener('click',($event)=>{
        let getIndexOfRow = $event.currentTarget.getAttribute('for');
        let index = +getIndexOfRow.split('_')[1]+1;
        this.employees.forEach(el=>{
            if(el.id == index){
                el.select = !el.select;
            }
        })
        });
        
        parentSpan.appendChild(label);
        return [tableRow,getTableBody,input];
    }
    createTable(){
        for(let item = 0 ; item < this.employees.length ; item++){
            let getTableStructure = this.createCheckBox(item);
            let row = this.employees[item];
            for(let employee in row){
              if(employee != 'id' && employee != 'select'){
                let tableColumn = document.createElement('td');
                tableColumn.innerText = row[employee];
                getTableStructure[2].checked = row.select;
                getTableStructure[0].appendChild(tableColumn)
                getTableStructure[1].appendChild(getTableStructure[0]);
              }
            }
            let addActionColumn = this.addActions(row.id);
            getTableStructure[0].appendChild(addActionColumn);           
        }
    }
     
    removeTable(){
        let getTableBody = document.getElementById('table_body');
        for(var i = getTableBody.rows.length ; i > 0; i--){
            getTableBody.removeChild(getTableBody.lastElementChild);
        }
    }
    addActions(id){
        let actionColumns = document.createElement('td');
        let actions = `<a class="edit-link links" data-toggle="modal" data-target="#exampleModal" onclick="editDetailsOfEmployee.editDetails(${id})"><i class="far fa-edit"></i><a/>
            <a class="delete-link links" onclick="deleteRow.deleteEmployee(${id})"><i class="far fa-trash-alt"></i></a>`;
            actionColumns.innerHTML= actions;
           return actionColumns;
    }
     
    isHasLength() {
        let noRecordFound = document.getElementById('record');
        this.employees.length > 0 ? noRecordFound.style.display = 'none' : noRecordFound.style.display = 'block';
    }

    render(){
        this.createTable();
        this.isHasLength();
    }   

}

const getListOfEmployees = new ListOfEmployees();
getListOfEmployees.render();

class SelectAll{
    selectAllButton(){
        let selectAllElemnet = document.getElementById('check_box').checked;
        let isSelected = getListOfEmployees.employees;
        for(let item in isSelected){
            isSelected[item].select = selectAllElemnet;
        }
        let allCheckBox = document.querySelectorAll('.input_check');
        allCheckBox.forEach(item=>{
            item.checked = selectAllElemnet;
        })
    }
}

class DeleteEmployee{
    deleteEmployee(id){
        let getList = getListOfEmployees.employees;
        getList.forEach((row,index)=>{
            row.id == id ? getList.splice(index,1) && document.getElementById("table_body").deleteRow(index):'';
        })
        getListOfEmployees.employees = getList;
        getListOfEmployees.isHasLength();
    }

    deleteSelectedEmployees(){
        let getAllEmployees = getListOfEmployees.employees;
        for(let x = 0 ; x < getAllEmployees.length ; x++){
            if(getAllEmployees[x].select){
                getAllEmployees.splice(x,1);
                document.getElementById("table_body").deleteRow(x);
                x--;
            }
            getListOfEmployees.isHasLength();
        } 
    }
}



class editEmployee{
    id;
    getButtonOfEdit;
    getNameInput =  document.getElementById('name');
    getEmailInput = document.getElementById('email');
    getaddressInput = document.getElementById('address');
    getPhoneInput = document.getElementById('phone');
    editButton = document.getElementById('edit-employee');
    constructor(){
        this.getButtonOfEdit = document.getElementById('edit-employee');
        this.getButtonOfEdit.disabled = true;
    }
    editDetails(id){
        this.id=id;
        if(this.getButtonOfEdit && this.getButtonOfEdit.style.display == 'none'){
            this.getButtonOfEdit.style.display = 'block';
            addNewEmployee.addButton.style.display = 'none';
            this.getButtonOfEdit.disabled = true;
        }
        addNewEmployee.checkValidation()
        let getTitle = document.getElementById('exampleModalLabel');
        getListOfEmployees.employees.forEach(row=>{
            if(row.id == id){
                getTitle.innerText = row.name;
                this.getNameInput.value = row.name;
                this.getEmailInput.value = row.email;
                this.getaddressInput.value = row.address;
                this.getPhoneInput.value = row.phone;
            }
        })
    }

    updateEmployee(name,email,address,phone){
        if(name && email && address && phone){
            getListOfEmployees.employees.forEach((row,index)=>{
                if(this.id == row.id){
                    row.name = name;
                    row.email = email;
                    row.address = address;
                    row.phone = phone;
                    let getRow = document.getElementById(index).childNodes
                    for(let item in [...getRow]){
                        switch(item){
                            case '1' :
                                getRow[item].innerHTML = row.name;
                                break;
                            case '2' : 
                                getRow[item].innerHTML = row.email;
                                break;
                            case '3' :
                                getRow[item].innerHTML = row.address; 
                                break;
                            case '4' :
                                getRow[item].innerHTML = row.phone;
                                break;
                            default:
                                break; 
                        }
                    }
                } 
            })
            addNewEmployee.closeModal();
            $('#exampleModal').modal('hide');
        }
    }
}

class AddEmployee{
    addButton;
    constructor(){
        let getTitle = document.getElementById('exampleModalLabel');
        getTitle.innerText ='Add New Employee';
        this.addButton =  document.createElement('button');
        getListOfEmployees.setAttribute(this.addButton,{'class':'btn btn-primary','id':'add-button'});
        this.addButton.innerText = 'Add';
        this.addButton.disabled = true;
    }
    addNewEmployee(){
        editDetailsOfEmployee.getButtonOfEdit.style.display = 'none';
        this.addButton.style.display = 'block';
        this.addButton.disabled = true;
        this.addButton.onclick = this.addEmployee.bind(this);
        let footer = document.getElementById('footer');
        if(!document.getElementById('add-button')){
            footer.appendChild(this.addButton);
        }
    }


    addEmployee(){
        let name = editDetailsOfEmployee.getNameInput.value;
        let email = editDetailsOfEmployee.getEmailInput.value;
        let address = editDetailsOfEmployee.getaddressInput.value;
        let phone = editDetailsOfEmployee.getPhoneInput.value;
        let getTableBody = document.getElementById('table_body');
        let getLength = getTableBody.rows.length+1;
        getListOfEmployees.employees.push(new DataOfEmployee(getLength,name,email,address,phone,true));
        getListOfEmployees.removeTable();
        getListOfEmployees.render();
        this.addButton.disabled = true;
        this.closeModal();
        $('#exampleModal').modal('hide');
    }

    showMessage(el,isValid){
        let element = document.getElementById(`${el}-input`);
        let createSpan = document.createElement('span');
        createSpan.style.color = 'red';
        createSpan.style.textTransform='capitalize';
        createSpan.setAttribute('id',`${el}-span`);
        createSpan.setAttribute('class','error')
        if(el && isValid){
            if(element.lastElementChild.classList.contains('error')){
                element.removeChild(element.lastElementChild)
            }
        }else if(el  && !document.getElementById(`${el}-span`) && isValid == false){
            createSpan.innerText=`${el} is not Valid`;
            element.appendChild(createSpan);
        }
    }

    checkValidation(inputName){
        let name = editDetailsOfEmployee.getNameInput.value;
        let email = editDetailsOfEmployee.getEmailInput.value;
        let address = editDetailsOfEmployee.getaddressInput.value;
        let phone = editDetailsOfEmployee.getPhoneInput.value;
        let emailValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        let phoneValidation = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        if(emailValidation.test(email) && phoneValidation.test(phone) && name !='' && address !='' && this.addButton){
            this.showMessage('email',true);
            this.showMessage('phone',true);
            this.showMessage('address',true);
            this.showMessage('name',true);
            this.formIsValid();
        }else{
            if(inputName == 'email' && !emailValidation.test(email)){
                this.showMessage('email',false);
            }else if (inputName == 'phone' && !phoneValidation.test(phone)){
                this.showMessage('phone',false);
            }else if(inputName == 'name' && name == ''){
                this.showMessage('name',false);
            }else if (inputName == 'address' && address == ''){
                this.showMessage('address',false);
            }else{
                this.showMessage(inputName,true);
            }
        }
    }

    formIsValid(){
        let nameHasError = document.getElementById('name-input').lastElementChild.classList.contains('error');
        let emailHasError = document.getElementById('email-input').lastElementChild.classList.contains('error');
        let addressHasError = document.getElementById('address-input').lastElementChild.classList.contains('error');
        let phoneHasError = document.getElementById('phone-input').lastElementChild.classList.contains('error');
        if(!nameHasError && !emailHasError && !addressHasError && !phoneHasError){
            this.addButton.disabled = false;
            editDetailsOfEmployee.getButtonOfEdit.disabled = false;
        }
    }

    closeModal(){
        editDetailsOfEmployee.getNameInput.value ='';
        editDetailsOfEmployee.getEmailInput.value = '';
        editDetailsOfEmployee.getaddressInput.value = '';
        editDetailsOfEmployee.getPhoneInput.value = '';        
    }
    
}

const selectAllCheckBox = new SelectAll();
const deleteRow = new DeleteEmployee();
const editDetailsOfEmployee = new editEmployee();
const addNewEmployee = new AddEmployee();


