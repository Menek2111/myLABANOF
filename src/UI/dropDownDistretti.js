import React, { useEffect } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-bootstrap/Dropdown';

import ind from '../images/individuo.jpg'

import skull from '../images/skull (3).jpg'
//import denti from '../images/teeth.png'
//import colonna from '../images/colonna.png'
//import torace from '../images/torace.png'
//import artisup from '../images/artisup.png'

function DropDownDistretti(props) {

    useEffect(() => {
    }, []);

    function setMain() {
        switch (props.scheda) {
            case 'Individuo':
                return 'DATI GENERALI'
            case 'Cranio':
                return 'CRANIO'
            default:
                return <div></div>
        }
    }

    let dpCranio = (
        <Dropdown.Item href="#/individuo/cranio">
            CRANIO
        </Dropdown.Item>
    )

    let dpIndividuo = (
        <Dropdown.Item href="#/individuo">
            DATI GENERALI
        </Dropdown.Item>
    )

    function setItems() {
        switch (props.scheda) {
            case 'Individuo':
                return dpCranio
            case 'Cranio':
                return dpIndividuo
            default:
                return <div></div>
        }
    }

    return (
        <Dropdown className='mx-3'>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {setMain()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {setItems()}
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default DropDownDistretti;