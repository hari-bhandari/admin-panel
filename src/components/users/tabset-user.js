import React, {Fragment} from 'react'
import {useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

const  Tabset_user=()=> {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/v1/users', data, config);
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
    console.log(errors);
        return (
            <Fragment>

                        <form className="needs-validation user-add" onSubmit={handleSubmit(onSubmit)}>
                            <h4>Account Details</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span>Name</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom0" name={"name"} type="text" required={true} ref={register({required: true, maxLength: 80})}/>
                            </div>

                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Email</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom2" type="email" name={"email"} required={true} ref={register({required: true, maxLength: 80})} />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Password</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom3" type="password" name={"password"} required={true} ref={register({required: true, maxLength: 80})}/>
                            </div>
                            <div className="form-group row">
                                    <label className="col-xl-3 col-md-4"><span>*</span> User Type</label>
                                <div className="col-xl-9 col-sm-8">
                                    <div className="form-group m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                        <label className="d-block">
                                            <input className="radio_animated" id="edo-ani1" type="radio" name="role" value={'user'} ref={register} defaultChecked/>
                                            User
                                        </label>
                                        <label className="d-block" >
                                            <input className="radio_animated" id="edo-ani2" type="radio" name="role"  value={'vendor'} ref={register}/>
                                            Vendor
                                        </label>
                                        <label className="d-block" >
                                            <input className="radio_animated" id="edo-ani2" type="radio" name="role"  value={'admin'} ref={register}/>
                                            Admin
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right">
                                <button type="submit" className="btn btn-primary">Add user</button>
                            </div>
                        </form>

            </Fragment>
        )
}

export default Tabset_user
