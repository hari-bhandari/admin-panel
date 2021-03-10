import React, {Component, Fragment, useState} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import 'react-dropzone-uploader/dist/styles.css'
import ImageUploader from 'react-images-upload'
import {toast} from "react-toastify";
import axios from "axios";

const Add_product = () => {
    const [quantity, setQuantity] = useState(1)
    const [thumbImage, setThumbImage] = useState(null)
    const [images, setImages] = useState([])
    const [content,setContent]=useState('')

    const onDropForThumbnail = async (picture) => {
        const formData = new FormData();
        const imageFile = picture[0];
        formData.append("image", imageFile);
        try {
            const res = await axios.post(`/api/v1/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(res.data.imgLinks){
                setThumbImage(res.data.imgLinks[0])
                toast.success(`You have successfully uploaded thumbnail image to cloud `, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }



        } catch (e) {
            toast.error(`Something went wrong. Please try again later`, {
                position: "top-center",
                autoClose: 80000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    }
    const onDrop = async (pictures) => {
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
                setImages(res.data.imgLinks)
                toast.success(`You have successfully uploaded ${res.data.imgLinks.length} images to cloud `, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }


        } catch (e) {
            toast.error(`Something went wrong. Please try again later`, {
                position: "top-center",
                autoClose: 80000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const IncrementItem = () => {
        setQuantity(quantity + 1)
    }
    const DecreaseItem = () => {
        setQuantity(quantity - 1)
    }
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }
    const onChange=(e)=>{
        const  newContent = e.editor.getData();
        setContent(newContent)
    }

    return (
        <Fragment>
            <Breadcrumb title="Add Product" parent="Physical"/>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Product</h5>

                            </div>
                            <div className="card-body">
                                <div className="row product-adding">
                                    <div className="col-xl-5">
                                        <div className="add-product">
                                            <div className="row">
                                                <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                    <h3>Add your thumbnail </h3>
                                                    <ImageUploader withIcon={false}
                                                                   withPreview={true}
                                                                   onChange={onDropForThumbnail}
                                                                   singleImage={true}
                                                                   label={"This picture appears on the thumbnail.Make sure the picture looks detailed"}
                                                                   buttonText={"Choose your thumbnail image"}
                                                    />

                                                </div>
                                                <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                    <h3>Add more pictures </h3>
                                                    <ImageUploader withIcon={false}
                                                                   withPreview={true}
                                                                   onChange={onDrop}
                                                                   singleImage={false}
                                                                   label={"Adding more pictures helps customer to be more certain"}
                                                                   buttonText={"Choose your thumbnail image"}
                                                    />

                                                </div>
                                                <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                    <ul className="file-upload-product">

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7">
                                        <AvForm className="needs-validation add-product-form">
                                            <div className="form form-label-center">
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control" name="product_name"
                                                                 id="validationCustom01" type="text" required/>
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control mb-0" name="price"
                                                                 id="validationCustom02" type="number" required/>
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Product Code :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control " name="product_code"
                                                                 id="validationCustomUsername" type="number" required/>
                                                    </div>
                                                    <div className="invalid-feedback offset-sm-4 offset-xl-3">Please
                                                        choose Valid Code.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Select Size :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select className="form-control digits"
                                                                id="exampleFormControlSelect1">
                                                            <option>Small</option>
                                                            <option>Medium</option>
                                                            <option>Large</option>
                                                            <option>Extra Large</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Total Products :</label>
                                                    <fieldset className="qty-box ml-0">
                                                        <div className="input-group bootstrap-touchspin">
                                                            <div className="input-group-prepend">
                                                                <button
                                                                    className="btn btn-primary btn-square bootstrap-touchspin-down"
                                                                    type="button" onClick={DecreaseItem}>
                                                                    <i className="fa fa-minus"></i>
                                                                </button>
                                                            </div>
                                                            <div className="input-group-prepend">
                                                                <span
                                                                    className="input-group-text bootstrap-touchspin-prefix"></span>
                                                            </div>
                                                            <input className="touchspin form-control" type="text"
                                                                   value={quantity} onChange={handleChange}/>
                                                            <div className="input-group-append">
                                                                <span
                                                                    className="input-group-text bootstrap-touchspin-postfix"></span>
                                                            </div>
                                                            <div className="input-group-append ml-0">
                                                                <button
                                                                    className="btn btn-primary btn-square bootstrap-touchspin-up"
                                                                    type="button" onClick={IncrementItem}>
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <CKEditors
                                                            activeclassName="p10"
                                                            content={content}
                                                            events={{
                                                                "change":onChange
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="offset-xl-3 offset-sm-4">
                                                <button type="submit" className="btn btn-primary">Add</button>
                                                <button type="button" className="btn btn-light">Discard</button>
                                            </div>
                                        </AvForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Add_product
