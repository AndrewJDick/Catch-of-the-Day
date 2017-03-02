import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {

  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    })
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];

    // Take a copy of the fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }

    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];

    return (
      <div key={key} className='fish-edit'>
        <input type='text' name='name' value={fish.name} placeholder='Fish Name' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price} placeholder='Fish Price' onChange={(e) => this.handleChange(e, key)} />
        <select type='text' name='status' value={fish.status} placeholder='Fish Status' onChange={(e) => this.handleChange(e, key)}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type='text' name='desc' value={fish.desc} placeholder='Fish Desc' onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type='text' name='image' value={fish.image} placeholder='Fish Image' onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    // Log out of Firebase
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    if (err) {
      console.log(err);
      return;
    }

    // Grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // Query the database
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // Set user as owner on Firebase if no owner exists
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      // Set the owner in local storage
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderLogin() {
    return(
      <nav className='login'>
        <h2> Inventory </h2>
        <p> Sign in to see your store's inventory</p>
        <button className='github' onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className='facebook' onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
        <button className='twitter' onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
      </nav>
    )
  }

  render() {

    const logout = <button onClick={this.logout}> Logout! </button>;

    // Check if anyone is logged in
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p> Sorry, you are not the owner of this store </p>
          {logout}
        </div>
      )
    }

		return (
		  <div>
        <h2> Inventory </h2>
        {logout}
        { Object.keys(this.props.fishes).map(this.renderInventory) }
        <AddFishForm addFish={ this.props.addFish } />
        <button onClick={this.props.sampleFishes}> Add sample fish </button>
      </div>
		)
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  sampleFishes: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;
