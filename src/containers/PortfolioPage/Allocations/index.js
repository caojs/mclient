import React, { Component } from 'react';
import cn from 'classnames';
import { IoMdAdd } from 'react-icons/io';
import { connect, getIn } from 'formik';
import { range } from 'lodash-es';
import { RawInput, RawNumberInput, RawDumbInput } from '../../../components/Formiks';

class Allocations extends Component {
    constructor(props) {
        super(props);

        const { tickers } = this.props;

        this.state = { tickerCount: tickers.length };

        this.addTicker = this.addTicker.bind(this);
    }

    addTicker() {
        this.setState(({ tickerCount }) => ({
            tickerCount: tickerCount + 1
        }));
    }

    render() {
        let {
            portfolios,
            formik
        } = this.props;
        let { tickerCount } = this.state; 

        return (
            <>
            <label>Portfolio assets</label>
            <div className="row no-gutters">
                <div className="col-3">
                    <table className="table mb-0">
                        <thead><tr><th>#Asset</th></tr></thead>
                        <tbody>
                            {range(tickerCount)
                                .map((tidx) => (
                                    <tr key={tidx}>
                                        <td>
                                            <RawInput name={`tickers.${tidx}`}/>
                                        </td>
                                    </tr>
                                ))}
                            <tr>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.addTicker}>
                                        <IoMdAdd/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {portfolios.map((portfolio, index) => {
                    const total = (getIn(formik.values, `allocations.${index}`) || [])
                        .filter(value => value)
                        .reduce((accum, value) => accum + +value, 0);

                    return (
                        <div className="col" key={index}>
                            <table className="table mb-0">
                                <thead><tr><th>Allocation #{portfolio}</th></tr></thead>
                                <tbody>
                                    {range(tickerCount)
                                        .map((tidx) => (
                                            <tr key={tidx}>
                                                <td>
                                                    <RawNumberInput min={0} max={100} name={`allocations.${index}.${tidx}`}/>
                                                </td>
                                            </tr>
                                        ))}
                                    <tr>
                                        <td>
                                            <RawDumbInput
                                                name={`allocationTotal.${index}`}
                                                value={total}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }
}

export default connect(Allocations);