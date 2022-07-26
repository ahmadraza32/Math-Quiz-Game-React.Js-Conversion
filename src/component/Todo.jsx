import React, { useEffect, useRef, useState } from 'react'

export default function Todo({flashcard}) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setmaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(() => {
    window.addEventListener('resize', setmaxHeight)

    return () => window.removeEventListener('resize', setmaxHeight)
  } ,[])

  useEffect(setmaxHeight, [flashcard.question, flashcard.answer, flashcard.options])

  return (
    <div onClick={() => setFlip(!flip)} className={`card ${flip && 'flip'}`}
    style={{height: height}}
    >
      
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {
            flashcard.options.map(option => {
              return <div className="flashcard-option" key={option}>{option}</div>
            })
          }
        </div>
      </div>

      <div className="back" ref={backEl}>{flashcard.answer} </div>
      
    </div>
  )
}
