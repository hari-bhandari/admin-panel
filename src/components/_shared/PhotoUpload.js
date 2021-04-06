import React from 'react';
import ImageUploader from "react-images-upload";
import axios from "axios";
import {ShowError, ShowSuccess} from "../../util/alert";

const PhotoUpload = ({withIcon,withPreview,singleImage,label,buttonText,setImages,images,defaultImages}) => {
    const onDrop = async (pictures) => {
        if(pictures.length==0){
            return null
        }

        const formData = new FormData();
        pictures.forEach(image=>{
            formData.append("image", image);
        })
        try {
            const res = await axios.post(`/api/v1/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.imgLinks) {
                setImages([...images,...res.data.imgLinks])
                ShowSuccess(`You have successfully uploaded ${res.data.imgLinks.length} images to cloud `)
            }

        } catch (e) {
            ShowError("Something went wrong. Please try again later")
        }

    }
    return (
        <ImageUploader withIcon={withIcon}
                       withPreview={withPreview}
                       onChange={onDrop}
                       singleImage={singleImage}
                       label={label}
                       buttonText={buttonText}
                       defaultImages={defaultImages}

        />

    );
};

export default PhotoUpload;
