import React from 'react';
import './dialogs.scss';
import {actions} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {appStateType} from "../../redux/store";

const mapStateToProps = (state: appStateType) => {
    return {
        state: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthRedirect
)(Dialogs);