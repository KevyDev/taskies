import { createContext, useState } from 'react';
import { apiAddTask, apiCompleteTask, apiGetTasks, apiRemoveTasks } from './api';

const ListContext = createContext()

export const ListProvider = ({ children }) => {
    const [list, setList] = useState([]),
        [toRemove, setToRemove] = useState(false),
        [toRemoveList, setToRemoveList] = useState([])

    const loadList = async () => {
        // API sync
        let remoteData = apiGetTasks()

        // Local sync
        let localData = JSON.parse(localStorage.getItem('list') || '[]')
        setList(localData)
    }

    const saveChanges = newList => {
        setList(newList)
        localStorage.setItem('list', JSON.stringify(newList))
    }

    const addTask = async (name, color) => {
        let newTask = { ID: Date.now(), name, color, completed: false },
            newList = [newTask, ...list]

        // API sync
        apiAddTask({
            ID: newTask.ID,
            name: newTask.name,
            color: newTask.color
        })

        // Local sync
        saveChanges(newList)
    }

    const completeTask = async taskID => {
        let completed = false,
            newList = list.map(task => {
                if (task.ID === taskID) {
                    task.completed = !task.completed
                    completed = task.completed
                }
                return task
            })

        // API sync
        apiCompleteTask({
            ID: taskID,
            completed
        })

        // Local sync
        saveChanges(newList)
    }

    const setRemoving = value => {
        setToRemove(value)
        !value && setToRemoveList([])
    }

    const toggleToRemove = taskID => {
        let newList = toRemoveList.find(ID => ID === taskID) ? toRemoveList.filter(ID => ID !== taskID) : [...toRemoveList, taskID]
        setToRemoveList(newList)
    }

    const removeTasks = async () => {
        let newList = list.filter(task => !toRemoveList.find(IDToRemove => IDToRemove === task.ID))

        // API sync
        apiRemoveTasks({
            taskIDs: toRemoveList
        })

        // Local sync
        setRemoving(false)
        saveChanges(newList)
    }

    return (
        <ListContext.Provider value={
            {
                list,
                emptyList: list.length === 0,
                loadList,
                addTask,
                completeTask,
                toRemove,
                toRemoveList,
                emptyToRemoveList: toRemoveList.length === 0,
                setRemoving,
                toggleToRemove,
                removeTasks
            }
        }>
            {children}
        </ListContext.Provider>
    )
}

export default ListContext