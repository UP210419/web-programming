<?php

include "./partials/Connection.php";

try {
    $SQL = "SELECT u.id AS idUser, u.firstName, t.id AS idTask, t.title
            FROM user u
            INNER JOIN task t ON u.id = t.idUser";

    $state = $conn->query($SQL);

    $json = [];
    while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
        $json[] = [
            "iduser" => $row['idUser'],
            "name" => $row['firstName'],
            "idtask" => $row['idTask'],
            "title" => $row['title'],
        ];
    }

    echo json_encode($json);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
