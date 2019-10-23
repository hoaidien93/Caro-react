// src/js/reducers/index.js
const initialState = {
    isLogged: false
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
    if(action.type === "Logged"){
        return {
            isLogged : true
        }
    }
    if(action.type === "Logout"){
        return {
            isLogged : false
        }
    }
    return state;
};
export default rootReducer;