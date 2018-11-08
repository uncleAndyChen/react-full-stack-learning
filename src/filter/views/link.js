import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions.js';
import PropTypes from 'prop-types';

const Link = ({active, children, onClick}) => {
    if (active) {
        return <b className="filter selected">{children}</b>;
    } else {
        return (
            <button
                type="button"
                className="link-button filter not-selected"
                onClick={(ev) => {
                    ev.preventDefault();
                    onClick();
                }}>
                {children}
            </button>
        );
    }
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.filter === ownProps.filter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(setFilter(ownProps.filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
