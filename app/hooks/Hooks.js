import React from 'react'

export function useHover() {
  const [hovering, setHovering] = React.useState(false)
  
  return [hovering, {
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false)
  }]

}
