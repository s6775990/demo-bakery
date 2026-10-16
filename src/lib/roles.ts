export type Role = "owner" | "store_worker" | "baker" | "courier"

export const ROLE_LABELS: Record<Role, string> = {
  owner: "בעלת העסק",
  store_worker: "עובד חנות",
  baker: "אופה",
  courier: "שליח",
}

export type NavItem = {
  path: string
  label: string
  description: string
  step: number
  roles: Role[]
}

// Main menu. Order matters: a role's first item is its home screen.
export const NAV_ITEMS: NavItem[] = [
  {
    path: "/orders",
    label: "הזמנות",
    description: "טבלת ההזמנות של בתי הקפה, עם חיפוש, סינון ודפדוף.",
    step: 4,
    roles: ["owner"],
  },
  {
    path: "/cafes",
    label: "בתי קפה",
    description: "ניהול בתי הקפה, השבתה ויצירת קישור אישי חדש.",
    step: 4,
    roles: ["owner"],
  },
  {
    path: "/standing-orders",
    label: "קבועים",
    description: "ההזמנות שחוזרות בימים קבועים, כולל דילוג על יום.",
    step: 4,
    roles: ["owner"],
  },
  {
    path: "/products",
    label: "מוצרים ומחירונים",
    description: "המוצרים, המחיר לחנות והמחירון של כל בית קפה.",
    step: 4,
    roles: ["owner"],
  },
  {
    path: "/store",
    label: "הזמנות חנות",
    description: "ההזמנות לאיסוף של היום, מסירה, הזמנת חנות חדשה ומה שעבר לחנות.",
    step: 5,
    roles: ["owner", "store_worker"],
  },
  {
    path: "/baking-list",
    label: "רשימת אפייה",
    description: "סך הכמויות לכל מוצר, ושני כפתורים גדולים לכל הרשימה.",
    step: 6,
    roles: ["owner", "baker"],
  },
  {
    path: "/deliveries",
    label: "משלוחים",
    description: "המשלוחים של היום לפי הסדר, ו\"נמסרה\" בכל משלוח.",
    step: 7,
    roles: ["owner", "courier"],
  },
]

export function navItemsFor(role: Role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role))
}

export function homePathFor(role: Role) {
  return navItemsFor(role)[0].path
}
