import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import FilterTag from './FilterTag';
import styles from './FilterActived.module.css';
import { selectedFiltersSelector } from './selectors';

class ActivatedFilters extends Component {
    render() {
        let { selectedFilters } = this.props;
        return (
            selectedFilters.length > 0 ?
                (<>
                    <span className="col-12 cm-heading">Active filters:</span>
                    <div className={cn("col-12", styles.filters)}>
                        {selectedFilters.map(filter => {
                            let {
                                id,
                                selectLabel,
                                label,
                                value
                            } = filter;
                            return (
                                <FilterTag
                                    key={id}
                                    value={value}
                                    label={`${selectLabel} : ${label}`}/>);
                        })}
                    </div>
                </>):
                null);
    }
}

export default connect(
    (state, ownProps) => {

        return {
            ...ownProps,
            selectedFilters: selectedFiltersSelector(state)
        };
    }
)(ActivatedFilters)