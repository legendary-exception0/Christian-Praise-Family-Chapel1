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

$sql = "SELECT id, date, amount FROM add_offering";
$result = $conn->query($sql);

$offering = array();
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $offering[] = $row;
    }
} 

echo json_encode($offering);

$conn->close();
?>
