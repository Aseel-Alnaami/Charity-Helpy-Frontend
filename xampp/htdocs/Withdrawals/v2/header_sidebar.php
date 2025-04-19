
<!DOCTYPE html>
<?php

session_start();

include 'DB.php';

  if (!isset($_SESSION['userid']) ) {
    // If not logged in, redirect to login page
    session_unset();
    session_destroy();
    header("Location: index.php");
    
}

  if (isset($_SESSION['userid'])) {
        
    
        $userid = (int)filter_var($_SESSION['userid'], FILTER_SANITIZE_NUMBER_INT); 
  
  
        $newreq=check_new_withdrawal($userid,$_SESSION['role']); //DB
        
        
       $notfLogo=check_new_noti($userid,$_SESSION['role']); //COUNT NEW NOTIFICATION 
        
      
    
    }

?>

<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>

    <!-- rel value should always be set to stylesheet-->
    <link rel="stylesheet" href="CSS/iitest.css">
    
    <!-- to load all the icons-->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
   <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg==" crossorigin="anonymous" referrerpolicy="no-referrer" />-->

</head>


<body>
    <div class="main-page">
        

        <div class="wrapper">
            <div class="sidebar-header">
                <div class="logo">
                    <i class='bx bx-menu' id="btn" onclick="active1()" title='الخدمات الاكترونة '></i>
                    <span id="sub-header"> 
                        الخدمات الالكترونية
                    </span>
                </div>
            </div>
    
    
            <ul class="sidebar">
                <li>
                <!--adding a link; to be clickable-->
                    <a href="Personinfo.php">
                <!--sapn and nav class for styling the list items-->
                        <i class='bx bx-user-circle' id="icon1"title='المعلومات الشخصية' ></i>
                        <span class="nav-item">
                            المعلومات الشخصية
                        </span>
                    </a>
                
                </li>
    
    
                <?php 
                    if($_SESSION['role']==1){

                ?>
              
                <li>
                    <a href="std_schedule.php">
                        <i class='bx bx-table' id="icon2"></i>
                        <span class="nav-item">
                            جدول الطالب
                        </span>
                    </a>
                   
               </li>
               <?php
                    }
                ?>
    
               <?php 
                    if($_SESSION['role']==2){

                ?>
                
                <li>
                    <a href="inst_schedule.php">
                        <i class='bx bx-table' id="icon3" ></i>
                        <span class="nav-item">
                            جدول المدرس
                        </span>
                    </a>
                   
                </li>
                <?php
                    }
                ?>
    
            <?php 
                    if($_SESSION['role']==1){ ?>
                <li>
                    <a href="notifications.php" title="الاشعارات ">
                         
                    <?php if ($notfLogo): ?>
                          <i class='bx bxs-bell-ring bx-tada' style='color:#d61111' ></i>
                    <?php else: ?>
                          <i class='bx bx-bell'id="icon10"></i>    
                        <?php endif; ?>
                    <span class="nav-item">
                         الاشعارات  <?php if ($notfLogo!="")echo ' ('.$notfLogo.')';?>
                        </span>
                       </a>                
                </li>
                <?php } ?>

                <?php 
                    if($_SESSION['role']>=2){
                ?>
                
                <li>
                    <a href="withdraw_dept.php">
                        <i class='bx bx-user-minus' id="icon6"></i>
                        <span class="nav-item">
                            طلبات الاسقاط   
                            <?php if ($newreq): ?>
                                <i class='bx bxs-bell-ring bx-tada' style='color:#d61111; padding-right: 7px;' ></i>
                            <?php endif; ?>
                        </span>
                    </a>
                    
                </li>
                <?php
                    }
                ?>
    
    
                <?php 
                    if($_SESSION['role']==1){
                ?>
                
                <li>
                    <a href="withdraw_std.php">
                        <i class='bx bx-folder-minus' id="icon7"></i>
                        <span class="nav-item">
                            تقديم طلب الاسقاط
                        </span>
                    </a>
                   
                </li>
                <?php
                    }
                ?>
    

                <li>
                    <a href="changepass.php">
                        <i class='bx bx-info-circle' id="icon8" title='تغير كلمة المرور'></i>
                        <span class="nav-item">
                            تغيير كلمة المرور
                        </span>
                    </a>
                </li>
    

                <li>
                    <a href="#"  onclick="confirmLogout()"  title="تسجيل الخروج">
                        <i class='bx bx-log-out' id="icon9" ></i>
                        <span class="nav-item">
                            تسجيل الخروج
                        </span>
                    </a>
                </li>
    
            </ul>    
        </div>
    
        <header class="header" >
            <img src="css/1000086002-removebg-preview.png" height="100px" style="padding-right: 70px;"/>
            <?php
            echo "<h3> مرحبًا  ".$_SESSION['dispname']."</h3>";
            ?>
        </header>   

    </div>
    

</body>

<script>
    let btn = document.querySelector('#btn');
    let wrapper = document.querySelector('.wrapper');

    // Initially add the 'active' class to the wrapper
    wrapper.classList.add('active'); //active

 
    function active1(){
        wrapper.classList.toggle('active');
    }

    function confirmLogout() {
    if (confirm("هل أنت متأكد انك تريد الخروج ؟")) {
        // If user confirms redirect to logout "Are you sure you want to log out?"
        
        window.location.href = "logout.php";
    } else {
        
        return false; //If the user clicks Cancel in the confirmation dialog, nothing happens 
    }
 }

</script>
</html>


