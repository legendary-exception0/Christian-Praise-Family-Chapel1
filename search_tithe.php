<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; 
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "church";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

if (isset($_GET['query'])) {
    $query = $_GET['query'];

    $stmt = $conn->prepare("SELECT * FROM add_tithe WHERE name LIKE ?");
    $likeQuery = "%$query%";
    $stmt->bind_param("s", $likeQuery);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

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
