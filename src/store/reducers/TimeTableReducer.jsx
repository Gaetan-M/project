const initState = {
    timetables: [
        {idTimetable:1, classe:{idClasse:18, nomClasse:'IRT 3'}, tableHeader:{weekStart:'2020-04-20', weekEnd:'Sun Apr 26 2020'}, table:[
            {index:1, debut:'08:00', fin:'12:00', mon:{cour:'IDE_1_Kouatchoua', salle:'B03'}, tue:{cour:'IDE_1_Wangun', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}},
            {index:2, debut:'13:00', fin:'17:00', mon:{cour:'IDE_1_Wangun', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}}
            // cour:subject_idPersonnel_nomPersonnel
        ]},
        {idTimetable:2, classe:{idClasse:2, nomClasse:'IRT 2'}, tableHeader:{weekStart:'2020-04-20', weekEnd:'Sun Apr 26 2020'}, table:[
            {index:1, debut:'08:00', fin:'12:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}},
            {index:2, debut:'13:00', fin:'17:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'IDE_1_Wangun', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}}
        ]},
        {idTimetable:3, classe:{idClasse:3, nomClasse:'IRT 2'}, tableHeader:{weekStart:'2020-04-20', weekEnd:'Sun Apr 26 2020'}, table:[
            {index:1, debut:'08:00', fin:'12:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}},
            {index:2, debut:'13:00', fin:'17:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}}
        ]},
    ]
}

const timetableReducer = (state = initState, action)=>{
    switch(action.type){
        case 'CREATE_TIMETABLE':
            return{...state, timetables:[...state.timetables, ...action.payload]}
        default:
            return state
    }
}

export default timetableReducer;
