import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ListContext from './ListContext'
import './styles/CreateTask.scss'

function CreateTask() {
    const { addTask } = useContext(ListContext),
        [name, setName] = useState(''),
        [color, setColor] = useState('#999999'),
        navigate = useNavigate()

    const onSubmitTask = e => {
        e.preventDefault()

        addTask(name, color)

        navigate('/')
    }

    return (
        <form className='create-task' onSubmit={onSubmitTask}>
            <h4>Agregar nueva tarea</h4>
            <div className='container'>
                <label htmlFor='name'>¿Qué quieres hacer?</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='E.g. Hacer la cena'
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    onBlur={e => setName(e.currentTarget.value.trim())}
                    required={true}
                />
            </div>
            <div className='container'>
                <label htmlFor='name'>Color</label>
                <input
                    type='color'
                    name='color'
                    id='color'
                    value={color}
                    onChange={e => setColor(e.currentTarget.value)}
                    list='presetColors'
                />
            </div>
            <div className='buttons'>
                <Link to='/' className='button gray'>Cancelar</Link>
                <button className='blue' type='submit'>Guardar</button>
            </div>
        </form>
    )
}

export default CreateTask