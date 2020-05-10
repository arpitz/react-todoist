import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { useSelectedProjectValue } from '../context';
import { firebase } from "../firebase";
// import { act } from 'react-dom/test-utils';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({ projects: [] }))
}))


jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase'))
      }))
    }))
  }
}));

describe('<AddTask />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Add task component', () => {
    const { queryByTestId } = render(<AddTask />);
    expect(queryByTestId('add-task-comp')).toBeTruthy();
  });

  it('renders the Quick Add task component', () => {

    const setShowQuickAddTask = jest.fn();

    const { queryByTestId } = render(
      <AddTask showAddTaskMain
        shouldShowMain={false}
        showQuickAddTask
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    expect(queryByTestId('quick-add-task')).toBeTruthy();
  });

  it('renders the add task main showable component using onClick', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });

  it('renders the add task main showable component using keyDown', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.keyDown(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });

  it('renders the add task project overlay when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-project-overlay'));
    expect(queryByTestId('project-overlay')).toBeTruthy();
  });

  it('renders the add task project overlay when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();
  });

  it('hides the add task main when cancel is clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-main-cancel'));
    expect(queryByTestId('add-task-main')).toBeFalsy();
    
  });

  it('renders the add task for quick add task and then clicks cancel', () => {
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    const { queryByTestId } = render(
      <AddTask
        setShowQuickAddTask={setShowQuickAddTask}
        showQuickAddTask
      />);
    
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-quick-cancel'));
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('renders the <AddTask /> and adds a task to inbox and clears state ', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX'
    }))

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    const { queryByTestId } = render(
      <AddTask
        setShowQuickAddTask={setShowQuickAddTask}
        showQuickAddTask
      />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    fireEvent.change(queryByTestId('add-task-content'), {
      target: {value: 'I am a new task and I am amazing!'}
    });
    expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!');
    act(() => {
      fireEvent.click(queryByTestId('add-task'));
    });
    expect(queryByTestId('add-task-main')).toBeTruthy();
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('renders the <AddTask /> and adds a task to TODAY and clears state ', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY'
    }))

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    const { queryByTestId } = render(
      <AddTask
        setShowQuickAddTask={setShowQuickAddTask}
        showQuickAddTask
      />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    fireEvent.change(queryByTestId('add-task-content'), {
      target: {value: 'I am a new task and I am amazing!'}
    });
    expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!');
    act(() => {
      fireEvent.click(queryByTestId('add-task'));
    });
    expect(queryByTestId('add-task-main')).toBeTruthy();
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('renders the <AddTask /> and adds a task to NEXT_7 and clears state ', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7'
    }))

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    const { queryByTestId } = render(
      <AddTask
        setShowQuickAddTask={setShowQuickAddTask}
        showQuickAddTask
      />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    fireEvent.change(queryByTestId('add-task-content'), {
      target: {value: 'I am a new task and I am amazing!'}
    });
    expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!');
    act(() => {
      fireEvent.click(queryByTestId('add-task'));
    });
    expect(queryByTestId('add-task-main')).toBeTruthy();
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('renders the add task and adds a task with task date', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1'
    }));

    const { queryByTestId } = render(
      <AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: {value: 'I am a new task and I am amazing!'}
    });

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-today'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));

  });
})