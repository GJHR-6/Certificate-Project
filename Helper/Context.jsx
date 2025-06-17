import { createContext } from 'react';

// this context will be used to create a glabal state in order to re render the app everytime 
// we made a change in the app
export const updateContext = createContext({});
export const updateEmployee = createContext({});