import React, { useState } from 'react'
import { FaInbox, FaRegCalendar, FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa'
import { useSelectedProjectValue } from '../../context'
import { Projects } from '../Projects';

export const Sidebar = () => {

  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      {/* Using BEM here in classes, Block Element Modifier */}
      <ul className="sidebar__generic">
        <li>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li>
        <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li>
        <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 Days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span><FaChevronDown /></span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">Projects will be here!</ul>
        <Projects />
    </div>
  )
}