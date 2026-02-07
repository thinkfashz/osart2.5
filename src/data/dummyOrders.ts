import { Order } from "@/types";
import { dummyProducts } from "./dummyProducts";

export const dummyOrders: Order[] = [
    {
        id: "ORD-2024-001",
        user_id: "usr_01",
        total: 1250000,
        status: "paid",
        items: [
            { ...dummyProducts[0], quantity: 1 },
            { ...dummyProducts[1], quantity: 2 }
        ],
        created_at: "2024-03-15T10:30:00Z"
    },
    {
        id: "ORD-2024-002",
        user_id: "usr_02",
        total: 850000,
        status: "pending",
        items: [
            { ...dummyProducts[2], quantity: 1 }
        ],
        created_at: "2024-03-16T14:45:00Z"
    },
    {
        id: "ORD-2024-003",
        user_id: "usr_03",
        total: 2100000,
        status: "shipped",
        tracking_number: "ARX-9921-ELITE",
        shipping_date: "2024-03-17T09:00:00Z",
        items: [
            { ...dummyProducts[3], quantity: 1 },
            { ...dummyProducts[0], quantity: 1 }
        ],
        created_at: "2024-03-14T11:20:00Z"
    },
    {
        id: "ORD-2024-004",
        user_id: "usr_04",
        total: 450000,
        status: "delivered",
        tracking_number: "ARX-8812-ELITE",
        shipping_date: "2024-03-10T08:00:00Z",
        delivery_date: "2024-03-12T16:30:00Z",
        items: [
            { ...dummyProducts[4], quantity: 1 }
        ],
        created_at: "2024-03-09T18:15:00Z"
    }
];
