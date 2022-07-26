import React, { useEffect, useRef, useState } from 'react'
import Todolist from './component/Todolist'
import './App.css'
import axios from 'axios'

export default function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const selectEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get(`https://opentdb.com/api_category.php`)
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])
  

  function decodeString(str){
    const textarea = document.createElement('textarea')
    textarea.innerHTML = str
    return textarea.value
  }

  function handleSub(e){
    e.preventDefault()

    axios.get(`https://opentdb.com/api.php`, 
      {
        params: {
          amount: amountEl.current.value,
          category: selectEl.current.value
        }
      }
    )
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }


  return (
    <div>
      <form  className="header" onSubmit={handleSub}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="" id="category" ref={selectEl}>
            {
              categories.map(category => {
                return <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              })
            }
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Number of Question</label>
          <input type="number" name="" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>

        <div className="form-group">
          <button>Generate</button>
        </div>

      </form>

      <div className='container'>
        <Todolist flashcards={flashcards} />
      </div>
    </div>
  )
}

const sampleCard = [
  {
    id: 1,
    question: 'what is 2+2?',
    answer: '4',
    options: [
      '2', '5','4','6'
    ]
  },
  {
    id: 1,
    question: 'what is 2+3?',
    answer: '5',
    options: [
      '2', '5','4','6'
    ]
  }
]