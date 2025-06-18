import React from 'react'
import PropTypes from 'prop-types'
import { FaAngleDoubleRight, FaAngleRight, FaAngleDoubleLeft, FaAngleLeft } from 'react-icons/fa'

export default function Paginator(props) {

  const { current, total, size } = props;
  let showingOf = current * size;
  showingOf = showingOf < total ? showingOf : total
  const showing = ((current * size) - size) + 1

  return (
    <React.Fragment>
      <ul className='flex-center '>
        <li>
          <button className='btn-pagination btn-clear nav-link' onClick={()=> props.first()}>
            <FaAngleDoubleLeft size={22}/>
          </button>
        </li>
        <li>
          <button className='btn-pagination btn-clear nav-link' onClick={() => props.previous()}>
            <FaAngleLeft size={22}/>
          </button>
        </li>
        <li>
          <h5>
            showing {showing} - {showingOf} of {total} records
          </h5>
        </li>
        <li>
          <button className='btn-pagination btn-clear nav-link' onClick={() => props.next()}>
            <FaAngleRight size={22}/>
          </button>
        </li>
        <li>
          <button className='btn-pagination btn-clear nav-link' onClick={() => props.last()}>
            <FaAngleDoubleRight size={22}/>
          </button>
        </li>
      </ul>
    </React.Fragment>
  )

}

Paginator.propTypes = {
  total: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  next: PropTypes.func,
  previous: PropTypes.func,
  first: PropTypes.func,
  last: PropTypes.func
}
