import React from 'react'
import {render, fireEvent, cleanup, getByText } from '@testing-library/react'
import { Sidebar } from '../components/layout/Sidebar'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn()
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [{
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    }] 
  }))
}))

describe('<Sidebar />', () => {
  it('renders the Sidebar component', () => {
    const {queryByTestId} = render(<Sidebar />);
    expect(queryByTestId('sidebar')).toBeTruthy();
  });

  it('changes the active project to inbox on click of inbox', () => {
    const {queryByTestId} = render(<Sidebar />);
    fireEvent.click(queryByTestId('inbox'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to today on click of today', () => {
    const {queryByTestId} = render(<Sidebar />);
    fireEvent.click(queryByTestId('today'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
  });

  it('changes the active project to next_7 on click of next_7', () => {
    const {queryByTestId} = render(<Sidebar />);
    fireEvent.click(queryByTestId('next_7'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
    expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
  });

  it('hides and shows the sidebar projects', () => {
    const {queryByTestId, queryByText, getByText} = render(<Sidebar />);
    fireEvent.click(getByText('Projects'));
    expect(queryByText('Add Project')).toBeFalsy();

    fireEvent.click(getByText('Projects'));
    expect(queryByText('Add Project')).toBeTruthy();
  });
})