<?php 
//session_start();

include 'header.php';
//echo $_SESSION['success'];
include('server2.php'); 

?>



<div class='main_content'>
    
        <div class='info'>
  <?php  
  if (isset($_SESSION['success'])) : ?>
      <div class="error success" >
      	<h3>
          <?php
          	echo $_SESSION['success'];
          	unset($_SESSION['success']);
          ?>
      	</h3>
      </div>

       <?php endif ?>     
            
    <?php 
    /*echo '<form method="post" action="changepassword.php">
    ';
    include('errors.php');*/
    echo '<table width=40% class="content-table">
        <form method="post" action="changepassword.php">
    

<div style="width:70%;">
';
    include('errors.php');
    echo '
</div>
<thead><tr><th colspan=2 style="text-align: center; vertical-align: middle;">
    تغيير كلمة المرور</th></tr></thead>
    <tr>
        <td>كلمة المرور الحالية</td>
        <td><input type="password" name="old_pass" ></td>
    </tr>
    <tr>
        <td>كلمة المرور الجديدة</td>
        <td><input type="password" name="new_pass" ></td>
    </tr>
    <tr>
        <td>تأكيد كلمة المرور الجديدة</td>
        <td><input type="password" name="con_new_pass" ></td>
    </tr>
    <tfoot><tr>
<th colspan=2 style="text-align: center; vertical-align: middle;"> 
<button type="submit" class="btn" name="change_pass">تغيير</button>
</th>   
</tr></tfoot>
</form>    
</table>
    ';
?>
        </div>
    </div>