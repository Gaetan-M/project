const initState = {
    evaluations:[
        {idEvaluation:1, dateTime:'Sun May 03 2020 01:25:00', idPersonnel:1, idCour:1, duree:'0:01', deadLine:'04-27-2020', idTypeEvaluation:1, questions:[
            {idTypeQuestion:2, index:1, indications:'say hello world before you start', question:'What is your fathers name?', options:['Kouatchoua', 'mark', 'yonga'], answer:'Kouatchoua', refFiles:[], mark:2}
            ,{idTypeQuestion:1, index:2, indications:'say hello world before you start', question:'what is your fathers name?', options:['Kouatchoua', 'mark', 'yonga'], answer:'Kouatchoua', refFiles:[], mark:2}
        ], published:true},
    ]
}

const evaluationReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_EVALUATION':
            return{...state, evaluations:[...state.evaluations, ...action.payload]}
        default:
            return state
    }
}

export default evaluationReducer;

// {
//     index:1, idTypeQuestion:1, indications:'', question:'', options:[], answer:'', refFiles:[], mark:''
// }