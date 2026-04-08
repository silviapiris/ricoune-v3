# Deploiement Ricoune V2 sur Infomaniak

## Prerequis

### 1. Creer un sous-domaine dans le Manager Infomaniak
- Manager → Hebergement → Sites → Ajouter un sous-domaine
- Nom suggere : `nouveau.ricoune.com` ou `dev.ricoune.com`
- Pointer vers un dossier dedie (ex: `/sites/nouveau.ricoune.com/`)

### 2. Creer les tables MySQL
- Aller sur https://h2-phpmyadmin.infomaniak.com/
- Se connecter avec les credentials BDD
- Selectionner la base `e03xf_ricoune`
- Executer le contenu de `src/lib/schema.sql`

### 3. Configurer les variables d'environnement
Creer un fichier `.env.local` a la racine du projet :

```
DB_HOST=e03xf.myd.infomaniak.com
DB_USER=e03xf_kunclic
DB_PASSWORD=<mot_de_passe_bdd>
DB_NAME=e03xf_ricoune
RESEND_API_KEY=<cle_resend>
```

### 4. Build
```bash
npm run build
```

### 5. Deploy

#### Option A : Hebergement Web (PHP seulement)
Si l'hebergement ne supporte pas Node.js :
- Adapter en export statique (`output: 'export'` dans next.config.ts)
- Les formulaires devront utiliser un backend PHP
- Upload du dossier `out/` via FTP

#### Option B : Serveur Cloud (Node.js)
- Upload du dossier `.next/standalone/` via FTP
- Configurer Node.js dans le panneau Infomaniak
- `node server.js` comme commande de demarrage

## IMPORTANT
- NE PAS toucher au site WordPress actuel
- Deployer uniquement sur le sous-domaine
- Basculer vers le domaine principal APRES validation client
