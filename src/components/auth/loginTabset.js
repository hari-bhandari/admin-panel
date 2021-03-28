import React, {Fragment, useContext, useEffect} from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User } from 'react-feather';
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";
import AuthContext from "../../context/auth/authContext";
import {withRouter} from "react-router-dom";
import {ShowError} from "../../util/alert";
export const LoginTabset=({history})=>{
    const authContext=useContext(AuthContext);
    const {setToken,isAuthenticated}=authContext;
    const { register, handleSubmit, errors } = useForm();
    useEffect(()=>{
        if(isAuthenticated){
            history.push('/dashboard')
        }
    },[isAuthenticated])

    const onSubmit = async (data) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/v1/auth/login', data, config);
            console.log(res)
            if(res.data.user.role!=='admin'){
                ShowError(`Only admin can access this page`)
            }
            if (!res.data.token){
                ShowError(`Something went wrong`)
            }
            setToken(res.data.token,data.stayLoggedIn)

        }catch (e){
            ShowError(e.response.data.error)

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
                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" name={"stayLoggedIn"}  ref={register}/>
                                        Stay logged in <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-button">
                                <button className="btn btn-primary" type="submit" >Login</button>
                            </div>
                        </form>
                    </TabPanel>
                </Tabs>
            </Fragment>
        </div>)
}


export default withRouter(LoginTabset)

