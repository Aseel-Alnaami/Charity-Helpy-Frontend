<?php
include 'header.php'; 

//print_r($var2);
$arr = get_user_info($_SESSION['userid']);
              $info = extract($arr[0], EXTR_PREFIX_SAME, "wddx");
              //userid, userpass, username, role, userdept, uercol, personname
              
              if ($role==1)
              {$desc = 'طالب'.' / '.$deg_name;}
              if ($role==2)
              {$desc = 'مدرس';}
              if ($role==3 or $role==4)
              {$desc = $username;}
$htmlTable = '<table width=40% class="content-table">';
$htmlTable .=" <thead><tr><th colspan=2 style='text-align: center; vertical-align: middle;'>
    المعلومات الشحصية
    </th></tr></thead>
    <tr>
    <td>اسم المستخدم: </td>
    <td>$userid</td>
    </tr>
    <tr>
    <td>الاسم: </td>
    <td>$personname</td>
    </tr>
    <tr>
    <td>القسم الأكاديمي: </td>
    <td>$userdept</td>
    </tr>
    <tr>
    <td>الكلية: </td>
    <td>$usercol</td>
    </tr>
    <tr>
    <td>الصفة: </td>
    <td>$desc</td>
    </tr>
    </table>
";             

// Display the HTML table



echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>$htmlTable</div>
          
      </div>
    ";



/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
