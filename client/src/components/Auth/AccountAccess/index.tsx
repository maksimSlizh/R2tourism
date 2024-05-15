import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SIGNIN_ROUTE, SIGNUP_ROUTE, RECOVER_ROUTE } from '../../../utils/const'
import { registration, login } from '../../../http/user'


export function AccountAccess() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const isLogin = location.pathname === SIGNIN_ROUTE
  const isRegistration = location.pathname === SIGNUP_ROUTE

  const validatePassword = () => {
    if (isRegistration && password !== confirmPassword) {
      setError('passwords do not match')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isRegistration && !validatePassword()) {
      return
    }

    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password, username)
      }
    } catch (e) {
      alert('An error occurred: ' + e.message)
    }

    console.log('Form submitted')

    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className='account-form mt-5 mb-5' aria-label='Account form'>
      {isLogin ?
        <></>
        :
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="account-form__input"
            placeholder='username...' />
        </div>
      }
      <div className='mb-3'>
        <label className='form-label'>Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="account-form__input"
          aria-describedby="emailHelp"
          placeholder='some@email.com' />
        <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor='password' className="form-label">Password</label>
        <input
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="account-form__input" />
      </div>
      {isLogin ?
        <></>
        :
        <div className='mb-3'>
          <label htmlFor='repeatPassword' className='form-label'>Repeat password</label>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            id='repeatPassword'
            className="account-form__input"
            placeholder='repeat password...' />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      }
      {isLogin ?
        <div className='mb-3'>
          <NavLink to={RECOVER_ROUTE} className='link'> Forgot password?</NavLink>
        </div>
        : <></>
      }
      <div className='mb-3'>
        {isLogin ?
          <p>Don't have an account? <NavLink to={SIGNUP_ROUTE} className='link'>Sing up</NavLink></p>
          :
          <p>Have an account? <NavLink to={SIGNIN_ROUTE} className='link'>Sing in</NavLink></p>
        }
      </div>
      <div className='d-flex justify-content-end'>
        {isLogin ?
          <button aria-label='Sign in' type="submit" className="button button-primary">Submit</button>
          :
          <button aria-label='Sign up' type="submit" className="button button-primary">Sing up</button>
        }
      </div>
    </form>
  )
}
