import { Component } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeModal = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };
  render() {
    const { largeImage, images } = this.props;
    return (
      <Overlay onClick={this.closeModal}>
        <ModalContent>
          <img src={largeImage} alt={images.tags} />
        </ModalContent>
      </Overlay>
    );
  }
}
