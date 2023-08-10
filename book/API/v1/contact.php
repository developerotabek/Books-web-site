<?php

    $name = $_POST['name'];

    $surname = $_POST['surname'];

    $phone = $_POST['phone'];




    $token = "5863998254:AAFQaZ7gzVl7sZ_gZjek4YnOaq0h48f24sI";

    $chat_id = "1516984794";



    $arr = array(

        '📩Yangi xabar' => '',

        '👤Ism: ' => $name,

        '👤Familya: ' => $surname,

        '📞Telefon: ' => $phone, 

    );



    foreach($arr as $key => $value) {

        $txt .= "<b>".$key."</b>".$value."%0A";

    }



    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");



    if ($sendToTelegram) { 
        header('Location: ../../index.html' );

        return true;

     }else{

        header('Location: ../index.html');

     };

?>