import React from 'react'
import axios from 'axios'

class Form extends React.Component {
  state = {
    value: ''
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const url = `http://localhost:4000/${this.props.resource}`

    try {
      const data = {
        [this.props.field]: this.state.value 
      }

      if (
        this.props.resource === 'message'
      ) {
        data.channelId = this.props.channelId
      }
      // We do not use the response in any way
      const response = await axios
        .post(url, data)

      this.clear()
      // this.setState({ value: '' })

      // This is just for testing
      console
        .log('response test:', response)
    } catch (error) {
      console.log(error)
    }
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
    const placeholder = `new ${this.props.resource}`

    return <form
      onSubmit={this.onSubmit}
    >
      <input
        type='text'
        value={this.state.value}
        placeholder={placeholder}
        onChange={this.onChange}
      />

      <button>submit</button>

      <button
        type='button'
        onClick={this.clear}
      >
        Clear
      </button>
    </form>
  }
}

export default Form
