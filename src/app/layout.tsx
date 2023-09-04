import { InterfaceMode } from '@/components/InterfaceMode'
import './globals.css'

import {Fredoka} from 'next/font/google'

export const metadata = {
  title: 'Assynclass Code',
  description: 'Estude códigos, estude no seu ritmo',
}

export const fredoka = Fredoka({subsets: ['latin'], weight: ['400', '600'], variable: "--font-fredoka"})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${fredoka.className} overflow-hidden transition duration-500 bg-white dark:bg-slate-900`}>
        <InterfaceMode>
          {children}
        </InterfaceMode>
      </body>
    </html>
  )
}
