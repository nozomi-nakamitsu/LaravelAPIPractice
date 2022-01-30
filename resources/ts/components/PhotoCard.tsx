import React, { useState } from "react";
import axios from "axios";
import { Photo } from "../types";
import { AiFillHeart } from "react-icons/ai";

const PhotoCard = ({ photo }: { photo: Photo }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(photo.is_favorite);
    const [favoriteCount, setFavoriteCount] = useState<number>(
        photo.favorite_count
    );

    const clickFavorite = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isFavorite) {
            try {
                await axios.post(`/api/photo/${photo.id}/unfavorite`);
                setIsFavorite(false);
                setFavoriteCount(favoriteCount - 1);
            } catch (error) {
                alert(error);
            }
        } else {
            try {
                await axios.post(`/api/photo/${photo.id}/favorite`);
                setIsFavorite(true);
                setFavoriteCount(favoriteCount + 1);
            } catch (error) {
                alert(error);
            }
        }
    };
    return (
        <article className="card">
            <figure className="image">
                <img className="img" src={photo.url} />
            </figure>
            <div className="footer">
                <p>{photo.user.name}</p>
                <div
                    onClick={clickFavorite}
                    className={
                        "like" + " " + `${isFavorite ? "-active" : "-inActive"}`
                    }
                >
                    <AiFillHeart />
                    <span>{favoriteCount}</span>
                </div>
            </div>
        </article>
    );
};

export default PhotoCard;
