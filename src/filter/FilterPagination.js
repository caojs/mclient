import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { actions } from '../ducks/filters';

import styles from './FilterPagination.module.css';

class FilterPagination extends Component {
    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange({ selected }) {
        let {onPageChange} = this.props;
        onPageChange(selected);
    }

    render() {
        let {
            response,
        } = this.props;

        let {
            per_page: perPage,
            total_count: totalCount,
        } = response;

        let pageCount = Math.ceil(totalCount/perPage);

        return (
            pageCount > 1
                ? <ReactPaginate
                        previousLabel={<FiChevronLeft/>}
                        nextLabel={<FiChevronRight/>}
                        breakLabel={"..."}
                        initialPage={0}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        disableInitialCallback={true}
                        onPageChange={this.onPageChange}
                        containerClassName={styles.main}
                        pageClassName="pagination__item"
                        breakClassName="pagination__break"
                        previousClassName="pagination__prev"
                        nextClassName="pagination__next"
                        activeClassName={"active"} />
                : null
        );
    }
}

export default connect(
    null,
    {
        onPageChange: actions.onPageChange,
        applyFilters: actions.applyFilters
     }
)(FilterPagination)