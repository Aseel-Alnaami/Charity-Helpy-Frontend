<!DOCTYPE html>

<html lang="ar" dir="rtl">
<?php 
$sessionTimeout = 900; //times in seconds


session_start();

include 'DB.php';
/*
  if (!isset($_SESSION['userid'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: login.php');
  }*/
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
        
      
    
    }?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>
    <!-- <link rel="stylesheet" href="CSS/iitest.css"> -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="st.css">
    
</head>

<body>
    <div class="wrapper">
        <li class="sidebar-header">
            <div class="logo">
                <i class='bx bx-menu' id="btn" onclick="active1()" title='الخدمات الاكترونية '></i>
                <span id="sub-header">الخدمات الالكترونية</span>
            </div>
        </li>
        <ul class="sidebar">
            <li>
                <a href="Personinfo.php">
                    <i class='bx bx-user-circle' id="icon1" title='المعلومات الشخصية'></i>
                    <span class="nav-item">المعلومات الشخصية</span>
                </a>
            </li>
            
            <?php 
                    if($_SESSION['role']==1){

                ?>
            <li>
                <a href="std_schedule.php">
                    <i class='bx bx-table' id="icon2"></i>
                    <span class="nav-item">جدول الطالب</span>
                </a>
            </li><?php }?>
            
            
            <?php 
                    if($_SESSION['role']==1){

                ?>
            <li>
                <a href="notifications.php" title="الاشعارات ">
                    <i class='bx bxs-bell-ring bx-tada' style='color:#d61111'></i>
                    <i class='bx bx-bell' id="icon10"></i>
                    <span class="nav-item">الاشعارات</span>
                </a>
            </li><?php }?>
            
            <li>
                <a href="withdraw_std.php">
                    <i class='bx bx-folder-minus' id="icon7"></i>
                    <span class="nav-item">تقديم طلب الاسقاط</span>
                </a>
            </li><?php 
          
                    if($_SESSION['role']==2){

                ?>
            <li>
                <a href="inst_schedule.php">
                    <i class='bx bx-table' id="icon3"></i>
                    <span class="nav-item">جدول المدرس</span>
                </a>
            </li>
            <?php }?>
            <?php 
                    if($_SESSION['role']>=2){

                ?>
            <li>
                <a href="dept_withdraw.php">
                    <i class='bx bx-user-minus' id="icon6"></i>
                    <span class="nav-item">طلبات الاسقاط</span>
                    <i class='bx bxs-bell-ring bx-tada' style='color:#d61111; padding-right: 7px;'></i>
                </a>
            </li><?php }?>
            <li>
                <a href="changepass.php">
                    <i class='bx bx-info-circle' id="icon8" title='تغير كلمة المرور'></i>
                    <span class="nav-item">تغيير كلمة المرور</span>
                </a>
            </li>
            <li class="log-out">
                <a href="#" onclick="confirmLogout()" title="تسجيل الخروج">
                    <i class='bx bx-log-out' id="icon9"></i>
                    <span class="nav-item">تسجيل الخروج</span>
                </a>
            </li>
        </ul>



    </div>

    <section class="image">
        <div class="image"></div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="about">
                <h3>حول الموقع</h3>
                <p>هذه المنصة تقدم مجموعة من الخدمات الإلكترونية للطلاب والمدرسين...</p>
            </div>
            <div class="contact-us">
                <h3>تواصل معنا</h3>
                <p>البريد الإلكتروني: info@example.com</p>
                <p>رقم الهاتف: 123-456-7890</p>
            </div>
        </div>
        <center>
            <div class="copy-right">
                <p>حقوق الطبع والنشر &copy; 2024 التعليم الإلكتروني</p>
            </div>
        </center>
    </footer>

    <script>
        let btn = document.querySelector('#btn');
        let wrapper = document.querySelector('.wrapper');

        wrapper.classList.add('active');

        function active1() {
            wrapper.classList.toggle('active');
        }

        function confirmLogout() {
            if (confirm("هل أنت متأكد انك تريد الخروج ؟")) {
                window.location.href = "logout.php";
            } else {
                return false;
            }
        }
    </script>
</body>

</htm>