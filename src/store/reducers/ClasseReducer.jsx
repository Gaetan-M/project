const initState = {
    classes:[
        {idClasse:1, filiere:{nomFiliere:'AU', niveauMax:3}, niveau:1},
        {idClasse:2, filiere:{nomFiliere:'AU', niveauMax:3}, niveau:2},
        {idClasse:3, filiere:{nomFiliere:'AU', niveauMax:3}, niveau:3},
        {idClasse:4, filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:1},
        {idClasse:5, filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:2},
        {idClasse:6, filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:3},
        {idClasse:7, filiere:{nomFiliere:'GC', niveauMax:3}, niveau:1},
        {idClasse:8, filiere:{nomFiliere:'GC', niveauMax:3}, niveau:2},
        {idClasse:9, filiere:{nomFiliere:'GC', niveauMax:3}, niveau:3},
        {idClasse:10, filiere:{nomFiliere:'GM', niveauMax:3}, niveau:1},
        {idClasse:11, filiere:{nomFiliere:'GM', niveauMax:3}, niveau:2},
        {idClasse:12, filiere:{nomFiliere:'GM', niveauMax:3}, niveau:3},
        {idClasse:13, filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:1},
        {idClasse:14, filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:2},
        {idClasse:15, filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:3},
        {idClasse:16, filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:1},
        {idClasse:17, filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:2},
        {idClasse:18, filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:3},
    ]
}

const classeReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_CLASSE':
            return{...state, classes:[...state.classes, ...action.payload]}
        default:
            return state
    }
}

export default classeReducer;
