import React, { Fragment, useState} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import Datatable from '../../common/datatable';
import useAxios from "axios-hooks";
import ImageUploader from "react-images-upload";
import axios from "axios";
import {toast} from "react-toastify";

const Category=()=> {
    const [open,setOpen]=useState(false)
    const [image,setImage]=useState(null)
    const [name,setName]=useState(null)
    const [description,setDescription]=useState(null)
    const [{data, loading, error}, refetch] = useAxios(
        '/api/v1/category'
    )
    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    const onOpenModal = () => {
        setOpen(true)
    };

    const onCloseModal = () => {
        setOpen(false)
    };
    const addCategory=async ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(name===null|| description===null){
             toast.error(`Please add a valid name and description`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {

        try {
            const res = await axios.post('/api/v1/category', {name,description,image:image[0]}, config);
            toast.success(`You have successfully created a  category with the name of  ${res.data.category.name}`, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            refetch()
        } catch (e) {
            toast.error(e.response.data.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        }
    }
    data.data.forEach(item=>{
            if(typeof item.image==="string") {
                item.image = (<img src={item.image} style={{width: 50, height: 50}}/>);
            }
            item.subCategory=0;

    })
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
                setImage(res.data.imgLinks)
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

    return (
        <Fragment>
            <Breadcrumb title="Category" parent="Physical" />
            {/* <!-- Container-fluid starts--> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Products Category</h5>
                            </div>
                            <div className="card-body">
                                <div className="btn-popup pull-right">

                                    <button type="button" className="btn btn-primary" onClick={onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Category</button>
                                    <Modal open={open} onClose={onCloseModal} >
                                        <div className="modal-header">
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Physical Product</h5>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label" >Category Name :</label>
                                                    <input type="text" className="form-control" onChange={(event)=>{
                                                        setName(event.target.value)
                                                    }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label" >Description</label>
                                                    <input type="text" className="form-control" onChange={(event)=>{
                                                        setDescription(event.target.value)
                                                    }} />
                                                </div>
                                                <div className="form-group">
                                                    <ImageUploader withIcon={false}
                                                                   withPreview={true}
                                                                   onChange={onDrop}
                                                                   singleImage={true}
                                                                   label={"Try to add a SVG image as it is lighter and more scalable"}
                                                                   buttonText={"Upload Icon for your category"}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => addCategory()}>Save</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => onCloseModal()}>Close</button>
                                        </div>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable
                                        multiSelectOption={false}
                                        myData={data.data}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Container-fluid Ends--> */}
        </Fragment>
    )
}

export default Category

