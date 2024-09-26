import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from 'react-router-dom'
import Login from './pages/Authentication/Login'
import ExerciseTables from './pages/Exercises/ExerciseTable'
import Register from './pages/Authentication/Register'
import Logout from '@pages/Authentication/Logout'
import { AuthGuard } from '@guards/AuthGuard'
import SessionTimeout from '@pages/Authentication/SessionTimeout'
import Maintenance from '@pages/Authentication/Maintenance'

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <ExerciseTables />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/maintenance',
    element: <Maintenance />,
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/session-timeout',
        element: <SessionTimeout />,
      },
    ],
  },
])
