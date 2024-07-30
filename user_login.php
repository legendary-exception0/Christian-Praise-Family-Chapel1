<?php
session_start();

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "church";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['Username'];
    $password = $_POST['Password'];

    // Escape user inputs to prevent SQL injection
    $username = $conn->real_escape_string($username);

    // SQL query to fetch the hashed password for the given username
    $sql = "SELECT password FROM new_user WHERE username = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        error_log("Prepare failed: " . $conn->error);
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if ($hashed_password && password_verify($password, $hashed_password)) {
        // Successful login
        $_SESSION['username'] = $username;
        header("Location: user_panel.html");
        exit(); // Ensure script stops after redirect
    } else {
        // Failed login
        echo "Invalid username or password";
    }

    // Log login attempts for debugging purposes
    error_log("Login attempt: Username: $username");

    $stmt->close();
}

$conn->close();
?>
