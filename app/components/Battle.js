import React from 'react'
import PropTypes from 'prop-types'
import { FaTrophy, FaUserFriends, FaBackspace } from 'react-icons/fa'
import { GiSwordClash } from 'react-icons/gi'
import PlayerInput from './PlayerInput'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions() {

  const context = React.useContext(ThemeContext);

  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>
            Enter two Github users
          </h3>
          <FaUserFriends className={`bg-${context.theme}`} color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>
            Battle
          </h3>
          <GiSwordClash className={`bg-${context.theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>
            See the winner
          </h3>
          <FaTrophy className={`bg-${context.theme}`} color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
  )

}

function PlayerPreview({ username, label, onReset }) {

  const context = React.useContext(ThemeContext);

  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`row bg-${context.theme}`}>
        <div className='player-info'>
          <img className='avatar-sm'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar ${username}`} />
          <a href={`https://github.com/${username}`} className='link' target='_blank'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center btn-reset' onClick={onReset}>
          <FaBackspace size={26} color='rgb(194, 57, 42)' />
        </button>
      </div>
    </div>
  )

}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function battleReducer(state, action) {
  if (action.type === 'playerOne') {
    return {
      ...state,
      playerOne: action.data
    }
  } else if (action.type === 'playerTwo') {
    return {
      ...state,
      playerTwo: action.data
    }
  } else if (action.type === 'resetPlayerOne') {
    return {
      ...state,
      playerOne: null
    }
  } else if (action.type === 'resetPlayerTwo') {
    return {
      ...state,
      playerTwo: null
    }
  }
}


export default function Battle(props) {

  const [state, dispatch] = React.useReducer(battleReducer, {
    playerOne: null,
    playerTwo: null
  })

  return (
    <React.Fragment>
      <Instructions />
      <div className='players-container'>
        <h1 className='header-lg center-text'>Players</h1>
        <div className='row space-around'>
          {state.playerOne === null
            ?
            <PlayerInput
              label='Player One'
              onSubmit={(player) => dispatch({ type: 'playerOne', data: player })} />
            :
            <PlayerPreview username={state.playerOne} label='Player One' onReset={() => dispatch({ type: 'resetPlayerOne' })} />
          }
          {state.playerTwo === null
            ?
            <PlayerInput
              label='Player Two'
              onSubmit={(player) => dispatch({ type: 'playerTwo', data: player })} />
            :
            <PlayerPreview username={state.playerTwo} label='Player Two' onReset={() => dispatch({ type: 'resetPlayerTwo' })} />
          }

        </div>
        {
          state.playerOne && state.playerTwo &&
          <Link to={`/battle/results?playerOne=${state.playerOne}&playerTwo=${state.playerTwo}`} className='btn dark-btn btn-space'>Battle</Link>
        }

      </div>

    </React.Fragment>
  )

}
