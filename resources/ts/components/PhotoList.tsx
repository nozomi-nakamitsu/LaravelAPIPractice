import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/photoList.css";
import { Link } from "react-router-dom";

const PhotoList = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            const response = await axios.get("api/photos");
            setPhotos(response.data);
        })();
    }, []);
    return (
        <div className="photo-list">
            {photos
                ? photos.map((photo) => {
                      return (
                          <Link to={`/photo/${photo.id}`} key={photo.id}>
                              <article className="card">
                                  <figure className="image">
                                      <img className="img" src={photo.url} />
                                      <p>{photo.user.name}</p>
                                  </figure>
                              </article>
                          </Link>
                      );
                  })
                : null}
        </div>
    );
};

export default PhotoList;
