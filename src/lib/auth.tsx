import { createContext, useContext, useState, type ReactNode } from "react"
import { DEMO_USERS } from "./demo-users"
import type { Role } from "./roles"

export type SessionUser = { id: string; email: string; role: Role }

type AuthContextValue = {
  user: SessionUser | null
  signIn: (email: string, password: string) => boolean
  signOut: () => void
}

const STORAGE_KEY = "demo-bakery-session"

const AuthContext = createContext<AuthContextValue | null>(null)

function toSessionUser(id: string | null): SessionUser | null {
  const found = DEMO_USERS.find((u) => u.id === id)
  return found ? { id: found.id, email: found.email, role: found.role } : null
}

function readStoredId() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredId(id: string | null) {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable (private window etc.): session lasts until reload.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => toSessionUser(readStoredId()))

  function signIn(email: string, password: string) {
    const found = DEMO_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password,
    )
    if (!found) return false
    writeStoredId(found.id)
    setUser(toSessionUser(found.id))
    return true
  }

  function signOut() {
    writeStoredId(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
