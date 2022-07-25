import { render, fireEvent, cleanup } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  const renderApp = () => render(<Home/>);
  afterEach(() => {
    cleanup()
  });
  
  beforeEach(() => {
    
    
  })

  test('renders a heading', () => {
    let {getByTestId} = renderApp();
    const heading = getByTestId('heading')
    const menus = getByTestId('menu')
    expect(heading).toBeInTheDocument()
    expect(menus.children[0]).toHaveTextContent('Create')
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
  
})