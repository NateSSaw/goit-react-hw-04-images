import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ closeModal, openedImage: { src, tags } }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={src} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
