'use client';

import React, { useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { themeChange } from 'theme-change';

const ThemeController: React.FC = () => {
  useEffect(() => {
    themeChange(true);
  }, []);

  return (
    <label className="swap swap-rotate">
      <input value="winter" type="checkbox" className="theme-controller" />
      <FiSun className="swap-on w-6 h-6" />
      <FiMoon className="swap-off w-6 h-6" />
    </label>
  );
};

export default ThemeController;
