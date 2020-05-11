import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { IndividualProject } from '../components/IndividualProject'

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX')
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

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Promise resolved'))
        }))
      }))
    }))
  }
}));

describe('<IndividualProject />', () => {
  it('renders the Individual Project comp', () => {
    const project = {
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    };

    const {getByText} = render(<IndividualProject project={project} />);
    expect(getByText("🎵 MUSIC")).toBeTruthy();
  });

  it('renders the delete overlay and then deletes a project using onclick', () => {
    const project = {
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    };

    const {queryByTestId, getByText, debug} = render(<IndividualProject project={project} />);
    fireEvent.click(queryByTestId('delete-project'));
    expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
    fireEvent.click(getByText('Delete'));
  });

  it('renders the delete overlay and then deletes a project using keyDown', () => {
    const project = {
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    };

    const {queryByTestId, getByText, debug} = render(<IndividualProject project={project} />);
    fireEvent.keyDown(queryByTestId('delete-project'));
    expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
    fireEvent.keyDown(getByText('Delete'));
  });

  it('renders the delete overlay and then cancels a project using click', () => {
    const project = {
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    };

    const {queryByTestId, getByText, debug} = render(<IndividualProject project={project} />);
    fireEvent.click(queryByTestId('delete-project'));
    expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
    fireEvent.click(getByText('Cancel'));
  });

  it('renders the delete overlay and then Cancels a project using keyDown', () => {
    const project = {
      name: "🎵 MUSIC",
      projectId: "project123",
      userId: 'user123',
      docId: 'dg7QordcWgs8MdfoO11q'
    };

    const {queryByTestId, getByText, debug} = render(<IndividualProject project={project} />);
    fireEvent.keyDown(queryByTestId('delete-project'));
    expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
    fireEvent.keyDown(getByText('Cancel'));
  });
})