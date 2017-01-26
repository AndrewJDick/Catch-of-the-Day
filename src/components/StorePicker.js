import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {

    // Regular JS to prevent the default page reload on form submit.
    event.preventDefault();

    // First grab the text from the box...
    console.log('You changed the url');

    // ...then transition from '/' to '/store/:storeId'
    console.log(this.storeInput.value);

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

export default StorePicker;
