import { render, cleanup} from '@testing-library/react'
import Header from './index'
import '@testing-library/jest-dom'

describe('Header', () => {
  const renderApp = () => render(<Header menus={[{title: 'Create'}]}/>);
  afterEach(() => {
    cleanup()
  });
  
  beforeEach(() => {
    
    
  })

  test('renders a heading with menus', () => {
    let {getByTestId} = renderApp();
    const menus = getByTestId('menu');
    expect(menus.children[0]).toHaveTextContent('Create');
  })

})