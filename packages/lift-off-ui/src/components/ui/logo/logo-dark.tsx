'use client'

import { ReactElement } from 'react'

import { SvgTripfavoDark } from './svgr/tripfavo-dark'

export type LogoDarkProps = {
  href?: string
}

export function LogoDark({ href = '/' }: LogoDarkProps): ReactElement {
  return (
    <a
      data-testid="logo"
      className="flex flex-row flex-nowrap items-center"
      href={href}
    >
      <SvgTripfavoDark width="32" height="32" />
      <span className="text-2xl font-black text-primary-700 ml-0.5 leading-6">
        tripfavo
      </span>
    </a>
  )
}
