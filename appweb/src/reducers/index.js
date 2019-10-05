import { combineReducers } from "redux";
import EquipementsReducer from "./equipementsReducer";
import SitesReducer from "./sitesReducer";
import EquipementReducer from "./equipementReducer";
import EquipementsTypesReducer from "./equipementstypeReducer";
import SitesTypeReducer from "./sitestypeReducer";
import CategoriesReducer from "./categoriesReducer";
import SuppliersReducer from "./suppliersReducer";
import AgentsReducer from "./agentsReducer";
import FailuresReducer from "./failuresReducer";
import InterventionsReducer from "./interventionsReducer";
import NotificationsReducer from './notificationsReducer';
import errorReducer from "./errorReducer";
import authReducer from './authReducer';
import UsersReducer from './users.reducer';
import IsAuthenticatedReducer from './authenticated'
 const rootReducer = combineReducers({
    equipements: EquipementsReducer,
    equipementsTypes: EquipementsTypesReducer,
    equipement:EquipementReducer,
    sites:SitesReducer,
    sitesType:SitesTypeReducer,
    categories:CategoriesReducer,
    suppliers:SuppliersReducer,
    agents:AgentsReducer,
    failures:FailuresReducer,
    interventions:InterventionsReducer,
    users:UsersReducer,
    notifications: NotificationsReducer,
    error: errorReducer,
    auth: authReducer,
    isAuthenticated:IsAuthenticatedReducer
});

export default rootReducer;