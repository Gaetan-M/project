const initState = {
    forums:[
        {idForum:1, idCour:1, messages:[
            {date:'Tue Apr 21 2020', dateTime:'Tue Apr 21 2020 14:02:36', idEtudiant:1, message:'Wetin you chop today?', refFile:'', isEnseignant:false},
            {date:'Tue Apr 22 2020', dateTime:'Tue Apr 22 2020 14:02:36', idEtudiant:1, message:'Good morning class', refFile:'', isEnseignant:false},
            {date:'Tue Apr 21 2020', dateTime:'Tue Apr 21 2020 12:02:36', idEtudiant:1, message:'Good morning class', refFile:'', isEnseignant:false},
            {date:'Tue Apr 20 2020', dateTime:'Tue Apr 20 2020 12:56:36', idEtudiant:1, message:'Good morning class', refFile:'', isEnseignant:false},
            {date:'Tue Apr 22 2020', dateTime:'Tue Apr 22 2020 12:03:36', idEtudiant:1, message:'Good morning class', refFile:'', isEnseignant:false},
            {date:'Tue Apr 20 2020', dateTime:'Tue Apr 20 2020 12:02:36', idEtudiant:1, message:'Good morning class', refFile:'', isEnseignant:false},
        ]}
    ]
}

const forumReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_BATIMENT':
            return{...state, etudiants:[...state.forums, ...action.payload]}
        default:
            return state
    }
}

export default forumReducer;
