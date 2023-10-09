import { Component } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

export class Modal extends Component {
  componentDidMount = () => {
    const { onClose } = this.props;
    window.addEventListener('keydown', onClose);
  };

  componentWillUnmount() {
    const { onClose } = this.props;
    window.removeEventListener('keydown', onClose);
  }

  handleClick = evt => {
    const { onClose } = this.props;
    if (evt.target.nodeName === 'DIV' || evt.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { largeImage, images } = this.props;
    return (
      <Overlay onClick={this.handleClick}>
        <ModalContent>
          <img src={largeImage} alt={images.tags} />
        </ModalContent>
      </Overlay>
    );
  }
}
