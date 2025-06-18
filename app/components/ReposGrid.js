import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import { FaStar, FaCodeBranch, FaUserCircle, FaExclamationTriangle} from 'react-icons/fa'
import Tooltip from './Tooltip'

export default function ReposGrid( {repos, current, size} ) {
  const showing = current === 1 ? 1 : ((current * size) - size) + 1

  return (
    <ul className='grid'>
      
      {repos.map((repo, index) => {
        const{ name, owner, html_url, open_issues, stargazers_count, forks } = repo;
        const{ login, avatar_url} = owner;
        return (
            <Card header={`#${index + showing}`} avatar={avatar_url}
              name={name} link={html_url} login={login} key={name}>
              <ul className='card-list'>
                <Tooltip text="Github username">
                  <li>
                    <FaUserCircle size={22} color='rgb(255, 191, 116)'/>
                    <a href={`https://github.com/${login}`} target='_blank'>
                      {login}
                    </a>
                  </li>
                </Tooltip>
                <li>
                  <FaStar size={22} color='rgb(255, 215, 0)'/>
                  {stargazers_count} stars
                </li>
                <li>
                  <FaCodeBranch size={22} color='rgb(129, 195, 245)'/>
                  {forks} forks
                </li>
                <li>
                  <FaExclamationTriangle size={22} color='rgb(241, 138, 147)'/>
                  {open_issues} open issues
                </li>
              </ul>
            </Card>

        )
      })}
    </ul>

  )

}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired
}
