<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
    function conf( e) {
  var tr = e.closest('tr').id;
 


var row = document.getElementById(tr);
var cell = row.getElementsByTagName("td")[0].textContent;
var result = confirm("هل انت متأكد أنك اطلعت على الإشعار: \n "+cell+"؟");

  if (result){
   
        $.ajax({
            url: "conf_notification.php", // URL of the server-side script
            type: "POST", // HTTP method (POST recommended for updating data)
            data: { 
                // Data to be sent to the server (if any)
                notid: tr
                },
            success: function(response){
                // Code to be executed if the request succeeds
                if (response==1)
                    {
                        var txt="conf"+tr;
                        
                        document.getElementById(txt).disabled = true;
                        row.getElementsByTagName("td")[2].textContent ="تم الاطلاع";
                    }
                    else 
                        {
                            alert(response);
                            return;
                        }
                console.log("Database updated successfully!"+response);
            },
            error: function(xhr, status, error){
                // Code to be executed if the request fails
                console.error("Error updating database:", error);
            }
         });
  }
}
</script>
<?php
include 'header.php'; 


//$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=  get_st_noti($username);

//print_r($var2);


$htmlTable = '<table class="content-table">';
$htmlTable .='<thead><tr><th colspan=4 style="text-align: center; vertical-align: middle;"></th></tr>';
$htmlTable .='
    <tr>
    <th>الإشعار</th>
    <th> التاريخ والوقت</th>
    <th> الحالة</th>
    <th>  </th>
      </tr>
              </thead>';
foreach ($var2 as $row) {
    $htmlTable .= '<tr id='.$row["id"].'>';
    $disabled ="";
    foreach ($row as $key=>$cell) {
    
    
        
        if($key=="id")
        {  continue;}
        if($row["not_status"]=="جديد")
        {  $style="style='font-weight:bold;color:red;'";}
 else {$style="";
 $disabled="disabled";
 }
        
        $htmlTable .= '<td '.$style.'>' . $cell . '</td>';
        
    }
    $htmlTable .='<td><button type="button" id="conf'.$row["id"].'"
        name="conf" '.$disabled.' onClick="conf(this)">اطلعت</button></td>';
    //$htmlTable .= '<td style="color:blue;text-align:center; font-weight:bold;">' . $dep_count . '</td>';
    $htmlTable .= '</tr>';
}
/*$htmlTable .= '<tfoot><tr>
<th colspan=4 style="text-align: center; vertical-align: middle;"> مجموع الساعات : '. $shours.'</th>   
</tr></tfoot>';*/
$htmlTable .= '</table>';

// Display the HTML table



echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>$htmlTable</div>
          
      </div>
    ";

?>
