import React from 'react'
import Loader from '../../components/Loader/Loader'

const Loading = ({ onComplete }) => {
  return (
    <div>
      <Loader onComplete={onComplete} />
    </div>
  )
}

export default Loading
