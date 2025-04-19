
<?php 

include("header_sidebar.php");
include ('session_pass.php');

?>
<!DOCTYPE html>
<html lang="en" dir="rtl">
<head>
    
    <title>change password </title>


    <link rel="stylesheet" href="CSS/changepass.css">

</head>
<body>
<?php  
  if (isset($_SESSION['success'])) : ?>
      <div class=" success" >
      	<h3>
          <?php
         
          	echo $_SESSION['success'];
          	unset($_SESSION['success']);
          ?>
      	</h3>
      </div>

      <?php endif ?>      

 


    <table >
     <form method="POST" action="changepass.php">
        <thead>

            <tr ><!-- table row -->
              <th colspan=2 style='font-family: Arabic Typesetting;'><!--- column with head format -->
                تغيير كلمة المرور </th>
            </tr>
           
        </thead>   
        <?php     include('error_pass.php');  ?>
        <tbody>
        
        <tr> <td style='font-family: Arabic Typesetting;'>كلمة المرور الحالية</td><!--- column -->
        <td>        <input type="password" name='old_pass' />    </td>
        </tr>
        <tr> <td style='font-family: Arabic Typesetting;'> كلمة المرور الجديدة</td>
            <td>        <input type="password" name='new_pass'  />    </td>
        </tr>
        <tr> <td style='font-family: Arabic Typesetting;'> تأكيد كلمة المرور الجديدة</td>
            <td>        <input type="password" name='con_new_pass'  />    </td>
        </tr></tbody>
        <tfoot>
            <tr> <th colspan=2  > <!--to marge tow cells--><button name="change_bttn" id="change_bttn" style='font-family: Arabic Typesetting;'>  تغيير  </button>
        
        </th></tr>
        
        </tfoot>
  </form>
  
 </table>


</body>
</html>
