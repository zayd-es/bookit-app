import React from 'react'

const Heading = ({title}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h1>
    </div>
  )
}

export default Heading