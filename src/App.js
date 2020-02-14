import React from 'react'
import axios from 'axios'
import Form from './Form'

class App extends React.Component {
  state = {
    messages: []
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
      <Form resource='channel' />

      <Form resource='message' />

      {paragraphs}
    </div>
  }
}

export default App;
