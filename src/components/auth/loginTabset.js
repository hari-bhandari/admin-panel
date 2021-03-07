import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User } from 'react-feather';
import { withRouter } from 'react-router-dom';
export const LoginTabset=()=>{
    return (
        <div>
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link" ><User />Admin Login</Tab>
                    </TabList>

                    <TabPanel>
                        <form className="form-horizontal auth-form">
                            <div className="form-group">
                                <input required="" name="email" type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" />
                            </div>
                            <div className="form-group">
                                <input required="" name="email" type="password" className="form-control" placeholder="Password" />
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

