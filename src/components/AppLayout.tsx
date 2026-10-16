import { NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { ROLE_LABELS, navItemsFor } from "@/lib/roles"
import { cn } from "@/lib/utils"

export function AppLayout() {
  const { user, signOut } = useAuth()
  if (!user) return null

  const items = navItemsFor(user.role)
  const showNav = items.length > 1

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-foreground hover:bg-accent hover:text-accent-foreground",
    )

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between gap-4 border-b bg-card px-4 py-3">
        <div className="flex items-baseline gap-3">
          <span className="text-lg font-bold">המאפייה</span>
          <span className="text-sm text-muted-foreground">{ROLE_LABELS[user.role]}</span>
        </div>
        <Button variant="outline" size="sm" onClick={signOut}>
          יציאה
        </Button>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {showNav && (
          <nav
            aria-label="תפריט ראשי"
            className="border-b bg-card px-2 py-2 md:w-56 md:shrink-0 md:border-e md:border-b-0 md:px-3 md:py-4"
          >
            <ul className="flex flex-wrap gap-1 md:flex-col">
              {items.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className={linkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
