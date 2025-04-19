<?php
    define("DB_SERVER", "localhost");
    define("DB_USER", "root");
    define("DB_PASSWORD", "root@2024");
    define("DB_DATABASE", "gp1");
function connect ()
{
    

    $conn = mysqli_connect(DB_SERVER , DB_USER, DB_PASSWORD, DB_DATABASE);

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
    $sql = "select cor_regID,cor_name,sch_class,cor_hours,sch_days,
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
?>
