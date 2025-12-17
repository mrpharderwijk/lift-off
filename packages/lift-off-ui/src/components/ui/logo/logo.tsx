'use client'

import { ReactElement } from 'react'

import { SvgTripfavo } from './svgr/tripfavo'

export type LogoProps = {
  href?: string
}

export function Logo({ href = '/' }: LogoProps): ReactElement {
  return (
    <a
      data-testid="logo"
      className="flex flex-row flex-nowrap items-center"
      href={href}
    >
      <SvgTripfavo />
      <span className="text-2xl font-black text-primary-500 ml-0.5 leading-6">
        tripfavo
      </span>
    </a>
  )
}
