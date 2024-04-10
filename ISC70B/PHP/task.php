
<?php
include "./partials/connection.php";

$idTask = $_GET['id'];

try {
    $sql = "SELECT * FROM task WHERE idUser = {$idTask};";
    $state = $conn->query($sql);
    
    $row = $state->fetch();

    $json = [];
        while ($row = $state->fetch()) {
            $json = [
                "id" => $row['id'],
                "idUser" => $row['idUser'],
                "title" => $row['title'],
                "completed" => $row['completed'] == 1
            ];
        }

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDFOException) {
    echo $e->getMessage();
}