<?php

include "./partials/Connection.php";

$selectIdTask = $_GET['selectedTaskId'] ?? null;

if ($selectIdTask) {
    try {
        $SQL = "SELECT u.id, u.firstName, t.id AS idTask, t.title
                FROM user u
                INNER JOIN task t ON u.id = t.idUser
                WHERE t.id = :idTask";

        $state = $conn->prepare($SQL);
        $state->bindParam(':idTask', $selectIdTask);
        $state->execute();

        $json = [];
        while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
            $json[] = [
                "iduser" => $row['id'],
                "name" => $row['firstName'],
                "idtask" => $row['idTask'],
                "title" => $row['title']
            ];
        }

        echo json_encode($json);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
