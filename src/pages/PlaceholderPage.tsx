import type { NavItem } from "@/lib/roles"

export function PlaceholderPage({ item }: { item: NavItem }) {
  return (
    <section className="flex max-w-2xl flex-col gap-3">
      <h1 className="text-2xl font-bold">{item.label}</h1>
      <p className="text-muted-foreground">{item.description}</p>
      <p className="rounded-md border border-dashed bg-muted px-4 py-3 text-sm">
        ייבנה בשלב {item.step} בתוכנית הבנייה.
      </p>
    </section>
  )
}
