import React from 'react'
import ThemeContext from '../contexts/theme'
import { IoMdSunny, IoIosCloudyNight } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: `rgb(187, 46, 31)`
}

export default function Nav() {

  const context = React.useContext(ThemeContext)
  return(
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            className='nav-link'
            activeStyle={activeStyle} to='/battle'>Battle</NavLink>
        </li>
        <li>
          <NavLink
            className='nav-link'
            activeStyle={activeStyle} exact to='/'>Popular</NavLink>
        </li>
      </ul>
        <button className='btn-clear' onClick={context.toggleTheme}>
          {context.theme === 'dark' ? <IoMdSunny size={30} color='rgb(255, 215, 0)'/>
          : <IoIosCloudyNight size={30} color='rgb(0, 0, 0)'/>}
        </button>
    </nav>
  )

}
