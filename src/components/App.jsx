import { useState, useEffect } from 'react';
import { fetchImages } from 'services/pixabay-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notifications } from './notifications/notifications';

export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState({});
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isNeedShowModal, setIsNeedShowModal] = useState(false);

  useEffect(() => {
    const perPage = 12;

    const getImages = async () => {
      try {
        if (query === '') return;

        setIsLoading(true);
        setIsLoadMore(false);

        const fetchedImages = await fetchImages(query, page, perPage);
        const result = fetchedImages.hits;

        setImages(prevImages => {
          return [...prevImages, ...result];
        });
        setIsLoadMore(true);

        if (fetchedImages.totalHits < perPage * page && page !== 1) {
          setIsLoadMore(false);
        }

        if (result.length < perPage && page === 1) {
          setIsLoadMore(false);
        }

        if (result.length === 0 && page === 1) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.',
            notifications
          );
          setIsLoadMore(false);
        }
      } catch (error) {
        setError(toast.error(error.message, notifications));
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, query, error]);

  // async componentDidUpdate(_, prevState) {
  //   const { page, query } = this.state;
  //   const perPage = 12;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     try {
  //       this.setState({ isLoading: true, isLoadMore: false });
  //       const fetchedImages = await fetchImages(query, page, perPage);
  //       const result = fetchedImages.hits;

  //       this.setState(prevState => {
  //         return {
  //           images: [...prevState.images, ...result],
  //           isLoadMore: true,
  //         };
  //       });

  //       if (fetchedImages.totalHits < perPage * page && page !== 1) {
  //         this.setState({ isLoadMore: false });
  //       }

  //       if (result.length < perPage && page === 1) {
  //         this.setState({ isLoadMore: false });
  //       }

  //       if (result.length === 0 && page === 1) {
  //         toast.warn(
  //           'Sorry, there are no images matching your search query. Please try again.',
  //           notifications
  //         );
  //         this.setState({ isLoadMore: false });
  //       }
  //     } catch (error) {
  //       this.setState({
  //         error: toast.error(error.message, notifications),
  //       });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
    setIsLoadMore(false);
  };

  const openModal = image => {
    setIsNeedShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setIsNeedShowModal(false);
    setLargeImage('');
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {isLoadMore && <Button onLoadMore={onLoadMore} />}
      {isNeedShowModal && (
        <Modal largeImage={largeImage} onClose={closeModal} images={images} />
      )}
    </>
  );
};
