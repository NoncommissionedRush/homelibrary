import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import { setFilter, deleteTag } from '../actions/bookActions.js';
import store from '../store.js';

const Tag = props => {
    const { book, tagName, edit, isLoading, setFilter, deleteTag } = props;

    const selectFilterTags = state => {
        return state.books.filter.tags;
    };

    const addTagToFilter = tag => {
        const currentTags = selectFilterTags(store.getState());
        if (currentTags.includes(tag)) {
            const newTagsArray = currentTags.filter(t => t !== tag);
            return setFilter({ tags: newTagsArray });
        }
        setFilter({ tags: [...currentTags, tag] });
    };

    return edit ? (
        <Button
            size="sm"
            variant="danger"
            disabled={isLoading}
            style={{ marginRight: '.2rem' }}
            onClick={
                isLoading
                    ? null
                    : e => {
                          deleteTag(book.id, tagName);
                      }
            }
        >
            {isLoading ? 'loading' : `${tagName} X`}
        </Button>
    ) : (
        <Button
            size="sm"
            variant="secondary"
            style={{ marginRight: '.5rem' }}
            onClick={e => addTagToFilter(e.target.innerText)}
        >
            {tagName}
        </Button>
    );
};

export default connect(null, { setFilter, deleteTag })(Tag);
