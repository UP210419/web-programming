export async function getAllUsers() {
  const answer = await fetch("api/getUsers.php");
  const data = await answer.json();
  return data;
}

export async function getAllTasks() {
  const answer = await fetch("api/getTasks.php");
  const data = await answer.json();
  return data;
}

export async function getAllTask() {
  const answer = await fetch("api/getTask.php");
  const data = await answer.json();
  return data;
}
