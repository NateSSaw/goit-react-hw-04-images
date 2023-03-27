import { Component } from 'react';
import api from 'components/sevices/searchAPI';
import { Notify } from 'notiflix';
import Load from 'components/Loading/Loading';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: Status.IDLE,
    openedImage: false,
    totalHits: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchImage !== this.props.searchImage) {
      this.setState({ status: Status.PENDING, page: 1 });
      api
        .getImages(this.props.searchImage)
        .then(({ hits, totalHits }) => {
          if (totalHits > 0) {
            this.setState({
              images: hits,
              status: Status.RESOLVED,
              page: 2,
              totalHits,
            });
          } else
            return Promise.reject(
              new Error(`No matches on request ${this.props.searchImage}`)
            );
        })
        .catch(error => {
          this.setState({ error: error.message, status: Status.REJECTED });
        });
    }
  }

  handleOpenPicture = (src, tags) => {
    const openedImage = {
      src,
      tags,
    };
    this.setState({ openedImage });
  };

  handleClosePicture = evt => {
    if (evt.target.nodeName === 'DIV' || evt.code === 'Escape')
      this.setState({ openedImage: null });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    api
      .getImages(this.props.searchImage, this.state.page)
      .then(({ hits, totalHits }) => {
        if (totalHits > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
          }));
        } else
          return Promise.reject(
            new Error(`No matches on request ${this.props.searchImage}`)
          );
      })
      .catch(error => {
        this.setState({ error: error.message, status: Status.REJECTED });
      });
  };

  render() {
    const { images, status, error, openedImage, totalHits } = this.state;
    if (status === Status.IDLE)
      return <h2 className="title">Enter you request</h2>;
    if (status === Status.PENDING) return <Load />;
    if (status === Status.REJECTED)
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
    if (status === Status.RESOLVED)
      return (
        <div>
          <ImageGalleryList>
            <ImageGalleryItem
              images={images}
              onClick={this.handleOpenPicture}
            />
          </ImageGalleryList>
          {images.length < totalHits ? (
            <Button onClick={this.onLoadMore} />
          ) : (
            Notify.info(`Matches with query: ${images.length}`)
          )}
          {openedImage && (
            <Modal
              openedImage={openedImage}
              onClick={this.handleClosePicture}
            />
          )}
        </div>
      );
  }
}
