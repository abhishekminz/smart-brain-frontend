import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LinkForm from './components/LinkForm/LinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Rank from './components/Rank/Rank';
import 'tachyons';

const particleOption = {
    particles: {
      number:{
        value: 90,
        density: {
          enable: true,
          value_area: 400
        }
      }
    }
  }

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      urlInput: '',
      route: 'signin',
      boundingBox: {},
      user: {
            id: "",
            name: "",
            entries: 0,
      }
    }
  }

 
  onUrlInput = (event) => {
    return(this.setState({input: event.target.value}));
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      entries: data.entries
    }})
    
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }  

  displayFace = (box) => {
    this.setState({boundingBox: box});
  } 

  onButtonSubmit = () => {
    fetch('http://localhost:3001/apicall', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              input: this.state.input
          })
    })
    .then(response => response.json())
    .then(response => {
      if(!(response === 'unable to make an API call')) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id 
          })
      })
      .then(response => response.json())
      .then(entryUpdate => this.setState(Object.assign(this.state.user, {entries: entryUpdate})))
      .catch(err => alert('Something went wrong with an API'))
      this.displayFace(this.calculateFaceLocation(response))
      }
      else{
        alert('Something went wrong with an API')
      }
    })
    .catch(err => alert('The picture does not have a face'));
    this.setState({urlInput: this.state.input})
  }

  onRouteChange = (routeReceive) => { 
    this.setState({route: routeReceive});
    this.setState({urlInput: ''});
  }

  render() {
    return(
    <div className="App">
      <Particles className='particles' 
                params={particleOption}
              />
      <Navigation routeState={this.state.route} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home' ? 
      <div>
      <Logo />
      <Rank userInfo={this.state.user}/>
      <LinkForm onUrlInput={this.onUrlInput} onButtonSubmit={this.onButtonSubmit}/>
      <ImageRecognition boundingBox={this.state.boundingBox} displayImage={this.state.urlInput}/>
    </div> 
    : ( this.state.route === 'signin' ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />:
    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     )
     }
    </div>
    );
  }
}

export default App;
