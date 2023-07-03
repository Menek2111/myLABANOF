import React from "react";
import Nav from 'react-bootstrap/Nav';

import ModalCreateIndividuo from "../UI/modalCreateIndividuo";
import ModalCreateTomba from "../UI/modalCreateTomba";
import ModalCreateNecropoli from "../UI/modalCreateNecropoli";

function SideNav() {


    return (
        <div className="">
            <Nav defaultActiveKey="/home" className="flex-column">

                <div className="my-2"></div>

                <ModalCreateIndividuo />

                <ModalCreateTomba />

                <ModalCreateNecropoli />

                <div className="my-4"></div>

            </Nav>
        </div>
    );



}
export default SideNav