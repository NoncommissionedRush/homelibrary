import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux';
import { setFilter } from '../actions/bookActions.js';
import store from '../store.js';

const mapStateToProps = state => {
    return {
        filterTags: state.books.filter.tags,
    };
};

function SearchBar({ setFilter, filterTags }) {
    const selectReadIndex = state => {
        return state.books.filter.readIndex;
    };

    const changeRadio = async e => {
        const index = parseInt(e.target.value);

        if (e.target.checked) {
            setFilter({ readIndex: selectReadIndex(store.getState()) + index });
        } else {
            setFilter({ readIndex: selectReadIndex(store.getState()) - index });
        }
    };

    const removeTagFromFilter = tag => {
        setFilter({ tags: filterTags.filter(t => t !== tag) });
    };

    return (
        <Fragment>
            <Form>
                <InputGroup className="mb-3">
                    {filterTags.map((tag, index) => (
                        <Button
                            style={{ marginRight: '.2rem' }}
                            size="sm"
                            variant="secondary"
                            key={index}
                            onClick={e =>
                                removeTagFromFilter(e.target.innerText)
                            }
                        >
                            {tag}
                        </Button>
                    ))}
                    <FormControl
                        placeholder="Hľadaj v názve knihy alebo mene autora"
                        onChange={e => setFilter({ string: e.target.value })}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Hľadať
                    </Button>
                </InputGroup>
            </Form>
            <label className="m-2">
                <input
                    type="checkbox"
                    value={1}
                    name="displayread"
                    data-name="bedo"
                    onChange={changeRadio}
                    style={{ marginRight: '0.3rem' }}
                />
                Beďove prečítané
            </label>
            <label>
                <input
                    type="checkbox"
                    value={2}
                    name="displayread"
                    data-name="zuzka"
                    onChange={changeRadio}
                    style={{ marginRight: '0.3rem' }}
                />
                Zuzkine prečítané
            </label>
        </Fragment>
    );
}

export default connect(mapStateToProps, { setFilter })(SearchBar);
