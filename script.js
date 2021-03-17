function getData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true);
    request.send(null);
    request.onreadystatechange = function() { 
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var responseData = JSON.parse(request.response);
            for(var i = 0; i < responseData.length; i++) {
                document.getElementById("risultato").append(responseData[i].firstName + "\n");
            }
        }
    };
} 

function addEmployee(id, nome, cognome, email, telefono) {
    
}