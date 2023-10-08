import { ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <>
      <ItemImage src={webformatURL} alt={tags} loading="lazy" />
    </>
  );
};
