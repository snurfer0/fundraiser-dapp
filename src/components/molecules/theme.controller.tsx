'use client';

import React, { useEffect } from 'react';
import { Moon, Sun } from 'react-feather';
import { themeChange } from 'theme-change';

const ThemeController: React.FC = () => {
  useEffect(() => {
    themeChange(true);
  }, []);

  return (
    <label className="swap swap-rotate">
      <input value="pastel" type="checkbox" className="theme-controller" />
      <Sun className="swap-on w-6 h-6" />
      <Moon className="swap-off w-6 h-6" />
    </label>
  );
};

export default ThemeController;
