import React, { useEffect } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-bootstrap/Dropdown';

import ind from '../images/individuo.jpg'

import skull from '../images/skull (4).jpg'
import denti from '../images/teeth.png'
import colonna from '../images/colonna.png'
import torace from '../images/torace.png'
import artisup from '../images/artisup.png'

function DropDownDistretti(props) {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    useEffect(() => {
    }, []);

    function setMain() {
        switch (props.scheda) {
            case 'Individuo':
                return <img src={ind} style={{ height: '10vh' }} alt="individuo" />
            case 'Cranio':
                return <img src={skull} style={{ height: '10vh' }} alt="individuo" />
            default:
                return <div></div>
        }
    }


    let dpCranio = (
        <Dropdown.Item href="#/individuo/cranio">
            <img className='' src={skull} style={{ height: '5vh' }} alt="Cranio" />Cranio
        </Dropdown.Item>
    )

    let dpIndividuo = (
        <Dropdown.Item href="#/individuo">
            <img className='' src={ind} style={{ height: '5vh' }} alt="Generalità" />Generalità
        </Dropdown.Item>
    )


    function setItems() {
        switch (props.scheda) {
            case 'Individuo':
                return (<Dropdown.Menu>
                    {dpCranio}
                </Dropdown.Menu>)
            case 'Cranio':
                return (<Dropdown.Menu>
                    {dpIndividuo}
                </Dropdown.Menu>)
            default:
                return <div></div>
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
                {setMain()}
            </Dropdown.Toggle>

            {setItems()}
        </Dropdown>
    );
}
export default DropDownDistretti;