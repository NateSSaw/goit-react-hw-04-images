import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <Searchbar handleSearch={setQuery} />

      <ImageGallery searchImage={query} />
    </div>
  );
}
