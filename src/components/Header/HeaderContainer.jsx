import React, {Component} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authCheck} from "../../redux/authReducer";

class HeaderContainer extends Component{

    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {authCheck})(HeaderContainer);