<?php
    //账号注册，目前只把插入到user表

    session_start();
    // header('Content-Type:application/json; charset=utf-8');
    require_once('connectvars.php');

    // $username = $_POST["username"];
    // $password = $_POST["password"];

    $data = json_decode(file_get_contents('php://input'),true);//转换数据格式

    $username = $data['username'];
    $password = $data["password"];
    $nickname = $data["nickname"];
    
    if($username != '' && $password != ''){
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if($conn != null){
            $sql = "select * FROM user where account = '$username'";
            $test = mysqli_query($conn, $sql);//$conn->query($sql);//执行$sql 
            if(mysqli_num_rows($test)==0){
                $sql_insert = "INSERT INTO user VALUES ('$username', '$password', '$nickname', 0)";
                $result = mysqli_query($conn, $sql_insert);
                $result_array[0] = ['code'=>'1','message'=>'注册成功！'];
                //################自动登录？操作？超级变量？
            }else{
                $result_array[0] = ['code'=>'0','message'=>'此账号已存在！'];
            }
        }
        echo json_encode($result_array);
        mysqli_close($conn);

    }

?>