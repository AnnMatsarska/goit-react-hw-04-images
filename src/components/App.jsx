import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchedQuery: '',
  };

  handleSearchedQuery = searchedQuery => {
    this.setState({ searchedQuery });
  };

  render() {
    return (
      <>
        <Searchbar handleSearchedQuery={this.handleSearchedQuery} />
        <ImageGallery searchedQuery={this.state.searchedQuery} />
      </>
    );
  }
}
