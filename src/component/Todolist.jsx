import React from 'react'
import Todo from './Todo'

export default function Todolist({flashcards}) {
  return (
    <div className='card-grid'>
      {
        flashcards.map(flashcard => {
          return <Todo flashcard={flashcard} key={flashcard.id} />
        })
      }
    </div>
  )
}
