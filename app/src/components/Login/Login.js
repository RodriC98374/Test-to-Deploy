import React, { useState } from 'react'
import comprovar from './Comprueva'
import { useFetch } from '../../hooks/HookFetchListData';
import './Login.css'
import { useContext } from "react"
import { Button, Modal, ModalBody } from 'react-bootstrap'
import { DataUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {    
    const {userglobal,setUserglobal} = useContext(DataUser)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [nickname, setcorreo] = useState("")
    const [contraseña, setcontraseña] = useState("")
    const [errorlog, seterrorlog] = useState("")
    //const [direccion, setdireccion] = useState("")
    let { data, loading,  } = useFetch(
        "http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiPerson/apiPerson.php/listPerson"
      )
      if(!loading) 
      {        
        function ClikComprovar() {
            seterrorlog(comprovar(nickname,contraseña,data,setUserglobal,navigate))
            console.log(errorlog)
            if (errorlog==="/main") {
                console.log(errorlog);
                return <redirect to={errorlog}></redirect>
                
                
            }
              
          }
          
          
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    
    
    
    return (
        <div className="login" >
            <div className="d-flex justify-content-center align-items-center"  >
                
                
                
                
                
                <div className="login-box">
                    {/* /.login-logo */}
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a href="/" className="h1"><b>Inicio de Sesion </b><br/>UniPark</a>
                            
                        </div>
                        {errorlog!=="/main"?
                        <div className="card-body">
                            <p className="login-box-msg">Ingrese sus credenciales para iniciar sesion</p>
                            {/* <form action="/main"> */}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Usuario" 
                                    onChange={(e) => {
                                        setcorreo(e.target.value);
                                      }}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Contraseña" 
                                    onChange={(e) => {
                                        setcontraseña(e.target.value);
                                      }}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rowx">
                                    <p className="mb-1 forgot-password" onClick={handleShow} >
                                        {/* <a href='/login' onClick={handleShow} >Olvide mi contraseña</a> */}
                                        Olvide mi contraseña
                                    </p>
                                    <div style={{ color: "red" }}>
                                    {errorlog!=="" ? <span>{errorlog}</span> : <span></span> }
                                    </div>
                                    <div className="col-12 iniciar-button">
                                        {/* <Link to={direccion} > */}
                                            <button
                                                onClick={()=>ClikComprovar()}
                                                type='submit'
                                                className="btn btn-primary btn-block "
                                            >
                                                Iniciar
                                            </button>
                                        {/* </Link> */}
                                    </div>
                                    
                                </div>
                           {/*  </form> */}
                            
                            {/* <p className="mb-0">
                                <a href="register.html" className="text-center">Registrate</a>
                            </p> */}
                        </div>
                        
                        :
                        <div>
                            
                            <div className="card-header text-center h1">             
                            Bienvenido
                            </div>
                        <div className="card-header text-center h1">
                        
                        {userglobal.persona_nombre}
    
    
                        </div>
                         <div className="col-12 iniciar-button">
                                        <Link to={"/main"} >
                                            <button
                                            
                                                type='submit'
                                                className="btn btn-primary btn-block "
                                            >
                                                Presione para ir a Menu
                                            </button>
                                        </Link>
                            
                         </div>
                                      
        
                        </div>
                        
                        }
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
                



                






            
                <Modal show={show} onHide={handleClose} centered >
                    <ModalBody className='modal-body' >
                        <h1 className='forgot-password-modal'> Consulte con el administrador del sistema</h1>
                        <Button className='modal-button' onClick={handleClose} >
                            Aceptar
                        </Button>
                        
                    </ModalBody>
                </Modal>

            </div>
            
        </div>
    )
}
}
