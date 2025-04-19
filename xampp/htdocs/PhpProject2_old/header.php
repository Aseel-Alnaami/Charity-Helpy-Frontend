<!DOCTYPE html>
<?php 
session_start();
//print_r($_SESSION);// $_SESSION['success'];
include 'datastore.php';
  if (!isset($_SESSION['userid'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: login.php');
  }
?>
<html lang="en">
<head>
	<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"
	<title> </title>
	<link rel="stylesheet" href="./css/main_style.css">
        <link rel="stylesheet" href="./css/style.css">
	<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
</head>
<body>
    
    <div>
        <nav>
            <?php
            echo "<h4> اهلا بك : ".$_SESSION['dispname']."</h4>";
           // echo "    <p> <a href='index.php?logout='1'' style='color: red;'>logout</a> </p>";
            ?>
          
 
       </nav>
    </div>
    
    
    
<div class="wrapper">
    <div class="sidebar">
        <ul>
            <li><a href="home.php"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="personal_info.php"><i class="fas fa-user"></i>المعلومات الشخصية</a></li>
            <?php if($_SESSION['role']==2){?>
            <li><a href="main_home.php"><i class="fas fa-address-card"></i>جدول المدرس</a></li>
            <?php }?>
            <li><a href="#"><i class="fas fa-project-diagram"></i>portfolio</a></li>
            <li><a href="#"><i class="fas fa-blog"></i>Blogs</a></li>
            <li><a href="changepassword.php"><i class="fas fa-address-book"></i>تغيير كلمة المرور</a></li>
            <li><a href="index.php?logout='1'"><i class="fas fa-map-pin"></i>تسجيل الخروج</a></li>
        </ul> 
      
    </div>
