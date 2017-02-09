import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {

    // Required in the constructor
    super();

    // Binds the addFish method to App when it is initialised
    this.addFish = this.addFish.bind(this);

    // Define the initial state when App is initialized
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {

    // Store the current state of fishes and a timestamp(ms)
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();

    // Add the fish to the fishes state
    fishes[`fish-${timestamp}`] = fish;

    // Update the fishes state. Important to update only what is required, rather than the global state
    // ES6 shorthand for this.setState(fishes = fishes)
    this.setState({fishes});

    console.log(this);
  }

  render() {
    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
