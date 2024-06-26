import { useContext } from "react"
import { Link } from "react-router-dom"
import { SvgPlus, SvgTrashCan } from "./Icons"
import ListContext from "./ListContext"
import TaskList from "./TaskList"
import "./styles/Home.scss"

function Home() {
    const { emptyList, toRemove, toRemoveList, emptyToRemoveList, setRemoving, removeTasks } = useContext(ListContext)

    return (
        <>
            <header className="header">
                {
                    !toRemove ?
                        <nav className={emptyList ? "empty-list" : ""}>
                            <Link to='/add' className="button blue">
                                <SvgPlus />
                                <span>Agregar tarea</span>
                            </Link>
                            {!emptyList &&
                                <button className="red without-borders" onClick={() => setRemoving(true)}>
                                    <SvgTrashCan />
                                </button>
                            }
                        </nav>
                        :
                        <nav className="removing">
                            <button className="gray" onClick={() => setRemoving(false)}>Cancelar</button>
                            <button
                                className={"red" + (emptyToRemoveList ? " without-borders" : "")}
                                onClick={removeTasks}
                                disabled={emptyToRemoveList}
                            >
                                <span>Eliminar</span>
                                {!emptyToRemoveList && <span>({toRemoveList.length})</span>}
                            </button>
                        </nav>
                }
            </header>
            <TaskList />
        </>
    )
}

export default Home