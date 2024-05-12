import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Main } from '../pages/Main'
import { AccountAccess } from '../components/Auth/AccountAccess'
import { MAIN_ROUTE, SINGIN_ROUTE, SINGUP_ROUTE } from '../utils/const'


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: MAIN_ROUTE,
        element: <Main />
      },
      {
        path: SINGIN_ROUTE,
        element: <AccountAccess />
      },
      {
        path: SINGUP_ROUTE,
        element: <AccountAccess />
      }
    ]
  }
])
