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
  }


  async saveImg() {

    let image = document.getElementById('meme-image')

    let canvas = document.getElementById('card-canvas')
    let canvasRect = canvas.getBoundingClientRect()

    let topText = document.getElementById('top-text')
    let topTextRect = topText.getBoundingClientRect()

    let bottomText = document.getElementById('bottom-text')
    let bottomTextRect = bottomText.getBoundingClientRect()

    let ctx = canvas.getContext("2d")
    ctx.width = canvas.width
    ctx.height = canvas.height

    ctx.drawImage(image, 0, 0, canvas.witdth, canvas.height )
    ctx.translate(0, topTextRect.top - canvasRect.top + 15)


    let download = document.getElementById('download')
    let imageDownload = canvas.toDataURL("image/png")
    download.setAttribute("href", imageDownload)
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
          <div  id="container" className="meme">
            <img id="meme-image" crossOrigin="Anonymous" src={this.state.randomImg} alt="problem?"/>
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
        <a type="button" className="img-button"
          id="download"
          href=""
          download="download.png">
            Save
        </a>
        <canvas id ="card-canvas" style={{position: 'absolute'}}></canvas>
          
      </div>
    )
  }
}

export default MemeGenerator