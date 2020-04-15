const initState = {
    batiments:[{
        nomBatiment:'FST',
        nomFaculty:'FST',
        salles: [{nomSalle:'B03', capacite:30}],
    }]
}

const batimentReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_BATIMENT':
            return{...state, batiments:[...state.batiments, ...action.payload]}
        default:
            return state
    }
}

export default batimentReducer;
