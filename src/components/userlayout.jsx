import React from 'react';
import Card from './card';
import './UserLayout.css'; 

const filterAndSortItems = (items, filterBy) => {
  let filteredItems = items;

  if (filterBy === 'Priority') {
    filteredItems = filteredItems.sort((a, b) => b.priority - a.priority);
  } else if (filterBy === 'Title') {
    filteredItems = filteredItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredItems;
};

const UserLayout = ({ tickets, user, filterby}) => {
  filterAndSortItems(tickets, filterby);

  const getUserName = (userId) => {
    const currentUser = user.find((u) => u.id === userId);
    return currentUser ? currentUser.name : '';
  };

  const filterUserTickets = (userId) => tickets.filter((todo) => todo.userId === userId);

  const renderUserTickets = (userId) => {
    const userTickets = filterUserTickets(userId);
    return (
      <div className="user-column">
        <div className="user-header">
          <h2 className="user-name">{getUserName(userId)}</h2>
          <p className="user-count">{userTickets.length}</p>
          <div className="user-actions">
            <img src="/add.svg" alt="Add" width={25} height={20} />
            <img src="/3 dot menu.svg" alt="Menu" width={25} height={20} />
          </div>
        </div>
        {userTickets.map((todo, index) => (
          <div key={index} className="user-card">
            <Card title={todo.title} content={todo.id} tag={todo.tag} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="user-layout">
      {['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'].map((userId) => renderUserTickets(userId))}
    </div>
  );
};

export default UserLayout;
