import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type {RootState, AppDispatch} from './index';

// sends action to redux store. describes a change that should be made
// to the state. Store uses reducers to process actions and update
// state accordingly. useDispatch provides access to it
export const useAppDispatch: () => AppDispatch = useDispatch; 

// reads/selects specific part of the state from redux store. useSelector provides
// access to it. specifies part of the state you are interested in. 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
