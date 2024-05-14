import { useState } from 'react'

export function AccountRecovery() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(email)

    setEmail('')
  }
  return (
    <form onSubmit={handleSubmit} className='account-form mt-5 mb-5'>
      <div className='mb-3'>
        <label className='form-label'>Please enter your email wich you used to register</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="account-form__input"
          aria-describedby="emailHelp"
          placeholder='your@email.com' />
        <div id='emailHelp' className='form-text'>We'll send you a link to reset your password</div>
      </div>
      <div className='d-flex justify-content-end'>
        <button aria-label='Submit' type="submit" className="button button-primary">Submit</button>
      </div>
    </form >
  )
}
