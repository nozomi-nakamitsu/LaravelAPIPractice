import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/photoList.css";
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
                          <article className="card" key={photo.id}>
                              <figure className="image">
                                  <img className="img" src={photo.url} />
                                  <p>{photo.user.name}</p>
                              </figure>
                          </article>
                      );
                  })
                : null}
        </div>
    );
};

export default PhotoList;
