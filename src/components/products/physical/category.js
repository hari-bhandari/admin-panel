import React, { Fragment, useState} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import Datatable from '../../common/datatable';
import useAxios from "axios-hooks";
import axios from "axios";
import {ShowError,ShowSuccess} from "../../../util/alert";
import PhotoUpload from "../../_shared/PhotoUpload";
const Category=()=> {
    const [open,setOpen]=useState(false)
    const [update,setUpdate]=useState(false)
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
            ShowError("name and description must be added")
        }
        else {

        try {
            const res = await axios.post('/api/v1/category', {name,description,image:image[0]}, config);
            ShowSuccess(`You have successfully created a  category with the name of  ${res.data.category.name}`)

            refetch()
        } catch (e) {
            ShowError(e.response.data.error)
        }
        }
    }
    const deleteCategory=async (id)=>{

            try {
                const res = await axios.delete(`/api/v1/category/${id}`);
                ShowSuccess(`You have successfully created a  category with the name of  ${res.data.message}`)
                refetch()
            } catch (e) {
                ShowError(e.response.data.error)
            }
        }
    const editCategory=async (data)=>{
        setOpen(true)
        setName(data.name)
        setDescription(data.description)
        setUpdate(true)
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };
        // if(name===null|| description===null){
        //     toast.error(`Please add a valid name and description`, {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
        // else {
        //
        //     try {
        //         const res = await axios.put(`/api/v1/category/${data._id}`, {name,description,image:image[0]}, config);
        //         toast.success(`You have successfully updated a  category with the name of  ${res.data.category.name}`, {
        //             position: "top-center",
        //             autoClose: 10000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         refetch()
        //     } catch (e) {
        //         toast.error(e.response.data.error, {
        //             position: "top-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }
        // }
    }

    data.data.forEach(item=>{
            if(typeof item.image==="string") {
                item.image = (<img src={item.image} style={{width: 50, height: 50}}/>);
            }
            const tempCount=item.subCategory.length
            if(typeof tempCount==="number"){
                item.subCategory=tempCount;
            }


    })

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
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">{update?"Update your Product":"Add Physical Product"}</h5>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label" >Category Name :</label>
                                                    <input type="text" className="form-control" onChange={(event)=>{
                                                        setName(event.target.value)
                                                    }} value={name} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label" >Description</label>
                                                    <input type="text" className="form-control" onChange={(event)=>{
                                                        setDescription(event.target.value)
                                                    }} value={description}/>
                                                </div>
                                                <div className="form-group">
                                                    <PhotoUpload withIcon={false}
                                                                   withPreview={true}
                                                                   singleImage={true}
                                                                   label={"Try to add a SVG image as it is lighter and more scalable"}
                                                                   buttonText={"Upload Icon for your category"}
                                                                 setImages={setImage} images={image}
                                                                   defaultImages={["https://www.formula1.com/content/dam/fom-website/manual/Misc/2021preseason/Haas/LIVERY_UNVEIL_PR_3.jpg"]}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => addCategory()}>{update?"Update":"Add"}</button>
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
                                        delete={deleteCategory}
                                        edit={editCategory}
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

