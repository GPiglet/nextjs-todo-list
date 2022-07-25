import { render, fireEvent, cleanup, act, waitFor } from '@testing-library/react'
import EditPage from '../pages/edit/index'
import UserContext  from '../contexts/UserContext';
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'
import mockAxios from 'jest-mock-axios'

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('axios', () => require('jest-mock-axios'))

describe('Edit Page', () => {
  const renderApp = () => render(<EditPage/>);
  afterEach(() => {
    cleanup()
  });
  
  beforeEach(() => {
    mockRouter.setCurrentUrl("/edit");
  })

  test('renders initial UI', () => {
    let {getByTestId} = renderApp();
    const heading = getByTestId('heading')
    const menus = getByTestId('menu')
    expect(heading).toBeInTheDocument()
    expect(menus.children[0]).toHaveTextContent('Save')
    expect(menus.children[1]).toHaveTextContent('Cancel')
    const usernameInput = getByTestId('input-username');
    expect(usernameInput).toBeInTheDocument();
    const emailInput = getByTestId('input-email');
    expect(emailInput).toBeInTheDocument();
    const addressInput = getByTestId('input-address');
    expect(addressInput).toBeInTheDocument();
  })

  test('renders initial UI with a user', () => {
    let {getByTestId} = render(
      <UserContext.Provider value={{list: [{id: 1, username: 'test', email: 'test@gmail.com', address: 'Jest street'}], push: jest.fn()}}>
        <EditPage />
      </UserContext.Provider>
    );
    act(() => {
      mockRouter.push({pathname: '/edit/[uid]', query: {uid: '1'}})
    })

    waitFor(() => {
      const heading = getByTestId('heading')
      const menus = getByTestId('menu')
      expect(heading).toBeInTheDocument()
      expect(menus.children[0]).toHaveTextContent('Save')
      expect(menus.children[1]).toHaveTextContent('Cancel')
      const usernameInput = getByTestId('input-username');
      expect(usernameInput).toHaveTextContent('test');
      const emailInput = getByTestId('input-email');
      expect(emailInput).toHaveTextContent('test@gmail.com');
      const addressInput = getByTestId('input-address');
      expect(addressInput).toHaveTextContent('Jest street');
    })
  })

  test('[save button] validate', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu')
    fireEvent.click(menus.children[0]);
    const warningAlert = getByTestId('warning-alert');
    expect(warningAlert).toBeVisible();
  })

  test('save a user', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu')
    const usernameInput = getByTestId('input-username');
    fireEvent.input(usernameInput, {target: {value: 'test'}});
    const emailInput = getByTestId('input-email');
    fireEvent.input(emailInput, {target: {value: 'test@gmail.com'}});
    const addressInput = getByTestId('input-address');
    fireEvent.input(addressInput, {target: {value: 'Jest street'}});
    fireEvent.click(menus.children[0]);
    act(() => {
      mockAxios.mockResponse({data:{username:'test', email: 'test@gmail.com', address: 'Jest street'}})
    })
    waitFor(() => {
      expect(mockRouter).toMatchObject({asPath: '/'})
    })
  })

  test('cancel button', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu')
    fireEvent.click(menus.children[1]);
    expect(mockRouter).toMatchObject({asPath: '/'})
  })
})