import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Main } from '../pages/Main'
import { AccountAccess } from '../components/Auth/AccountAccess'
import { AccountRecovery } from '../components/Auth/AccountRecovery'
import { MAIN_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE, RECOVER_ROUTE } from '../utils/const'


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: MAIN_ROUTE,
        element: <Main />
      },
      {
        path: SIGNIN_ROUTE,
        element: <AccountAccess />
      },
      {
        path: SIGNUP_ROUTE,
        element: <AccountAccess />
      },
      {
        path: RECOVER_ROUTE,
        element: <AccountRecovery />
      }
    ]
  }
])
