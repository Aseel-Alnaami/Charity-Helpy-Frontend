<script type="text/javascript">
    function cclick( e) {
  var myArray = e.split("_");
  var cor = myArray[0];
  var cclass = myArray[1];
 
   document.getElementById("cor_id").value = cor; 
   document.getElementById("class_id").value = cclass;
   
    document.getElementById("myForm").submit();
        

}
</script>
<?php

echo '<form id="myForm" class="form2" method="post" action="deprived_st.php">
    <input type="hidden" name="cor_id" id="cor_id">
    <input type="hidden" name="class_id" id="class_id">
    </form>';
include 'header.php'; ?>

<?php
echo '';
$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=get_inst_sch($username);


$shours=0;
$htmlTable = '<table class="content-table">';
$htmlTable .='<thead><tr><th colspan=10 style="text-align: center; vertical-align: middle;">
    '.$semestar.' '. $year1.'</th></tr>';
$htmlTable .='
    <tr>
<th>id </th>    
<th>رقم المادة </th>
    <th> اسم المادة </th>
    <th> الشعبة </th>
    <th>  س. م</th>
    <th> الايام </th>
    <th> من </th>
    <th> الى </th>
    <th> القاعة</th>
    <th> </th>
    
    </tr>
              </thead>';
foreach ($var2 as $row) {
    $htmlTable .= '<tr>';
    unset($row["inst_name"]);
    //var_dump($row);
    foreach ($row as $cell) {
        $htmlTable .= '<td>' . $cell . '</td>';
    }
    $htmlTable .= '<td><button type="button" id="'.$row["cor_id"].'_'.$row["sch_class"].
            '" name="change_pass" onClick="cclick(this.id)">قائمة الطلبة</button></td>';
    $htmlTable .= '</tr>';
}

$htmlTable .= '</table>';

// Display the HTML table


echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>$htmlTable</div>
          
      </div>
    ";

?>
