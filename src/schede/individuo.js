import React, { useState, useEffect } from 'react';
import skele from '../images/skele.jpg'
import skeleretro from '../images/skeleretro.jpg'

import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Individuo() {
    return (
        <div>
            <div className='container bg-white mt-3 rounded'>
                <div className='p-2'>
                    <div className='d-flex justify-content-between'>
                        <span><a href='#' className='text-decoration-none'>I miei individui</a> > <a>TB04 IND A US 2</a></span>
                        <button className='btn btn-primary'>Modifica</button>
                    </div>
                </div>
                <div className='row py-2'>
                    <div className='col-lg-2  p-3 mx-2 '>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={skele}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={skeleretro}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className='col-lg-3'>
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th className='bg-info text-white'>Individuo</th>
                                    <td className='bg-info text-white text-center'><button className='btn m-0 p-0'>Modifica</button></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Nome</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Luogo rinvenimento</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Data rinvenimento</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Tomba</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Epoca</th>
                                    <td>1</td>
                                </tr>

                            </tbody>
                        </Table>
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th className='bg-info text-white'>Profilo biologico</th>
                                    <td className='bg-info text-white text-center'><button className='btn m-0 p-0'>Modifica</button></td>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Sesso biologico</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Classe di età</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Origine geografica</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Origine biologica</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Peso cremazione</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Volume cremazione</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Stato</th>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <th>Peso individuo</th>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='col'>
                        <Table bordered striped hover>
                            <thead>
                                <tr>
                                    <th className='bg-info text-white'>Informazioni registrate</th>
                                    <td className='bg-info text-white text-center'><button className='btn m-0 p-0'>Modifica</button></td>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Numero ossa</th>
                                    <td>-/206</td>
                                </tr>
                                <tr>
                                    <th>Numero immagini</th>
                                    <td>23</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='row'>
                            <div className='col'>
                                <Table bordered striped hover>
                                    <thead>
                                        <tr>
                                            <th className='bg-info text-white'>Patologie</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>...</th>
                                        </tr>
                                        <tr>
                                            <th>...</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className='col'>
                                <Table bordered striped hover>
                                    <thead>
                                        <tr>
                                            <th className='bg-info text-white'>Traumi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>...</th>
                                        </tr>
                                        <tr>
                                            <th>...</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Individuo;