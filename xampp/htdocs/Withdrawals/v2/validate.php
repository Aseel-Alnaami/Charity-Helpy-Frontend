<?php
session_start();
include 'DB.php';
// we brought the values from the ajaxruest fun in     withdrawal_std.php
$student = $_POST['student'];
$cor = $_POST['corid'];
$class = $_POST['classid'];
$action = $_POST['action'];


if ($action == "val_load") {
    $student = $_SESSION["userid"];
    $deg = $_SESSION["deg_id"];
    $corsta = get_cor_status($student, $cor, $class);
    if ($corsta == 1) {
        echo "المادة مسقطة";
    }
    if ($corsta == 2) {
        echo "الطالب محروم في المادة";
    }


    $whours = get_sum_withdrawn_hours($student);
    $reghours =  get_sum_reg_hours($student); 
    $corhours = get_cor_hours($cor);
    

    // min hours shows the minmum hours you should have
    if ($deg >= 4) {
        $min_hours = 3;
    } else {
        $min_hours = 6;
    }


    if ($reghours - ($whours + $corhours) < $min_hours) {
        echo "تجاوز الحد الأدنى للعبء";
    } else {
        echo '1';
    }
}


?>