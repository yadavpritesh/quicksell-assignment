import React, { useEffect, useState } from 'react';
import StatusLayout from './components/statuslayout';
import PriorityLayout from './components/prioritylayout';
import UserLayout from './components/userlayout';
import Nextdropdown from './components/nextdropdown';
import axios from 'axios';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import './App.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const nestedDropdown1Items = [
  { label: 'Status' },
  { label: 'User' },
  { label: 'Priority' },
];

const nestedDropdown2Items = [
  { label: 'Title' },
  { label: 'Priority' },
];

export default function App() {
  const [Tickets, setTickets] = useState([]);
  const [User, setUser] = useState([]);
  const [mounted, setMounted] = useState(false);
  const savedLabel1 = Cookies.get('selectedLabel_dropdown1') || null;
  const savedLabel2 = Cookies.get('selectedLabel_dropdown2') || null;
  const [filter, setFilter] = useState('');
  const [filter1, setFilter1] = useState('');
  
  useEffect(() => {
    setFilter(savedLabel1);
    setFilter1(savedLabel2);
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const init = async () => {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      setTickets(response.data.tickets);
      setUser(response.data.users);
    };

    if (mounted) {
      init();
    }
  }, [mounted]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleFilterChange1 = (selectedFilter) => {
    setFilter1(selectedFilter);
  };

  return (
    <div className="app-container">
      <div className="header">
        <Menu as="div" className="menu">
          <div className="menu-button">
            <Menu.Button className="menu-button-content">
              <img src="/Display.svg" width={20} height={25} alt="Options" />
              Display
              <ChevronDownIcon className="chevron-icon" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="menu-items">
              <div className="menu-section">
                <div className="menu-title">Grouping</div>
                <Nextdropdown items={nestedDropdown1Items} onFilterChange={handleFilterChange} dropdownId="dropdown1" />
              </div>
              <div className="menu-section">
                <div className="menu-title">Ordering</div>
                <Nextdropdown items={nestedDropdown2Items} onFilterChange={handleFilterChange1} dropdownId="dropdown2" />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="main-content">
        {filter === 'User' ? (
          <UserLayout tickets={Tickets} user={User} filterby={filter1} />
        ) : filter === 'Priority' ? (
          <PriorityLayout tickets={Tickets} filterby={filter1} />
        ) : (
          <StatusLayout tickets={Tickets} filterby={filter1} />
        )}
      </div>
    </div>
  );
}
