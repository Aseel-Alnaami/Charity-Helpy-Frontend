<?php 
include 'header.php'; 


$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=get_st_sch($username);

//print_r($var2);

$shours=0;
$htmlTable = '<table class="content-table">';
$htmlTable .='<thead><tr><th colspan=11 style="text-align: center; vertical-align: middle;">
   جدول الطالب في '.$semestar.' '. $year1.'</th></tr>';
$htmlTable .='
    <tr>
    <th>رقم المادة </th>
    <th> اسم المادة </th>
    <th> الشعبة </th>
    <th>  س. م</th>
    <th> الايام </th>
    <th> من </th>
    <th> الى </th>
    <th> المدرس</th>
    <th> القاعة</th>
    <th> حالة المادة</th>
    <th> عدد الغيابات</th>
    </tr>
              </thead>';
foreach ($var2 as $row) {
    $htmlTable .= '<tr>';
    $shours+= $row['cor_hours'];
    //var_dump($row);
    $dep_count=0;
    foreach ($row as $key=>$cell) {
        $dep_count=get_deprived_count($username,$row["cor_id"],$row["sch_class"]);
        $color="";
        
        if($key=="cor_id")
        {  continue;}
        if($key=="sta")
        {  if(!empty($cell))
        {$color.='style="color:red; font-weight:bold;"';}
        
        }
        $htmlTable .= '<td '.$color.'>' . $cell . '</td>';
        
    }
    $htmlTable .= '<td style="color:blue;text-align:center; font-weight:bold;">' . $dep_count . '</td>';
    $htmlTable .= '</tr>';
}
$htmlTable .= '<tfoot><tr>
<th colspan=11 style="text-align: center; vertical-align: middle;"> مجموع الساعات : '. $shours.'</th>   
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




