import React from 'react'
import './MemeGenerator.css'
import './SaveButton'
import SaveButton from './SaveButton'

class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      memeImgs: [],
      randomImg: "http://i.imgflip.com/1bij.jpg",
      topText: "hello",
      bottomText: "goodbye",
      canvasWidth: "",
      canvasHeight: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveImg = this.saveImg.bind(this)
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.imageRef = React.createRef()
  }


  async saveImg() {
    
    let image = document.getElementById('meme-image')
    let imageWidth = this.imageRef.current.clientWidth
    let imageHeight = this.imageRef.current.clientHeight

    let canvas = document.getElementById('card-canvas')
    let canvasRect = canvas.getBoundingClientRect()

    let ctx = canvas.getContext("2d")
    canvas.width = imageWidth
    canvas.height = imageHeight
    ctx.strokeStyle = "white"
    ctx.font = 'bold 25px impact'
    ctx.fillStyle = 'white'
    ctx.shadowColor="black";
    ctx.shadowBlur= 10;
    
    console.log(this.imageRef.current.clientHeight)
    console.log(this.imageRef.current.clientWidth)
    console.log(canvas)


    // window.addEventListener("resize", this.resizeCanvas)
    // this.resizeCanvas(this.imageRef.current.clientWidth, this.imageRef.current.clientHeight)

    //draws image
    ctx.drawImage(image, 0, 0 )

    //draws top text
    ctx.fillText(this.state.topText.toUpperCase(), ((canvas.width / 2) - 20), 30)
    //draws bottom text
    ctx.fillText(this.state.bottomText.toUpperCase(), ((canvas.width / 2) - 20), 200)

    let download = document.getElementById('download')
    let imageDownload = canvas.toDataURL("image/png")
    download.setAttribute("href", imageDownload)

    //clear canvas
    ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
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
      window.addEventListener("resize", this.resizeCanvas)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas)
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
    this.resizeCanvas()
  }

    
  resizeCanvas(width, height) {
    // let image = document.getElementById("meme-image")
    let imageWidth = this.imageRef.current.clientWidth
    let imageHeight = this.imageRef.current.clientHeight

    console.log(width, height)
    this.setState(({
      canvasWidth: `${width}px`,
      canvasHeight: `${height}px`
    }))
    
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
            <img ref={this.imageRef} id="meme-image" crossOrigin="Anonymous" src={this.state.randomImg} alt="problem?"/>
            <h2 id="top" className="top-text">{this.state.topText}</h2>
            <h2 id="bottom" className="bottom-text">{this.state.bottomText}</h2>
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
          onClick={this.saveImg}
          download="download.png">
            <SaveButton />
        </a>
        <canvas id ="card-canvas"></canvas>
          
      </div>
    )
  }
}

export default MemeGenerator