import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClick);
  }

  render() {
    const {
      openedImage: { src, tags },
      onClick,
    } = this.props;
    return (
      <div className="Overlay" onClick={onClick}>
        <div className="Modal">
          <img src={src} alt={tags} />
        </div>
      </div>
    );
  }
}
