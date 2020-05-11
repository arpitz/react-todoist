import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { Tasks } from '../components/Tasks'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 'project123' })),
  useProjectsValue: jest.fn(() => ({ 
    projects: [{
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    }] 
  }))
}))

jest.mock('../hooks', () => ({
  useTasks: jest.fn(() => ({
    tasks: [{
      archived: false,
      date: "",
      projectId: "project123",
      task: "This is a video!",
      userId: "user123",
      id: "njI4RDdDVu4ADMeUDBD5"
    }]
  }))
}))

describe('<Tasks />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it('renders the Tasks component', () => {
    const {queryByTestId} = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
  });

  it('renders the Task with the proper project name', () => {
    const {queryByTestId} = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe("🎵 MUSIC");
  });
})