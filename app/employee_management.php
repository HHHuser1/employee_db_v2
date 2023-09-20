<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once('./_includes/db_connect.php');

// Initialize the $employees array to store employee data
$employees = array();

// Check if the request contains JSON data
if ($_SERVER["CONTENT_TYPE"] === "application/json") {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    // Check for specific JSON properties to determine the action
    if (isset($data["fetchEmployees"])) {
        // Fetch all employees from the database
        $result = mysqli_query($link, "SELECT * FROM employees ORDER BY timestamp DESC");
        while ($row = mysqli_fetch_assoc($result)) {
            $employees[] = $row;
        }
    }

    if (isset($data["addEmployee"])) {
        // Handle employee addition logic here
        $first_name = $data["first_name"];
        $last_name = $data["last_name"];
        $email = $data["email"];
        $employee_id = $data["employee_id"];
        $query = "INSERT INTO employees (first_name, last_name, email, employee_id) VALUES ('$first_name', '$last_name', '$email', '$employee_id')";
        $insert_result = mysqli_query($link, $query);
        if (!$insert_result) {
            $error_message = "Insert failed: " . mysqli_error($link);
            echo json_encode(['error' => $error_message]);
            exit; // Terminate the script after sending the error JSON response
        }
    }

    if (isset($data["updateEmployee"])) {
        // Handle employee update logic here
        $update_employee_id = $data["update_employee_id"];
        $update_first_name = $data["update_first_name"];
        $update_last_name = $data["update_last_name"];
        $update_email = $data["update_email"];

        $check_query = "SELECT * FROM employees WHERE employee_id = '$update_employee_id'";
        $check_result = mysqli_query($link, $check_query);

        // if (mysqli_num_rows($check_result) == 0) {
        //     die("Error: Employee with ID $update_employee_id does not exist.");
        //     // die(json_encode(['error' => $error_message]));
        // } 

        if (mysqli_num_rows($check_result) == 0) {
            $error_message = " Employee with ID $update_employee_id does not exist.";
            header('Content-Type: application/json');
            echo json_encode(['error' => $error_message]);
            exit; // Terminate the script after sending the error JSON response
        } else {
            $query = "UPDATE employees SET first_name = '$update_first_name', last_name = '$update_last_name', email = '$update_email' WHERE employee_id = '$update_employee_id'";
            $update_result = mysqli_query($link, $query);

        }
    }

    if (isset($data["searchEmployee"])) {
        // Handle employee search by first name or last name
        $search_name = $data["search_name"];
        $query = "SELECT * FROM employees WHERE first_name LIKE '%$search_name%' OR last_name LIKE '%$search_name%' ORDER BY timestamp DESC";
        $search_result = mysqli_query($link, $query);
        while ($row = mysqli_fetch_assoc($search_result)) {
            $employees[] = $row;
        }
    }
}

// Send employee data as a JSON response
header('Content-Type: application/json');
echo json_encode($employees);
?>



