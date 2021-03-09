import React, {Component, Fragment} from 'react'
import LoginTabset from './loginTabset';
import Slider from 'react-slick';
import Logo from '../../assets/images/dashboard/favicon.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Login = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false
    };
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="authentication-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 p-0 card-left">
                                <div className="card bg-primary">
                                    <div className="svg-icon-login">
                                        <img src={Logo} className="Img-fluid"/>
                                    </div>
                                    <Slider className="single-item" {...settings}>
                                        <div>
                                            <div>
                                                <h3>Welcome to Admin Panel</h3>
                                                <p>This is where you can manage your sales</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <h3>Privacy</h3>
                                                <p>Make sure your password is not shared </p>
                                            </div>
                                        </div>

                                    </Slider>
                                </div>
                            </div>
                            <div className="col-md-7 p-0 card-right">
                                <div className="card tab2-card">
                                    <div className="card-body">
                                        <LoginTabset {...props}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login
