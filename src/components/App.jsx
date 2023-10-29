import { fetchImages } from '../Api/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { toast } from 'react-toastify';

import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [previousQueries, setPreviousQueries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        !hits.length && toast('Sorry, try other words');
        !totalHits &&
          hits.length &&
          toast.success(
            `Знайдено картинок за запитом: ${query} - ${totalHits}`
          );
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        console.error('Помилка під час завантаження зображень:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSetQuery = newQuery => {
    if (newQuery === query) {
      toast.error(`Ви вже виконали запит "${newQuery}" двічі підряд.`);
    } else {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
      setTotalHits(null);
      setPreviousQueries([...previousQueries, newQuery]);
    }
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalImage('');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar setQuery={handleSetQuery} />

      <ImageGallery images={images} onImageClick={handleImageClick} />
      {totalHits > images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {isLoading && <Loader />}
      {showModal && (
        <Modal largeImageURL={modalImage} onClose={handleModalClose} />
      )}
    </div>
  );
};
