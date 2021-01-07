import React from 'react'
import './MemeGenerator.css'
import html2canvas from 'html2canvas'

class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      memeImgs: [],
      randomImg: "http://i.imgflip.com/1bij.jpg",
      topText: "",
      bottomText: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.takeScreenShot = this.takeScreenShot.bind(this)
  }

   takeScreenShot() {
    html2canvas(document.getElementById("container"))
    .then(function (canvas) {
       document.body.appendChild(canvas);
       var base64URL = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
    });

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

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * this.state.memeImgs.length)
    const randomMemeImage = this.state.memeImgs[randomNumber].url
    this.setState({randomImg: randomMemeImage})
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            placeholder="top text"
            onChange={this.handleChange}
          />
        </form>
          <div className="meme">
            <img id="container" src={this.state.randomImg} alt="problem?"/>
            <h2 className="top-text">{this.state.topText}</h2>
            <h2 className="bottom-text">{this.state.bottomText}</h2>
          </div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="bottom text"
            onChange={this.handleChange}
          />
          <button>CREATE</button>
        </form>
        <br/>
          <button onClick={this.takeScreenShot}>Take PICTURE</button>
          hello world
      </div>
    )
  }
}

export default MemeGenerator