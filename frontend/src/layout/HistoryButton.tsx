import React from 'react'
import { useNavigate } from 'react-router-dom'

export function GoBackButton() {
  const navigate = useNavigate()

  return(
  <div>
    <button onClick={(event:React.MouseEvent) => {
      navigate(-1)
    }}>
      Go Back
    </button>
  </div>
  )
}

export function GoForwardButton() {
  const navigate = useNavigate()

  return(
    <div>
      <button onClick={(event:React.MouseEvent) => {
        navigate(1)
      }}>
        Go Forward
      </button>
    </div>
    )
  }
