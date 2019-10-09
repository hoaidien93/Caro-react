// src/js/reducers/index.js
const initialState = {
    
};
function rootReducer(state = initialState, action) {
    if(action.type === "XWin"){
        return {
            person: "X"
        }
    }
    if(action.type === "YWin"){
        return {
            person : "Y"
        }
    }
};
export default rootReducer;