const initState = {
    teachers:[{
        idTeacher:1,
        idPersonnel:1,
        matriculePersonnel:'babatas',
        toughtClasses: [{idClasse:1, nomClasse:'IRT 3'}, {idClasse:2, nomClasse:'IRT 2'}, {idClasse:3, nomClasse:'IRT 1'}],
    }]
}

const teacherReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_TEACHER':
            return{...state, teachers:[...state.teachers, ...action.payload]}
        default:
            return state
    }
}

export default teacherReducer;
