<?php 
session_start();
require_once 'DB.php';
$errors=array();

if (isset($_POST['login_user'])){
    

    $user_id=$_POST['userid'];
    $password=$_POST['password'];


    if (empty($user_id) ){
        array_push($errors,' Username is required');

}
if (empty($password) ){
    array_push( $errors,'password is required');
}
    if(count($errors)== 0){
        unset($_SESSION['userid']);
        $auth=authentication($user_id,$password);
        
        if ($auth==1){
            $_SESSION['userid']=$user_id;

            $user_info=get_user_info($_SESSION['userid']);
            $info=extract($user_info[0], EXTR_PREFIX_SAME, "wddx");
              //userid, userpass, username, role, userdept, uercol, personname
            if($role==3 || $role== 4){
                $dispname=$personname.' / '.$username;}
             else {
                    $dispname=$personname ;}

            $_SESSION['dispname']=$dispname;
            $_SESSION['username']=$username;
            $_SESSION['role']=$role;
            $_SESSION['userpass']=$userpass;
            $_SESSION['deg_id']=$deg_id;
            $_SESSION['deg_name']=$deg_name;

    header('location: personinfo.php');
        }
        else{

            array_push($errors,'wrong password or username');
        }


    }

}
    
?>