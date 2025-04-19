<?php 
include 'header.php'; 
echo $_SESSION['role'];
if($_SESSION['role']!=1){
    session_destroy();
  	unset($_SESSION['userid']);
        unset($_SESSION['user_name']);
        unset($_SESSION['role']);
  	header("location: login.php");
}
$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=get_inst_sch($username);

//print_r($var2);

$shours=0;
$htmlTable = '<table class="content-table">';
$htmlTable .='<thead><tr><th colspan=10 style="text-align: center; vertical-align: middle;">
    '.$semestar.' '. $year1.'</th></tr>';
$htmlTable .='
    <tr>
    <th>#</th>
    <th>رقم المادة </th>
    <th> اسم المادة </th>
    <th> الشعبة </th>
    <th>  س. م</th>
    <th> الايام </th>
    <th> من </th>
    <th> الى </th>
    <th> المدرس</th>
    <th> القاعة</th>
    </tr>
              </thead>';
foreach ($var2 as $row) {
    $htmlTable .= '<tr>';
    $shours+= $row['cor_hours'];
    //var_dump($row);
    foreach ($row as $cell) {
        $htmlTable .= '<td>' . $cell . '</td>';
    }
    $htmlTable .= '</tr>';
}
$htmlTable .= '<tfoot><tr>
<th colspan=10 style="text-align: center; vertical-align: middle;"> مجموع الساعات : '. $shours.'</th>   
</tr></tfoot>';
$htmlTable .= '</table>';

// Display the HTML table



echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>$htmlTable</div>
          
      </div>
    ";

?>




