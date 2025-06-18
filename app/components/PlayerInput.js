import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'

export default function PlayerInput(props) {

  const [username, setUsername] = React.useState('')
  const context = React.useContext(ThemeContext)

  const handleUserNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(username)
  }


  return (

    <form onSubmit={handleSubmit} className='column player'>
      <label htmlFor='username' className='player-label'>
        {props.label}
      </label>
      <div className='row player-inputs'>

        <input type='text'
          id='username'
          className={`input-${context.theme}`}
          placeholder='github username'
          value={username}
          onChange={handleUserNameChange}
          autoComplete='off'
        />
        <button type='submit' className={`btn ${context.theme === 'dark'? 'light-btn' : 'dark-btn'}`} disabled={!username}>
          Submit
        </button>
      </div>
    </form>


  )

}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}
