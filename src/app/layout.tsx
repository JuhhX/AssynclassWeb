import './globals.css'

import {Bai_Jamjuree as BaiJamJuree} from 'next/font/google'

export const metadata = {
  title: 'Assynclass Code',
  description: 'Estude códigos, estude no seu ritmo',
}

export const baiJamjuree = BaiJamJuree({subsets: ['latin'], weight: '700', variable: "--font-baijamjuree"})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={baiJamjuree.className}>{children}</body>
    </html>
  )
}
