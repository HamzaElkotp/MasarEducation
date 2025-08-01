// src/app/layout.tsx
import '../globals.css'
import {NextIntlClientProvider} from 'next-intl';
import { cookies } from 'next/headers';
import { Toaster } from "@/components/ui/sonner"; 
import { Cairo, Ubuntu } from 'next/font/google';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/theme-provider';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: '--font-arabic',
});

const ubuntu = Ubuntu({
  subsets: ['cyrillic'],
  weight: ["300", "400", "500", "700"],
  variable: '--font-arabic',
});

export const metadata = {
  title: 'Masar',
  description: 'Welcome!',
  icons: {
    icon: '/masaricon.ico',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('locale')?.value || 'en';
  const dir = ['ar'].includes(locale) ? 'rtl' : 'ltr';
  const font = locale === 'ar' ? cairo : ubuntu;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${font.className} bg-[#f7f7fa]`} key={dir}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme='light'>
            <Providers>
                <NextIntlClientProvider locale={locale}>
                    {children}
                    <Toaster />
                    <FloatingWhatsApp />
                </NextIntlClientProvider>
            </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
