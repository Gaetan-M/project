const initState = {
    copies:[
        //example of a devoir object
        {idCopie:1, idEvaluation:1, idEtudiant:1, idTypeEvaluation:3, dateRemis:'04/26/2020', propositions:[{index:1, proposition:'mark', score:0}], submitted:false, doneMarking:false},
        //example of a cc, examen or rattrapage object
        // {idCopie: 2, idEvaluation: 1, idEtudiant: 1, idTypeEvaluation: 1, propositions:[{index: 1, proposition: "Mark", score: 0},{index: 2, proposition: "Kouatchoua", score: 2}], doneMarking:false}
    ]
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
