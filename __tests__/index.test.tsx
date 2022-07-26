import { render, fireEvent, cleanup, act, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import UserContext  from '../contexts/UserContext';
import '@testing-library/jest-dom'
import mockAxios from 'jest-mock-axios'

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('axios', () => require('jest-mock-axios'))

describe('Home', () => {
  const renderApp = () => render(<Home/>);
  afterEach(() => {
    cleanup()
  });
  
  beforeEach(() => {
    
    
  })

  test('renders initial UI with a user', () => {
    let {getByTestId, getByText} = render(
      <UserContext.Provider value={{list: [{id: 1, username: 'test', email: 'test@gmail.com', address: 'Jest street'}], push: jest.fn()}}>
        <Home />
      </UserContext.Provider>
    );
    const heading = getByTestId('heading')
    const menus = getByTestId('menu')
    expect(heading).toBeInTheDocument()
    expect(menus.children[0]).toHaveTextContent('Create')
    const user = getByText('test');
    expect(user).toBeInTheDocument();
  })

  test('[edit button] selected row validation', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu')
    fireEvent.click(menus.children[1]);
    const warningAlert = getByTestId('warning-alert');
    expect(warningAlert).toBeVisible();
  })

  test('[delete button] selected row validation', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu')
    fireEvent.click(menus.children[2]);
    const warningAlert = getByTestId('warning-alert');
    expect(warningAlert).toBeVisible();
  })

  test('delete button test', () => {
    let users = [{id: 1, username: 'test', email: 'test@gmail.com', address: 'Jest street'}];
    let {getByTestId, getByText} = render(
      <UserContext.Provider value={{list: users, push: (newUsers: any)=>{users=[...newUsers]}}}>
        <Home />
      </UserContext.Provider>
    );
    const menus = getByTestId('menu')
    const user = getByText('test');
    fireEvent.click(user);
    fireEvent.click(menus.children[2]);
    act(() => {
      mockAxios.mockResponse({data:[]})
    })
    waitFor(()=>{
      const noRows = getByText('No rows');
      expect(noRows).toBeInTheDocument();
    })
  })
  
})