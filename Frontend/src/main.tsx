import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  PrivacyPolicy,
  TermsOfService,
  AllProject,
  AdminController,
  Review
} from './pages/index.ts'
import { Provider } from 'react-redux'
import { store } from './app/Store.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    path: '/all-projects',
    element: <AllProject />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfService />,
  },
  {
    path: '/user/review',
    element: <Review />,
  },
  {
    path: '/admin',
    element: <AdminController />,
  },
  {
    path: '/admin/login',
    element: <AdminController defaultView="login" />,
  },
  {
    path: '/admin/forget-password',
    element: <AdminController defaultView="forget-password" />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminController defaultView="dashboard" />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
