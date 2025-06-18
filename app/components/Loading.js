import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default function Loading(props) {

  const [content, setContent] = React.useState(props.text)

  React.useEffect(() => {
    const { speed, text } = props
    const intervalId = window.setInterval(() => {
      content === text + '...' ? setContent(text) : setContent((c) => c + '.')
    }, speed)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [content])


  return (
    <p style={styles.content}>
      {content}
    </p>
    )

}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
