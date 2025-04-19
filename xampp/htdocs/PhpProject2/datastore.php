<?php
    define("DB_SERVER", "localhost");
    define("DB_USER", "root");
    define("DB_PASSWORD", "root@2024");
    define("DB_DATABASE", "gp1");
function connect ()
{
    

    $conn = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);
    //$conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
    return $conn;
}
function get_curr_smst(&$year1, &$semestar)
{
    $conn= connect();
    $sql = "select concat(year,smst) as ys
            from gp1.univ_calendar
            where sysdate() between smst_start and smst_end ";
$result = $conn->query($sql);
$result2= $result -> fetch_assoc();
//$conn->close();
    //print_r($result2);
$year1 = substr($result2["ys"],0, 9);
$smst= substr($result2["ys"], -1);
if ($smst==1){$semestar="الفصل الأول";};
if ($smst==2){$semestar="الفصل الثاني";};
if ($smst==3){$semestar="الفصل الصيفي";};
return $result2["ys"];


}
/*******************************************/
function user_auth($username,$password)
{
    $password=  md5($password);
    $conn= connect();
    $sql = "SELECT userid, username,role FROM gp1.accounts
            where userid='$username' and userpass='$password'";
    echo $sql;
$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0)
{return 1;}
 else {
return 0;    
}
//$conn->close();
}

/*******************************************/
function change_pass($username,$password,$role)
{
    $username = (int)filter_var($username, FILTER_SANITIZE_NUMBER_INT); 
    //$password=  md5($password);
    $conn= connect();
    $sql ="";
    if ($role==1) {
        $sql .= "update students set password='$password'
            where student_id='$username' ";
    }
    if ($role==2) {
        $sql .= "update instructors set inst_password='$password'
            where inst_id='$username' ";
    }
    if ($role==3) {
        $sql .= "update departments set dept_password='$password'
            where dept_id='$username' ";
    }
    if ($role==4) {
        $sql .= "update colleges set col_password='$password'
            where col_id='$username' ";
    }
    //echo $sql;  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

function get_user_info($username)
{
    $conn= connect();
    $sql = "SELECT * FROM gp1.accounts
            where userid='$username' ";
$result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);
$arr = $result2;//mysqli_fetch_assoc($result);

/*if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc()) {
        array ('id'=>);
    echo "<br> id: " . $row["student_id"]. " - Name: " . $row["student_name"]. "<br>";
  }*/
return $arr;

//$conn->close();
}

function get_inst_sch($inst)
{
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $sql = "select cor_id,cor_regID,cor_name,sch_class,cor_hours,sch_days,
        TIME_FORMAT(sch_starttime, '%H:%i'),TIME_FORMAT(sch_endtime, '%H:%i')
        , inst_name,room_name
            from gp1.schedule, gp1.courses,gp1.instructors,gp1.rooms
            where
            sch_cor_id= cor_id
            and sch_inst=inst_id
            and sch_room_id=room_id
            and inst_id=$inst 
            and concat(sch_year,sch_smst)='$yearsmst'
            order by cor_regID, sch_class";
$result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);
$arr = $result2;//mysqli_fetch_assoc($result);

return $arr;

//$conn->close();
}
//*************************************************************/
function get_st_sch($st)
{
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $sql = "
        select cor_id,cor_regID,cor_name,sch_class,cor_hours,sch_days,
        TIME_FORMAT(sch_starttime, '%H:%i'),TIME_FORMAT(sch_endtime, '%H:%i'),
       
        inst_name,room_name,
         concat(case withdraw_f when 1 then 'مسقطة' else '' end,
		case deprived_f when 1 then 'محروم' else '' end) as sta
            from gp1.schedule, gp1.courses,gp1.instructors,gp1.rooms,student_reg
            where
            sch_cor_id= cor_id
            and sch_inst=inst_id
            and sch_room_id=room_id
            and reg_student_id=$st
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id=reg_cor_id
            and sch_class=reg_class
            and concat(reg_year,reg_smst)='$yearsmst'
            order by cor_regID, sch_class";
$result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);
return $result2;

}



function get_students_in_class($cor,$class)
{
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $sql = "select userid,username, userdept,
concat(case withdraw_f when 1 then 'مسقطة' else '' end,
		case deprived_f when 1 then 'محروم' else '' end) as sta,        
cor_name,cor_id,reg_class,cor_regID
            from accounts, student_reg,courses
            where
            userid=reg_student_id
            and reg_cor_id=cor_id 
            and concat(reg_year,reg_smst)='$yearsmst'
            and reg_cor_id=$cor
            and reg_class =  $class
            order by userid";
$result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);

return $result2;
}

/*******************************************/
function deprived_student($student,$cor,$class,$abscnt)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
        $sql = "insert into deprived(depv_year,depv_smst,depv_studentid,depv_corid,depv_class,depv_status,depv_create_date,depv_count) 
            values('$year','$smst',$student,$cor,$class,1,now(),$abscnt)";
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}
/*******************************************/
function del_deprived_student($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
        $sql = "delete from deprived
            where concat(depv_year,depv_smst)='$yearsmst'
             and depv_studentid= $student
             and depv_corid=$cor
             and depv_class=$class";
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function get_deprived_status($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
     $sql ="select depv_status from deprived
      where 
      concat(depv_year,depv_smst)='$yearsmst'
             and depv_studentid= $student
             and depv_corid=$cor
             and depv_class=$class";
    
  $result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["depv_status"];
}
 else {
    return 0;
}
}


/*******************************************/
function get_deprived_list($id,$role)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql="";
    if ($role==3){
     $sql .="
SELECT userid,username, cor_id,cor_regID,cor_name,depv_class,depv_count,inst_name
            FROM gp1.deprived,accounts,courses,departments,schedule,instructors
            where
            depv_studentid=userid
            and concat(depv_year,depv_smst)='$yearsmst'
            and depv_corid=cor_id
            and cor_dept=dept_id
            and dept_id=$id
            and depv_status=1
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= depv_corid
            and sch_class = depv_class
            and sch_inst=inst_id
         
        ";
    }
if ($role==4){
     $sql .=" SELECT userid,username, cor_id,cor_regID,cor_name,depv_class,depv_count,inst_name
            FROM gp1.deprived,accounts,courses,departments,schedule,instructors
            where
            depv_studentid=userid
            and concat(depv_year,depv_smst)='$yearsmst'
            and depv_corid=cor_id
            and cor_dept=dept_id
            and dept_col=$id
            and depv_status=2
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= depv_corid
            and sch_class = depv_class
            and sch_inst=inst_id
         
        ";
    }    
  
  $result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);

return $result2;

}

/*******************************************/
function update_deprived_student($student,$cor,$class,$val,$act)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
    if($act==3 and $val==3){
        $depv_val=-2;
    }
    if($act==3 and $val==4){
        $depv_val=-3;
    }
    if($act==2 and $val==3){
        $depv_val=2;
    }
    if($act==2 and $val==4){
        $depv_val=3;
    }
    $sql="";
    if ($val==3){
        $sql = "update deprived
                set depv_status=$depv_val,depv_head_apr_date=now()
                where
                concat(depv_year,depv_smst)='$yearsmst'
               and depv_studentid=$student
               and depv_corid=$cor
                and depv_class=$class";
    }
    if ($val==4){
        $sql = "update deprived
                set depv_status=$depv_val,depv_col_apr_date=now()
                where
                concat(depv_year,depv_smst)='$yearsmst'
               and depv_studentid=$student
               and depv_corid=$cor
                and depv_class=$class";
    }
    
        
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}
/*******************************************/
function transfer_deprived($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "update student_reg
                set deprived_f=1
                where
                concat(reg_year,reg_smst)='$yearsmst'
               and reg_student_id=$student
               and reg_cor_id=$cor
                and reg_class=$class";
    

if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function get_deprived_count($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
     $sql ="select depv_count from deprived
      where 
      concat(depv_year,depv_smst)='$yearsmst'
             and depv_studentid= $student
             and depv_corid=$cor
             and depv_class=$class";
    
     $sql2 ="select count(*)as cnt from students_absence
      where 
      concat(abs_year,abs_smst)='$yearsmst'
             and abs_studentid= $student
             and abs_corid=$cor
             and abs_class=$class
             and abs_is_exceused=0";
  $result = $conn->query($sql);
  $result2 = $conn->query($sql2);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["depv_count"];
}
 else {
     if ($result2->num_rows > 0){
         $row = $result2->fetch_assoc();
    return $row["cnt"];
}
     else{
    return 0;
}
 }
}

/*******************************************/
function withdraw_student($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
        $sql = "insert into withdraw(w_year,w_smst,w_studentid,w_corid,w_class,w_status,w_create_date)
            values('$year','$smst',$student,$cor,$class,0,now())";
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function del_withdraw_student($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
        $sql = "delete from withdraw
            where 
      concat(w_year,w_smst)='$yearsmst'
             and w_studentid= $student
             and w_corid=$cor
             and w_class=$class";
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function get_withdraw_status($student,$cor,$class,$f=0,$role=-1)
{
    $sta=  get_cor_status($student, $cor, $class);
    if($sta==1)
    {return "مسقطة";}
    if($sta==2)
    {return "محروم";}
     if($sta==3)
    {return "محروم+مسقطة";}//impossible case
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
     $sql ="select w_status from withdraw
      where 
      concat(w_year,w_smst)='$yearsmst'
             and w_studentid= $student
             and w_corid=$cor
             and w_class=$class";
    
  $result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $v= $row["w_status"];
    if($f==1 and $v==0){return -3;}
    if($v==0 and $role != 2)
    {  return "بانتظار مدرس المادة";}
    if($v==1 and $role != 3)
    {  return "بانتظار رئيس القسم";}
    if($v==2 and $role != 4)
    {  return "بانتظار العميد";}
    
    
    if($v==-1 )
    {  return "مرفوض من مدرس المادة";}
    if($v==-2 )
    {  return "مرفوض من رئيس القسم";}
    if($v==-3 )
    {  return "مرفوض من العميد";}
    
}
 else {
    return 0;
}
}
/*******************************************/
function get_sum_withdraw_hours($student)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
     $sql ="select nvl(sum(cor_hours),0) as whours 
         from withdraw,courses
      where 
      concat(w_year,w_smst)='$yearsmst'
             and w_studentid= $student
             and w_corid=cor_id
             ";
    
  $result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["whours"];
}
 else {
    return 0;
}
}
/*******************************************/
function get_sum_reg_hours($student)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
     $sql ="select nvl(sum(cor_hours),0) as reghours 
         from student_reg,courses
      where 
      concat(reg_year,reg_smst)='$yearsmst'
             and reg_student_id= $student
             and reg_cor_id=cor_id
             ";
    
  $result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["reghours"];
}
 else {
    return 0;
}
}

/*******************************************/
function get_cor_hours($cor)
{
    
    
    $conn= connect();
    //$yearsmst= get_curr_smst($year, $semestar);
    //$smst= substr($yearsmst, -1);
     $sql ="select cor_hours
         from courses
      where 
      cor_id=$cor
             ";
    
  $result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["cor_hours"];
}
 else {
    return 0;
}
}

/*******************************************/
function get_cor_status($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "select nvl(withdraw_f,0) as withdraw,nvl(deprived_f,0) as deprived
                from student_reg
                where
                concat(reg_year,reg_smst)='$yearsmst'
               and reg_student_id=$student
               and reg_cor_id=$cor
                and reg_class=$class";
    
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    //1= withdraw, 2= deprived, 3= withdraw+deprived
    if($row["withdraw"]==1 and $row["deprived"]==0)
    {return 1;}
    else if($row["withdraw"]==0 and $row["deprived"]==1)
    {return 2;}
 else {
return 0;    
}
}
 else {
    return -1;
}
}

/*******************************************/
function get_withdraw_list($id,$role)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql="";
    
    if ($role==2){
     $sql .="
SELECT userid,username, cor_id,cor_regID,cor_name,w_class,inst_name
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and w_status in (0,3)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
            and sch_inst=$id
         
        ";
    }
    
    if ($role==3){
     $sql .="
SELECT userid,username, cor_id,cor_regID,cor_name,w_class,inst_name
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and dept_id=$id
            and w_status in (1,2,3)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
         
        ";
    }
if ($role==4){
     $sql .=" SELECT userid,username, cor_id,cor_regID,cor_name,w_class,inst_name
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and dept_col=$id
            and w_status in (2,3)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
         
        ";
    }    
  
  $result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);

return $result2;

}

/*******************************************/
function update_withdraw_student($student,$cor,$class,$val,$act)
{
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
    if($act==3 and $val==2){
        $w_val=-1;
    }
    if($act==3 and $val==3){
        $w_val=-2;
    }
    if($act==3 and $val==4){
        $w_val=-3;
    }
    if($act==2 and $val==2){
        $w_val=1;
    }
    if($act==2 and $val==3){
        $w_val=2;
    }
    if($act==2 and $val==4){
        $w_val=3;
    }
    $sql="";
    if ($val==2){
        $sql = "update withdraw
                set w_status=$w_val,w_inst_apr_date=now()
                where
                concat(w_year,w_smst)='$yearsmst'
               and w_studentid=$student
               and w_corid=$cor
                and w_class=$class";
    }
    if ($val==3){
        $sql = "update withdraw
                set w_status=$w_val,w_head_apr_date=now()
                where
                concat(w_year,w_smst)='$yearsmst'
               and w_studentid=$student
               and w_corid=$cor
                and w_class=$class";
    }
    if ($val==4){
        $sql = "update withdraw
                set w_status=$w_val,w_col_apr_date=now()
                where
                concat(w_year,w_smst)='$yearsmst'
               and w_studentid=$student
               and w_corid=$cor
                and w_class=$class";
    }
    
        
    
    //echo "<script>console.log($sql);</script>";  
//$result = $conn->query($sql);
//$result2= $result -> fetch_all(MYSQLI_ASSOC);
if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}


/*******************************************/
function transfer_withdraw($student,$cor,$class)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "update student_reg
                set withdraw_f=1
                where
                concat(reg_year,reg_smst)='$yearsmst'
               and reg_student_id=$student
               and reg_cor_id=$cor
                and reg_class=$class";
    

if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function check_period($id)
{
    //1= withdraw   2= deprived
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql="";
    if($id==1)
    {
        $sql="select count(*) as cnt from univ_calendar
                where now() between withdraw_start and withdraw_end";
    }
 else
    {
        $sql="select count(*) as cnt from univ_calendar
                where now() between deprived_start and deprived_end";
    }
        
    
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    return $row["cnt"];
}
 else {
return 0;    
}

}

/*******************************************/
function del_abs($cor,$class,$date)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "delete from students_absence
                where
                concat(abs_year,abs_smst)='$yearsmst'
                and abs_corid=$cor
                and abs_class=$class
                and abs_date='$date'";
    

if ($conn->query($sql)=== TRUE) {
    
    return 1;
} else {
    return 0;
}
}


/*******************************************/
function insert_abs($st,$cor,$class,$date)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
    if($st<0)
    {$st1= $st*-1;
    $exec =1;
    }
 else {
     $st1= $st;
    $exec =0;
    }
        $sql = "insert into students_absence
                 values ('$year',$smst,$cor,$class,'$date',$st1,$exec)
                ";
    

if ($conn->query($sql)=== TRUE) {
    
    return 1;
} else {
    return 0;
}
}


/*******************************************/
function get_st_abs($cor,$class,$date)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "select abs_studentid,abs_is_exceused 
            from students_absence
                where
                concat(abs_year,abs_smst)='$yearsmst'
                and abs_corid=$cor
                and abs_class=$class
                and abs_date='$date'";
    
$arr =[];
$result = $conn->query($sql);
if ($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        // Append the row to the result array
        $arr[] = array($row['abs_studentid'], $row['abs_is_exceused']);
    }
    return $arr;
    echo "<script>console.log($arr)</script>";
}
 else {
return 0;    
}
}

/*******************************************/
function check_new_withdrawal($id,$role)
{
    if($role!= 2 and $role!= 3 and $role!=4)
    {return "";}   
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql="";
 if ($role==2){   
        $sql="SELECT count(*) as cnt
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and w_status in (0)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
            and sch_inst=$id";
}
    if ($role==3){
     $sql .="
SELECT count(*) as cnt
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and dept_id=$id
            and w_status in (1)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
         
        ";
    }
if ($role==4){
     $sql .=" SELECT count(*) as cnt
            FROM gp1.withdraw,accounts,courses,departments,schedule,instructors
            where
            w_studentid=userid
            and concat(w_year,w_smst)='$yearsmst'
            and w_corid=cor_id
            and cor_dept=dept_id
            and dept_col=$id
            and w_status in (2)
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= w_corid
            and sch_class = w_class
            and sch_inst=inst_id
         
        ";
    }    
        
    
$result = $conn->query($sql);
$row = $result->fetch_assoc();
if ($row["cnt"] > 0){
    return  "<img src='new_logo.png' alt='New Logo'>";
  }
 else {
return "";    
}

}

/*******************************************/
function check_new_deprived($id,$role)
{
    if($role!= 3 and $role!=4)
    {return "";}
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql="";
    if ($role==3){
     $sql .="
SELECT count(*) as cnt
            FROM gp1.deprived,accounts,courses,departments,schedule,instructors
            where
            depv_studentid=userid
            and concat(depv_year,depv_smst)='$yearsmst'
            and depv_corid=cor_id
            and cor_dept=dept_id
            and dept_id=$id
            and depv_status=1
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= depv_corid
            and sch_class = depv_class
            and sch_inst=inst_id
         
        ";
    }
if ($role==4){
     $sql .=" select count(*) as cnt
            FROM gp1.deprived,accounts,courses,departments,schedule,instructors
            where
            depv_studentid=userid
            and concat(depv_year,depv_smst)='$yearsmst'
            and depv_corid=cor_id
            and cor_dept=dept_id
            and dept_col=$id
            and depv_status=2
            and concat(sch_year,sch_smst)='$yearsmst'
            and sch_cor_id= depv_corid
            and sch_class = depv_class
            and sch_inst=inst_id
         
        ";
    }    
  
  $result = $conn->query($sql);
$row = $result->fetch_assoc();
if ($row["cnt"] > 0){
    return  "<img src='new_logo.png' alt='New Logo'>";
  }
 else {
return "";    
}

}

//*************************************************************/
function get_st_noti($st)
{
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $sql = "
      select id, not_text,not_date,
      (case not_status 
      when 1 then 'جديد'
      else 'تم الاطلاع'
      end) as not_status
from gp1.st_notification
            where
            not_studentid=$st
            and concat(not_year,not_smst)='$yearsmst'           
            order by not_status desc, not_date desc";
$result = $conn->query($sql);
$result2= $result -> fetch_all(MYSQLI_ASSOC);
return $result2;

}

/*******************************************/
function conf_noti($not)
{
    
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    
        $sql = "update st_notification
                set not_status=0
                where
                concat(not_year,not_smst)='$yearsmst'
               and id=$not";
    

if ($conn->query($sql)=== TRUE) {
    //echo '<script>alert("Welcome to GeeksforGeeks!"); </script>'; 
    return 1;
} else {
    return 0;
}
}

/*******************************************/
function check_new_noti($id,$role)
{
    if($role!= 1)
    {return "";}
    
    $conn= connect();
    $yearsmst= get_curr_smst($year, $semestar);
    $smst= substr($yearsmst, -1);
    $sql =" select count(*) as cnt
            FROM gp1.st_notification
            where
            not_studentid=$id
            and concat(not_year,not_smst)='$yearsmst'
            and not_status=1
                     
        ";
  
  $result = $conn->query($sql);
$row = $result->fetch_assoc();
if ($row["cnt"] > 0){
    return  $row["cnt"];
  }
 else {
return "";    
}
}

?>
