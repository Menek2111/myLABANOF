import React from "react";

import tomb from '../images/tomblogo.png'
import { Dna } from 'react-loader-spinner'

class ListaTombe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tombe: props.tombe, navigator: props.navigator };
    }

    render() {
        return (
            <div className="row" style={{ overflowX: 'auto' }} >
                {this.state.tombe ? (
                    this.state.tombe.map(tomba =>
                        <div key={tomba.id} className={this.props.colonna} >
                            <div className='d-flex indCard text-center rounded my-1 border p-2' style={{ backgroundColor: '' }} onClick={() => this.props.navigator('/tomba', { state: { tomba: tomba } })}>
                                <div className="w-25" >
                                    <img className="w-100" src={tomb} alt="tomba" />
                                </div>
                                <div className="w-75">
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='w-75 p-0 m-0'>
                                        {tomba.nome}

                                    </span><br />
                                    <span style={{ fontSize: '0.8em' }}>
                                        N° Individui: {tomba.nIndividui}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className='d-flex flex-column justify-content-center text-center'>
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
export default ListaTombe