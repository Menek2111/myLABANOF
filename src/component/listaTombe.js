import React from "react";

import tomb from '../images/tomblogo.png'


class ListaTombe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tombe: props.tombe, navigator: props.navigator };

    }

    componentDidMount() {

    }

    render() {


        return (
            <div className="d-flex" style={{ overflowX: 'auto' }} >
                {this.state.tombe ? (
                    this.state.tombe.map(tomba =>
                        <div key={tomba.id} className='d-flex flex-column indCard col-1  text-center rounded m-2 border p-2' style={{ backgroundColor: '#F2F6FC' }} onClick={() => this.props.navigator('/tomba', { state: { tomba: tomba } })}>
                            <img src={tomb} alt="tomba" />
                            <p className='p-0 m-0'>
                                <b>{tomba.nome}</b>
                            </p>
                        </div>
                    )
                ) : (
                    <div>NO</div>
                )}
            </div>
        );
    }
}

/*
<div className='row'>
               
                <div className='d-flex flex-column col-1  text-center rounded m-2 border p-2' style={{ backgroundColor: '#F2F6FC' }}>
                    <img src={tomb} />
                    <p className='p-0 m-0'>
                        <b>Tb04</b>
                    </p>
                </div>
            </div>
*/

export default ListaTombe