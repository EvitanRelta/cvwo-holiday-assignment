import Lodash from 'lodash';
import { Category, Task } from '../../apiClient/types';
import { DataDispatchTypes, DATA_APPEND_CATEGORY, DATA_APPEND_TAG, DATA_APPEND_TASK, DATA_EDIT_CATEGORY, DATA_EDIT_TASK, DATA_ERROR, DATA_LOADING, DATA_REMOVE_CATEGORY, DATA_REMOVE_TASK, DATA_SET_ALL_TASKS, DATA_SET_CATEGORIES } from './actionTypes';
import appendTagToCategory from './helperFunctions/appendTagToCategory';
import updateCategory from './helperFunctions/updateCategory';
import updateTask from './helperFunctions/updateTask';

type DataState = {
    hasInitData: boolean;
    isLoading: boolean;
    errorMessage?: string;
    tasks: Task[];
    categories: Category[];
};

const initialState: DataState = {
    hasInitData: false,
    isLoading: false,
    tasks: [],
    categories: []
};

const dataReducer = (state = initialState, action: DataDispatchTypes): DataState => {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case DATA_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };
        case DATA_SET_ALL_TASKS:
            return {
                ...state,
                hasInitData: true,
                isLoading: false,
                tasks: action.payload
            };
        case DATA_APPEND_TASK:
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.concat([action.payload])
            };
        case DATA_SET_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                categories: action.payload
            };
        case DATA_EDIT_TASK:
            return {
                ...state,
                isLoading: false,
                tasks: updateTask(state.tasks, action.payload)
            };
        case DATA_REMOVE_TASK:
            return {
                ...state,
                isLoading: false,
                tasks: Lodash.filter(state.tasks, task => task.id !== action.payload)
            };
        case DATA_APPEND_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categories: state.categories.concat([action.payload])
            };
        case DATA_APPEND_TAG:
            return {
                ...state,
                isLoading: false,
                categories: appendTagToCategory(state.categories, action.payload.categoryId, action.payload.tag)
            };
        case DATA_EDIT_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categories: updateCategory(state.categories, action.payload)
            };
        case DATA_REMOVE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                categories: Lodash.filter(state.categories, category => category.id !== action.payload)
            };
        default:
            return state;
    }
};

export default dataReducer;