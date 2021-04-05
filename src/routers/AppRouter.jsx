import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import { Redirect,Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";
export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //Este metodo crea un observable
        //un observable tipo de objeto que se dispara mas de una vez 
        firebase.auth().onAuthStateChanged(async (user)=>{
            console.log(user);
            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));

            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch,setChecking,setIsLoggedIn])

    if(checking){
        return(
            <h1>Espere....</h1>
        )
    }

    return (
        <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            path="/auth"
                            component={AuthRouter} 
                            isAutenticated={isLoggedIn}/>
                        <PrivateRoute
                            exact
                            path="/"
                            isAutenticated={isLoggedIn}
                            component={JournalScreen} />
                        <Redirect
                            to="/auth/login" />
                    </Switch>
                </div>
        </Router>
    );
};
