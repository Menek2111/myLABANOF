import React from "react";
import { Dna } from 'react-loader-spinner'

function Loading() {
    return (<div className='h-100 d-flex flex-column justify-content-center text-center'>
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
    </div>)
}
export default Loading