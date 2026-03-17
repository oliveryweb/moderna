import { z } from "zod";

export const checkoutFormSchema = z.object({
  // Customer Information
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z
    .string()
    .regex(/^[0-9\s\-\+\(\)]{10,}$/, "Por favor ingresa un teléfono válido"),

  // Shipping Address
  street: z.string().min(5, "Por favor ingresa una dirección válida"),
  streetNumber: z.string().min(1, "Por favor ingresa el número de calle"),
  apartment: z.string().optional(),
  city: z.string().min(2, "Por favor ingresa una ciudad"),
  province: z.string().min(2, "Por favor ingresa una provincia"),
  postalCode: z
    .string()
    .regex(/^\d{4,5}$/, "Por favor ingresa un código postal válido"),

  // Payment Method
  paymentMethod: z.enum(["transfer", "mercadopago", "domicilio"]),

  // Additional Notes
  notes: z.string().optional(),

  // Terms
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export interface CheckoutStep {
  id: number;
  title: string;
  description: string;
}

export const checkoutSteps: CheckoutStep[] = [
  {
    id: 1,
    title: "Datos Personales",
    description: "Información de contacto",
  },
  {
    id: 2,
    title: "Dirección de Envío",
    description: "Dónde recibirás tu pedido",
  },
  {
    id: 3,
    title: "Envío y Pago",
    description: "Método de entrega y pago",
  },
  {
    id: 4,
    title: "Confirmación",
    description: "Revisa tu pedido",
  },
];
