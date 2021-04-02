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
    const [image,setImage]=useState([])
    const [id,setId]=useState(null)
    const [name,setName]=useState(null)
    const [categoryId,setCategoryId]=useState(null)
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
            if(!update){

            const res = await axios.post('/api/v1/category', {name,description,image:image[0],id:categoryId}, config);
            ShowSuccess(`You have successfully created a  category with the name of  ${res.data.category.name}`)

            refetch()
            setOpen(false)

            }
            else {
                 await axios.put(`/api/v1/category/${id}`, {name,description,image:image[0],id:categoryId}, config);
                ShowSuccess(`You have successfully updated a  category with the id of  ${id}`)

                refetch()
                setOpen(false)
            }

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
        setImage([data.image.props.src])
        setUpdate(true)
        setId(data._id)
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
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">{update?"Update your Category":"Add a category"}</h5>
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
                                                    <label htmlFor="recipient-name" className="col-form-label" >Category ID/Slug</label>
                                                    <input type="text" className="form-control"  onChange={(event)=>{
                                                        setCategoryId(event.target.value)
                                                    }} value={categoryId}/>
                                                </div>
                                                <div className="form-group">
                                                    <PhotoUpload withIcon={false}
                                                                   withPreview={true}
                                                                   singleImage={true}
                                                                   label={"Try to add a SVG image as it is lighter and more scalable"}
                                                                   buttonText={"Upload Icon for your category"}
                                                                 setImages={setImage} images={image}
                                                                   defaultImages={image}
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

