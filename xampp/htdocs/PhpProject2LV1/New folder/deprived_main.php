<script type="text/javascript">
    function cclick( e,x) {
  var myArray = e.split("_");
  var cor = myArray[0];
  var cclass = myArray[1];
  var row = document.getElementById('cor_'+cor+'_'+cclass);
var cell = row.getElementsByTagName("td")[5]; 

 if (x==2)
     {var act= "absence_st.php";
     document.getElementById("myForm").action=act;
 }
   document.getElementById("cor_id").value = cor; 
   document.getElementById("class_id").value = cclass;
   document.getElementById("days").value = cell.textContent;
   
    document.getElementById("myForm").submit();
        

}
</script>
<?php

echo '<form id="myForm" class="form2" method="post" action="deprived_st.php">
    <input type="hidden" name="cor_id" id="cor_id">
    <input type="hidden" name="class_id" id="class_id">
    <input type="hidden" name="days" id="days">
    </form>';
include 'header.php'; ?>

<?php
echo '';
$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=get_inst_sch($username);


$shours=0;
$htmlTable = '<table class="content-table">';
$htmlTable .='<thead><tr><th colspan=11 style="text-align: center; vertical-align: middle;">
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
    <th>الحرمان </th>
    <th>الغياب </th>
    </tr>
              </thead>';
foreach ($var2 as $row) {
    $htmlTable .= '<tr id="cor_'.$row["cor_id"].'_'.$row["sch_class"].'">';
    unset($row["inst_name"]);
    //var_dump($row);
    foreach ($row as $cell) {
        $htmlTable .= '<td>' . $cell . '</td>';
    }
    $htmlTable .= '<td><button type="button" id="'.$row["cor_id"].'_'.$row["sch_class"].
            '" name="change_pass" onClick="cclick(this.id,1)">حرمان الطلبة</button></td>';
    
    $htmlTable .= '<td><button type="button" id="'.$row["cor_id"].'_'.$row["sch_class"].
            '" name="change_pass" onClick="cclick(this.id,2)">ادخال الغياب</button></td>';
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
