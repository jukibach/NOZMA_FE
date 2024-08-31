import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Authentication/Login'
import ExerciseTables from './pages/Exercises/ExerciseTable'

export default function AllRoutes() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />{' '}
          <Route path='/exercises' element={<ExerciseTables />} />
        </Routes>
      </BrowserRouter>
  )
}
