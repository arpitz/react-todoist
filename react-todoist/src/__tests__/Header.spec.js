import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Header } from '../components/layout/Header'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    selectedProject: '1'
  })),
  useProjectsValue: jest.fn(() => ({
    projects: []
  }))
}))

describe('<Header />', () => {
  it('renders the Header component', () => {
    const {queryByTestId} = render(<Header />);
    expect(queryByTestId('header')).toBeTruthy();
  });

  it('renders the dark mode when activated on click', () => {
    const darkMode = true;
    const setDarkMode = jest.fn(() => !darkMode);

    const {queryByTestId} = render(<Header darkMode={darkMode} setDarkMode={setDarkMode} />);
    expect(queryByTestId('header')).toBeTruthy();
    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(setDarkMode).toHaveBeenCalled();
  });

  it('renders the dark mode when activated on keydown', () => {
    const darkMode = true;
    const setDarkMode = jest.fn(() => !darkMode);

    const {queryByTestId} = render(<Header darkMode={darkMode} setDarkMode={setDarkMode} />);
    expect(queryByTestId('header')).toBeTruthy();
    fireEvent.keyDown(queryByTestId('dark-mode-action'));
    expect(setDarkMode).toHaveBeenCalled();
  });

  it('opens the quick add task on click', () => {
    const {queryByTestId} = render(<Header/>);
    fireEvent.click(queryByTestId('quick-add-task-action'));
    expect(queryByTestId('add-task-comp')).toBeTruthy();
  });

  it('opens the quick add task on keydown', () => {
    const {queryByTestId} = render(<Header/>);
    fireEvent.keyDown(queryByTestId('quick-add-task-action'));
    expect(queryByTestId('add-task-comp')).toBeTruthy();
  });
})