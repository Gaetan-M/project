import { combineReducers } from 'redux'

import BatimentReducer from './BatimentReducer';
import ClasseReducer from './ClasseReducer';
import CoordonateurReducer from './CoordonateurReducer';
import CoursReducer from './CoursReducer';
import EvaluationReducer from './EvaluationReducer';
import FacultyReducer from './FacultyReducer';
import ModuleReducer from './ModuleReducer';
import PersonnelReducer from './PersonnelReducer';
import RoleReducer from './RoleReducer';
import TeacherReducer from './TeacherReducer';
import TimetableReducer from './TimetableReducer';
import TroncCommunReducer from './TroncCommunReducer';
import TypeEvaluationReducer from './TypeEvaluationReducer';
import TypeQuestionReducer from './TypeQuestionReducer';

const rootReducer = combineReducers({
    Batiment:BatimentReducer,
    Classe: ClasseReducer,
    Coordonateur: CoordonateurReducer,
    Cour: CoursReducer,
    Evaluation: EvaluationReducer,
    Faculty: FacultyReducer,
    Module: ModuleReducer,
    Personnel: PersonnelReducer,
    Role: RoleReducer,
    Teacher: TeacherReducer,
    Timetable: TimetableReducer,
    TroncCommun: TroncCommunReducer,
    TypeEvaluation: TypeEvaluationReducer,
    TypeQuestion: TypeQuestionReducer
})

export default rootReducer