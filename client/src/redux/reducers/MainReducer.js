import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import utilsReducer from './UtilsReducer';
import storage from 'redux-persist/lib/storage';

/*
    Hay varias formas de manejar los reducer a usar en una aplicacion, depende totalmente del desarrollador.
    Si quisiera podriamos tener un Reducer base que tenga todos los reducer de la aplicacion, pero seria un caos.
    Redux ofrece el metodo combineReducer que te permite tener varios reducer y combinarlos, de esta forma el store termina
    de todas formas siendo un arbol de informacion con la estructura que uno le determine.
*/ 
const appReducer = combineReducers({
    userReducer,
    utilsReducer
});

/*
    En este caso creamos el root reducer como pasamanos para atender la acción logout del usuario, según la 
    documentacion si un Reducer recive el primer parámetro state = undefined, debe devolver el estado incial 
    sin importar la acción. Aprovechandonos de eso vamos a devolver el estado en undefined cuando se hace logout.
    Ahora, cada vez que el se lance la acción logout, todos los reducer seran incializados a nuevo.
    Notemos que no está mutando el estado, sino que se está reasignando la referencia de una variable local
    llamada state antes de pasarla a otra función. Mutar el state, sería romper los principios de Redux. 
    También importamos el storage de Redux persist, para remover el storage según su key.
*/
// eslint-disable-next-line
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        state = undefined;
    }
    return appReducer(state, action);
}

export default appReducer;