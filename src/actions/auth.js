import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword=(email,password)=>{
    return (dispatch)=>{
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user})=>{
            dispatch(login(user.uid,user.displayName));
            dispatch(finishLoading());
        })
        .catch(e=>{
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error',e.message,'error');
        })
    }
}

export const startRegisterWithEmailPasswordName=(email,password,name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async({user})=>{
                //funcion propia de firebase para traer display name y photo
                await user.updateProfile({displayName:name});
                console.log(user)
                dispatch(
                    login(user.uid,user.displayName)
                );
            })
            .catch(e=>{
                console.log(e);
                Swal.fire('Error',e.message,'error');
            })
    }
};

export const StartGooogleLogin=()=>{
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user})=>{
                dispatch(
                    login(user.uid,user.displayName)
                );
            })
    }
};

export const login=(uid,displayName)=>({

        type:types.login,
        payload:{
            uid,
            displayName
        }

});

export const startLogOut= () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout=()=>({
    type:types.logout
})