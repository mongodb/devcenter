import { render,screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';


test('renders home page', () => {
    render(<Home allArticles={[]}/>);
    const title = screen.getByText('MongoDB Developer Center');
    expect(title).toBeInTheDocument();
});