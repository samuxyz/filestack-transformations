import React from 'react';

const Thumbnail = ({ title, handle, url }) => {
  const completeUrl = `${url}/${handle}`;
  return (
    <div className="col-md-4">
      <div className="thumbnail">
        <div className="thumbnail-img">
          <a href={completeUrl} target="_blank">
            <img src={completeUrl} />
          </a>
        </div>
        <div className="caption">
          <h3>{title}</h3>
          <div className="text-right">
            <a
              className="btn btn-primary filestack-secondary"
              href={`${url}/zip/${handle}`}
              role="button"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
