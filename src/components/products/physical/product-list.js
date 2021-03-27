import React, {Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/physical_list';
import {Edit, Trash2} from 'react-feather'
import useAxios from "axios-hooks";


const Product_list = () => {
    const [{data, loading, error}, refetch] = useAxios(
        '/api/v1/products'
    )
    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    return (
        <Fragment>
            <Breadcrumb title="Product List" parent="Physical"/>
            <div className="container-fluid">
                <div className="row products-admin ratio_asos">
                    {
                        data.data.map((myData, i) => {
                            return (
                                <div className="col-xl-3 col-sm-6" key={i}>
                                    <div className="card">
                                        <div className="products-admin">
                                            <div className="card-body product-box">
                                                <div className="img-wrapper">
                                                    <div className="lable-block">
                                                        <span className="lable3">New</span>
                                                    </div>
                                                    <div className="front">
                                                        <a className="bg-size"><img
                                                            className="img-fluid blur-up bg-img lazyloaded"
                                                            src={myData.thumbImage}/></a>
                                                        <div className="product-hover">
                                                            <ul>
                                                                <li>
                                                                    <button className="btn" type="button">
                                                                        <Edit className="editBtn"/>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="btn" type="button">
                                                                        <Trash2 className="deleteBtn"/>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-detail">
                                                    <div className="rating">

                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>


                                                    </div>
                                                    <a><h6>{myData.name}</h6></a>
                                                    <h4>{myData.price}
                                                    </h4>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }

                        </div>
                        </div>
                        </Fragment>
                        )
                    }

                    export default Product_list
