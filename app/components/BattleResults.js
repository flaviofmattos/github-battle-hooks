import React from 'react'
import PropTypes from 'prop-types'
import BattleApi from '../utils/api.js'
import { MdLocationOn, MdPerson, MdGroup } from 'react-icons/md'
import { GoBriefcase, GoRepo } from 'react-icons/go'
import { TiGroup } from 'react-icons/ti'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function battleResultReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      winner: action.data.winner,
      loser: action.data.loser,
      errors: null,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      errors: action.data.error,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      ...state,
      loading: true,
      errors: null
    }
  }
}

export default function BattleResults(props) {

  const [state, dispatch] = React.useReducer(battleResultReducer, {
    winner: null,
    loser: null,
    errors: null,
    loading: true
  })

  React.useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(props.location.search)
    new BattleApi(window.location).battle(playerOne, playerTwo).then((result) => {
      dispatch({
        type: 'success',
        data: {
          winner: result.winner,
          loser: result.loser
        }
      })
    }).catch((e) => {
      dispatch({ type: 'error', data: { error: e.message } })
    })
  }, [])


  const { winner, loser, loading, errors } = state

  if (loading === true) {
    return <Loading text='Waiting for results' speed={200} />
  }
  if (errors) {
    return <p>Error ... {errors} </p>
  }

  if (loading === false) {
    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>

          <Card header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url} name={winner.profile.name}
            link={winner.profile.html_url} login={winner.profile.login}>
            <ProfileList player={winner} />
          </Card>

          <Card header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url} name={loser.profile.name}
            link={loser.profile.html_url} login={loser.profile.login}>
            <ProfileList player={loser} />
          </Card>

        </div>
        <Link to='/battle' className='btn dark-btn btn-space'>Reset</Link>
      </React.Fragment>

    )
  }

}

function ProfileList({ player }) {
  return (
    <ul className='card-list'>
      <li color='rgb(239, 115, 115)'>
        <MdPerson size={22} color='#ff0000' />
        {player.profile.name}
      </li>
      {player.profile.location && (
        <Tooltip text="User's location">
          <li>
            <MdLocationOn color='rgb(144, 115, 255)' size={22} />
            {player.profile.location}
          </li>
        </Tooltip>
      )}
      {player.profile.company && (
        <Tooltip text="User's company">
          <li>
            <GoBriefcase color='#795548' size={22} />
            {player.profile.company}
          </li>
        </Tooltip>
      )}
      <li>
        <TiGroup color='rgb(129, 195, 245)' size={22} />
        {player.profile.followers.toLocaleString()} followers
      </li>
      <li>
        <MdGroup color='rgb(64, 183, 95)' size={22} />
        {player.profile.following.toLocaleString()} following
      </li>
      <li>
        <GoRepo size={22} />
        {player.profile.public_repos} repositories
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  player: PropTypes.object.isRequired
}
