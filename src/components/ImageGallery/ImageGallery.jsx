import { Component } from 'react';
import { fetchImages } from 'services/pixabay-api';

import { ImageGalleryList, Item } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notifications } from '../notifications/notifications';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    largeImage: '',

    error: null,

    isLoading: false,
    isLoadMore: false,
    isNeedShowModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevProps.searchedQuery !== this.props.searchedQuery) {
      this.setState({ images: [] });
      this.handleRender(this.props.searchedQuery, page);
    } else if (prevState.page !== page) {
      this.handleRender(this.props.searchedQuery, page);
    }
  }

  handleRender = async (searchedQuery, page) => {
    try {
      const { page } = this.state;

      this.setState({ isLoading: true, isLoadMore: false });

      const fetchedImages = await fetchImages(searchedQuery, page);
      const result = fetchedImages.hits;

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...result],
          isLoadMore: true,
        };
      });

      if (fetchedImages.totalHits < 12 * page && page !== 1) {
        this.setState({ isLoadMore: false });
      }

      if (result.length < 12 && page === 1) {
        this.setState({ isLoadMore: false });
      }

      if (result.length === 0 && page === 1) {
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.',
          notifications
        );
        this.setState({ isMore: false });
      }
    } catch (error) {
      this.setState({
        error: toast.error(error.message, notifications),
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoadMore: false,
    }));
  };

  openModal = largeImage => {
    this.setState(({ isNeedShowModal }) => ({
      isNeedShowModal: true,
      largeImage,
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
        <ImageGalleryList>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <Item key={id} onClick={() => this.openModal(largeImageURL)}>
                <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
              </Item>
            );
          })}
        </ImageGalleryList>
        {isLoading && <Loader />}
        {isLoadMore && <Button onClick={this.onLoadMore} />}
        {isNeedShowModal && (
          <Modal
            largeImage={largeImage}
            images={images}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
