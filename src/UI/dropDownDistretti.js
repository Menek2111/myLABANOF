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
            case 'Denti':
                return 'DENTI'
            case 'Colonna':
                return 'COLONNA'
            case 'Torace':
                return 'TORACE'
            case 'Arti superiori':
                return 'ARTI SUPERIORI'
            case 'Arti inferiori':
                return 'ARTI INFERIORI'
            default:
                return <div></div>
        }
    }

    let dpItems = [
        <Dropdown.Item href="#/individuo">
            DATI GENERALI
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/cranio">
            CRANIO
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/denti">
            DENTI
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/colonna">
            COLONNA
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/torace">
            TORACE
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/artiSuperiori">
            ARTI SUPERIORI
        </Dropdown.Item>,
        <Dropdown.Item href="#/individuo/artiInferiori">
            ARTI INFERIORI
        </Dropdown.Item>
    ]
    let dpName = [
        'Individuo', 'Cranio', 'Denti', 'Colonna', 'Torace', 'Arti superiori', 'Arti inferiori'
    ]

    function setItems() {
        let i
        switch (props.scheda) {
            case 'Individuo':
                i = dpName.indexOf('Individuo')
                dpItems.splice(i, 1)
                break
            case 'Cranio':
                i = dpName.indexOf('Cranio')
                dpItems.splice(i, 1)
                break
            case 'Denti':
                i = dpName.indexOf('Denti')
                dpItems.splice(i, 1)
                break
            case 'Colonna':
                i = dpName.indexOf('Colonna')
                dpItems.splice(i, 1)
                break
            case 'Torace':
                i = dpName.indexOf('Torace')
                dpItems.splice(i, 1)
                break
            case 'Arti superiori':
                i = dpName.indexOf('Arti superiori')
                dpItems.splice(i, 1)
                break
            case 'Arti inferiori':
                i = dpName.indexOf('Arti inferiori')
                dpItems.splice(i, 1)
                break
        }

        return (<Dropdown.Menu>
            {dpItems.map(it => it)}
        </Dropdown.Menu>)
    }

    return (
        <Dropdown className='mx-3'>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {setMain()}
            </Dropdown.Toggle>
            {setItems()}

        </Dropdown>
    );
}
export default DropDownDistretti;