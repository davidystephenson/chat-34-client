import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    messages: [],
    value: ''
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount () {
    this.stream.onmessage = event => {
      const { data } = event

      const action = JSON.parse(data)
      console.log('action test:', action)

      const { type, payload } = action

      if (type === 'ALL_MESSAGES') {
        this.setState({ messages: payload })
      }

      if (type === 'ONE_MESSAGE') {
        const messages = [
          ...this.state.messages,
          payload
        ]

        this.setState({ messages })
      }
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios
        .post(
          'http://localhost:4000/message',
          { text: this.state.value }
        )

      console
        .log('response test:', response)
    } catch (error) {
      console.log(error)
    }

    console.log('value test:', this.state.value)
  }

  onChange = (event) => {
    const { value } = event.target

    this.setState({ value })
  }

  clear = () => {
    console.log('clear test')
    this.setState({ value: '' })
  }

  render () {
    console.log('render state test:', this.state)
    const paragraphs = this
      .state
      .messages
      .map(message => <p
        key={message.id}
      >
        {message.text}
      </p>)

    return <div>
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type='text'
          value={this.state.value}
        />

        <button>submit</button>
      </form>

      <button onClick={this.clear}>
        Clear
      </button>

      {paragraphs}
    </div>
  }
}

export default App;
