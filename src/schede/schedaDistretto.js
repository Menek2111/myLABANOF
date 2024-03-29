import React, { useEffect, useState } from 'react';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DropDownDistretti from '../UI/dropDownDistretti';
import { useLocation } from 'react-router-dom';

import skull from '../images/skull.png'
import colonna from '../images/colonna.png'
import denti from '../images/teeth.png'
import torace from '../images/torace.png'
import artiSuperiori from '../images/artisup.png'
import artiInferiori from '../images/artiinf.png'
import nmr from '../images/nmr.png'

import OssaDistretto from '../tabelle/distretti/OssaDistretto';
import CaratteriMetrici from '../tabelle/caratteri/caratteriMetrici';
import CaratteriNonMetrici from '../tabelle/caratteri/caratteriNonMetrici';

import ConnectionManager from '../api/ConnectionManager';

function SchedaDistretto(props) {

    // @todo: rendere dinamica questa funzione
    let getDistrettoId = (nome) => {
        switch (nome) {
            case 'Cranio':
                return 1
            case 'Denti':
                return 2
            case 'Colonna':
                return 3
            case 'Torace':
                return 4
            case 'Arti superiori':
                return 5
            case 'Arti inferiori':
                return 6
            case 'NMR':
                return 7
            default:
                return null
        }
    }

    let imageFromDistretto = (nome) => {
        switch (nome) {
            case 'Cranio':
                return skull
            case 'Denti':
                return denti
            case 'Colonna':
                return colonna
            case 'Torace':
                return torace
            case 'Arti superiori':
                return artiSuperiori
            case 'Arti inferiori':
                return artiInferiori
            case 'NMR':
                return nmr
            default:
                return null
        }
    }

    const getNumeroOssaByIndividuoAndDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getNumeroOssaByIndividuoAndDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: getDistrettoId(props.distretto) }));
        return res
    }
    const getNumeroDentiByIndividuoAndDistretto = async () => {
        let cm = new ConnectionManager();
        let res = await cm.getNumeroDentiByIndividuoAndDistretto(JSON.stringify({ individuo: sessionStorage.getItem('individuoSelezionato'), distretto: getDistrettoId(props.distretto) }));
        return res
    }

    const [nOssa, setNOssa] = useState()

    const centerMiddle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    };

    const location = useLocation();
    useEffect(() => {
        if (localStorage.getItem('isOnline') == 'true') {
            aggiorna()
        } else {
            //OFFLINE
        }

    }, [location]);

    let aggiorna = () => {
        if (getDistrettoId(props.distretto) != 2) {
            getNumeroOssaByIndividuoAndDistretto().then(res => {
                console.log('nossa', res)
                if (res.response === 'success') {
                    setNOssa(res.results[0].numero)
                }
            })
        } else {
            getNumeroDentiByIndividuoAndDistretto().then(res => {
                console.log('nossa', res)
                if (res.response === 'success') {
                    setNOssa(res.results[0].numero)
                }
            })
        }
    }

    let numeroOssa = () => {
        if (getDistrettoId(props.distretto) == 7) {
            return <></>
        } else {
            if (getDistrettoId(props.distretto) == 2) {
                return <>Denti presenti: {nOssa}</>
            } else {
                return <>Ossa presenti: {nOssa}</>
            }
        }
    }

    return (
        <div className='px-4 py-2 containerPrincipale'>
            <div className='rounded h-100'>
                <div className='container-fluid h-100'>
                    <div className='row h-100'>
                        <div className='col bg-white h-100 w-100 rounded border' style={{ overflowY: 'scroll' }}>
                            <div className='row border-bottom rounded-top justify-content-between'>
                                <div className='col-10 py-2 d-flex'>
                                    <div style={centerMiddle}>
                                        <DropDownDistretti scheda={props.distretto} />
                                    </div>
                                    <div className='d-flex w-100 justify-content-center'>
                                        <img className='mx-2' src={imageFromDistretto(props.distretto)} style={{ height: '10vh' }} />
                                        <p style={centerMiddle} className=''>Distretto: {props.distretto.toUpperCase()} <br />
                                            {nOssa ? (numeroOssa()) : (<> </>)}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-2 d-flex flex-column justify-content-center'>
                                    <div className='d-flex justify-content-around'>
                                    </div>
                                </div>
                            </div>
                            <div className='row py-3'>
                                <OssaDistretto distretto={props.distretto} callback={aggiorna} />
                            </div>
                            <div className='row py-3'>
                                <CaratteriMetrici distretto={getDistrettoId(props.distretto)} />
                                <CaratteriNonMetrici distretto={getDistrettoId(props.distretto)} />
                            </div>

                            <div className='py-5'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SchedaDistretto;