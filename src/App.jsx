import { useContext, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CreateTask from './CreateTask'
import Home from './Home'
import ListContext from './ListContext'

function App() {
	const { loadList } = useContext(ListContext)

	useEffect(() => {
		loadList()
		window.addEventListener('storage', loadList)
		return () => window.addEventListener('storage', loadList)
	}, [])

	return (
		<HashRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/add' element={<CreateTask />} />
			</Routes>
		</HashRouter>
	)
}

export default App
