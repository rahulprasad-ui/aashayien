'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { themeLocalStorageKey } from './shared'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>('light')

  const setTheme = useCallback((_themeToSet: Theme | null) => {
    // Force light mode always
    setThemeState('light')
    if (canUseDOM) {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  useEffect(() => {
    // Enforce light mode on mount
    document.documentElement.setAttribute('data-theme', 'light')
    setThemeState('light')
    // Clear any existing local storage preference to avoid confusion
    if (canUseDOM) {
      window.localStorage.removeItem(themeLocalStorageKey)
    }
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
