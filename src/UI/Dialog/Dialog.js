import React from 'react';

const Dialog = props => (
         <div className="backdrop"
            onClick={props.click}>
            <div className={["dialog", props.err ? 'show': ''].join(' ')} >{props.err ? props.err.split('<B>').map( (el, i) => <p key={i}>{el}</p>) : null}</div>
         </div>
     )

export default Dialog;