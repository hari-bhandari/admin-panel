import React, {Component, Fragment, useState} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import data from '../../../assets/data/sub-category';
import Datatable from '../../common/datatable'
import useAxios from "axios-hooks";
import Select from "react-select";
const SubCategory =()=> {
    const [open,setOpen]=useState(false)
    const [category,setCategory]=useState(null)
    // const [{data, loading, error}, refetch] = useAxios(
    //     '/api/v1/category'
    // )
    // if(loading){
    //     return (
    //         <div>Loading...</div>
    //     )

    // }
    const categoryOptions = [
        { value: 'smart phones', label: 'Smart Phones' },
        { value: 'tv', label: 'TV' },
        { value: 'watch', label: 'Watches' },
    ];

    const onOpenModal = () => {
        setOpen(true)
    };
    const onCloseModal = () => {
        setOpen(true)
    };
    const  handleChangeForCategory = selectedOption => {
        setCategory( selectedOption );
    };

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
                                            <Select
                                                value={category}
                                                onChange={handleChangeForCategory}
                                                options={categoryOptions}
                                            />

                                            <button type="button" className="btn btn-primary" onClick={onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Sub Category</button>
                                        </div>

                                        <Modal open={open} onClose={onOpenModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Physical Product</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Sub Category Name :</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text" className="col-form-label">Sub Category Image :</label>
                                                        <input className="form-control" id="validationCustom02" type="file" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() =>onCloseModal()}>Save</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => onCloseModal()}>Close</button>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <Datatable
                                            multiSelectOption={false}
                                            myData={data}
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

export default SubCategory
