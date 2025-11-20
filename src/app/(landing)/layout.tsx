import { Navbar } from '@/components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="">{children}</div>
    </main>
  )
}
