import {createContext} from 'react';
export type UserType = {
    id: number,
    username: string,
    email?: string,
    address?: string,
}
type UserContextType = {
    list: Array<UserType>,
    push: (msg: Array<UserType>, isReset: boolean) => void
};

const UserContextDefaultValues: UserContextType = {
    list: [],
    push: (users: Array<UserType>, isReset: boolean) => {}
}
export const UserContext = createContext<UserContextType>(UserContextDefaultValues);