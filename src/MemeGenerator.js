import React from 'react'
import './MemeGenerator.css'

class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      memeImgs: [],
      randomImg: "http://i.imgflip.com/1bij.jpg"
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        console.log(memes[0].url)
        this.setState({memeImgs: memes})
      })
  }

  render() {
    return (
      <div className="meme">
        <img src={this.state.randomImg} alt="problem?"/>
      </div>
    )
  }
}

export default MemeGenerator