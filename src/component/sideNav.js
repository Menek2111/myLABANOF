import React from "react";
import Nav from 'react-bootstrap/Nav';

import ModalCreateIndividuo from "../UI/modalCreateIndividuo";
import ModalCreateTomba from "../UI/modalCreateTomba";

function SideNav() {


    return (
        <div className="">
            <Nav defaultActiveKey="/home" className="flex-column">

                <ModalCreateIndividuo />

                <div className="my-3"></div>

                <ModalCreateTomba />
                <Nav.Link eventKey="link-1" disabled>Carica immagini</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Scheda amministratore
                </Nav.Link>
            </Nav>
        </div>
    );

}
export default SideNav