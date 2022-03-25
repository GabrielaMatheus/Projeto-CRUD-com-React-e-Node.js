import React from 'react'

export default (props) => (
    <div className="card">
        <div className="card-header">
            {props.header}
        </div>

        <div className="card-body">
            {props.children}
        </div>
    </div>
)


// GRANDE OBS: eu não preciso nomear esse export porque só tem ele dentro desse componente.
// Quando eu for exporta-lo, na importanção eu o nomeio e ele ja entende.