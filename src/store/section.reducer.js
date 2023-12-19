import {createSlice} from '@reduxjs/toolkit';

import {topicApiReq} from 'src/api/topic-api-req';

const initialState = {
    sections: []
};

export const sectionReducerSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        sortSection: (state, action) => {
            state.sections = action.payload.new_section
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(topicApiReq.endpoints.getSectionsListByTopicId.matchFulfilled, (state, {payload}) => {
            state.sections = payload.sectionList;
        });

    },
});

export const {sortSection} = sectionReducerSlice.actions;

const sectionReducer = sectionReducerSlice.reducer;

export const SelectSectionsList = (state) => state.section.sections;


export default sectionReducer;
