import React, {Component} from 'react';
import './profile.scss';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {appStateType} from "../../redux/store";
import {profileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends Component<PropsType>{

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if(!userId){
            userId = this.props.authorizedUserId
            if(!userId){
                this.props.history.push('/login')
            }
        }

        if(!userId){
            console.log('Id should exists in URI params or in state ("authorizedUserId")')
        } else {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status} updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

const mapStateToProps = (state: appStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {getUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);