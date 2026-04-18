import { z } from "zod";

const EVENT_TYPES = [
  "Fête votive / Feria",
  "Festival",
  "Soirée privée",
  "Événement d'entreprise",
  "Autre",
] as const;

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Le nom doit faire au moins 2 caractères").max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z.string().trim().min(2, "Le prénom doit faire au moins 2 caractères").max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().max(255).optional(),
  type_evenement: z
    .union([z.enum(EVENT_TYPES), z.literal("")])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  date_souhaitee: z.string().trim().optional(),
  ville: z.string().trim().max(255).optional(),
  message: z.string().trim().min(10, "Le message doit faire au moins 10 caractères").max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

/** Input type — used by frontend form state (accepts "" for select defaults) */
export type ContactFormData = z.input<typeof contactSchema>;
