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

// Database credentials
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "church";

// Create connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $adminname = $_POST['admin_name'];
    $password = $_POST['password'];

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // SQL query to insert a new user
    $sql = "INSERT INTO admin_user (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $adminname, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
