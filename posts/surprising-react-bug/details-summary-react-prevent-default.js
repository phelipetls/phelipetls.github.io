import { useState } from 'react'

export function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span>State: {isOpen ? 'open' : 'closed'}</span>

      <details open={isOpen}>
        <summary
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
        >
          Summary
        </summary>
        Details
      </details>
    </>
  )
}
