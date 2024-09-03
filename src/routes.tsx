import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Authentication/Login'
import ExerciseTables from './pages/Exercises/ExerciseTable'
import Register from './pages/Authentication/Register'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExerciseTables />} />
        <Route path='/login' element={<Login />} />
        <Route path='/exercises' element={<ExerciseTables />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
