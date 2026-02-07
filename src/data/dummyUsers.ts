import { Profile } from "@/types";

export const dummyUsers: Partial<Profile & { full_name: string }>[] = [
    {
        id: "usr_01",
        email: "carlos.mendez@osart.com",
        full_name: "Carlos Mendez",
        role: "user",
        knowledge_points: 150
    },
    {
        id: "usr_02",
        email: "ana.rodriguez@osart.com",
        full_name: "Ana Rodriguez",
        role: "admin",
        knowledge_points: 850
    },
    {
        id: "usr_03",
        email: "elena.vega@it.osart.com",
        full_name: "Elena Vega",
        role: "user",
        knowledge_points: 420
    },
    {
        id: "usr_04",
        email: "marcus.thorne@security.osart.com",
        full_name: "Marcus Thorne",
        role: "admin",
        knowledge_points: 990
    },
    {
        id: "usr_05",
        email: "sofia.castro@pro.osart.com",
        full_name: "Sofia Castro",
        role: "user",
        knowledge_points: 230
    }
];
