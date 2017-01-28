import React, { Component } from 'react';

const filestackCDN = 'https://cdn.filestackcontent.com';

export default class AddContainer extends Component {

  constructor (props) {
    super(props);
    this.state = { handle: '', transformation: '' };
  }

  filestack () {
    return new Promise((resolve, reject) => {
      filepicker.pick (
        {
          mimetype: 'image/*',
          container: 'modal',
          services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
          openTo: 'COMPUTER',
        },
        Blob => {
          console.log(JSON.stringify(Blob));
          const handle = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
          resolve(handle);
        },
        FPError => {
          console.log(FPError.toString());
          reject(FPError.toString());
        },
     );
    });
  }

  handleClick = () => {
    this.filestack().then(handle => this.setState({
      handle,
      transformation: this.setTransformation(),
    }));
  }

  handleChange = () => {
    this.setState({ transformation: this.setTransformation() });
  }

  setTransformation = () => {
    const { getPolaroid, getTornEdges, getShadow, getWatermark } = this;
    return filestackCDN + getPolaroid() + getTornEdges() + getShadow() + getWatermark();
  }

  getPolaroid = () => {
    const { polaroid, polaroidColor } = this;
    return `${polaroid.checked
      ? `/polaroid=color:${polaroidColor.value}`
      : ''
    }`;
  }

  getTornEdges = () => {
    const {
      tornEdges,
      tornEdgesColor,
      tornEdgesSpreadX,
      tornEdgesSpreadY,
    } = this;
    return `${tornEdges.checked
      ? `/torn_edges=background:${tornEdgesColor.value},spread:[${tornEdgesSpreadX.value},${tornEdgesSpreadY.value}]`
      : ''
    }`;
  }

  getShadow = () => {
    const { shadow, shadowBlur, shadowVectorX, shadowVectorY } = this;
    return `${shadow.checked
      ? `/shadow=blur:${shadowBlur.value},vector:[${shadowVectorX.value},${shadowVectorY.value}]`
      : ''
    }`;
  }

  getWatermark = () => {
    return `${this.watermark.checked
      ? '/watermark=file:5dHB6cKbSx2w3NaU6R61,position:[top,right],s:15'
      : ''
    }`;
  }

  handleSubmit = () => {
    const { handle, transformation } = this.state;
    return fetch('http://localhost:3000/pictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.title.value,
        handle,
        url: transformation,
      }),
    })
    .then(response => response.json());
  }

  render () {
    const { handle, transformation } = this.state;
    return (
      <div className=".col-md-offset-4 media-list">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title text-center">
              <span className="glyphicon glyphicon-sunglasses" /> Upload Picture
            </h2>
          </div>
          <div className="panel-body" onChange={this.handleChange} >
            <form name="document-form" noValidate onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  placeholder="Enter the title..."
                  ref={(input) => this.title = input}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Polaroid Effect</label>
                <div className="checkbox">
                  <label>
                    <input
                      ref={(input) => this.polaroid = input}
                      type="checkbox"
                    /> Use?
                  </label>
                  <input
                    className="form-control"
                    defaultValue="white"
                    placeholder="white"
                    ref={(input) => this.polaroidColor = input}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Torn Edges</label>
                <div className="checkbox">
                  <label>
                    <input
                      ref={(input) => this.tornEdges = input}
                      type="checkbox"
                    /> Use?
                  </label>
                  <input
                    className="form-control"
                    defaultValue="white"
                    placeholder="white"
                    ref={(input) => this.tornEdgesColor = input}
                    type="text"
                  /> Color
                  <input
                    className="form-control"
                    defaultValue="1"
                    placeholder="1"
                    ref={(input) => this.tornEdgesSpreadX = input}
                    type="number"
                  /> X-Axis
                  <input
                    className="form-control"
                    defaultValue="10"
                    placeholder="10"
                    ref={(input) => this.tornEdgesSpreadY = input}
                    type="number"
                  /> Y-Axis
                </div>
              </div>
              <div className="form-group">
                <label>Shadow Effect</label>
                <div className="checkbox">
                  <label>
                    <input
                      ref={(input) => this.shadow = input}
                      type="checkbox"
                    /> Use?
                  </label>
                  <input
                    className="form-control"
                    defaultValue="10"
                    placeholder="10"
                    ref={(input) => this.shadowBlur = input}
                    type="number"
                  /> Blur
                  <input
                    className="form-control"
                    defaultValue="4"
                    placeholder="4"
                    ref={(input) => this.shadowVectorX = input}
                    type="number"
                  /> X-Axis
                  <input
                    className="form-control"
                    defaultValue="4"
                    placeholder="4"
                    ref={(input) => this.shadowVectorY = input}
                    type="number"
                  /> Y-Axis
                </div>
              </div>
              <div className="form-group">
                <label>Watermark</label>
                <div className="checkbox">
                  <label>
                    <input
                      ref={(input) => this.watermark = input}
                      type="checkbox"
                    /> Use?
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="picture">Photo</label>
                <div className={`thumbnail ${handle ? '' : 'off'}`}>
                  <img className="img-rounded" src={handle ? `${transformation}/${handle}` : ''} />
                </div>
                <div className="text-center dropup">
                  <button className="btn btn-default filepicker" onClick={this.handleClick} type="button" >
                  Upload <span className="caret" />
                  </button>
                </div>
              </div>
              <button className="btn btn-filestack btn-block submit" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
