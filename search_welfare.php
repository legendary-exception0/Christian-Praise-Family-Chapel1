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
$username = "root";
$password = "";
$dbname = "church";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

if (isset($_GET['query'])) {
    $query = $_GET['query'];

    // Perform the search query using a prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM add_welfare WHERE name LIKE ?");
    $likeQuery = "%$query%";
    $stmt->bind_param("s", $likeQuery);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $data = [];

        // Fetch all results
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Respond with the search results
        echo json_encode(['success' => true, 'results' => $data]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Query execution failed: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'No search query provided.']);
}

$conn->close();
?>
