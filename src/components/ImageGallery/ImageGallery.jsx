import { useState, useEffect } from 'react';
import api from 'components/sevices/searchAPI';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import Load from 'components/Loading/Loading';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default function ImageGallery({ searchImage }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(null);
  const [openedImage, setOpenedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchImage) {
      return;
    }
    setPage(1);
    setStatus('pending');
    api
      .getImages(searchImage)
      .then(({ hits, totalHits }) => {
        if (totalHits) {
          setImages(hits);
          setPage(prevPage => prevPage + 1);
          setTotal(totalHits);
          setStatus('resolved');
        } else
          return Promise.reject(
            new Error(`No matches with query: ${searchImage}`)
          );
      })
      .catch(({ message }) => {
        setError(message);
        setStatus('rejected');
      });
  }, [searchImage]);

  const onLoadMore = () => {
    api
      .getImages(searchImage, page)
      .then(({ hits }) => {
        if (hits.length > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setPage(prevPage => prevPage + 1);
        } else
          return Promise.reject(
            new Error(`No matches with query: ${searchImage}`)
          );
      })
      .catch(({ message }) => {
        setError(message);
        setStatus('rejected');
      });
  };
  const handleOpenPicture = (src, tags) => {
    const currentImage = {
      src,
      tags,
    };
    setOpenedImage(currentImage);
  };

  const handleClosePicture = evt => {
    if (evt.target.nodeName === 'DIV' || evt.code === 'Escape')
      setOpenedImage(null);
  };

  if (status === 'idle') return <h2 className="title">Enter you request</h2>;
  if (status === 'pending') return <Load />;
  if (status === 'rejected')
    return (
      <div className="Error">
        <h2 className="title">{error}</h2>
        <img
          src="https://www.2dsl.ru/wp-content/uploads/kak-ispravit-oshibku-404not-found-469152c.jpg"
          alt="error 404"
          width="1000"
          height="1000"
        />
      </div>
    );
  if (status === 'resolved')
    return (
      <div>
        <ImageGalleryList>
          <ImageGalleryItem images={images} onClick={handleOpenPicture} />
        </ImageGalleryList>
        {images.length < total ? (
          <Button onClick={onLoadMore} />
        ) : (
          Notify.info(`Matches with query: ${images.length}`)
        )}
        {openedImage && (
          <Modal openedImage={openedImage} closeModal={handleClosePicture} />
        )}
      </div>
    );
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string,
};
