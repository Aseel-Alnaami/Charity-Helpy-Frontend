<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
    function update_deprive_st( e, x) {
  
        var myArray = e.split("_");
  var st = myArray[1];
  var cor = myArray[2];
  var cclass = myArray[3];
  
  var apbtn = 'ap_'+st+'_'+cor+'_'+cclass;
  var rjbtn = 'rj_'+st+'_'+cor+'_'+cclass;
  var lbl = st+'_'+cor+'_'+cclass;
  
var row = document.getElementById(st);
var cell = row.getElementsByTagName("td")[2]; 
if (x==2){
var result = confirm("هل أنت متأكد من تأكيد حرمان الطالب: "+cell.textContent+"؟");
}
if (x==3){
var result = confirm("هل أنت متأكد من رفض حرمان الطالب: "+cell.textContent+"؟");
}
  if (result){
     
        $.ajax({
            url: "do_deprived.php", // URL of the server-side script
            type: "POST", // HTTP method (POST recommended for updating data)
            data: { 
                // Data to be sent to the server (if any)
                student: st,
                corid: cor,
                classid: cclass,
                action: "UPDATE",
                val: x
            },
            success: function(response){
                // Code to be executed if the request succeeds
                if (response=1)
                    {
                        //alert(response);
                        document.getElementById(apbtn).disabled = true;
                        document.getElementById(rjbtn).disabled = true;
                        document.getElementById('lbl_'+lbl).textContent ="بانتظار العميد";
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

$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$role = $_SESSION["role"];

$arr = get_deprived_list($username,$role);

if(empty($arr))
{
    echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>لا يوجد طلبات حرمان</div>
          
      </div>
    ";

    exit;
}

$cnt=0;
$htmlTable = '<table width=50% id="mytable" class="content-table" >';
$htmlTable .='<thead><tr><th colspan=11 style="text-align: center; vertical-align: middle;">';
    $htmlTable .='
    <div style="width:100%;margin:0 auto;text-align: center; vertical-align: middle;">
        طلبات الحرمان
    </div>
 ';
          
                $htmlTable .='<hr>
       </th></tr>';
$htmlTable .='
    <tr>
    <th>#</th>
    <th> رقم الطالب</th>
    <th> اسم الطالب</th>
        <th> رقم المادة</th>
    <th> اسم المادة</th>
    <th> الشعبة</th>
    <th> ع. غيابات</th>
    <th> مدرس المادة</th>
    <th> </th>
    <th> </th>
    <th>  ملاحظـــات </th>
   
    </tr>
              </thead>';
foreach ($arr as $row) {
    
    
    $htmlTable .= '<tr id="'.$row["userid"].'">';
    $cnt+=1;
    $lbl ="";
    $disabled ="";
    $depstatus= get_deprived_status($row["userid"],$row["cor_id"],$row["depv_class"]);
    
    if($depstatus==2 and $role<=2){
    $disabled = "disabled";
    $lbl="بانتظار العميد";
    }
    if($depstatus==3){
    $disabled = "disabled";
    $lbl="معتمدة ومرحلة";
    }
    
    $htmlTable .= '<td>' . $cnt . '</td>';
    //var_dump($row);
    foreach ($row as $key=>$cell) {
        if($key=="cor_id")
        {  continue;}
        $htmlTable .= '<td>' . $cell . '</td>';
    }
        
    $htmlTable .='<td><button type="button" id="ap_'.$row["userid"].'_'.$row["cor_id"].'_'.$row["depv_class"].
            '" name="dep" '.$disabled.' onClick="update_deprive_st(this.id,2)">تأكيد</button></td>';
    $htmlTable .='<td><button type="button" id="rj_'.$row["userid"].'_'.$row["cor_id"].'_'.$row["depv_class"].
            '" name="dep" '.$disabled.' onClick="update_deprive_st(this.id,3)">رفض</button></td>';
    $htmlTable .='<td><label style="display: block; width: 100px;" id="lbl_'.$row["userid"].'_'.$row["cor_id"].'_'.$row["depv_class"].
            '" name="lbl_'.$row["userid"].'" > '.$lbl.'</label></td>';
    $htmlTable .= '</tr>';
}

$htmlTable .= '</table>';



echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>
$htmlTable
</div>
          
      </div>
    ";
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
