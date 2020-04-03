import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import utilsReducer from './UtilsReducer';

/*
    Hay varias formas de manejar los reducer a usar en una aplicacion, depende totalmente del desarrollador.
    Si quisiera podriamos tener un Reducer base que tenga todos los reducer de la aplicacion, pero seria un caos.
    Redux ofrece el metodo combineReducer que te permite tener varios reducer y combinarlos, de esta forma el store termina
    de todas formas siendo un arbol de informacion con la estructura que uno le determine.
*/    
const Reducer = combineReducers({
    userReducer,
    utilsReducer
});

export default Reducer;