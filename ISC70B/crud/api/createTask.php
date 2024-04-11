<?php

include "./partials/Connection.php";

$Title = $_POST['title'] ?? null;
$userID = $_POST['users'] ?? null;

if ($Title && $userID) {
    try {
        $insertStatement = $conn->prepare("INSERT INTO task (idUser, title, completed) VALUES (?, ?, 0)");
        $insertStatement->execute([$userID, $Title]);
        echo "Task inserted successfully!";
    } catch (PDOException $e) {
        die($e->getMessage());
    }
} else {
    echo "Invalid request.";
}
?>
