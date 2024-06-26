import { useContext } from 'react'
import { SvgCheck } from './Icons'
import ListContext from './ListContext'

function Task({ ID, name, color, completed }) {
    const { completeTask, toRemove, toRemoveList, toggleToRemove } = useContext(ListContext)

    let selected = toRemove && toRemoveList.find(taskID => taskID === ID)

    return (
        <li className={'task' + (completed ? ' completed' : '') + (selected ? ' selected' : '')} style={{ borderBottomColor: color }}>
            <p>{name}</p>
            <button onClick={() => toRemove ? toggleToRemove(ID) : completeTask(ID)}>
                {(selected || (!toRemove && completed)) && <SvgCheck />}
            </button>
        </li>
    )
}

export default Task

