import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImages();
    }
    // eslint-disable-next-line
  }, [query]);

  const fetchImages = async () => {
    const apiKey = '42074727-f1151295fbcc10abbb4f66773';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;

    setIsLoading(true);

    try {
      const response = await axios.get(url);
      const newImages = response.data.hits.filter(
        newImage => !images.some(image => image.id === newImage.id)
      );

      setImages(prevImages =>
        page === 1 ? newImages : [...prevImages, ...newImages]
      );
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = newQuery => {
    const searchTerm = newQuery.trim() === '' ? 'default' : newQuery;
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && <Button onClick={fetchImages} />}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;