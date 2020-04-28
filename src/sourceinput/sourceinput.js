import React from 'react';
import {connect} from "react-redux";

const SourceInput = ({stuff}) => {
    return (
        <div>eh?: {stuff}</div>
    )
};

const mapStateToProps = state => {
    const { sourceInput } = state;
    return sourceInput;
};

export default connect(mapStateToProps)(SourceInput);