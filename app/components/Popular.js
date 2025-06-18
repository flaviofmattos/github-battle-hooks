import React from 'react'
import PropTypes from 'prop-types'
import ReposGrid from './ReposGrid.js'
import Paginator from './Paginator.js'
import BattleApi from '../utils/api.js'
import Loading from './Loading'


function LanguagesNav(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <React.Fragment>
      <ul className='flex-center'>
        {
          languages.map((language) => (
            <li key={language}>
              <button
                value={language}
                className={language === props.selected ? 'btn-clear nav-link btn-selected' : 'btn-clear nav-link'}
                onClick={() => props.onUpdateLanguage(language, 1)}>
                {language}
              </button>
            </li>
          ))
        }
      </ul>

    </React.Fragment>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function popularReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      total: action.data.total,
      repos: Object.assign(state.repos, { [[state.selectedLanguage, state.page]]: action.data.repos }),
      error: null,
      loading: false
    }

  } else if (action.type === 'exception') {
    return {
      ...state,
      error: action.data.error,
      loading: false
    }
  } else if (action.type === 'firstPage') {
    return {
      ...state,
      page: 1,
    }
  } else if (action.type === 'nextPage') {
    return {
      ...state,
      page: state.page + 1,

    }
  } else if (action.type === 'previousPage') {
    return {
      ...state,
      page: state.page - 1,

    }
  } else if (action.type === 'lastPage') {
    let last = Math.trunc(1000 / 12)
    const mod = 1000 % 12
    if (mod !== 0) {
      last = last + 1
    }
    return {
      ...state,
      page: last
    }
  } else if (action.type === 'selectLanguage') {
    return {
      ...state,
      page: action.data.page,
      selectedLanguage: action.data.selectedLanguage
    }
  } else if (action.type === 'loading') {
    return {
      ...state,
      loading: true
    }
  }
}

function shouldLoadData(array, page, language) {
  let shouldLoadData = true
  if (array === null) {
    return shouldLoadData
  }
  for (const item in array) {
    if (item === `${language},${page}`) {
      shouldLoadData = false;
      break;
    }
  }
  return shouldLoadData;
}

export default function Popular(props) {

  const [state, dispatch] = React.useReducer(popularReducer, {
    selectedLanguage: 'All',
    page: 1,
    totalRecords: 0,
    error: null,
    repos: [],
    loading: true
  })

  const fetchedLanguages = React.useRef(null)

  React.useEffect(() => {

    if (shouldLoadData(fetchedLanguages.current, state.page, state.selectedLanguage)) {

      if (fetchedLanguages.current === null) {
        fetchedLanguages.current = {}
      }
      fetchedLanguages.current = Object.assign(fetchedLanguages.current, { [[state.selectedLanguage, state.page]]: state.selectedLanguage })

      dispatch({ type: 'loading' })
      new BattleApi(window.location).fetchRepositories(state.selectedLanguage, state.page)
        .then((repos) => {
          dispatch({
            type: 'success',
            data: {
              total: repos.total_count,
              repos: repos.items
            }
          })
        }).catch((e) => {
          console.warn(e.message)
          dispatch({
            type: 'exception',
            data: {
              error: 'There was an error loading repos'
            }
          })
        })
    }
  }, [state.page, state.selectedLanguage, fetchedLanguages])

  const nextPage = () => {
    dispatch({ type: 'nextPage' })
  }

  const previousPage = () => {
    dispatch({ type: 'previousPage' })
  }

  const firstPage = () => {
    dispatch({ type: 'firstPage' })
  }

  const lastPage = () => {
    dispatch({ type: 'lastPage' })
  }

  const updateLanguage = (language, page) => {
    dispatch({ type: 'selectLanguage', data: { selectedLanguage: language, page: page } })
  }


  return (
    <React.Fragment>
      <LanguagesNav selected={state.selectedLanguage} onUpdateLanguage={updateLanguage} />
      {state.loading && <Loading />}
      {state.errors && <p>{state.errors}</p>}
      {state.repos && state.repos[[state.selectedLanguage, state.page]] && <ReposGrid repos={state.repos[[state.selectedLanguage, state.page]]} size={12} current={state.page} />}
      {state.repos && state.repos[[state.selectedLanguage, state.page]] && <Paginator total={state.total} size={12} current={state.page} next={nextPage}
        previous={previousPage} first={firstPage} last={lastPage} />}

    </React.Fragment>
  )

}
