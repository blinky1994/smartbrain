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
import placeholder from './components/Logo/placeholder.png';

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

const initialState = {
     input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;
}
  

  loadUser = (data) => {
    this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
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

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
 
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
       fetch('https://dry-headland-17016.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input,
                 })
            })
             .then(response => response.json())
             .then((predictObj) => {
                if (predictObj) {
                    fetch('https://dry-headland-17016.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id,
                         })
                    })
                    .then(response => response.json())
                    .then(count => {
                        console.log(count);
                        this.setState(Object.assign(this.state.user, {
                            entries: count.entries
                        }));
                    })
                    .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(predictObj));
            }
     )
      .catch(console.log);
  }

  onRouteChange = (route) => {
    if (route =='signin')
    {
        this.setState(initialState);
    }
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
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrl = {imageUrl} />
        </div> 
        : 
        (route === 'signin') ?
        <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} /> 
        :
        <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
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