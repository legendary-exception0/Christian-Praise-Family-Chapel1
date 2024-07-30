<?php
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

$sql = "SELECT id, name, amount, day, phone, address FROM add_tithe";
$result = $conn->query($sql);

$tithe = array();
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $tithe[] = $row;
    }
} 

echo json_encode($tithe);

$conn->close();
?>
