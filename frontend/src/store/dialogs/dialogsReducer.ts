import { AddTagDialogProps } from '../../pages/main/components/dialogs/AddTagDialog';
import { DeleteDialogProps } from '../../pages/main/components/dialogs/DeleteDialog';
import { DialogDispatchTypes, DIALOGS_CLOSE_ADD_TAG, DIALOGS_CLOSE_DELETE_DIALOG, DIALOGS_OPEN_ADD_TAG, DIALOGS_OPEN_DELETE_DIALOG } from './actionTypes';



type DialogsState = {
    deleteDialogProps: DeleteDialogProps
    addTagDialogProps: AddTagDialogProps;
};

const initialState: DialogsState = {
    deleteDialogProps: {
        isOpen: false,
        title: '',
        description: '',
        onDelete: () => undefined,
        onCancel: () => undefined
    },
    addTagDialogProps: {
        isOpen: false,
        task: null,
        onClose: () => undefined
    }
};

const dialogsReducer = (state: DialogsState = initialState, action: DialogDispatchTypes): DialogsState => {
    switch (action.type) {
        case DIALOGS_OPEN_DELETE_DIALOG:
            return {
                ...state,
                deleteDialogProps: {
                    ...action.payload,
                    isOpen: true
                }
            };
        case DIALOGS_CLOSE_DELETE_DIALOG:
            return {
                ...state,
                deleteDialogProps: {
                    ...state.deleteDialogProps,
                    isOpen: false
                }
            };
        case DIALOGS_OPEN_ADD_TAG:
            return {
                ...state,
                addTagDialogProps: {
                    ...action.payload,
                    isOpen: true
                }
            };
        case DIALOGS_CLOSE_ADD_TAG:
            return {
                ...state,
                addTagDialogProps: {
                    ...state.addTagDialogProps,
                    isOpen: false
                }
            };
        default:
            return state;
    }
};

export default dialogsReducer;