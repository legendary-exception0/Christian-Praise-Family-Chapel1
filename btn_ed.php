<?php
header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests (for methods other than GET/POST)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // Stop processing the request
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "church";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

// Check if the required POST variables are set
if (isset($_POST['id']) && isset($_POST['member_name']) && isset($_POST['member_gender']) && 
    isset($_POST['member_address']) && isset($_POST['member_phone']) && isset($_POST['member_hometown'])) {
    
    // Sanitize the input to prevent SQL injection
    $id = intval($_POST['id']);
    $name = $conn->real_escape_string($_POST['member_name']);
    $gender = $conn->real_escape_string($_POST['member_gender']);
    $address = $conn->real_escape_string($_POST['member_address']);
    $phone = $conn->real_escape_string($_POST['member_phone']);
    $hometown = $conn->real_escape_string($_POST['member_hometown']);
    
    // Prepare the UPDATE statement
    $sql = "UPDATE addmember SET name=?, gender=?, address=?, phone=?, hometown=? WHERE id=?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssi", $name, $gender, $address, $phone, $hometown, $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Record updated successfully.']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error updating record: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error preparing statement: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Required fields are missing.']);
}

$conn->close();
?>
