import { combineReducers } from "redux";
import EquipementsReducer from "./equipements.reducer";
import SitesReducer from "./sites.reducer";
import EquipementReducer from "./equipement.reducer";
import EquipementsTypesReducer from "./equipementstype.reducer";
import SitesTypeReducer from "./sitestype.reducer";
import CategoriesReducer from "./categoriesReducer";
import SuppliersReducer from "./suppliers";
import AgentsReducer from "./agents.reducer";
import FailuresReducer from "./failures.reducer";
import InterventionsReducer from "./interventions.reducer";
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
    interventions:InterventionsReducer
    
});

export default rootReducer;