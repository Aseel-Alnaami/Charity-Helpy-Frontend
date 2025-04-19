<?php
session_start();
include 'datastore.php';
$student = $_POST['student'];
$cor = $_POST['corid'];
$class = $_POST['classid'];
$abscnt = $_POST['abscnt'];
$action = $_POST['action'];

if ($action=="INSERT"){

    $sta=  get_cor_status($student, $cor, $class);
    if($sta==1)
    {echo "مسقطة";
     return;}
    if($sta==2)
    {echo "محروم";
    return;
    }
     if($sta==3)
    {echo "محروم+مسقطة";
    return;
    }//impossible case
    
$x= deprived_student($student, $cor, $class,$abscnt);

if($x==1) {
    echo 1;
} else {
    echo 0;
}
}
if ($action=="DELETE"){
$x= del_deprived_student($student, $cor, $class);

if($x==1) {
    echo 1;
} else {
    echo 0;
}
}
if ($action=="UPDATE"){
    $act= $_POST['val'];
    // val=2 confirm  val=3 reject
    
            $x=update_deprived_student($student,$cor,$class,$_SESSION["role"],$act);
            if($x==1 and $_SESSION["role"]==4 and $act==2)
            {
                $xx= transfer_deprived($student,$cor,$class);
                if($xx==1){
                    echo 1;
                }
         else {echo 0;}
            }
            else if($x==1) {
            echo 1;
        } else {
            echo 0;
        }
    }

?>
