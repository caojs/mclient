import update from 'immutability-helper'; import { CALL_API } from '../middlewares/api';

export const ON_FILTER_SELECT = "ON_FILTER_SELECT";
export const REMOVE_ACTIVATED_FILTER = "REMOVE_ACTIVATED_FILTER";
export const FILTERS_REQUEST = "FILTERS_REQUEST";
export const FILTERS_SUCCESS = "FILTERS_SUCCESS";
export const FILTERS_FAILURE = "FILTERS_FAILURE";
export const FILTERS_PAGE_CHANGE = "FILTER_PAGE_CHANGE";
export const FILTERS_CUSTOM_HEADERS = "FILTERS_CUSTOM_HEADERS";
export const FILTERS_SEARCH = "FILTERS_SEARCH";
export const FILTERS_CHANGE_SIGNAL = "FILTERS_CHANGE_SIGNAL";
export const FILTERS_CHANGE_SORT = "FILTERS_CHANGE_SORT";

const initialState = {
    main: {},
    search: "",
    sort: [],
    signal: "",
    results: {
        summaryHeaderIds: "all",
        customHeaderIds: [0],
        isFetching: false,
        isLoaded: false,
        page: 0,
        response: null,
        error: null,
    }
};

export default (state = initialState, action) => {
    let {
        type,
        payload
    } = action;

    switch (type) {
        case ON_FILTER_SELECT:
        case REMOVE_ACTIVATED_FILTER:
        {
            let {
                filterType,
                filterId,
                optionId = null
            } = payload;

            return update(state, {
                main: {
                    $auto: {
                        [filterType]: {
                            $auto: {
                                [filterId]: { $set: optionId }
                            }
                        }
                    }
                }
            });
        }

        case FILTERS_REQUEST:
        {
            return update(state, {
                results: {
                    isFetching: { $set: true }
                }
            });
        }

        case FILTERS_SUCCESS:
        {
            let { response } = payload;
            return update(state, {
                results: {
                    isFetching: { $set: false },
                    isLoaded: { $set: true },
                    response: { $set: response },
                    error: { $set: null }
                }
            });
        }

        case FILTERS_FAILURE:
        {
            let { error } = payload;
            return update(state, {
                results: {
                    isFetching: { $set: false },
                    error: { $set: error }
                }
            });
        }

        case FILTERS_PAGE_CHANGE:
        {
            let { page } = payload;
            return update(state, {
                results: {
                    page: {
                        $set: page
                    }
                }
            });
        }

        case FILTERS_CUSTOM_HEADERS:
        {
            let { value } = payload;
            return update(state, {
                results: {
                    customHeaderIds: {
                        $set: value
                    }
                }
            });
        }

        case FILTERS_SEARCH:
        {
            let { value } = payload;
            return update(state, {
                search: { $set: value }
            });
        }
        
        case FILTERS_CHANGE_SIGNAL:
        {
            let { value } = payload;
            return update(state, {
                signal: { $set: value }
            });
        }

        case FILTERS_CHANGE_SORT:
        {
            let { value } = payload;
            return update(state, {
                sort: { $set: value }
            });
        }

        default:
            return state;
    }
}

const onSelect = (filterType, filterId, optionId) => ({
    type: ON_FILTER_SELECT,
    payload: {
        filterType,
        filterId,
        optionId
    }
});

const onRemove = (filterType, filterId) => () => ({
    type: REMOVE_ACTIVATED_FILTER,
    payload: {
        filterType,
        filterId
    }
});

const applyFilters = (url) => ({
    [CALL_API]: {
        types: [FILTERS_REQUEST, FILTERS_SUCCESS, FILTERS_FAILURE],
        endpoint: url
    }
});

const onPageChange = (page) => ({
    type: FILTERS_PAGE_CHANGE,
    payload: {
        page
    }
});

const changeCustomHeaders = (value) => ({
    type: FILTERS_CUSTOM_HEADERS,
    payload: {
        value
    }
});

const search = (value) => ({
    type: FILTERS_SEARCH,
    payload: { value }
});

const changeSignal = (value) => ({
    type: FILTERS_CHANGE_SIGNAL,
    payload: { value }
});

const changeSort = (value) => ({
    type: FILTERS_CHANGE_SORT,
    payload: { value }
})

export const actions = {
    onSelect,
    onRemove,
    onPageChange,
    applyFilters,
    changeCustomHeaders,
    search,
    changeSignal,
    changeSort
};