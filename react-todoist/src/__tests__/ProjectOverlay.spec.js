import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { ProjectOverlay } from '../components/ProjectOverlay'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({ 
    projects: [{
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    }] 
  }))
}))

describe('<ProjectOverlay />', () => {
  it('renders the Project Overlay', () => {

    const showProjectOverlay = true;
    const setProject = jest.fn();
    const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

    const { queryByTestId } = render(<ProjectOverlay 
      showProjectOverlay={showProjectOverlay}
      setProject={setProject}
      setShowProjectOverlay={setShowProjectOverlay} />
    );

    expect(queryByTestId('project-overlay')).toBeTruthy();
    fireEvent.click(queryByTestId('project-overlay-action'));
    expect(setProject).toHaveBeenCalled();
  })
})
