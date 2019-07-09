import * as React from 'react';
import { AppState } from './classes/AppState';

const context = React.createContext<AppState>();

export default context;

export const { Consumer, Provider } = context;
