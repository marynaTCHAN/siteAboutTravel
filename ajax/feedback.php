<?php
$username = htmlspecialchars($_POST['username']);
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$password = htmlspecialchars($_POST['password']);
//Відправлення

$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf\r\n";
if(mail("marynamelnichuk859@gmail.com", $username, $name, $password, $headers)) {
    echo "Ваша форма реєстрації відправлена.";
}else {
    echo "Ваша форма реєстрації не відправлена.";
}
?>