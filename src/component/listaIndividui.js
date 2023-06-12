import React from "react";
import indLogo from '../images/icons/skull.png'

import { Dna } from 'react-loader-spinner'

class ListaIndividui extends React.Component {

    constructor(props) {
        super(props);
        this.state = { individui: props.individui, navigator: props.navigator };
    }

    //Creo la scritta con l'ultima modifica
    parseTimeStamp(timeStamp) {

        if (timeStamp == null) return 'Nessuna modifica'

        var now = new Date(timeStamp * 1000);
        const formattedDate = new Date(now).toLocaleString(
            "it-IT",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
        return 'Modificato: ' + formattedDate
    }

    //#F2F6FC

    render() {
        return (
            <div className="row w-100 d-flex flex-row" style={{ overflowY: 'auto' }} >
                {this.state.individui ? (
                    this.state.individui.map(ind =>
                        <div key={ind.id} className={this.props.colonna} >
                            <div className="d-flex rounded m-1 indCard border" style={{ backgroundColor: '', cursor: 'pointer' }} onClick={() => {
                                sessionStorage.setItem('individuoSelezionato', ind.id)
                                sessionStorage.setItem('individuoSelezionatoCreatore', ind.creatore)
                                this.state.navigator('/individuo')
                            }}>
                                <div className="w-25">
                                    <img src={indLogo} className="w-100 p-2" />
                                </div>
                                <div className="p-1 w-75">
                                    <span >
                                        {ind.nome}
                                    </span>
                                    <br />
                                    <span style={{ fontSize: '0.8em' }}>
                                        {ind.email}
                                    </span>
                                    <br />
                                    <span style={{ fontSize: '0.7em' }}>
                                        {this.parseTimeStamp(ind.ultimaModifica)}
                                    </span>
                                </div>


                            </div>
                        </div>
                    )
                ) : (
                    <div className=' h-100 d-flex flex-column justify-content-center text-center'>
                        <div>
                            <Dna
                                visible={true}
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        </div>
                        <div>
                            Caricamento in corso...
                        </div>
                    </div>
                )
                }
            </div>
        );
    }
}

export default ListaIndividui