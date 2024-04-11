<?php

include "./partials/Connection.php";

$Title = $_POST['title'] ?? null;
$userID = $_POST['users'] ?? null;
$taskID = $_POST['id'] ?? null;

if ($Title && $userID && $taskID) {
    try {
        $updateStatement = $conn->prepare("UPDATE task SET title = ?, idUser = ? WHERE id = ?");
        $updateStatement->execute([$Title, $userID, $taskID]);
        $rowCount = $updateStatement->rowCount();
        if ($rowCount > 0) {
            echo "Task updated successfully!";
        } else {
            echo "No task was updated.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
