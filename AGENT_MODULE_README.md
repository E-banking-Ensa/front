# 📋 Guide Complet - Module Agent E-Banking

## 🎯 Vue d'ensemble

Ce module fournit une interface complète pour les agents bancaires pour gérer les clients, valider les documents KYC, gérer les consentements, et afficher les transactions.

---

## 📁 Structure des fichiers

```
src/app/
├── features/agent/
│   ├── agent-routing.module.ts          ✅ Routes du module agent
│   ├── agent-mock.service.ts            ✅ Service mock pour le menu
│   ├── dashboard/
│   │   └── agent-dashboard/             ✅ Dashboard avec statistiques
│   ├── clients/
│   │   ├── agent-clients.component.ts   ✅ Liste et gestion des clients
│   │   ├── agent-clients.component.html ✅ Template clients
│   │   ├── agent-clients.component.scss ✅ Styles clients
│   │   └── client-details-dialog/
│   │       ├── client-details-dialog.component.ts    ✅ Dialogue détails client
│   │       ├── client-details-dialog.component.html  ✅ Template dialogue
│   │       └── client-details-dialog.component.scss  ✅ Styles dialogue
│   ├── kyc-validation/                  ✅ Validation KYC (à compléter)
│   └── client-search/                   ✅ Recherche clients (déjà existant)
│
├── layout/
│   └── agent-layout/                    ✅ Sidebar layout pour l'agent
│
├── core/
│   ├── models/
│   │   ├── ClientDto.ts                 ✅ DTO Client
│   │   ├── KycDocumentResponseDto.ts   ✅ DTO Document KYC
│   │   ├── AccountDTO.ts                ✅ DTO Compte bancaire
│   │   └── ...
│   └── services/
│       ├── agent-mock-data.service.ts   ✅ Données mockées complètes
│       ├── agent-proxy.service.ts       ✅ Proxy (mock ↔ backend)
│       ├── dashbord.service.ts          ✅ Dashboard
│       ├── kyc.service.ts               ✅ Services KYC
│       ├── consent.service.ts           ✅ Services consentis
│       └── client.service.ts            ✅ Services clients
│
└── app-routing-module.ts                ✅ Route par défaut vers /agent
```

---

## 🚀 Démarrage rapide

### 1️⃣ Lancer le serveur de développement

```bash
cd c:\Users\pc\front
npm start
# ou
npx ng serve
```

L'application s'ouvrira à : **http://localhost:4200/agent**

### 2️⃣ Accéder à l'interface Agent

- **Dashboard**: http://localhost:4200/agent/dashboard
- **Clients**: http://localhost:4200/agent/clients
- **KYC Validation**: http://localhost:4200/agent/kyc-validation

---

## 💾 Données Mockées

Toutes les données sont définies dans `AgentMockDataService`:

### Clients
```typescript
// Données mockées pour 3 clients avec tous leurs détails
{
  clientId: 'CL001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@bank.com',
  kycStatus: 'VERIFIED', // ou 'PENDING', 'REJECTED'
  status: 'ACTIVE'        // ou 'INACTIVE'
}
```

### Comptes Bancaires
```typescript
{
  accountId: 1,
  clientId: 'CL001',
  accountType: 'SAVINGS',   // ou 'CURRENT'
  accountStatus: 'ACTIVE',  // ou 'PENDING', 'CLOSED'
  balance: 15000.50,
  currency: 'DH'
}
```

### Documents KYC
```typescript
{
  id: 'KYC001',
  documentType: 'ID_CARD',           // ou 'PROOF_OF_ADDRESS', etc
  status: 'VERIFIED',                // ou 'PENDING', 'REJECTED'
  pathToDocument: '/documents/...',
  uploadedAt: Date,
  reviewedAt: Date,
  reviewComment: 'Accepté'
}
```

### Consentements
```typescript
{
  id: 'CONSENT001',
  type: 'DATA_SHARING',    // ou 'MARKETING', etc
  status: 'ACCEPTED',      // ou 'PENDING', 'REJECTED'
  createdAt: Date,
  expiresAt: Date
}
```

---

## 🔄 Passer du Mock au Backend

### Étape 1️⃣: Utiliser le service Proxy

Remplacez l'importation du `AgentMockDataService` par `AgentProxyService`:

```typescript
// AVANT
constructor(private mockDataService: AgentMockDataService) {}

// APRÈS
constructor(private proxyService: AgentProxyService) {}
```

### Étape 2️⃣: Activer le mode Backend

Dans le service proxy (`agent-proxy.service.ts`), changez:

```typescript
// AVANT (ligne 25)
private useMockData = true;

// APRÈS
private useMockData = false;
```

### Étape 3️⃣: Décommenter les appels HTTP

Dans `agent-proxy.service.ts`, décommenter les appels HTTP `this.http.get/post()` et commenter les appels mock.

### Étape 4️⃣: S'assurer que le Backend fonctionne

```bash
# Démarrer votre serveur backend
java -jar backend.jar
# ou Maven
mvn spring-boot:run
```

---

## 📊 Composants et Fonctionnalités

### 1. AgentClientsComponent
**Fichier**: `src/app/features/agent/clients/agent-clients.component.ts`

**Fonctionnalités**:
- ✅ Affiche la liste de tous les clients
- ✅ Recherche par nom, email, téléphone, ID
- ✅ Statistiques: Total, KYC Pending, KYC Verified
- ✅ Actions sur les clients

**Actions disponibles**:
- 👁️ Voir détails → Ouvre la boîte de dialogue détails
- 💰 Comptes → Affiche les comptes bancaires
- 📄 Documents KYC → Affiche les documents KYC
- 📋 Consentements → Affiche les consentements

---

### 2. ClientDetailsDialogComponent
**Fichier**: `src/app/features/agent/clients/client-details-dialog/client-details-dialog.component.ts`

**4 Onglets**:

#### Onglet 1: Informations
- Identité complète du client
- Contact (email, téléphone, adresse)
- Statuts (KYC, Client, Date création)

#### Onglet 2: Comptes Bancaires
- Table des comptes avec RIB, type, solde
- Accès à l'historique des transactions

#### Onglet 3: Documents KYC
- Table des documents KYC
- Statut (Vérifié, En attente, Rejeté)
- Actions:
  - ✅ **Valider** → Marquer comme approuvé
  - ❌ **Rejeter** → Rejeter avec raison
  - ⬇️ **Télécharger** → Télécharger le document

#### Onglet 4: Consentements
- Table des consentements
- Types (Data Sharing, Marketing, etc)
- Statuts (Accepté, En attente, Rejeté)
- Dates d'expiration

---

## 🎨 Styles et Design

### Material Design
- ✅ Utilise Angular Material pour un design professionnel
- ✅ Responsive (Desktop, Tablet, Mobile)
- ✅ Thème cohérent avec couleurs gradient

### Colors utilisées
- **Primary**: #667eea (bleu)
- **Accent**: #764ba2 (violet)
- **Success**: #4caf50 (vert)
- **Warning**: #ff9800 (orange)
- **Error**: #f44336 (rouge)

---

## 📝 Modification des Données Mockées

Pour ajouter/modifier les données mockées:

1. Ouvrir: `src/app/core/services/agent-mock-data.service.ts`
2. Modifier les arrays:
   - `mockClients`
   - `mockAccounts` (Map)
   - `mockKycDocuments` (Map)
   - `mockConsents` (Map)

Exemple:
```typescript
private mockClients: ClientDto[] = [
  {
    clientId: 'CL004',
    firstName: 'New',
    lastName: 'Client',
    // ... autres propriétés
  }
];
```

---

## 🔐 Services Disponibles

### AgentMockDataService
Fournit les données mockées avec délai simulé (300-600ms)

```typescript
// Exemples d'utilisation
this.mockDataService.getAllClients().subscribe(clients => {});
this.mockDataService.getClientAccounts(clientId).subscribe(accounts => {});
this.mockDataService.validateKycDocument(clientId, docId, comment).subscribe(result => {});
```

### AgentProxyService
Proxy intelligent qui bascule entre mock et backend

```typescript
// Utilisation identique mais gère automatiquement
this.proxyService.getAllClients().subscribe(clients => {});

// Pour basculer les modes:
this.proxyService.enableMockMode();   // ← Mode développement
this.proxyService.disableMockMode();  // ← Mode production
```

---

## 🐛 Debugging

### Activer les logs console
Les services affichent des logs colorés:
- 🟢 **✅**: Succès
- 🔴 **❌**: Erreurs
- 📊 **📋**: Données
- 🔍 **🔍**: Recherches
- 💾 **💾**: Validations

### Vérifier l'état des données
Dans la console du navigateur:
```javascript
// Voir les logs des services
// Les services affichent automatiquement console.log()
```

---

## 📱 Responsive Design

| Écran | Description |
|-------|-------------|
| **Desktop** (> 960px) | Grille 3 colonnes pour les statistiques, table complète |
| **Tablet** (600-960px) | Grille 1 colonne, table partiellement cachée |
| **Mobile** (< 600px) | Stack vertical, table simplifiée (1 colonne) |

---

## 🚦 Checklist de Développement

- [x] Service mock avec données initialisées
- [x] Composant clients avec recherche
- [x] Dialogue détails 4 onglets
- [x] Actions KYC (valider, rejeter)
- [x] Service proxy (mock ↔ backend)
- [x] Routing complet
- [x] Redirection par défaut vers /agent
- [x] Styles Material Design
- [x] Documentation complète

---

## 🔗 URLs Utiles

| URL | Page |
|-----|------|
| http://localhost:4200/agent | Dashboard (par défaut) |
| http://localhost:4200/agent/dashboard | Tableau de bord |
| http://localhost:4200/agent/clients | Gestion des clients |
| http://localhost:4200/agent/kyc-validation | Validation KYC |

---

## ✉️ Support

Si vous avez des questions ou besoin de modifications:
1. Vérifiez la console du navigateur (F12) pour les erreurs
2. Consultez le code commenté
3. Vérifiez que les données mockées sont correctement formatées

---

**Dernière mise à jour**: 5 Janvier 2026

Bon développement! 🚀
