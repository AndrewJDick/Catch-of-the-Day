import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {

    // Required in the constructor
    super();

    // Binds the methods to App when it is initialised
    this.addFish      = this.addFish.bind(this);
    this.sampleFishes = this.sampleFishes.bind(this);
    this.addToOrder   = this.addToOrder.bind(this);

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

  addToOrder(key) {

    // Take a copy of the current state when the method is called
    const order = {...this.state.order};

    // Update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;

    // Finally, update the state. ({order}) is shorthand for ({order: order})
    this.setState({order});

  }

  sampleFishes() {
    // Adds the fish objects from sample-fishes to App's fishes state.
    this.setState({fishes: sampleFishes});
  }

  render() {

    return(
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} sampleFishes={this.sampleFishes} />
      </div>
    )
  }
}

export default App;
