import React from 'react';
import {connect} from "react-redux";

const SourceInput = (state) => {
    const message = state.services.length > 0 && state.services[0].methods.length > 0
        ? state.services[0].methods[0].name
        : "hi";

    return (
        <div>ehz?: {message}
        </div>
    )
};

const mapStateToProps = state => {
    const { sourceInput } = state;
    return sourceInput;
};

export default connect(mapStateToProps)(SourceInput);