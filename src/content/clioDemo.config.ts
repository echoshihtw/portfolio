// Made-up clients for the "Who's in the chair?" demo in More projects. None
// of them is a real person: the phone numbers are in the 0900-000 block,
// and the page says so under the demo.
export type DemoClient = {
  name: string;
  initial: string;
  phone: string;
  lastVisit: string;
  hair: string;
  likes: string;
  note: string;
};

export const demoClients: DemoClient[] = [
  {
    name: "陳美玲 May",
    initial: "陳",
    phone: "0900-000-014",
    lastVisit: "12 weeks ago",
    hair: "Curly, coarse",
    likes: "Loose curls, defined",
    note: "Sensitive scalp. Root 7N + 6% 30g.",
  },
  {
    name: "周佩珊 Peishan",
    initial: "周",
    phone: "0900-000-021",
    lastVisit: "4 months ago",
    hair: "Straight, fine",
    likes: "A soft trim, no layers",
    note: "PPD allergy. Ammonia-free colour only.",
  },
  {
    name: "李佳蓉 Grace",
    initial: "李",
    phone: "0900-000-012",
    lastVisit: "3 weeks ago",
    hair: "Wavy, medium",
    likes: "A C-curl on the ends",
    note: "No heat on the ends. Books after work.",
  },
];

// The names offered as quick picks under the search field.
export const demoPicks = ["May", "Peishan", "Grace"];
