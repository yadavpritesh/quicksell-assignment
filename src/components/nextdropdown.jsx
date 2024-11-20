import React, { useState, useEffect, useCallback } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import './Nextdropdown.css'; 

export default function Nextdropdown({ items, onFilterChange, dropdownId }) {
  const cookieKey = `selectedLabel_${dropdownId}`;
  const [labelname, setlabelname] = useState(() => {
    const storedLabel = Cookies.get(cookieKey);
    return storedLabel || items[0].label;
  });

  const saveToCookie = useCallback(() => {
    Cookies.set(cookieKey, labelname, { expires: 365 });
  }, [labelname, cookieKey]);

  useEffect(() => {
    saveToCookie();
  }, [saveToCookie]);

  const handleItemClick = (item) => {
    setlabelname(item.label);
    onFilterChange(item.label);
  };

  return (
    <div className="menu-container">
      <Menu as="div" className="menu">
        <Menu.Button className="menu-button">
          {labelname}
          <ChevronDownIcon className="chevron-icon" aria-hidden="true" />
        </Menu.Button>

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
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`menu-item ${active ? 'menu-item-active' : ''}`}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
