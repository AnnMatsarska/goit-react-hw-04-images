import { useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSearchedQuery = searchedQuery => {
    setSearchedQuery(searchedQuery);
  };

  return (
    <>
      <Searchbar handleSearchedQuery={handleSearchedQuery} />
      <ImageGallery searchedQuery={searchedQuery} />
    </>
  );
};
