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

// Get old and new passwords from the POST request
$user = $_POST['username'];
$oldPassword = $_POST['old'];
$newPassword = $_POST['new'];

// SQL query to fetch the hashed password for the given username
$sql = "SELECT password FROM new_user WHERE username = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
    $conn->close();
    exit;
}
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->bind_result($hashedPassword);
$stmt->fetch();

if ($hashedPassword && password_verify($oldPassword, $hashedPassword)) {
    // Hash the new password before storing it
    $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // SQL query to update the password for the user
    $updateSql = "UPDATE new_user SET password = ? WHERE username = ?";
    $updateStmt = $conn->prepare($updateSql);
    if ($updateStmt === false) {
        echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $updateStmt->bind_param("ss", $hashedNewPassword, $user);
    if ($updateStmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $updateStmt->error]);
    }
    $updateStmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid old password']);
}

$stmt->close();
$conn->close();
?>
