import { Inter, Zilla_Slab_Highlight, Zilla_Slab, Viga } from 'next/font/google'

export const inter = Inter({ variable: '--title-font' })

export const Zilla_Highlight_font = Zilla_Slab_Highlight({
  subsets: ['latin'],
  weight: '400',
})

export const Zilla_font = Zilla_Slab({
  subsets: ['latin'],
  weight: '400',
})

export const Viga_font = Viga({
  subsets: ['latin'],
  weight: '400',
})
