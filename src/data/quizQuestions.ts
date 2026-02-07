export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
    explanation: string;
}

export const electronicsQuiz: QuizQuestion[] = [
    {
        id: 1,
        question: "¿Cuál es la unidad de medida de la resistencia eléctrica?",
        options: ["Voltio", "Amperio", "Ohmio", "Vatio"],
        correctAnswer: 2,
        difficulty: "Básico",
        explanation: "El Ohmio (Ω) es la unidad que mide la oposición al flujo de corriente eléctrica."
    },
    {
        id: 2,
        question: "¿Qué componente almacena energía en un campo eléctrico?",
        options: ["Inductor", "Resistor", "Capacitor", "Diodo"],
        correctAnswer: 2,
        difficulty: "Básico",
        explanation: "Los capacitores (o condensadores) almacenan energía en forma de campo eléctrico entre sus placas."
    },
    {
        id: 3,
        question: "En la Ley de Ohm, ¿cuál es la fórmula para calcular el Voltaje?",
        options: ["V = I / R", "V = I * R", "V = R / I", "V = I + R"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "El voltaje es igual a la intensidad de corriente por la resistencia (V=IR)."
    },
    {
        id: 4,
        question: "¿Qué función cumple un Diodo en un circuito?",
        options: ["Amplifica la señal", "Almacena carga", "Permite el paso de corriente en un solo sentido", "Aumenta la resistencia"],
        correctAnswer: 2,
        difficulty: "Básico",
        explanation: "Un diodo es un componente semiconductor que actúa como una válvula unidireccional para la corriente."
    },
    {
        id: 5,
        question: "¿Qué significan las siglas LED?",
        options: ["Low Energy Device", "Light Emitting Diode", "Level Electrical Detector", "Linked Electron Device"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "LED son las siglas en inglés de Light Emitting Diode (Diodo Emisor de Luz)."
    },
    {
        id: 6,
        question: "¿Cuál es el voltaje estándar de un pin digital de salida en un Arduino Uno?",
        options: ["3.3V", "12V", "5V", "9V"],
        correctAnswer: 2,
        difficulty: "Básico",
        explanation: "Arduino Uno opera mayoritariamente con niveles lógicos de 5V."
    },
    {
        id: 7,
        question: "¿Qué componente se utiliza para amplificar o conmutar señales electrónicas?",
        options: ["Transistor", "Transformador", "Termistor", "Triac"],
        correctAnswer: 0,
        difficulty: "Intermedio",
        explanation: "El transistor es el componente fundamental para la amplificación y conmutación en electrónica moderna."
    },
    {
        id: 8,
        question: "¿Qué ley establece que la suma de las corrientes que entran a un nodo es igual a la suma de las que salen?",
        options: ["Ley de Ohm", "Ley de Watt", "Primera Ley de Kirchhoff", "Segunda Ley de Kirchhoff"],
        correctAnswer: 2,
        difficulty: "Intermedio",
        explanation: "La Primera Ley de Kirchhoff (KCL) se basa en la conservación de la carga eléctrica."
    },
    {
        id: 9,
        question: "¿Cuál es la función principal de un microcontrolador?",
        options: ["Almacenar archivos masivos", "Ejecutar un programa de control de forma autónoma", "Aumentar el voltaje de la red", "Filtrar el ruido de la señal"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "Un microcontrolador es un computador pequeño en un solo chip diseñado para gobernar un sistema específico."
    },
    {
        id: 10,
        question: "¿Qué tipo de corriente suministra una batería de 9V?",
        options: ["Corriente Alterna (AC)", "Corriente Continua (DC)", "Corriente Trifásica", "Corriente Pulsante"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "Las baterías suministran corriente continua, donde el flujo de electrones es siempre en el mismo sentido."
    },
    {
        id: 11,
        question: "¿Qué componente se utiliza para proteger un circuito contra sobrecorrientes?",
        options: ["Potenciómetro", "Fusible", "Zener", "Optoacoplador"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "El fusible se funde cuando la corriente excede un valor determinado, abriendo el circuito y protegiendo los componentes."
    },
    {
        id: 12,
        question: "¿Qué técnica de modulación se usa comúnmente para controlar la velocidad de un motor DC?",
        options: ["AM", "FM", "PWM", "PCM"],
        correctAnswer: 2,
        difficulty: "Intermedio",
        explanation: "PWM (Modulación por Ancho de Pulso) permite variar la potencia entregada a una carga mediante la conmutación rápida."
    },
    {
        id: 13,
        question: "¿Qué significan las siglas PCB?",
        options: ["Primary Circuit Board", "Printed Circuit Board", "Power Circuit Base", "Personal Computer Board"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "PCB es el acrónimo de Printed Circuit Board (Placa de Circuito Impreso)."
    },
    {
        id: 14,
        question: "¿Cuál es la función de un osciloscopio?",
        options: ["Medir la temperatura del cautín", "Visualizar señales eléctricas en función del tiempo", "Limpiar placas de circuito", "Generar ondas de radio"],
        correctAnswer: 1,
        difficulty: "Intermedio",
        explanation: "El osciloscopio permite ver gráficamente cómo varía el voltaje a través de un periodo de tiempo."
    },
    {
        id: 15,
        question: "¿Qué sucede si conectas un LED sin resistencia a una fuente de 12V?",
        options: ["Brilla intensamente para siempre", "No enciende", "Se quema debido al exceso de corriente", "Cambia de color automáticamente"],
        correctAnswer: 2,
        difficulty: "Básico",
        explanation: "Sin resistencia limitadora, la corriente excede los límites físicos del diodo semiconductor y lo destruye."
    },
    {
        id: 16,
        question: "¿Qué es un protocolo I2C?",
        options: ["Un tipo de cable de alimentación", "Un protocolo de comunicación serie para conectar sensores", "Un lenguaje de programación", "Un tipo de soldadura"],
        correctAnswer: 1,
        difficulty: "Avanzado",
        explanation: "I2C es un bus de comunicación serie con dos líneas (SDA y SCL) muy común en sistemas embebidos."
    },
    {
        id: 17,
        question: "¿Cuántos bits tiene un byte?",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "Un byte estándar se compone de una secuencia de 8 bits."
    },
    {
        id: 18,
        question: "¿Qué herramienta se usa para soldar componentes electrónicos?",
        options: ["Pegamento térmico", "Cautín o Soldador", "Taladro", "Pinzas de presión"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "El cautín calienta el estaño para crear uniones eléctricas y mecánicas sólidas."
    },
    {
        id: 19,
        question: "¿Qué es la inductancia?",
        options: ["La oposición al cambio de voltaje", "La oposición al cambio de corriente", "El almacenamiento de carga", "La emisión de luz"],
        correctAnswer: 1,
        difficulty: "Avanzado",
        explanation: "La inductancia es la propiedad de un componente de oponerse a los cambios en la corriente que circula por él."
    },
    {
        id: 20,
        question: "¿Qué diferencia a un microprocesador de un microcontrolador?",
        options: ["El microprocesador no tiene RAM ni periféricos integrados", "El microcontrolador es más grande", "El microprocesador consume menos energía", "No hay diferencia real"],
        correctAnswer: 0,
        difficulty: "Avanzado",
        explanation: "A diferencia del chip de control, el microprocesador requiere componentes externos para funcionar (RAM, Almacenamiento, etc.)."
    },
    {
        id: 21,
        question: "¿Qué componente se usa para medir la temperatura por variación de resistencia?",
        options: ["Potenciómetro", "Termistor", "Encoder", "Relevador"],
        correctAnswer: 1,
        difficulty: "Intermedio",
        explanation: "Un termistor varía su resistencia eléctrica de forma predecible según la temperatura ambiente."
    },
    {
        id: 22,
        question: "¿Cuál es el voltaje nominal de una celda de batería LiPo cargada?",
        options: ["1.5V", "3.7V", "4.2V", "9.0V"],
        correctAnswer: 2,
        difficulty: "Intermedio",
        explanation: "Aunque su voltaje nominal es 3.7V, una celda LiPo alcanza los 4.2V cuando está totalmente cargada."
    },
    {
        id: 23,
        question: "¿Qué puerto de comunicación se usa normalmente para cargar el código a un Arduino?",
        options: ["HDMI", "USB", "VGA", "Ethernet"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "El puerto USB permite la comunicación serie y la alimentación durante el proceso de programación."
    },
    {
        id: 24,
        question: "¿Qué hace un convertidor ADC?",
        options: ["Convierte corriente alterna en continua", "Transforma una señal analógica en un valor digital", "Aumenta la frecuencia de reloj", "Convierte luz en electricidad"],
        correctAnswer: 1,
        difficulty: "Intermedio",
        explanation: "Un Analog-to-Digital Converter es vital para que un microcontrolador entienda señales del mundo real (como temperatura)."
    },
    {
        id: 25,
        question: "¿Qué componente permite controlar una carga de alto voltaje con una señal de bajo voltaje?",
        options: ["Diodo", "Capacitor", "Relé (Relevador)", "Cristal de cuarzo"],
        correctAnswer: 2,
        difficulty: "Intermedio",
        explanation: "El relé es un interruptor electromagnético que aisla el control de baja potencia de la carga de alta potencia."
    },
    {
        id: 26,
        question: "¿Cuál es la frecuencia del reloj base en un Arduino Uno?",
        options: ["1 MHz", "16 MHz", "2.4 GHz", "100 kHz"],
        correctAnswer: 1,
        difficulty: "Avanzado",
        explanation: "El ATmega328P de un Arduino Uno estándar funciona a una frecuencia de 16 millones de ciclos por segundo."
    },
    {
        id: 27,
        question: "¿Qué sucede al conectar dos resistencias iguales en paralelo?",
        options: ["La resistencia total se duplica", "La resistencia total es la mitad de una de ellas", "No pasa corriente", "Se anulan"],
        correctAnswer: 1,
        difficulty: "Intermedio",
        explanation: "En paralelo, dos resistencias iguales resultan en una resistencia equivalente de exactamente la mitad."
    },
    {
        id: 28,
        question: "¿Qué herramienta es esencial para desinstalar componentes soldados?",
        options: ["Martillo", "Bomba de desoldar o Malla", "Cinta aislante", "Lupa"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "La bomba de desoldar retira el estaño líquido para liberar los terminales de los componentes."
    },
    {
        id: 29,
        question: "¿Qué significan las siglas GND en un diagrama?",
        options: ["General Node Driver", "Ground (Tierra)", "Generate New Data", "Green Node Device"],
        correctAnswer: 1,
        difficulty: "Básico",
        explanation: "GND representa el punto de referencia de 0 voltios en un circuito electrónico."
    },
    {
        id: 30,
        question: "¿Qué es el efecto Joule?",
        options: ["La generación de luz en un gas", "La producción de calor al pasar corriente por un conductor", "La inducción magnética en un núcleo", "La resonancia de una antena"],
        correctAnswer: 1,
        difficulty: "Intermedio",
        explanation: "El calor generado por una resistencia al paso de la electricidad es conocido como efecto Joule."
    }
];
