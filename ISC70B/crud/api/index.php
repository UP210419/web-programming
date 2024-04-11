<?php
// Mensaje JSON para la API
$message = "Welcome to the CRUD API";
$json = ["message" => $message];

// Muestro el mensaje a la API
echo json_encode($json);
?>
