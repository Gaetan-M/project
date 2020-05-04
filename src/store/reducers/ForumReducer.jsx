const initState = {
    forums:[
        {idForum:1, idCour:1, messages:[
            {date:'Tue Apr 20 2020', dateTime:'Tue Apr 20 2020 12:02:36', idEtudiant:1, message:'Good morning LUC', refFile:'', isEnseignant:false},
        ]}
    ]
}

const forumReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_BATIMENT':
            return{...state, forums:[...state.forums, ...action.payload]}
        default:
            return state
    }
}

export default forumReducer;
