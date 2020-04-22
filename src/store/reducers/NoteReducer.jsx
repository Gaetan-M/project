const initState = {
    notes:[
        {idNote:1, idEtudiant:1, idCour:1, notes:{
            CC:{note:15, published:true},
            Examen:{note:20, published:true},
            Projet:{note:15, published:false},
            TD:{td:'', note:false},
            Rattrapage:{note:'', published:false}
        }}
    ]
}

const noteReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_NOTE':
            return{...state, notes:[...state.notes, ...action.payload]}
        default:
            return state
    }
}

export default noteReducer;
