import React from 'react';
import Card from './card';
import './PriorityLayout.css';

const filterAndSortItems = (items, filterBy) => {
  let filteredItems = items;

  if (filterBy === 'Priority') {
    filteredItems = filteredItems.sort((a, b) => b.priority - a.priority);
  } else if (filterBy === 'Title') {
    filteredItems = filteredItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredItems;
};

const PriorityLayout = ({ tickets, filterby }) => {
  const newtickets = filterAndSortItems(tickets, filterby);

  const nopriorityItems = newtickets.filter((todo) => todo.priority === 0);
  const lowPriorityItems = newtickets.filter((todo) => todo.priority === 1);
  const mediumPriorityItems = newtickets.filter((todo) => todo.priority === 2);
  const highPriorityItems = newtickets.filter((todo) => todo.priority === 3);
  const urgentPriorityItems = newtickets.filter((todo) => todo.priority === 4);

  const priorityImages = {
    'No Priority': '/No-priority.svg',
    Low: '/Img - Low Priority.svg',
    Medium: '/Img - Medium Priority.svg',
    High: '/Img - High Priority.svg',
    Urgent: '/SVG - Urgent Priority colour.svg',
  };

  return (
    <div className="priority-layout">
      {['No Priority', 'Low', 'Medium', 'High', 'Urgent'].map((priority) => {
        const items = {
          'No Priority': nopriorityItems,
          Low: lowPriorityItems,
          Medium: mediumPriorityItems,
          High: highPriorityItems,
          Urgent: urgentPriorityItems,
        }[priority];

        return (
          <div className="priority-column" key={priority}>
            <div className="priority-header">
              <div className="priority-header-left">
                <img
                  src={priorityImages[priority]}
                  alt={`${priority} Icon`}
                  className="priority-icon"
                />
                <h2 className="priority-title">{priority}</h2>
              </div>
              <div className="priority-header-right">
                <p className="priority-count">{items.length}</p>
                <div className="priority-actions">
                  <img src="/add.svg" alt="Add" width={25} height={20} />
                  <img src="/3 dot menu.svg" alt="Menu" width={25} height={20} />
                </div>
              </div>
            </div>
            {items.map((todo, index) => (
              <div key={index} className="priority-card">
                <Card title={todo.title} content={todo.id} tag={todo.tag} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PriorityLayout;


