import React, { Component } from 'react';
import { Jumbotron, Footer, Thumbnail } from 'components';

export default class MainContainer extends Component {

  constructor (props) {
    super(props);
    this.state = { pictureList: [] };
  }

  componentDidMount () {
    return fetch('http://localhost:3000/pictures')
      .then(response => response.json())
      .then(pictureList => this.setState({ pictureList }));
  }

  render () {
    const { pictureList } = this.state;
    return (
      <div>
        <Jumbotron />
        <div className="container">
          <div className="row">
            {
              pictureList.map((picture, i) => <Thumbnail key={i} {...picture} />)
            }
          </div>

          <hr />

          <Footer />
        </div>
      </div>
    );
  }
}
