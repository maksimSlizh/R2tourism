import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SINGIN_ROUTE, SINGUP_ROUTE } from '../../../utils/const'
import {registration, login} from '../../../http/user'

export function AccountAccess() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const isLogin = location.pathname === SINGIN_ROUTE

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
    } catch (e) {
      alert(e)
    }

    setEmail('')
    setPassword('')
  }


  return (
    <form onSubmit={handleSubmit} className='account-form w-50 d-flex flex-column m-auto mt-5'>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="form-control" />
        <div className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        className="form-control" />
      </div>
      <div className='mb-3'>
        {isLogin ? <p>Don't have an account? <NavLink to={SINGUP_ROUTE}>Sing up</NavLink></p> : <p>Have an account? <NavLink to={SINGIN_ROUTE}>Sing in</NavLink></p>}
      </div>
      <button type="submit" className="btn btn-primary w-25">Submit</button>
    </form>
  )
}
