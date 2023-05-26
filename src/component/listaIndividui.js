import React from "react";

import anteprima from '../images/screen.PNG'
import doc from '../images/documents.png'
import { Dna } from 'react-loader-spinner'

class ListaIndividui extends React.Component {

    constructor(props) {
        super(props);
        this.state = { individui: props.individui, navigator: props.navigator };
    }

    componentDidMount() {

    }

    parseTimeStamp(timeStamp) {

        if (timeStamp == null) {
            return 'Nessuna modifica'
        }

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


    render() {

        return (
            <div className="row d-flex flex-row" style={{ overflowY: 'auto' }} >
                {this.state.individui ? (
                    this.state.individui.map(ind =>
                        <div key={ind.id} className="col-3" >
                            <div className="p-2  rounded m-2 indCard border" style={{ backgroundColor: '#F2F6FC' }} onClick={() => {
                                sessionStorage.setItem('individuoSelezionato', ind.id)
                                this.state.navigator('/individuo')
                            }}>
                                <div className="pb-1">
                                    <img src={doc} alt="doc" style={{ height: '3vh' }} /> {ind.nome}
                                </div>
                                <div className="text-center">
                                    <img className="rounded w-100" alt="anteprima" src={anteprima} style={{ width: '15vw' }} />
                                </div>
                                <div>
                                    <p className="p-0 m-0">{this.parseTimeStamp(ind.ultimaModifica)}</p>
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

                )}
            </div>

        );
    }
}

export default ListaIndividui