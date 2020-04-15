const initState = {
    personnels: [
        {idPersonnel:2, matricule:'tchakou', nom:'Kouatchoua Tchakoumi', prenom:'Lorrain', mail:'lorraintchakoumi@gmail.com', tel:'657140183', role:'secretaire'},
        {idPersonnel:1, matricule:'kouatch', nom:'Kouatchoua', prenom:'Mark', mail:'kouatch@gmail.com', tel:'679879615', role:'enseignant', classesTought:['IRT 1', 'IRT 2', 'IRT3']},
        {idPersonnel:3, matricule:'abatas', nom:'Abatas', prenom:'Mark', mail:'kouatch@gmail.com', tel:'679879615', role:'enseignant', classesTought:['IRT 1', 'IRT 2', 'IRT3']},
        {idPersonnel:4, matricule:'ark', nom:'Kouatchoua', prenom:'Ark', mail:'kouatch@gmail.com', tel:'679879615', role:'enseignant', classesTought:['IRT 1', 'IRT 2', 'IRT3']},
        {idPersonnel:5, matricule:'lark', nom:'Kouatchoua', prenom:'Lark', mail:'kouatch@gmail.com', tel:'679879615', role:'enseignant', classesTought:['IRT 1', 'IRT 2', 'IRT3']},
        {idPersonnel:6, matricule:'babatas', nom:'Babatas', prenom:'Mark', mail:'kouatch@gmail.com', tel:'679879615', role:'coordonateur', classesTought:['IRT 1', 'IRT 2', 'IRT3']},
    ]
}

const personnelReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_PERSONNEL':
            return{...state, personnels:[...state.personnels, ...action.payload]}
        default:
            return state
    }
}

export default personnelReducer;
