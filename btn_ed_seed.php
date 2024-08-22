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
if (isset($_POST['id']) && isset($_POST['seed_day']) && isset($_POST['seed_amount'])) {
    
    // Sanitize the input to prevent SQL injection
    $id = intval($_POST['id']);
    $day = $conn->real_escape_string($_POST['seed_day']);
    $amount = $conn->real_escape_string($_POST['seed_amount']);
    
    // Prepare the UPDATE statement
    $sql = "UPDATE add_seed SET day=?, amount=? WHERE id=?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssi", $day, $amount, $id);

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
