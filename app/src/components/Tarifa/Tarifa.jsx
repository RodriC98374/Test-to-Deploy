import React ,{useState, useEffect}from 'react';
import Modal from '../Modal/Modal';
import Formulario from './FormTarifa';
import {Table, Button,ButtonGroup,Form, Image} from 'react-bootstrap';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Footer from '../Footer/Footer';
import { useSend } from '../../hooks/HookList';

import "./Tarifa.css"

export const Tarifa = () => {
    
  const [tarifas,setTarifas] = useState([
    {tarifa_id:1,tarifa_estado:2,tarifa_nombre:2,tarifa_valor:'',tarifa_ruta:'Andrea'}
  ]);

    const [error,setError] =  useState(null);
    const{data,fetchData} = useSend();
    
    //----------------------ShowModal-------------------------------
    
    const [showEdit, setShowEdit] = useState(false);
     
    const [showCreate, setShowCreate] = useState(false);
    
    //----------------------Cliente para:-------------------------------
    //------Editar :
    const [tarifaSeleccionado, setTarifaSeleccionado] = useState(null);

    useEffect(() => {
        fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRate');
        console.log(data);
    }, []);
    
    useEffect(() => {
        if (data.desError) {
            setError("No existe ningúna tarifa registrada");
        }else{
            setTarifas(data);
        }
        console.log(data);
    }, [data]);

    //-----------------------Activate-------------------------------------------
    //------Edit Modal
    const handleEditar = (tarifa) => {
        setShowEdit(true);
        setTarifaSeleccionado(tarifa);
    };
    
    //-----Create Modal
    const handleCreate = () => {
        setShowCreate(true);
    };
    
    //---Desactive Any Modal
    const handleCancelar = async () => {
        setShowEdit(false);
        setShowCreate(false);
        console.log(data);
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRate');
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRate');
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRate');
        await fetchData('http://localhost/UniPark-Adeptus-Code/ADEPTUSCODE-BackEnd/app/apiRate/apiRate.php/listRate');
        
    };
 
    return (
        <>
        <Header></Header>
        <Aside></Aside>
        <div className="content-wrapper contenteSites-body">
            <div className="bodyItems">
                <div className="buttonSection">
                    <ButtonGroup className="buttonGroup">
                        <Button variant="success" className="button" onClick={() => handleCreate()} >+</Button>
                        <Button variant="success" className="button"> PDF </Button>
                    </ButtonGroup>
                    <Form.Control 
                        className="searchBar"
                        type="text"
                        placeholder="Buscar..."
                    />
                </div>
                <Table striped bordered hover className="table">
                    <thead>
                        <tr className="columnTittle">
                            <th>Id</th>
                            <th>Detalle</th>
                            <th>QR</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error!=null ? (
                            <tr>
                                <td colSpan={"4"} >No existe Tarifas</td>
                            </tr>
                        ): (
                            tarifas.map((tarifa) => (
                                    <tr className="columnContent" key={tarifa.tarifa_id}>
                                        <td>{tarifa.tarifa_id}</td>
                                        <td>
                                            <ul>
                                                <li><strong>Plazo :</strong>{tarifa.tarifa_nombre}</li>
                                                <li><strong>Bs    :</strong>{tarifa.tarifa_valor}</li>
                                                <li><strong>Estado:</strong>{tarifa.tarifa_estado}</li>
                                            </ul>
                                            </td>
                                        <td><Image src={tarifa.tarifa_ruta} alt="imagen qr" fluid ></Image></td>
                                        <td className="actionsButtons">
                                            <button className='btn btn-success btn-md mr-1 ' onClick={() => handleEditar(tarifa)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <Modal
	            tamaño ="md"
                mostrarModal={showEdit}
                title = 'Editar Tarifa'
                contend = {
                <Formulario
                asunto ='Guardar Cambios'
                tarifa= {tarifaSeleccionado}
                cancelar={handleCancelar}
                ></Formulario>}
                hide = {handleCancelar}
                >
                </Modal>
                

                <Modal
	            tamaño ="md"
                mostrarModal={showCreate}
                title = 'Crear Nueva Tarifa'
                contend = {
                <Formulario
                asunto = "Guardar Tarifa"
                cancelar={handleCancelar}
                ></Formulario>}
                hide = {handleCancelar}
                >
                </Modal>
            </div>
        </div>

        <Footer></Footer>
        </>

    )
}
