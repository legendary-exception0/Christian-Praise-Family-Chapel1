<?php
// fetch_data.php
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

if (isset($_GET['search_text'])) {
    $query = $_GET['search_text'];

    // Prevent SQL injection
    $query = $conn->real_escape_string($query);

    // Perform the search query
    $sql = "SELECT * FROM addmember WHERE name LIKE '%$query%'";
    $result = $conn->query($sql);

    if ($result) {
        // Create an array to hold the result data
        $data = [];

        // Fetch all results
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Respond with the search results
        echo json_encode(['success' => true, 'results' => $data]);

    } else {
        echo json_encode(['success' => false, 'error' => 'Query failed: ' . $conn->error]);
    }
}

$conn->close();
?>
