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

    render() {

        return (
            <div className="row d-flex flex-row pt-4 h-100" style={{ overflowY: 'auto' }} >
                {this.props.individui ? (
                    this.props.individui.map(ind =>
                        <div key={ind.id} className="col-3" onClick={() => this.props.navigator('/individuo', { state: { individuo: ind.id } })}>
                            <div className="p-2  rounded m-2 indCard" style={{ backgroundColor: '#F2F6FC' }}>
                                <div className="pb-1">
                                    <img src={doc} alt="doc" style={{ height: '3vh' }} /> {ind.nome}
                                </div>
                                <div className="text-center">
                                    <img className="rounded w-100" alt="anteprima" src={anteprima} style={{ width: '15vw' }} />
                                </div>
                                <div>
                                    <p className="p-0 m-0">Modificato ieri</p>
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