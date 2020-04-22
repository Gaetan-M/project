const initState = {
    cours:[
        //idEnseignant is idPersonnel. but given that i already used it as idEnseignant, i felt lazy to change it again. ref(TeacherNotes, TimeTableFormat.jsx)
        {idCour:1, classe:['IRT 3','IMB 2'], nomCours:'IDE', codeCours:'PROG0001', nomEnseignant:'Wangun Parfait Pascal', idEnseignant:1, refSupports:[{nameFile:'Chap 1.pdf', ref:'PROG0001_1'}, {nameFile:'Chap 2.docx', ref:'PROG0001_2'}, {nameFile:'Chap 3.xls', ref:'PROG0001_3'},]}
    ]
}

const courReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_COUR':
            return{...state, cours:[...state.cours, ...action.payload]}
        default:
            return state
    }
}

export default courReducer;
