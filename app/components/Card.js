import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function Card(props) {

  const context = React.useContext(ThemeContext)

  const { header, subheader, avatar, name, link, login, children } = props
  return (

    <div className={`card bg-${context.theme}`}>
      <h1 className='header-lg center-text'>
        {header}
      </h1>
      <img className='avatar' src={avatar} alt={name}/>
      {subheader && (
        <h4 className='center-text'>{subheader}</h4>
      )}
      <h2 className='center-text'>
        <a className='link' target='_blank' href={link}>{login}</a>
      </h2>
      {children}
    </div>

  )

}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired
}
