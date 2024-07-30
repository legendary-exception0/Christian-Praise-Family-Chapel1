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

$sql = "SELECT id, name, amount, day, phone, address FROM add_welfare";
$result = $conn->query($sql);

$welfare = array();
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $welfare[] = $row;
    }
} 

echo json_encode($welfare);

$conn->close();
?>
