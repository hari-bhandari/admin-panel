import React from 'react';
import ImageUploader from "react-images-upload";
import axios from "axios";
import {ShowError, ShowSuccess} from "../../util/alert";

const PhotoUpload = ({withIcon,withPreview,singleImage,label,buttonText,setImages,images}) => {
    const onDropForThumbnail = async (pictures) => {
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
                console.log(res.data.imgLinks.length)
                setImages(res.data.imgLinks)
                ShowSuccess(`You have successfully uploaded ${res.data.imgLinks.length} images to cloud `)
            }

        } catch (e) {
console.log(e)        }

    }
    return (
        <ImageUploader withIcon={withIcon}
                       withPreview={withPreview}
                       onChange={onDropForThumbnail}
                       singleImage={singleImage}
                       label={label}
                       buttonText={buttonText}
        />

    );
};

export default PhotoUpload;
