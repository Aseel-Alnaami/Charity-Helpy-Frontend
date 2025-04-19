<!DOCTYPE html>
<?php 
$sessionTimeout = 900; //times in seconds
session_set_cookie_params($sessionTimeout);
session_start();

//print_r($_SESSION);// $_SESSION['success'];
include 'datastore.php';

  if (isset($_SESSION['userid'])) {
          if (isset($_SESSION['last_activity'])) {
        // Calculate time difference since last activity
        $inactiveTime = time() - $_SESSION['last_activity'];
        
        // Check if inactive time exceeds session timeout
        if ($inactiveTime > $sessionTimeout) {
            // User is inactive for too long, logout
            session_unset();
            session_destroy();
            header('Location: login.php');
            exit;
        }
    }
    
    // Update last activity time
    $_SESSION['last_activity'] = time();
      
  }
      else
      {
  	$_SESSION['msg'] = "You must log in first";
        session_unset();
            session_destroy();
  	header('location: login.php');
  }
  $username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
  
  
  $newLogo=check_new_withdrawal($username,$_SESSION['role']);
  
  
  $depLogo=check_new_deprived($username,$_SESSION['role']);
  $notLogo=check_new_noti($username,$_SESSION['role']);
  
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
            <li><a href="deprived_main.php"><i class="fas fa-project-diagram"></i>الغياب والحرمان</a></li>
            <?php }?>
            <?php if($_SESSION['role']==1){?>
            <li><a href="st_sch.php"><i class="fas fa-address-card"></i>جدول الطالب</a></li>
            <li><a href="withdraw_st.php"><i class="fas fa-project-diagram"></i>طلب اسقاط مادة</a></li>
            <li><a href="notifications.php">
                    <div class="button-container">
                          
                      <i class="fas fa-comment"></i>
                      الإشعارات<?php if ($notLogo!="")echo ' ('.$notLogo.')';?>
                      <?php if ($notLogo): ?>
                <img src="new_logo.png" alt="New Logo">
            <?php endif; ?>
</div>
                    
                </a></li>
            <?php }?>
            <?php if($_SESSION['role']>2){?>
              <li><a href="deprived_dept.php">
                      <div class="button-container">
                          
                      <i class="fas fa-project-diagram"></i>
                      طلبات الحرمان
                      <?php if ($depLogo): ?>
                <img src="new_logo.png" alt="New Logo">
            <?php endif; ?>
</div>
                  </a></li>
            <?php  }?>
            <?php if($_SESSION['role']>1){?>
              
              <li><a href="withdraw_dept.php">
                  <div class="button-container">    <i class="fas fa-project-diagram"></i>
                      
طلبات الاسقاط                      
    <?php if ($newLogo): ?>
                <img src="new_logo.png" alt="New Logo">
            <?php endif; ?>
</div>
                  </a></li>
            <?php  }?>
              
            
            <li><a href="changepassword.php"><i class="fas fa-address-book"></i>تغيير كلمة المرور</a></li>
            <li><a href="index.php?logout='1'"><i class="fas fa-map-pin"></i>تسجيل الخروج</a></li>
        </ul> 
      
    </div>
