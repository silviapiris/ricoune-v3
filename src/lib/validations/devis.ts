import { z } from "zod";

const EVENT_TYPES = [
  "Mariage",
  "Fête votive / Feria",
  "Festival",
  "Soirée privée",
  "Événement d'entreprise",
  "Autre",
] as const;

const FORMULE_TYPES = [
  "Formule complète",
  "Cocktail / Show case",
  "Je ne sais pas encore",
] as const;

export const devisSchema = z.object({
  nom: z.string().trim().min(1, "Le nom est requis").max(255),
  prenom: z.string().trim().min(1, "Le prenom est requis").max(255),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().max(255).optional(),
  type_evenement: z
    .union([z.enum(EVENT_TYPES), z.literal("")])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  date_souhaitee: z.string().trim().optional(),
  lieu: z.string().trim().max(255).optional(),
  formule: z
    .union([z.enum(FORMULE_TYPES), z.literal("")])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  message: z.string().trim().max(5000).optional(),
});

/** Input type — used by frontend form state (accepts "" for select defaults) */
export type DevisFormData = z.input<typeof devisSchema>;
