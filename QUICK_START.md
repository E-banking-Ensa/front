# 🚀 GUIDE DE DÉMARRAGE RAPIDE - Module Agent

## ⚡ Démarrage en 3 Étapes

### Étape 1: Lancer le serveur
```bash
cd c:\Users\pc\front
npm start
```

Ou alternative:
```bash
npx ng serve
```

### Étape 2: Ouvrir le navigateur
```
http://localhost:4200/agent
```

### Étape 3: Explorer l'application
- ✅ Voir le tableau de bord
- ✅ Naviguer vers la liste des clients
- ✅ Tester la validation KYC

---

## 📋 Checklist de Vérification

Après le démarrage, vérifiez que:

- [ ] Aucune erreur TypeScript critique dans la console
- [ ] Le layout avec sidebar s'affiche correctement
- [ ] Le dashboard est affiché par défaut
- [ ] Tous les 4 boutons de navigation fonctionnent:
  - [ ] Dashboard
  - [ ] Clients
  - [ ] Validation KYC
  - [ ] Transactions
- [ ] La recherche clients fonctionne
- [ ] Les dialogues s'ouvrent correctement

---

## 🛠️ Résolution des Problèmes

### Problème: "Cannot find module"
**Solution:** Attendre la compilation complète (2-3 minutes)

### Problème: "Port 4200 déjà utilisé"
**Solution:** 
```bash
# Tuez le processus existant
lsof -ti:4200 | xargs kill -9
# Ou utilisez un autre port
ng serve --port 4201
```

### Problème: Erreurs de Material
**Solution:** Réinstaller les dépendances
```bash
npm install
```

### Problème: Layout vide ou sans sidebar
**Solution:** 
1. Vérifier que `AgentLayoutComponent` est correctement importé
2. Vérifier la console (F12) pour les erreurs
3. Forcer le rechargement (Ctrl+Shift+Delete)

---

## 📚 Structure de l'Application

```
http://localhost:4200/
│
└── /agent (Route par défaut)
    │
    ├── /dashboard (Défaut - tableau de bord)
    │   └── 4 statistiques
    │   └── Activités récentes
    │   └── Tâches prioritaires
    │
    ├── /clients (Gestion des clients)
    │   └── Liste de clients
    │   └── Recherche
    │   └── Dialogue détails (4 onglets)
    │
    ├── /kyc-validation (Validation KYC)
    │   └── Tableau de documents
    │   └── Filtres
    │   └── Actions (valider, rejeter)
    │
    └── /transactions (Transactions)
        └── (Actuellement pointe au dashboard)
```

---

## 🎮 Scénarios de Test

### Test 1: Navigation
1. Ouvrir http://localhost:4200
2. Vérifier redirection vers `/agent`
3. Cliquer sur chaque élément du menu
4. Vérifier que chaque page se charge

### Test 2: Recherche Clients
1. Aller à `/agent/clients`
2. Taper un nom dans la recherche
3. Vérifier que la liste se filtre

### Test 3: Dialogue Détails
1. Aller à `/agent/clients`
2. Cliquer sur l'une des icônes d'action
3. Vérifier que le dialogue s'ouvre
4. Vérifier que les onglets sont accessibles

### Test 4: Validation KYC
1. Aller à `/agent/kyc-validation`
2. Voir le tableau de documents
3. Utiliser les filtres
4. Tester les boutons d'action

---

## 🔍 Commandes Utiles

### Lancer le dev server
```bash
npm start
# ou
npx ng serve
```

### Lancer les tests
```bash
npm test
# ou
ng test
```

### Build pour production
```bash
npm run build
# ou
ng build --configuration production
```

### Vérifier les dépendances
```bash
npm list
```

### Mettre à jour les dépendances
```bash
npm update
```

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| Composants créés | 6 |
| Fichiers template | 6 |
| Fichiers style | 6 |
| Services | 3 (mock, proxy, etc) |
| Routes agent | 4 |
| Modèles utilisés | 5+ |

---

## 🎯 Fonctionnalités Principales

✅ **AgentLayoutComponent**
- Toolbar avec notifications
- Sidebar avec navigation
- Menu utilisateur
- Responsive

✅ **AgentDashboardComponent**
- 4 statistiques
- Activités récentes
- Tâches prioritaires
- Boutons d'action

✅ **AgentClientsComponent**
- Liste de clients
- Recherche en temps réel
- Statistiques KYC
- Actions rapides

✅ **ClientDetailsDialog**
- 4 onglets (Info, Comptes, KYC, Consentements)
- Tables de données
- Actions (valider, rejeter, etc)

✅ **KycValidationComponent**
- Tableau de documents
- Filtres avancés
- Actions de validation
- Statistiques

---

## 📞 Support

Si vous rencontrez des problèmes:

1. **Vérifier la console** (F12 → Console)
2. **Vérifier les erreurs de compilation** (Terminal)
3. **Consulter le fichier AGENT_MODULE_README.md** pour plus de détails
4. **Vérifier FILES_CREATED.md** pour la liste des fichiers

---

## ✨ Prochaines Étapes

Une fois que tout fonctionne:

1. ✅ Tester toutes les fonctionnalités
2. ✅ Vérifier le responsive design
3. ✅ Intégrer avec le backend réel
4. ✅ Mettre à jour le `AgentProxyService` avec les appels HTTP
5. ✅ Tester avec de vraies données

---

**Créé le:** 5 Janvier 2026
**Version:** 1.0
**Statut:** ✅ Prêt à l'emploi

Bon développement! 🚀
