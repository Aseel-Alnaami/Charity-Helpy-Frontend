<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
    function ajaxRequest(url,action,st,cor,cclass,callback) {

        $.ajax({
        url: url,
        type: 'POST',
        data: { 
                                        // Data to be sent to the server (if any)
                                        student: st,
                                        corid: cor,
                                        classid: cclass,
                                        action: action
                                    },
        success: function(response) {
            callback(null, response); // Pass response to callback function
        },
        error: function(xhr, status, error) {
            callback(error); // Pass error to callback function
        }
    });
}

// Sequentially call AJAX functions

    
    function withdraw( e,x) {
  var myArray = e.split("_");
  var st = myArray[0];
  var cor = myArray[1];
  var cclass = myArray[2];
  var act="INSERT";
  if(x==2){
      act="DELETE";
  }
  
var row = document.getElementById(cor);

var cell = row.getElementsByTagName("td")[1]; 
var chour = parseInt(row.getElementsByTagName("td")[3].textContent); 



if(x!=3){
var result = confirm("هل أنت متأكد من طلب اسقاط المادة: "+cell.textContent+"؟");
  if (result){
   ajaxRequest('validate.php','val_load',st,cor,cclass, function(error1, response1) {
    if (error1 && act!="DELETE") {
        
        console.error('Error in example1.php:', error1);
        return;
    }
    
    console.log('Response from example1.php:', response1);
   
   if (response1==='1'){
    ajaxRequest('do_withdraw.php',act,st,cor,cclass, function(error2, response2) {
        if (error2) {
            
            console.error('Error in example2.php:', error2);
            return;
        }
    
         document.getElementById(e).disabled = true;
                        document.getElementById('lbl_'+e).textContent ="بانتظار مدرس المادة";
                        document.getElementById('drop').value =parseInt(document.getElementById('drop').value)+chour;
        console.log('Response from example2.php:', response2);
        
        
    });}
else{alert(response1);}
});

  }
}
    }
</script>
<?php 
include 'header.php'; 

$chk = check_period(1);
if($chk ==0)
{
    echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>انتهت فترة الاسقاط او لم تبدأ بعد</div>
          
      </div>
    ";

    exit;
}
$var = get_curr_smst($year1, $semestar);
$username = (int)filter_var($_SESSION["userid"], FILTER_SANITIZE_NUMBER_INT); 
$var2=get_st_sch($username);

//print_r($var2);

$shours=0;
$disabled="";
$lbl="";
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
   <th> </th> 
<th> حالة الاسقاط</th>
    
    </tr>
              </thead>';
foreach ($var2 as $row) {
    $whours=get_sum_withdraw_hours($username);
    $htmlTable .= '<tr id="'.$row["cor_id"].'">';
    $shours+= $row['cor_hours'];
    //var_dump($row);
    foreach ($row as $key=>$cell) {
        $cor=$row["cor_id"];
        $lbl=get_withdraw_status($username,$cor,$row["sch_class"]);
        $stachk=get_withdraw_status($username,$cor,$row["sch_class"],1);
        
        if($lbl!=0)
        {$disabled="disabled";
        }
 else {
        $lbl="";
        $disabled="";
 }
        $color="";
        
        if($key=="cor_id" or $key=="sta")
        {  continue;}
        if($key=="sta")
        {  if(!empty($cell))
        {$color.='style="color:red; font-weight:bold;"';}
        
        }
        $htmlTable .= '<td '.$color.'>' . $cell . '</td>';
    }
    if($stachk==-3)
    {
        $htmlTable .='<td><button type="button" id="'.$username.'_'.$cor.'_'.$row["sch_class"].
            '" name="withdraw"  onClick="withdraw(this.id,2)">الغاء طلب الاسقاط</button></td>';
    }
    else{
    $htmlTable .='<td><button type="button" id="'.$username.'_'.$cor.'_'.$row["sch_class"].
            '" name="withdraw" '.$disabled.' onClick="withdraw(this.id,1)">اسقاط المادة</button></td>';
    }
    $htmlTable .='<td><label style="display: block; width: 100px;" id="lbl_'.$username.'_'.$cor.'_'.$row["sch_class"].
            '" name="lbl" > '.$lbl.'</label></td>';
    $htmlTable .= '</tr>';
}
$htmlTable .= '<tfoot><tr>
<th colspan=7 style="text-align: center; vertical-align: middle;"> مجموع الساعات : 
<input type="text" style="text-align:center;" id="sumh" name="sumh" disabled value="'.$shours.'" size="5"></input>
    </th>   


<th colspan=4 style="text-align: center; vertical-align: middle;"> مجموع ساعات الاسقاط : 

<input type="text" style="text-align:center;" id="drop" name="lbl" disabled value="'.$whours.'" size="5"></input>
<input type="hidden" id="deg" value='.$_SESSION["deg_id"].'></input>                
</th>
</tr>
</tfoot>';
$htmlTable .= '</table>';

// Display the HTML table



echo "
    <div class='main_content'>
      
        <div class='info'>
          <div>$htmlTable</div>
          
      </div>
    ";

?>




