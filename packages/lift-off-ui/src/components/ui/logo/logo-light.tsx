'use client'

import { ReactElement } from 'react'

import { SvgTripfavoLight } from './svgr/tripfavo-light'

export type LogoLightProps = {
  href?: string
}

export function LogoLight({ href = '/' }: LogoLightProps): ReactElement {
  return (
    <a
      data-testid="logo"
      className="flex flex-row flex-nowrap items-center"
      href={href}
    >
      <SvgTripfavoLight />
      <span className="text-2xl font-black text-slate-100 ml-0.5 leading-6">
        tripfavo
      </span>
    </a>
  )
}
