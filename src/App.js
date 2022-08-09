import React from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import Clarifai from 'clarifai';
import placeholder from './components/Logo/placeholder.png';

const app = new Clarifai.App({
 apiKey: '15213ace8fe2459eba5522c4b00f5eae'
});

const particlesInit = async (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: placeholder,
      box: {},
      route: 'signin'
    }
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

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
 
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input     
      )
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }


render() {
  const { route, imageUrl, box } = this.state;

  return (
    <div className="App">
      {
        route === 'home' ? 
        <div>
         <Navigation onRouteChange={this.onRouteChange}/>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl = {imageUrl} />
        </div> 
        : 
        (route === 'signin') ?
        <SignIn onRouteChange = {this.onRouteChange} /> 
        :
        <Register onRouteChange = {this.onRouteChange} />
      }
       <Particles
            className='particles'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                    opacity: 0
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 700,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.2,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
          />
      </div>
    );
  }
}

export default App;