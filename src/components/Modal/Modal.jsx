import { useEffect } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

export const Modal = ({ onClose, largeImage, images }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.target.nodeName === 'DIV' || e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalContent>
        <img src={largeImage} alt={images.tags} />
      </ModalContent>
    </Overlay>
  );
};
