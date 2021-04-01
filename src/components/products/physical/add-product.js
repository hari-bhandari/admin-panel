import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import 'react-dropzone-uploader/dist/styles.css'
import axios from "axios";
import Select from "react-select";
import {ShowError, ShowSuccess} from "../../../util/alert";
import PhotoUpload from "../../_shared/PhotoUpload";
import AsyncSelect from "../../_shared/AsyncSelect";
import {useForm} from 'react-hook-form';

const Add_product = ({location}) => {

    const [item, setItem] = useState(null)
    const {register, handleSubmit, errors} = useForm({defaultValues:location.state?{name:location.state.name,price:location.state.price,countInStock:location.state.countInStock}:{}});

    const subCategoryOptions = [
        {value: 'apple', label: 'Apple'},
        {value: 'samsung', label: 'Samsung'},
        {value: 'oppo', label: 'Oppo'},
    ];
    const [quantity, setQuantity] = useState(1)
    const [thumbImage, setThumbImage] = useState([])
    const [images, setImages] = useState([])
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [description, setDescription] = useState('')


    useEffect(() => {
        if (location.state) {
            const {state} = location
            setItem(state)
            setImages(state.images)
            setThumbImage([state.thumbImage])
            setSubCategory(state.subCategory)
            setQuantity(state.countInStock)
            setDescription(state.description)
        }
    }, [location.state])
    const onSubmit = async data => {
        const {name, price, countInStock} = data;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const formData = {
            name,
            price,
            countInStock,
            description,
            subCategory: subCategory.value,
            category: category.value,
            images,
            thumbImage: thumbImage[0]
        }

        try {
            const res = await axios.post('/api/v1/products', formData, config);
            ShowSuccess(`You have successfully created a  product with the name of  ${res.data.name}`)
        } catch (e) {
            ShowError(e.response.data.error)
        }


    }
    const handleChangeForSubCategory = selectedOption => {
        setSubCategory(selectedOption);
    };
    const onChange = (e) => {
        const newContent = e.editor.getData();
        setDescription(newContent)
    }

    return (
        <Fragment>
            <Breadcrumb title="Add Product" parent="Physical"/>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>{item?'Update':'Add'} Product</h5>

                            </div>
                            <div className="card-body">
                                <div className="row product-adding">
                                    <div className="col-xl-5">
                                        <div className="add-product">
                                            <div className="row">
                                                <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                    <h3>Add your thumbnail </h3>
                                                    <PhotoUpload withIcon={false}
                                                                 withPreview={true}
                                                                 setImages={setThumbImage} images={thumbImage}
                                                                 singleImage={true}
                                                                 label={"This picture appears on the thumbnail.Make sure the picture looks detailed"}
                                                                 buttonText={"Choose your thumbnail image"}
                                                                 defaultImages={thumbImage}

                                                    />

                                                </div>
                                                <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                    <h3>Add more pictures </h3>
                                                    <PhotoUpload withIcon={false}
                                                                 withPreview={true}
                                                                 singleImage={false}
                                                                 label={"Adding more pictures helps customer to be more certain"}
                                                                 buttonText={"Choose your thumbnail image"}
                                                                 setImages={setImages} images={images}
                                                                 defaultImages={images}

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
                                        <form className="needs-validation add-product-form"
                                              onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form form-label-center">
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control" name="name"
                                                               id="validationCustom01" type="text" ref={register}
                                                               required/>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control mb-0" name="price"
                                                               id="validationCustom02" type="number" ref={register}
                                                               required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Select Category</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <AsyncSelect initialValue={"Select the category"}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Select sub
                                                        category</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <Select
                                                            value={subCategory}
                                                            onChange={handleChangeForSubCategory}
                                                            options={subCategoryOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Products in stock</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control mb-0" name="countInStock"
                                                               id="validationCustom02" type="number" ref={register}
                                                               required/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        <CKEditors
                                                            activeclassName="p10"
                                                            content={description}
                                                            events={{
                                                                "change": onChange
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="offset-xl-3 offset-sm-4">
                                                <button type="submit" className="btn btn-primary">{item?'Update Product':'Add Product'}</button>
                                            </div>
                                        </form>
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
