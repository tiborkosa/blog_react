import React from 'react';
import PropTypes from 'prop-types';

const confirm = props => {

    return(
        <div className="backdrop">
            <div className={["dialog", props.message ? 'show': ''].join(' ')}>
                <div>{props.title}</div>
                <div>{props.message}</div>
                <div>
                    <button onClick={props.confirm}>Ok</button>
                    <button onClick={props.cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
confirm.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
}
confirm.defaultProps = {
    title: 'Confirm'
}
export default confirm;
