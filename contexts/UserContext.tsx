import {createContext} from 'react';
import UserType from '../Types/UserType';

type UserContextType = {
    list: Array<UserType>,
    push: (msg: Array<UserType>, isReset: boolean) => void
};

const UserContextDefaultValues: UserContextType = {
    list: [],
    push: (users: Array<UserType>, isReset: boolean) => {}
}
const UserContext = createContext<UserContextType>(UserContextDefaultValues);
export default UserContext;