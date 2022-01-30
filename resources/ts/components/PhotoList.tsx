import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/photoList.css";
import { Link } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";

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
                              <PhotoCard photo={photo} />
                          </Link>
                      );
                  })
                : null}
        </div>
    );
};

export default PhotoList;
