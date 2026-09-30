import React from 'react'
import PasswordToggle from '../PasswordToggle'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <PasswordToggle />
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

export default BeforeLogin
