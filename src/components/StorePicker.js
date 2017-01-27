import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {

    // Regular JS to prevent the default page reload on form submit.
    event.preventDefault();

    // First grab the text from the box...
    const storeId = this.storeInput.value;

    // ...then transition from '/' to '/store/:storeId'
    this.context.router.transitionTo(`store/${storeId}`);

  }

  render() {
    return (
      <form className="store-selector" onSubmit={ (e) => this.goToStore(e)} >
        { /* Example .jsx comment */ }
        <h2> Please Enter A Store </h2>
        <input type='text' placeholder='Store Name' defaultValue={ getFunName() } ref={ (input) => { this.storeInput = input} } required />
        <button type='submit'> Visit Store </button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
