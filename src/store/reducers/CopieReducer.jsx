const initState = {
    copies:[{
        idCopie:1,
        idEvaluation:1,
        idEtudiant:1,
        dateRemis:'04/26/2020',
        propositions:[{index:1, proposition:'mark'}],
        submitted:false
    }]
}

const copieReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_COPIE':
            return{...state, copies:[...state.copies, ...action.payload]}
        default:
            return state
    }
}

export default copieReducer;
