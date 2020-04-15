const initState = {
    classes:[
        {idClasse:1, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'AU', niveauMax:3}, niveau:1},
        {idClasse:2, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'AU', niveauMax:3}, niveau:2},
        {idClasse:3, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'AU', niveauMax:3}, niveau:3},
        {idClasse:4, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:1},
        {idClasse:5, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:2},
        {idClasse:6, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'ERGC', niveauMax:3}, niveau:3},
        {idClasse:7, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GC', niveauMax:3}, niveau:1},
        {idClasse:8, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GC', niveauMax:3}, niveau:2},
        {idClasse:9, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GC', niveauMax:3}, niveau:3},
        {idClasse:10, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GM', niveauMax:3}, niveau:1},
        {idClasse:11, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GM', niveauMax:3}, niveau:2},
        {idClasse:12, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'GM', niveauMax:3}, niveau:3},
        {idClasse:13, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:1},
        {idClasse:14, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:2},
        {idClasse:15, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IMB', niveauMax:3}, niveau:3},
        {idClasse:16, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:1},
        {idClasse:17, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:2},
        {idClasse:18, timetable:[], nomFaculty:'FST', filiere:{nomFiliere:'IRT', niveauMax:3}, niveau:3},
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
