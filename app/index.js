import React from 'react'
import ReactDOM from 'react-dom'
import ThemeContext from './contexts/theme'
import './index.css'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const BattleResults = React.lazy(() => import('./components/BattleResults'))


function App(props) {

  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const themeValue = React.useMemo(() => ({
    theme,
    toggleTheme
  }), [theme])

  return (
    <Router>
      <ThemeContext.Provider value={themeValue}>
        <div className={theme}>
          <div className='container'>
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={BattleResults} />
                <Route render={() => <h1>404 - Ops the page you're looking for could not be found</h1>} />

              </Switch>
            </React.Suspense>

          </div>
        </div>
      </ThemeContext.Provider>
    </Router>

  )

}

ReactDOM.render(<App />, document.getElementById('app')
)
