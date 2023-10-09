import { Component } from 'react';
import { fetchImages } from 'services/pixabay-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notifications } from './notifications/notifications';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    largeImage: {},
    query: '',

    error: null,

    isLoading: false,
    isLoadMore: false,
    isNeedShowModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const perPage = 12;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, isLoadMore: false });
        const fetchedImages = await fetchImages(query, page, perPage);
        const result = fetchedImages.hits;

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...result],
            isLoadMore: true,
          };
        });

        if (fetchedImages.totalHits < perPage * page && page !== 1) {
          this.setState({ isLoadMore: false });
        }

        if (result.length < perPage && page === 1) {
          this.setState({ isLoadMore: false });
        }

        if (result.length === 0 && page === 1) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.',
            notifications
          );
          this.setState({ isLoadMore: false });
        }
      } catch (error) {
        this.setState({
          error: toast.error(error.message, notifications),
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoadMore: false,
    }));
  };

  openModal = image => {
    this.setState(() => ({
      isNeedShowModal: true,
      largeImage: image,
    }));
  };

  closeModal = () => {
    this.setState({ isNeedShowModal: false, largeImage: '' });
  };

  render() {
    const { images, largeImage, isLoading, isLoadMore, isNeedShowModal } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {isNeedShowModal && (
          <Modal
            largeImage={largeImage}
            onClose={this.closeModal}
            images={images}
          />
        )}
      </>
    );
  }
}
