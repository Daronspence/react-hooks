// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function getStorage(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function useLocalStorageState(key, inputValue = '') {
  const [value, setValue] = React.useState(() => getStorage(key) || inputValue)

  React.useEffect(() => {
    setStorage(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('person-name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="T-Rex" />
}

export default App
