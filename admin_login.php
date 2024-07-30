<?php
session_start();

// Replace these with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "church";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['Username'];
    $password = $_POST['Password'];

    // Escape user inputs for security
    $username = $conn->real_escape_string($username);

    // SQL query to fetch the hashed password for the given username
    $sql = "SELECT password FROM admin_user WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if ($hashed_password && password_verify($password, $hashed_password)) {
        // Successful login
        $_SESSION['username'] = $username;
        header("Location: admin_panel.html");
    } else {
        // Failed login
        echo "Invalid username or password";
    }

    $stmt->close();
}

$conn->close();
?>
