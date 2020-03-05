import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";

import s from './Pages.module.less';

import {initializeApp} from "@src/redux/app-reducer";

import Profile from "./Profile";
import Empty from "../Empty";
import LoginPage from "./Login";

const Pages = props => {
    return (
        <div className={s.main}>
            <Switch>
                <Route
                    exact
                    path={'/'}
                    render={ () => <Profile /> }
                />
                <Route
                    path={'/login'}
                    render={ () => <LoginPage /> }
                />
                <Route render={ () => <Empty /> }/>
            </Switch>
        </div>
    );
};

export default compose(
    connect(null, { initializeApp }),
    withRouter
)(Pages);