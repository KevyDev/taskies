import { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateTask from './CreateTask'
import Home from './Home'
import ListContext from './ListContext'

function App() {
	const { loadList } = useContext(ListContext)

	useEffect(() => {
		loadList()
		window.addEventListener("storage", loadList)
		return () => window.addEventListener("storage", loadList)
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/add' element={<CreateTask />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
