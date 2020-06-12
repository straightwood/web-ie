<?php
    require_once('connectvars.php');
    $data = json_decode(file_get_contents('php://input'),true);//转换数据格式
    $username = $data['username'];
    $token = $data['Authorization'];
    require_once('decodeToken.php');

    if($tokenNum=='200'){
        $result_array[2] = ['code'=>'1','message'=>'登录成功！'];
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if($conn != null){
            $sql = "SELECT score FROM score WHERE account='$username'";
            $result = mysqli_query($conn, $sql);
            $resArray = mysqli_fetch_all($result,MYSQL_ASSOC);//数组

            if(count($resArray)==0){    //计算总分
                $resScore = 0;
                $resUp0 = 0;
                $resUp1 = 0;
                $resUp2 = 0;
            }else if(count($resArray)==1){
                $resScore = $resArray[0]['score']*0.2;
                $resUp0 = $resArray[0]['score'];
                $resUp1 = 0;
                $resUp2 = 0;
            }else if(count($resArray)==2){
                $resScore = $resArray[0]['score']*0.2+ $resArray[1]['score']*0.3;
                $resUp0 = $resArray[0]['score'];
                $resUp1 = $resArray[1]['score'];
                $resUp2 = 0;
            }else{
                $resScore = $resArray[0]['score']*0.2+ $resArray[1]['score']*0.3+$resArray[2]['score']*0.5;
                $resUp0 = $resArray[0]['score'];
                $resUp1 = $resArray[1]['score'];
                $resUp2 = $resArray[2]['score'];
            }
            $sql = "UPDATE user SET score='$resScore' WHERE account='$username'";//更新总分
            $result = mysqli_query($conn, $sql);

            $sql = "UPDATE update_score SET round1='$resUp0',round2='$resUp1',round3='$resUp2'
                    WHERE account='$username'";//更新总分
            $result = mysqli_query($conn, $sql);


            $result_array[0] = $resArray;
            $result_array[1] = $resScore;
            mysqli_close($conn);
        }
    }else if($tokenNum=='401'){
        $result_array[2] = ['code'=>'0','message'=>'登录已过期，请重新登录！'];
    }else{
        $result_array[2] = ['code'=>'0','message'=>'请进行登录后操作！'];      
    }
    echo json_encode($result_array);
?>