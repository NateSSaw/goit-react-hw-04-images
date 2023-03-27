import { Loading } from 'notiflix';
import { Component } from 'react';

export default class Load extends Component {
  componentWillUnmount() {
    Loading.remove();
  }
  render() {
    return Loading.standard();
  }
}
