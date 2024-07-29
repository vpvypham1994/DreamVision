import './globals.css'
import '../public/css/plugins.css'
import '../public/css/style.css'
import { Heebo, Work_Sans } from 'next/font/google'



const heebo = Heebo({
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900',],
  style:['normal'],
  subsets: ['latin'],
  display: 'swap',
})
const worksans = Work_Sans({
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900',],
  style:['normal'],
  subsets:['latin'],
  display:'swap',
})

export const metadata = {
  title: {
    template:'Dreamvision',
    // content:'text/html',
    default:'Dreamvision', // a default is required when creating a template
  },
  name: "Dreamvision",
  content:"Dreamvision",
  openGraph: {
    title: 'Dreamvision',
    description: 'Dreamvision'
  },
  author: [{ name: 'Dreamvision' }, { name: 'Dreamvision', url: 'https://Dreamvision.com' }],
  viewport:'width=device-width, initial-scale=1, maximum-scale=1',
  httpEquiv:'Content-Type',
  charset:'utf-8'
}

export default function RootLayout({ children }) {


  return (
    <html lang='en' className='toggleMenu'>
      <body>
   {children}
      </body>
    </html>

  )
}
