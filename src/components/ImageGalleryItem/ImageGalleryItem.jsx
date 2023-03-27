export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li className="ImageGalleryItem" key={id}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onClick(largeImageURL, tags);
          }}
        />
      </li>
    );
  });
};
