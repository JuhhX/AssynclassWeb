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
      <body className={`${fredoka.className} flex flex-col overflow-hidden transition duration-500 bg-white-background selection:bg-verde selection:text-white dark:bg-dark-background`}>
        <InterfaceMode>
          {children}
        </InterfaceMode>
      </body>
    </html>
  )
}
