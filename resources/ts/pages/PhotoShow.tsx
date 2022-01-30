import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

import "../../css/photoList.css";
type Photo = {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    url: string;
    filename: string;
};

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
            {photo ? (
                <article className="card">
                    <figure className="image">
                        <img className="img" src={photo.url} />
                        <p>{photo.user.name}</p>
                    </figure>
                </article>
            ) : null}

            <Link to="/" className="link">
                topへ戻る
            </Link>
        </div>
    );
};

export default PhotoShow;
