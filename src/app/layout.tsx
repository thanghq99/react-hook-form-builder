import './globals.css'
import { FieldListProvider } from '@/components/fieldListProvider'
import { ThemeProvider } from '@/components/themeProvider'
import { Toaster } from '@/components/ui/toaster'
import { GeistMono } from 'geist/font/mono'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Hook Form Builder',
  description: 'Generated by thanghq99',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FieldListProvider>
            {children}
            <Toaster />
          </FieldListProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
