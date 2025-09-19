import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/layout/layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './Components/Profile/Profile';
import PostAllComments from './Components/Post/PostAllComments';

function App() {
  const client = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute ><Home /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'profile', element: <ProtectedRoute ><Profile /> </ProtectedRoute> },
        { path: 'post/:id', element: <ProtectedRoute ><PostAllComments /> </ProtectedRoute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])
  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
