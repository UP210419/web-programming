<?php

include "./partials/Connection.php";

$selectTaskId = $_POST['taskId'] ?? null;

if ($selectTaskId) {
    try {
        $deleteStatement = $conn->prepare("DELETE FROM task WHERE id = ?");
        $deleteStatement->execute([$selectTaskId]);
        echo "Task deleted successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
