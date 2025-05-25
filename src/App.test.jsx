import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';

import App from './App'

describe('App', () => {
    it('renders the App component', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )

        //screen.debug();
    })
})