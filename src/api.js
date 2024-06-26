export const apiGetTasks = async () => {
    await fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const apiAddTask = async data => {
    await fetch('http://localhost:3000/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const apiCompleteTask = async ({ ID, completed }) => {
    await fetch(`http://localhost:3000/task/${ID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const apiRemoveTasks = async taskIDs => {
    await fetch('http://localhost:3000/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskIDs)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}