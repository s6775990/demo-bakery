import { useState, type FormEvent } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { DEMO_USERS } from "@/lib/demo-users"
import { ROLE_LABELS, homePathFor } from "@/lib/roles"

export function LoginPage() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  if (user) return <Navigate to={homePathFor(user.role)} replace />

  const from = (location.state as { from?: string } | null)?.from

  function enter(emailValue: string, passwordValue: string) {
    if (!signIn(emailValue, passwordValue)) {
      setError("הדואר האלקטרוני או הסיסמה לא נכונים.")
      return
    }
    // The route guard sends the user home if `from` is not allowed for their role.
    navigate(from ?? "/", { replace: true })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    enter(email, password)
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">המאפייה</CardTitle>
          <CardDescription>כניסה למערכת</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">דואר אלקטרוני</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                dir="ltr"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={error ? true : undefined}
                required
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" size="lg">
              כניסה
            </Button>
          </form>

          <section className="flex flex-col gap-3 border-t pt-5">
            <h2 className="text-sm font-medium">כניסה מהירה למשתמשי הדמו</h2>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((demo) => (
                <Button
                  key={demo.id}
                  type="button"
                  variant="outline"
                  onClick={() => enter(demo.email, demo.password)}
                >
                  {ROLE_LABELS[demo.role]}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              מערכת דמו: הכניסה מדומה בדפדפן, עדיין בלי בסיס נתונים.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
