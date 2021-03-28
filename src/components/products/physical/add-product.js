import React, {Fragment, useState} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import 'react-dropzone-uploader/dist/styles.css'
import ImageUploader from 'react-images-upload'
import {toast} from "react-toastify";
import axios from "axios";
import Select from "react-select";
import {ShowError, ShowSuccess} from "../../../util/alert";
const Add_product = () => {
    const categoryOptions = [
        { value: 'smart phones', label: 'Smart Phones' },
        { value: 'tv', label: 'TV' },
        { value: 'watch', label: 'Watches' },
    ];

    const subCategoryOptions = [
        { value: 'apple', label: 'Apple' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'oppo', label: 'Oppo' },
    ];



    const handleInvalidSubmit=(event, errors, values)=> {
        ShowError("Something went wrong")
    }

    const [quantity, setQuantity] = useState(1)
    const [thumbImage, setThumbImage] = useState(null)
    const [images, setImages] = useState([])
    const [category,setCategory]=useState(null)
    const [subCategory,setSubCategory]=useState(null)
    const [description,setDescription]=useState('')

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
                ShowSuccess(`You have successfully uploaded thumbnail image to cloud `)
            }



        } catch (e) {
            ShowError(`Something went wrong. Please try again later`)
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
                ShowSuccess(`You have successfully uploaded ${res.data.imgLinks.length} images to cloud `)
            }


        } catch (e) {
           ShowError("Something went wrong. Please try again later")
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
    const  handleChangeForCategory = selectedOption => {
        setCategory( selectedOption );
    };
    const  handleChangeForSubCategory = selectedOption => {
        setSubCategory( selectedOption );
    };
    const onChange=(e)=>{
        const  newContent = e.editor.getData();
        setDescription(newContent)
    }
    const handleValidSubmit=async (event, values) => {
        const {name, price} = values
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data={name,price,countInStock:quantity,description,subCategory:subCategory.value,category:category.value,images,thumbImage}

        try {
            const res = await axios.post('/api/v1/products', data, config);
            ShowSuccess(`You have successfully created a  product with the name of  ${res.data.name}`)
        } catch (e) {
            ShowError(e.response.data.error)
        }

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
                                        <AvForm className="needs-validation add-product-form" onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
                                            <div className="form form-label-center">
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control" name="name"
                                                                 id="validationCustom01" type="text"  required />
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AvField className="form-control mb-0" name="price"
                                                                 id="validationCustom02" type="number"  required/>
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </div>
                                            </div>
                                            <div className="form">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Select Category</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <Select
                                                            value={category}
                                                            onChange={handleChangeForCategory}
                                                            options={categoryOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Select sub category</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <Select
                                                            value={subCategory}
                                                            onChange={handleChangeForSubCategory}
                                                            options={subCategoryOptions}
                                                        />
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
                                                            content={description}
                                                            events={{
                                                                "change":onChange
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="offset-xl-3 offset-sm-4">
                                                <button type="submit" className="btn btn-primary">Add</button>
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
