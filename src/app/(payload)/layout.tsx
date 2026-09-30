/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const withBodyHydrationSuppression = (root: React.ReactElement): React.ReactElement => {
  const rootWithChildren = root as React.ReactElement<{ children?: React.ReactNode }>
  const children = React.Children.map(rootWithChildren.props.children, (child) => {
    if (!React.isValidElement(child) || child.type !== 'body') return child

    return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLBodyElement>>, {
      suppressHydrationWarning: true,
    })
  })

  return React.cloneElement(rootWithChildren, undefined, children)
}

const Layout = async ({ children }: Args) => {
  const root = await RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })

  return withBodyHydrationSuppression(root)
}

export default Layout
