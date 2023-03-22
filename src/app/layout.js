import './globals.css'

export const metadata = {
  title: 'Pango Playlist',
  description: 'Subscription to the Pango Notification for playlist updates.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
