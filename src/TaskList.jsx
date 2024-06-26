import { useContext } from 'react'
import ListContext from './ListContext'
import Task from './Task'
import './styles/TaskList.scss'

function TaskList() {
    const { list, emptyList } = useContext(ListContext)

    return (
        <ul className='task-list'>
            {
                emptyList ?
                    <h6>No hay tareas :/</h6> :
                    list.map(taskData =>
                        <Task
                            key={taskData.ID}
                            ID={taskData.ID}
                            name={taskData.name}
                            color={taskData.color}
                            completed={taskData.completed}
                        />
                    )
            }
        </ul>
    )
}

export default TaskList