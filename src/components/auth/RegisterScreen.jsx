import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch=useDispatch();

    const {msgError} = useSelector(state => state.ui)

    const registro={
        name:'',//Romel
        email:'',//romx23@gmail.com
        password:'',//123456
        password2:'',//123456
    }
    
    const [formvalues,handleInputChange]=useForm(registro);

    const {name,email,password,password2}=formvalues;

    const handleRegister=(e)=>{
        e.preventDefault();
        console.log(name,email,password,password2);
        if(isFormValid()){
            console.log('formulario correcto');
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }
    }

    const isFormValid= () =>{
        if(name.trim().length===0){
            dispatch(setError('name is required'))
            console.log('name is required');
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'))
            console.log('Email is not valid');
            return false;
        }else if(password !==password2 || password.length<5){
            dispatch(setError('password should be at least 6 characters and match each other'))
            console.log('password should be at least 6 characters and match each other')
            return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form
            onSubmit={handleRegister}
            className="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError && 
                    (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                    )
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Pasword..."
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Confirm Pasword"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-block btn-primary mb-5"
                >
                    Register
                </button>
                <Link 
                to={"/auth/login"}
                className="link"
                >
                Already register? 
                </Link>
            </form>
        </>
    )
}
