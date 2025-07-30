import React from 'react'

const Header = ({text}) => {
  return (
      <header className="text-center">
        <h1 className="text-3xl">{text}</h1>
      </header>
  )
}

export default Header
