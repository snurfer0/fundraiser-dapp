'use client';

import React, { useEffect } from 'react';
import { Moon, Sun } from 'react-feather';
import { themeChange } from 'theme-change';

const ThemeController: React.FC = () => {
  useEffect(() => {
    themeChange(true);
  }, []);

  return (
    <label className="swap swap-rotate fixed bottom-10 left-10">
      <input value="pastel" type="checkbox" className="theme-controller" />
      <Sun className="swap-on w-8 h-8" />
      <Moon className="swap-off w-8 h-8" />
    </label>
  );
};

export default ThemeController;
