import React, { Fragment, useEffect, useReducer, useState} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import Datatable from "../../common/datatable";
import CategorySelect from "../../_shared/CategorySelect";
import axios from "axios";
import {ShowError, ShowSuccess} from "../../../util/alert";
const SubCategory =()=> {
    const [open,setOpen]=useState(false)
    const [category,setCategory]=useState(null)
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [update,setUpdate]=useState(false)
    const [name,setName]=useState('')
    const [id,setID]=useState('')
    const [subCategoryID,setSubCategoryID]=useState('')
    const fetchData=async ()=>{
        const link=category?`/api/v1/subcategory/${category._id}`:"/api/v1/subcategory"
        try{
            setData([])
            const res=await axios.get(link)
            setData(res.data.data)
            setLoading(false)
        }catch (e){
            ShowError('Something went wrong')
        }
    }
    useEffect(()=>{
        fetchData().then(null)
    },[category])

    if(loading){
        return <div>Loading ...</div>
    }
    const onOpenModal = () => {
        setOpen(true)
    };
    const onCloseModal = () => {
        setOpen(false)
    };
    const addSubCategory=async ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(name===null){
            ShowError("name and description must be added")
        }
        else {
            try {
                if(!update){
                    await axios.post(`/api/v1/subcategory/${category._id}`, {name,id}, config);
                    ShowSuccess(`You have successfully created a  subcategory `)
                    setCategory(null)
                    setName('')
                    setID('')
                    setOpen(false)

                }
                else {
                    await axios.put(`/api/v1/subcategory/${subCategoryID}`, {name,id}, config);
                    ShowSuccess(`You have successfully updated a subcategory `)
                    setCategory(null)
                    setName('')
                    setID('')
                    setOpen(false)
                }

            } catch (e) {
                console.log(e)
            }
        }
    }
    const deleteCategory=async (id)=>{
        try {
            const res = await axios.delete(`/api/v1/subcategory/${id}`);
            ShowSuccess(`You have successfully deleted a  sub category with the name of  ${res.data.message}`)
            setCategory('')
        } catch (e) {
            ShowError(e.response.data.error)
        }
    }
    const editCategory=async (data)=>{
        setOpen(true)
        setName(data.name)
        setID(data.id)
        setUpdate(true)
        setSubCategoryID(data._id)
    }



    return (
            <Fragment>
                <Breadcrumb title="Sub Category" parent="Physical" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Sub Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup ">
                                        <div className="subCat-top">
                                            <CategorySelect initialValue={"Select Category"} background={true} setValue={setCategory} value={category}/>

                                            <button type="button" className="btn btn-primary" onClick={onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Sub Category</button>
                                        </div>

                                        <Modal open={open} onClose={onOpenModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">{update?"Update your sub Category":"Add a subcategory"}</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">

                                                        {!update&&<CategorySelect initialValue={"Select Category"} setValue={setCategory} value={category}/>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Sub Category Name :</label>
                                                        <input type="text" className="form-control" onChange={(event)=>{
                                                            setName(event.target.value)
                                                        }} value={name}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Sub Category ID :</label>
                                                        <input type="text" className="form-control" onChange={(event)=>{
                                                            setID(event.target.value)
                                                        }} value={id} />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={addSubCategory}>{update?"Save":"Add"}</button>
                                                <button type="button" className="btn btn-secondary" onClick={onCloseModal}>Close</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <Datatable
                                            multiSelectOption={false}
                                            myData={data}
                                            pageSize={10}
                                            pagination={false}
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

export default SubCategory
