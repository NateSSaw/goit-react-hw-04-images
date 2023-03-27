import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };

  handleSearch = searchImage => {
    this.setState({ query: searchImage });
  };

  render() {
    return (
      <div className="App">
        <Searchbar handleSearch={this.handleSearch} />

        <ImageGallery searchImage={this.state.query} />
      </div>
    );
  }
}
