import React, {Component} from 'react';
import Header, {DispatchHeaderPropsType, MapHeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {appStateType} from "../../redux/store";

class HeaderContainer extends Component<MapHeaderPropsType & DispatchHeaderPropsType>{
    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state: appStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect<MapHeaderPropsType, DispatchHeaderPropsType, {}, appStateType>
(mapStateToProps, {logout})(HeaderContainer);