import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
import {useHover} from '../hooks/Hooks'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltiplight: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
  tooltipdark: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: '#fff',
    padding: '7px',
    marginBottom: '5px',
    color: 'hsla(0, 0%, 20%, 0.9)',
    textAlign: 'center',
    fontSize: '14px',
  }
}


export default function Tooltip( { children, text } ) {

  const context = React.useContext(ThemeContext)
  const [hovering, attrs] = useHover()

  return(
    <div style={styles.container} {...attrs}>
      {hovering === true && <div style={context.theme === 'light' ? styles.tooltiplight : styles.tooltipdark}>{text}</div>}
      {children}
    </div>
  )

}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
}
