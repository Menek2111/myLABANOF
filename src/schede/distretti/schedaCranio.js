import React, { useEffect } from 'react';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DropDownDistretti from '../../UI/dropDownDistretti';

import Cranio from '../../tabelle/distretti/cranio';
import CaratteriMetrici from '../../tabelle/caratteri/caratteriMetrici';
import CaratteriNonMetrici from '../../tabelle/caratteri/caratteriNonMetrici';


function SchedaIndividuo() {

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    return (
        <div className='px-4 py-2 containerPrincipale'>
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col bg-white h-100 w-100 rounded border' style={{ overflowY: 'scroll' }}>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <DropDownDistretti scheda='Cranio' />
                                    </div>
                                    <h5 style={centerMiddle} className=''>CRANIO</h5>
                                </div>
                                <div className='col-2 d-flex flex-column justify-content-center'>
                                    <div className='d-flex justify-content-around'>
                                    </div>
                                </div>
                            </div>
                            <div className='row py-3'>
                                <Cranio />
                            </div>
                            <div className='row py-3'>
                                <CaratteriMetrici distretto='1' />
                                <CaratteriNonMetrici distretto='1' />
                            </div>

                            <div className='py-5'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaIndividuo;