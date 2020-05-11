import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Projects } from '../components/Projects'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn()
  })),

  useProjectsValue: jest.fn(() => ({ 
    projects: [{
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    }] 
  }))
}))

describe('<Projects />', () => {
  it('renders the Projects component', () => {
    const {queryByTestId} = render(<Projects />);
    expect(queryByTestId('project-action')).toBeTruthy();
  });

  it('renders the selected project on click of that project', () => {
    
    const {queryByTestId} = render(<Projects />);
    fireEvent.click(queryByTestId('project-action'));
    //expect(useSelectedProjectValue().setSelectedProject()).toHaveBeenCalled();
    expect(queryByTestId('project-action').classList.contains('active')).toBeTruthy();
  })
})
