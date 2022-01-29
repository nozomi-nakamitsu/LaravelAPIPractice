import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const PhotoForm = () => {
    const [photo, setPhoto] = useState<File | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        const fileList = target.files as FileList;
        console.log("handleChange", fileList[0]);
        setPhoto(fileList[0]);
    };
    const onSubmit = async () => {
        console.log("photo", photo);
        const formData = new FormData();
        if (!photo) {
            return;
        }
        formData.append("photo", photo);
        const response = await axios.post("/api/photos", formData);
        console.log(response);
    };
    return (
        <div className="photo-form">
            <h2 className="title">Submit a photo</h2>
            <form className="form">
                <input
                    className="form__item"
                    type="file"
                    onChange={handleChange}
                />
                <div className="form__button">
                    <button
                        type="button"
                        className="button button--inverse"
                        onClick={onSubmit}
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PhotoForm;
