# 🔍 DIAGNOSTIC - Problème de Redirection

## 📋 Checklist de Vérification

### ✅ Fichiers Créés/Corrigés
- [x] `app-routing-module.ts` - Redirection configurée
- [x] `agent-layout.component.ts` - Standalone avec RouterModule
- [x] `agent-layout.component.html` - Contient `<router-outlet>`
- [x] `agent-routing.module.ts` - Routes enfants correctes

### 🔧 Configuration à Vérifier

#### 1. **app-routing-module.ts**
```typescript
// Doit contenir:
{ path: '', redirectTo: '/agent', pathMatch: 'full' }

// Et la route agent:
{
  path: 'agent',
  loadComponent: () => import('./layout/agent-layout/agent-layout.component')
    .then(c => c.AgentLayoutComponent),
  loadChildren: () => import('./features/agent/agent-routing.module')
    .then(m => m.AgentRoutingModule)
}
```
✅ **État:** Vérifié et correct

#### 2. **AgentLayoutComponent**
```typescript
@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,  // ← IMPORTANT!
    // ...
  ]
})
```
✅ **État:** Standalone et RouterModule importé

#### 3. **Template du Layout**
```html
<mat-sidenav-content class="agent-content">
  <router-outlet></router-outlet>  ← IMPORTANT!
</mat-sidenav-content>
```
✅ **État:** router-outlet présent

#### 4. **agent-routing.module.ts**
```typescript
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/...').then(...)
  },
  // ...
];
```
✅ **État:** Routes enfants correctes

---

## 🚀 Procédure de Test

### Étape 1: Nettoyer et Relancer

```bash
# 1. Arrêter npm start (Ctrl+C)
# 2. Nettoyer
rm -rf dist/ .angular/

# 3. Réinstaller les dépendances
npm install

# 4. Relancer le serveur
npm start
```

### Étape 2: Accéder à l'Application

1. Ouvrir: `http://localhost:4200`
2. **Vérifier la console du navigateur (F12)**
3. Regarder les logs:
   - Erreur de "Cannot find module"?
   - Erreur de routage?
   - Erreur de compilation?

### Étape 3: Tests Progressifs

```
Test 1: http://localhost:4200/
  → Doit rediriger vers /agent
  → Doit afficher le layout avec sidebar

Test 2: http://localhost:4200/agent
  → Doit afficher le layout avec sidebar
  → Doit charger le dashboard

Test 3: http://localhost:4200/agent/dashboard
  → Doit afficher le dashboard

Test 4: http://localhost:4200/agent/clients
  → Doit afficher la liste des clients

Test 5: http://localhost:4200/agent/kyc-validation
  → Doit afficher la page KYC
```

---

## 🐛 Problèmes Possibles et Solutions

### Problème 1: "Cannot find module"
**Symptôme:** Erreur TypeScript dans le terminal
**Solution:**
```bash
npm install
npm start
```

### Problème 2: Layout vide (pas de sidebar)
**Symptôme:** Page blanche avec du contenu
**Solution:** 
- Vérifier console (F12) pour erreurs
- Vérifier que `app-agent-layout` est utilisé
- Vérifier que Material CSS est chargé

### Problème 3: Pas de redirection
**Symptôme:** Reste sur `localhost:4200`, pas de `/agent`
**Solution:**
- Vérifier `pathMatch: 'full'` dans routing
- Vérifier l'ordre des routes (redirection doit être en dernier)
- Forcer rechargement: Ctrl+Shift+Delete

### Problème 4: Children routes ne chargent pas
**Symptôme:** `/agent` fonctionne mais `/agent/clients` ne fonctionne pas
**Solution:**
- Vérifier que `router-outlet` est dans le template
- Vérifier que `loadChildren` pointe vers le bon module
- Vérifier que les routes enfants sont correctes

---

## 🧪 Test Rapide

### Via Terminal - Vérifier la Compilation

```bash
# Test 1: Vérifier les imports
grep -r "AgentLayoutComponent" src/app/

# Test 2: Vérifier le fichier existe
ls -la src/app/layout/agent-layout/agent-layout.component.ts

# Test 3: Vérifier le contenu
cat src/app/layout/agent-layout/agent-layout.component.ts | head -50
```

### Via Navigateur - Vérifier le Runtime

1. **Ouvrir F12 (DevTools)**
2. **Onglet Console**
3. Taper:
```javascript
// Vérifier la route actuelle
console.log(window.location.pathname);

// Vérifier les erreurs
// (apparaîtront en rouge)
```

---

## 📊 Arborescence Correcte

```
src/app/
├── app-routing-module.ts           ✅ Route /agent vers AgentLayoutComponent
│
├── layout/
│   └── agent-layout/
│       ├── agent-layout.component.ts       ✅ Standalone
│       ├── agent-layout.component.html     ✅ Avec <router-outlet>
│       └── agent-layout.component.scss
│
└── features/
    └── agent/
        ├── agent-routing.module.ts         ✅ Routes enfants
        ├── dashboard/
        │   └── agent-dashboard/
        │       ├── agent-dashboard.component.ts
        │       ├── agent-dashboard.component.html
        │       └── agent-dashboard.component.scss
        ├── clients/
        │   └── agent-clients.component.ts
        └── kyc-validation/
            └── kyc-validation.component.ts
```

---

## 💡 Points Clés à Vérifier

1. **Redirection par défaut**
   ```typescript
   { path: '', redirectTo: '/agent', pathMatch: 'full' }
   ```
   - Doit être à la FIN de la liste des routes
   - `pathMatch: 'full'` est OBLIGATOIRE

2. **Route agent avec loadComponent**
   ```typescript
   path: 'agent',
   loadComponent: () => import(...)
   ```
   - Chemin du fichier doit être exact
   - Import doit retourner le composant

3. **Route agent avec loadChildren**
   ```typescript
   loadChildren: () => import(...)
   ```
   - Doit pointer vers le module de routing

4. **Template du layout**
   ```html
   <router-outlet></router-outlet>
   ```
   - Doit être présent pour afficher les routes enfants

5. **Standalone component**
   ```typescript
   standalone: true,
   imports: [RouterModule, ...]
   ```
   - RouterModule DOIT être importé

---

## 🔄 Ordre de Priorité des Vérifications

1. **Logs de compilation** ← Commencer ici
2. **Console navigateur** (F12)
3. **Terminal npm start**
4. **Vérifier les fichiers existent**
5. **Vérifier les imports**
6. **Nettoyer et relancer**

---

## ⚡ Quick Fix

Si rien ne fonctionne:

```bash
# 1. Arrêter le serveur
Ctrl+C

# 2. Nettoyer tout
rm -rf node_modules .angular dist
npm install

# 3. Relancer
npm start

# 4. Accéder
http://localhost:4200
```

---

**Créé:** 5 Janvier 2026
**But:** Diagnostiquer et fixer le problème de redirection
**Prochaine étape:** Lancer `npm start` et vérifier la console
