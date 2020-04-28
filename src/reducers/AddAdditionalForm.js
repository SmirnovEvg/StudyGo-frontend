const AddAdditionalFormDisplay = (state = false, action) => {
    switch (action.type) {
        case 'SWITCH_FORM_DISPLAY':
            return !state
        default:
            return state
    }
}
export default AddAdditionalFormDisplay;