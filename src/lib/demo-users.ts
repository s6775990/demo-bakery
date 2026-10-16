import type { Role } from "./roles"

// Demo-only users. There is no database yet: login is simulated in the browser.
// When Supabase is connected, these move to Supabase Auth plus a profiles table.
export type DemoUser = {
  id: string
  email: string
  password: string
  role: Role
}

const DEMO_PASSWORD = "demo1234"

export const DEMO_USERS: DemoUser[] = [
  { id: "u-owner", email: "owner@demo.test", password: DEMO_PASSWORD, role: "owner" },
  { id: "u-store", email: "store@demo.test", password: DEMO_PASSWORD, role: "store_worker" },
  { id: "u-baker", email: "baker@demo.test", password: DEMO_PASSWORD, role: "baker" },
  { id: "u-courier", email: "courier@demo.test", password: DEMO_PASSWORD, role: "courier" },
]
