import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { AddProject } from '../components/AddProject'

beforeEach(cleanup);

jest.mock('../context', () => ({
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

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Promise resolved'))
      }))
    }))
  }
}));

describe('<AddProject />', () => {
  it('renders the Add Project comp', () => {    
    const {queryByTestId} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project')).toBeTruthy();
  });

  it('renders the Add Project comp and adds a project', () => {    
    const {queryByTestId} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project')).toBeTruthy();

    fireEvent.change(queryByTestId('project-name'), {
      target: {value: "Best project in the world!"}
    });
    expect(queryByTestId('project-name').value).toBe("Best project in the world!");
    fireEvent.click(queryByTestId('add-project-submit'));
  });

  it('hides the Add Project comp on click of Cancel', () => {    
    const {queryByTestId, getByText} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project')).toBeTruthy();

    expect(getByText("Cancel")).toBeTruthy();
    fireEvent.click(getByText("Cancel"));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });

  it('hides the Add Project comp on keydown of Cancel', () => {    
    const {queryByTestId, getByText} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project')).toBeTruthy();

    expect(getByText("Cancel")).toBeTruthy();
    fireEvent.keyDown(getByText("Cancel"));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });

  it('renders the Add Project overlay on click of add project action button', () => {    
    const {queryByTestId} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-action')).toBeTruthy();

    fireEvent.click(queryByTestId('add-project-action'));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });
  
  it('renders the Add Project overlay on keydown of add project action button', () => {    
    const {queryByTestId} = render(<AddProject shouldShow />);
    expect(queryByTestId('add-project-action')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('add-project-action'));
    expect(queryByTestId('add-project-inner')).toBeFalsy();
  });
})