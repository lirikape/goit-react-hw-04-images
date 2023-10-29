import { fetchImages } from './Api/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { toast } from 'react-toastify';

import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    perPage: 12,
    totalHits: null,
    queryCounts: {},
    previousQueries: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        !hits.length && toast('Sorry, try other words');
        !this.state.totalHits &&
          hits.length &&
          toast.success(
            `Знайдено картинок за запитом: ${query} - ${totalHits}`
          );
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
        }));

        // console.log(hits);
      } catch (error) {
        console.error('Помилка під час завантаження зображень:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSetQuery = query => {
    const { previousQuery } = this.state;

    if (query === previousQuery) {
      toast.error(`Ви вже виконали запит "${query}" двічі підряд.`);
      // alert(`Ви вже виконали запит "${query}" двічі підряд.`);
    } else {
      this.setState({
        query,
        images: [],
        page: 1,
        totalHits: 0,
        previousQuery: query,
      });
    }
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, modalImage: largeImageURL });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  render() {
    const { images, modalImage, isLoading, showModal, totalHits } = this.state;
    return (
      <div>
        <Searchbar setQuery={this.handleSetQuery} />

        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />
        {totalHits > images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {isLoading && <Loader />}
        {showModal && (
          <Modal largeImageURL={modalImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}
