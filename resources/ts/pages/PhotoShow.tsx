import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

import "../../css/photoList.css";
import { Photo } from "../types";
import PhotoCard from "../components/PhotoCard";

const PhotoShow = () => {
    const [photo, setPhoto] = useState<Photo>();
    const params = useParams();
    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/photo/${params.id}`);
            console.log(response);
            setPhoto(response.data);
        })();
    }, []);
    const handleFileDownload = async () => {
        try {
            const response = await axios.post(
                `/api/photo/${params.id}/download`
            );
            console.log(response);
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="photo-show">
            {photo ? <PhotoCard photo={photo} /> : null}
            <Link to="/" className="link">
                topへ戻る
            </Link>
        </div>
    );
};

export default PhotoShow;
