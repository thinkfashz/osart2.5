import { Product } from "@/types";

export const dummyProducts: Product[] = [
    {
        id: "1",
        title: "Arduino Uno R3 Elite",
        description: "La piedra angular de la innovación. Este microcontrolador ATmega328P ha sido seleccionado por su estabilidad superior en condiciones críticas. La base perfecta para dominar la electrónica de precisión.",
        price: 24990,
        stock: 50,
        category: "Microcontroladores",
        image_url: "https://images.unsplash.com/photo-1555541991-76672322c601?q=80&w=2670&auto=format&fit=crop",
        bonus: "Acceso Pro a Academy",
        bonus_points: 150,
        specs: {
            "Microcontrolador": "ATmega328P",
            "Voltaje Operativo": "5V",
            "Pines Digitales": "14",
            "Pines Analógicos": "6",
            "shipping": {
                "national": {
                    "enabled": true,
                    "delivery_time_min": 2,
                    "delivery_time_max": 5,
                    "regions": ["CL", "AR", "PE"]
                },
                "international": {
                    "enabled": true,
                    "delivery_time_min": 15,
                    "delivery_time_max": 25,
                    "regions": ["US", "ES", "CN"]
                }
            }
        }
    },
    {
        id: "2",
        title: "Raspberry Pi 4 Master",
        description: "Computación de vanguardia en la palma de tu mano. Con 8GB de RAM LPDDR4, este nodo de procesamiento es capaz de gestionar arquitecturas de red complejas y estaciones de control 4K simultáneas.",
        price: 89990,
        stock: 15,
        category: "Computadoras",
        image_url: "https://images.unsplash.com/photo-1631553127878-999d949cf9d4?q=80&w=2574&auto=format&fit=crop",
        bonus: "Planos de Carcasa CNC",
        bonus_points: 500,
        specs: {
            "Procesador": "Broadcom BCM2711",
            "RAM": "8GB LPDDR4-3200",
            "Conectividad": "WiFi Dual Band, BT 5.0",
            "Puertos": "2x Micro HDMI, 2x USB 3.0",
            "shipping": {
                "national": {
                    "enabled": true,
                    "delivery_time_min": 1,
                    "delivery_time_max": 3,
                    "regions": ["CL"]
                },
                "international": {
                    "enabled": true,
                    "delivery_time_min": 10,
                    "delivery_time_max": 20,
                    "regions": ["US", "DE", "JP"]
                }
            }
        }
    },
    {
        id: "3",
        title: "Sensor DHT22 High-Precision",
        description: "Captura la realidad ambiental con fidelidad absoluta. Este sensor digital de alta gama garantiza mediciones térmicas y de humedad con un margen de error mínimo para laboratorios de precisión.",
        price: 4990,
        stock: 120,
        category: "Sensores",
        image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2670&auto=format&fit=crop",
        bonus: "Script de Integración Python",
        bonus_points: 50,
        specs: {
            "Rango Temp": "-40 a 80°C",
            "Precisión Temp": "±0.5°C",
            "Rango Humedad": "0-100%",
            "Protocolo": "Digital 1-wire",
            "shipping": {
                "national": {
                    "enabled": true,
                    "delivery_time_min": 3,
                    "delivery_time_max": 7,
                    "regions": ["CL", "CO", "MX"]
                }
            }
        }
    },
    {
        id: "4",
        title: "Vault de Resistencias Premium",
        description: "El recurso definitivo para el ingeniero. Un arsenal de 600 piezas seleccionadas con tolerancia de precisión del 5%, organizado para un flujo de trabajo sin fricciones en prototipado de élite.",
        price: 8990,
        stock: 200,
        category: "Componentes",
        image_url: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=2539&auto=format&fit=crop",
        bonus: "Certificado de Calidad Militar",
        bonus_points: 100,
        specs: {
            "Potencia": "0.25W (1/4W)",
            "Tolerancia": "±5%",
            "Valores": "10Ω a 1MΩ",
            "shipping": {
                "national": {
                    "enabled": true,
                    "delivery_time_min": 2,
                    "delivery_time_max": 5,
                    "regions": ["CL"]
                }
            }
        }
    }
];
