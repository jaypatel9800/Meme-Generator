import React from "react"

class MemeGenerator extends React.Component {
    constructor() {
        super ()
        this.state = {
            topText : "",
            bottomText : "",
            RandomImage : "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []            
        }
        this.handle = this.handle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount () {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {const {memes} = response.data
        this.setState({allMemeImgs: memes})
        })
    }
    handle (event) {
        const {name, value} = event.target
        this.setState({ [name] : value })  
    }
    handleSubmit (event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const memeGem = this.state.allMemeImgs[randNum].url
        this.setState({RandomImage: memeGem })
    }
    
    render (){
        return (
            <div>
            <form className="meme-form" onSubmit={this.handleSubmit}>
            <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handle}/> 
            <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handle}/> 
            <button>Generate</button>
            </form>
            <div className="meme">
            <img src={this.state.RandomImage} alt=""/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
            </div>
            </div>
        )
    }
}

export default MemeGenerator