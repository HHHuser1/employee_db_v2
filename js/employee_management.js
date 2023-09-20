
        // Function to display error messages on the page
        function displayError(errorMessage) {
            const errorContainer = document.getElementById("errorContainer");
            errorContainer.innerHTML = `<p style="color: red;">Error: ${errorMessage}</p>`;
        }
        
        
        
        // Function to fetch employee data from the server
        function fetchEmployees() {
            fetch("./app/employee_management.php", {
                method: "POST",
                body: JSON.stringify({ fetchEmployees: true }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error(error));
        }

        // Function to display employee data on the web page
        function displayData(data) {
            const employeeList = document.getElementById("employeeList");
            employeeList.innerHTML = '';

            const ul = document.createElement('ul');
            
            data.forEach((employee) => {
                const li = document.createElement('li');
                li.innerHTML = `Name: ${employee.first_name} ${employee.last_name}, Email: ${employee.email}, ID: ${employee.employee_id}`;
                ul.appendChild(li);
            })

            employeeList.appendChild(ul);
        }

        // Call the function to fetch employee data when the page loads
        fetchEmployees();

        // Function to handle adding an employee
        // Function to handle adding an employee
        document.getElementById("addEmployeeForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        const form = event.target;
        const firstName = form.querySelector("#first_name").value;
        const lastName = form.querySelector("#last_name").value;
        const email = form.querySelector("#email").value;
        const employeeId = form.querySelector("#employee_id").value;

        fetch("./app/employee_management.php", {
            method: "POST",
            body: JSON.stringify({ 
                addEmployee: true,
                first_name: firstName,
                last_name: lastName,
                email: email,
                employee_id: employeeId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Display the error message on the page
                displayError(data.error);
            } else {
                // Clear the error message and reload the page after adding an employee successfully
                displayError("");
                alert("Employee added successfully");
                location.reload();
            }
        })
        .catch(error => console.error(error));
});


    // Function to display error messages on the page
    function displayError2(errorMessage) {
        const errorContainer = document.getElementById("errorContainer2");
        errorContainer.innerHTML = `<p style="color: red;">Error: ${errorMessage}</p>`;
    }

    // Function to handle updating an employee
    // Function to handle updating an employee
    document.getElementById("updateEmployeeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const updateEmployeeId = form.querySelector("#update_employee_id").value;
    const updateFirstName = form.querySelector("#update_first_name").value;
    const updateLastName = form.querySelector("#update_last_name").value;
    const updateEmail = form.querySelector("#update_email").value;

    fetch("./app/employee_management.php", {
        method: "POST",
        body: JSON.stringify({ 
            updateEmployee: true,
            update_employee_id: updateEmployeeId,
            update_first_name: updateFirstName,
            update_last_name: updateLastName,
            update_email: updateEmail
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Display the error message on the page
            displayError2(data.error);
        } else {
            // Clear the error message and reload the page after updating an employee successfully
            displayError2("");
            alert("Employee updated successfully");
            location.reload();
        }
    })
    .catch(error => console.error(error));
});




    
        // Function to handle searching for employees
        document.getElementById("searchEmployee").addEventListener("click", function() {
            const searchName = document.getElementById("search_name").value;

            fetch("./app/employee_management.php", {
                method: "POST",
                body: JSON.stringify({ 
                    searchEmployee: true,
                    search_name: searchName
                }),
                headers: {
                    "Content-Type": "application/json"
                }
                
            })
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error(error));
            
        });
        


        /////