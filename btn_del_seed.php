<?php
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

// Check if the 'id' is set in the POST request
if (isset($_POST['id'])) {
    $id = intval($_POST['id']); // Sanitize the input to avoid SQL injection

    // Prepare the DELETE statement
    $sql = "DELETE FROM add_seed WHERE id = ?";

    // Initialize the prepared statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the 'id' parameter to the statement
        $stmt->bind_param("i", $id);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Record deleted successfully.";
        } else {
            echo "Error deleting record: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
} else {
    echo "No ID provided.";
}

// Close the database connection
$conn->close();
?>
