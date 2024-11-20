import React from 'react';
import Card from './card';
import './StatusLayout.css';

const filterAndSortItems = (items, filterBy) => {
  let filteredItems = items;

  if (filterBy === 'Priority') {
    filteredItems = filteredItems.sort((a, b) => b.priority - a.priority);
  } else if (filterBy === 'Title') {
    filteredItems = filteredItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredItems;
};

const StatusLayout = ({ tickets, filterby }) => {
  const newtickets = filterAndSortItems(tickets, filterby);

  const backlogItems = newtickets.filter((todo) => todo.status === 'Backlog');
  const todoItems = newtickets.filter((todo) => todo.status === 'Todo');
  const inProgressItems = newtickets.filter((todo) => todo.status === 'In progress');
  const doneItems = newtickets.filter((todo) => todo.status === 'Done');
  const cancelledItems = newtickets.filter((todo) => todo.status === 'Cancelled');


  const statusImages = {
    Backlog: '/Backlog.svg',
    Todo: '/To-do.svg',
    'In Progress': '/in-progress.svg',
    Done: '/Done.svg',
    Cancelled: '/Cancelled.svg',
  };

  return (
    <div className="status-layout">
      {['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled'].map((status) => {
        const items = {
          Backlog: backlogItems,
          Todo: todoItems,
          'In Progress': inProgressItems,
          Done: doneItems,
          Cancelled: cancelledItems,
        }[status];

        return (
          <div className="status-column" key={status}>
            <div className="status-header">
              <div className="status-header-left">
                <img
                  src={statusImages[status]}
                  alt={`${status} icon`}
                  className="status-icon"
                />
                <h2 className="status-title">{status}</h2>
              </div>
              <div className="status-header-right">
                <p className="status-count">{items.length}</p>
                <div className="status-actions">
                  <img src="/add.svg" alt="Add" width={25} height={20} />
                  <img src="/3 dot menu.svg" alt="Menu" width={25} height={20} />
                </div>
              </div>
            </div>
            {items.map((todo, index) => (
              <div key={index} className="status-card">
                <Card title={todo.title} content={todo.id} tag={todo.tag} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default StatusLayout;
