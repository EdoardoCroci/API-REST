function loadPage() {
    var body = document.getElementById("body");

    var title = document.createElement("h1"); 
    title.innerHTML = "Manage Employees";

    //button to remove employee
    var delEmployee = document.createElement("button");
    delEmployee.innerHTML = "Delete";
    
    //button to add employee
    var addEmployee = document.createElement("button");
    addEmployee.innerHTML = "Add Employee";
    addEmployee.addEventListener("click", showAddForm);

    //button to load the starting table
    var loadButton = document.createElement("button");
    loadButton.id = "loadButton";
    loadButton.innerHTML = "Load database";
    loadButton.addEventListener("click", getData);

    //main div with table and buttons
    var mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";

    //adding main div elements
    mainDiv.appendChild(title);
    mainDiv.appendChild(delEmployee);
    mainDiv.appendChild(addEmployee);
    mainDiv.appendChild(loadButton);
    
    //div for employees adding form
    var formDiv = document.createElement("div");
    formDiv.id = "addEmployeeDiv";

    var addEmployeeForm = document.createElement("form");
    addEmployeeForm.id = "addEmployeeForm";
    addEmployeeForm.addEventListener("submit", addEmployee);

    var idInput = document.createElement("input");
    idInput.type = "number";
    idInput.min = "1";

    var firstNameInput = document.createElement("input");
    firstNameInput.id = "firstNameInput";
    firstNameInput.type = "text";

    var lastNameInput = document.createElement("input");
    lastNameInput.id = "lastNameInput";
    lastNameInput.type = "text";

    var emailInput = document.createElement("input");
    emailInput.id = "emailInput";
    emailInput.type = "text";

    var phoneInput = document.createElement("input");
    phoneInput.id = "phoneInput";
    phoneInput.type = "text";

    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.innerHTML = "Add employee";

    addEmployeeForm.appendChild(idInput);
    addEmployeeForm.appendChild(firstNameInput);
    addEmployeeForm.appendChild(lastNameInput);
    addEmployeeForm.appendChild(emailInput);
    addEmployeeForm.appendChild(phoneInput);
    addEmployeeForm.appendChild(submitButton);

    formDiv.appendChild(addEmployeeForm);
    formDiv.hidden = true;

    //div for error or success output
    var resultDiv = document.createElement("div");
    resultDiv.id = "risultato";

    //appending divs to page body 
    body.appendChild(mainDiv);
    body.appendChild(resultDiv);
    body.appendChild(formDiv);
}

function getData() {
    var request = new XMLHttpRequest();

    //asynchronous http GET request
    request.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true);
    request.send(null);
    request.onreadystatechange = function() { 
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {           
            var responseData = JSON.parse(request.response);

            //data table
            var tbl = document.createElement('table');
            tbl.style.width = '100%';
            tbl.setAttribute('border', '1');
            var tbdy = document.createElement('tbody');
            for (var i = 0; i < responseData.length; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 4; j++) {
                    var td = document.createElement('td');

                    //switch to append the right property
                    switch(j) {
                        case 0: 
                            td.appendChild(document.createTextNode(responseData[i].firstName));
                            break;
                        case 1: 
                            td.appendChild(document.createTextNode(responseData[i].lastName));
                            break;
                        case 2:
                            td.appendChild(document.createTextNode(responseData[i].email));
                            break; 
                        case 3: 
                            td.appendChild(document.createTextNode(responseData[i].phone));
                            break; 
                        default: break;
                    }
                    
                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
            body.appendChild(tbl);

        }else if(request.status == 0) {
            document.getElementById("risultato").innerHTML = "C'è stato un errore";
        }
    };
    document.getElementById("loadButton").hidden = true;
} 

function showAddForm() {
    document.getElementById("addEmployeeDiv").hidden = false;
}

//add employee in the db
function addEmployee() {
    //need to take data from inputs 
    var postData = {
        "employeeId" : [document.getElementById(idInput)], 
        "firstName" : [document.getElementById(firstNameInput)], 
        "lastName" : [document.getElementById(lastNameInput)], 
        "email" : [document.getElementById(emailInput)], 
        "phone" : [document.getElementById(phoneInput)]
    };

    //asynchronous http POST request 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080/api/tutorial/1.0/employees', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    //this function is triggered when the state changes
    xhr.onreadystatechange = function() { 
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
            document.getElementById("risultato").innerHTML = "Employee added correctly";
        } else {
            document.getElementById("risultato").innerHTML = xhr.statusText;
        }
    }

    xhr.send(JSON.stringify(postData));
}