import { FAB } from '@/components/fab'
import { Navbar } from '@/components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="">{children}</div>
      <FAB />
    </main>
  )
}
