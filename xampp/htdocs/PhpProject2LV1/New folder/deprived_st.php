<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
    function deprive_st( e,x) {
  var myArray = e.split("_");
  var st = myArray[0];
  var cor = myArray[1];
  var cclass = myArray[2];
  var act="INSERT";
if(x==2)
    { act ="DELETE";}
var row = document.getElementById(st);
var cell = row.getElementsByTagName("td")[2]; 
if(x==2)
    {var result = confirm("هل أنت متأكد من الغاء حرمان الطالب: "+cell.textContent+"؟");}
    else{
var result = confirm("هل أنت متأكد من حرمان الطالب: "+cell.textContent+"؟");
    }
  if (result){
      var abs = parseInt(document.getElementById('txt_'+e).value);

      if (abs==0){
          alert("الرجاء ادخال عدد الغيابات!!!");
          return;
      }
        $.ajax({
            url: "do_deprived.php", // URL of the server-side script
            type: "POST", // HTTP method (POST recommended for updating data)
            data: { 
                // Data to be sent to the server (if any)
                student: st,
                corid: cor,
                classid: cclass,
                abscnt: abs,
                action: act
            },
            success: function(response){
                // Code to be executed if the request succeeds
                if (response==1)
                    {
                        
                        document.getElementById(e).disabled = true;
                        document.getElementById('lbl_'+e).textContent ="بانتظار رئيس القسم";
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

$chk = check_period(2);
if($chk ==0)
{
    echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>انتهت فترة الحرمان او لم تبدأ بعد</div>
          
      </div>
    ";

    exit;
}

$cor= $_POST['cor_id'];
$class = $_POST['class_id'];          
$arr = get_students_in_class($cor,$class);


if(empty($arr))
{
    echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>لا يوجد طلاب في هذه الشعبة </div>
          
      </div>
    ";

    exit;
}

$cname_arr = array_unique(array_column($arr, 'cor_name'));
$cregno_arr = array_unique(array_column($arr, 'cor_regID'));
$cclass_arr = array_unique(array_column($arr, 'reg_class'));

$cname= $cname_arr[0];
$cregno = $cregno_arr[0];
$cclass = $cclass_arr[0];


$cnt = 0;
$htmlTable = '<table id="mytable" class="content-table">';
$htmlTable .='<thead><tr><th colspan=8 style="text-align: center; vertical-align: middle;">';
    $htmlTable .='
    <div style="width:100%;margin:0 auto;text-align: center; vertical-align: middle;">
        رقم المادة:&nbsp'.$cregno.' &nbsp  &nbsp &nbsp
اسم المادة: &nbsp'.$cname.' &nbsp  &nbsp &nbsp
            الشعبة:&nbsp '.$cclass.' 
    </div>
 ';
          
                $htmlTable .='<hr>
       </th></tr>';
$htmlTable .='
    <tr>
    <th>متسلسل</th>
    <th> رقم الطالب</th>
    <th> اسم الطالب</th>
    <th>  القسم</th>
    <th>  حالة المادة</th>
    <th> عدد الغيابات</th>
    
    <th> </th>
    <th>  ملاحظـــات </th>
   
    </tr>
              </thead>';
foreach ($arr as $row) {
    unset($row["cor_name"]);
    unset($row["cor_regID"]);
    unset($row["reg_class"]);
    unset($row["cor_id"]);
    
    $htmlTable .= '<tr id="'.$row["userid"].'">';
    $cnt+=1;
    $lbl ="";
    $disabled ="";
    $depstatus= get_deprived_status($row["userid"],$cor,$class);
    $dep_count=get_deprived_count($row["userid"],$cor,$class);
    if(!empty($row["sta"]))
        {
    $disabled = "disabled";
    $lbl=$row["sta"];
    }
    if($depstatus==1){
    $disabled = "disabled";
    $lbl="بانتظار رئيس القسم";
    }
    if($depstatus==2 ){
    $disabled = "disabled";
    $lbl="بانتظار العميد";
    }
    if($depstatus==3){
    $disabled = "disabled";
    $lbl="معتمدة ومرحلة";
    }
    if($depstatus==-2 ){
    $disabled = "disabled";
    $lbl="رفضت من رئيس القسم";
    }
    if($depstatus==-3){
    $disabled = "disabled";
    $lbl="رفضت من العميد";
    }
    $htmlTable .= '<td>' . $cnt . '</td>';
    //var_dump($row);
    foreach ($row as $cell) {
        
        $htmlTable .= '<td>' . $cell . '</td>';
    }
    $htmlTable .='<td><input style="text-align:center;" value='.$dep_count.' type="text" '.$disabled.' size="5" id="txt_'.$row["userid"].'_'.$cor.'_'.$class.
            '" name="cnt_abs" "></input></td>'; 
    
    if($depstatus==1){
        $htmlTable .='<td><button type="button" id="'.$row["userid"].'_'.$cor.'_'.$class.
            '" name="dep"  onClick="deprive_st(this.id,2)">الغاء الحرمان</button></td>';
    }
    else{
    $htmlTable .='<td><button type="button" id="'.$row["userid"].'_'.$cor.'_'.$class.
            '" name="dep" '.$disabled.' onClick="deprive_st(this.id,1)">حرمان الطالب</button></td>';
    }
    $htmlTable .='<td><label style="display: block; width: 100px;" id="lbl_'.$row["userid"].'_'.$cor.'_'.$class.
            '" name="lbl_'.$row["userid"].'" > '.$lbl.'</label></td>';
    $htmlTable .= '</tr>';
}

$htmlTable .= '</table>';


echo "
    <div class='main_content'>
      
        <div class='info'>
        
          <div>$htmlTable </div>
          
      </div>
    ";


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
