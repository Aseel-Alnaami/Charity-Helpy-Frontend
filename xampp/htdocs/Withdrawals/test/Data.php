<?php

    define("DB_SERVER", "localhost");
    define("DB_USER", "root");
    define("DB_PASSWORD", "root@2024");
    define("DB_DATABASE", "withdrawal");


    

    $conn = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    echo "Connected successfully";
   // here we want to check the data comes via post request
   $username = $_POST['username'];
   $pwd = $_POST['password'];
   $sql ="SELECT * FROM withdrawal.student where student_id=$username and std_password='$pwd'";
   $result = $conn->query($sql);  
if($result->num_rows > 0) {
  echo "Authenticated";
  header('location: sidebar.php');
  /*while($row = $result->fetch_assoc()) {
    echo "<br> Id ". $row["student_ID"] ."-stdname". $row["std_name"]."password ".$row['std_password']. "<br>";}
  */}
else{
  echo "0 result";
}

$conn->close();

?>