import type { ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AppLayout } from "@/components/AppLayout"
import { AuthProvider, useAuth } from "@/lib/auth"
import { NAV_ITEMS, homePathFor, type NavItem } from "@/lib/roles"
import { LoginPage } from "@/pages/LoginPage"
import { PlaceholderPage } from "@/pages/PlaceholderPage"

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

// UI-level guard only. Real enforcement moves to the database (RLS) when Supabase is connected.
function RequireRole({ item, children }: { item: NavItem; children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return null
  if (!item.roles.includes(user.role)) return <Navigate to={homePathFor(user.role)} replace />
  return children
}

function HomeRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? homePathFor(user.role) : "/login"} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<HomeRedirect />} />
            {NAV_ITEMS.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <RequireRole item={item}>
                    <PlaceholderPage item={item} />
                  </RequireRole>
                }
              />
            ))}
          </Route>
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
