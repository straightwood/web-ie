<?php
    require_once('connectvars.php');
    $data = json_decode(file_get_contents('php://input'),true);//转换数据格式
    $username = $data['username'];
    $token = $data['Authorization'];
    require_once('decodeToken.php');

    $username = "admin";

    if($tokenNum=='200'){
        $result_array[2] = ['code'=>'1','message'=>'登录成功！'];
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if($conn != null){
            $sql = "SELECT * FROM score WHERE account='$username'";
            $result = mysqli_query($conn, $sql);
            $resArray0 = mysqli_fetch_all($result,MYSQL_ASSOC);//数组
            
            $sql = "SELECT score FROM user WHERE account='$username'";
            $result = mysqli_query($conn, $sql);
            $resArray1 = mysqli_fetch_all($result,MYSQL_ASSOC);//数组

            $result_array[0] = $resArray0;
            $result_array[1] = $resArray1;
            mysqli_close($conn);
        }
    }else if($tokenNum=='401'){
        $result_array[2] = ['code'=>'0','message'=>'登录已过期，请重新登录！'];
    }else{
        $result_array[2] = ['code'=>'0','message'=>'请进行登录后操作！'];      
    }
    echo json_encode($result_array);
?>