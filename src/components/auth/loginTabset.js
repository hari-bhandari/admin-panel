import React,  {Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User } from 'react-feather';
import { withRouter } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";
export const LoginTabset=()=>{
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/v1/auth/login', data, config);
            if(res.data.data.role)
            toast.success(`You have successfully created a ${res.data.data.role} with the name of  ${res.data.data.name}`, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch (e){
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
    return (
        <div>
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link" ><User />Admin Login</Tab>
                    </TabList>

                    <TabPanel>
                        <form className="form-horizontal auth-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input required="" name="email" type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" ref={register}/>
                            </div>
                            <div className="form-group">
                                <input required="" name="password" type="password" className="form-control" placeholder="Password" ref={register}/>
                            </div>
                            <div className="form-terms">
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                    <label className="d-block">
                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                        Stay logged in <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-button">
                                <button className="btn btn-primary" type="submit"  onClick={() => this.routeChange()}>Login</button>
                            </div>
                        </form>
                    </TabPanel>
                </Tabs>
            </Fragment>
        </div>)
}


export default withRouter(LoginTabset)

