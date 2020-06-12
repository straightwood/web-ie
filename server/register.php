<?php
    //账号注册，目前只把插入到user表
    // header('Content-Type:application/json; charset=utf-8');
    require_once('connectvars.php');

    $data = json_decode(file_get_contents('php://input'),true);//转换数据格式
    $username = $data['username'];
    $password = $data["password"];
    $nickname = $data["nickname"];
    
    require_once('encodeToken.php');//生成token

    if($username != '' && $password != ''){
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if($conn != null){
            $sql = "SELECT * FROM user where account = '$username'";
            $test = mysqli_query($conn, $sql);
            
            if(mysqli_num_rows($test)==0){

                $sql_insert = "INSERT INTO update_score VALUES ('$username', '0', '0', '0')";
                $result = mysqli_query($conn, $sql_insert);

                $sql_insert = "INSERT INTO user VALUES ('$username', password('$password'), '$nickname', 0)";
                $result = mysqli_query($conn, $sql_insert);
                if (mysqli_affected_rows($conn) == 1) {
                    $result_array[0] = ['token'=>$token,'code'=>'1','message'=>'注册成功!'];
                }else{
                    $result_array[0] = ['code'=>'0','message'=>'请再次尝试！'];               
                }
                mysqli_close($conn);
            }else{
                $result_array[0] = ['code'=>'0','message'=>'用户名重复！'];
            }
        }else{
            $result_array[0] = ['code'=>'0','message'=>'数据库连接失败！'];
        }
        echo json_encode($result_array);
    }
?>