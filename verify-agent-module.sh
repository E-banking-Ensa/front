#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Script de Vérification - Module Agent
# 
# Vérifie que tous les fichiers créés sont présents et corrects
# ═══════════════════════════════════════════════════════════════════════════════

echo "═══════════════════════════════════════════════════════════════════════════════"
echo "✅ VÉRIFICATION DU MODULE AGENT"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
TOTAL=0
FOUND=0
MISSING=0

# Fonction pour vérifier un fichier
check_file() {
    TOTAL=$((TOTAL+1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
        FOUND=$((FOUND+1))
    else
        echo -e "${RED}❌${NC} $1"
        MISSING=$((MISSING+1))
    fi
}

# Fonction pour vérifier un dossier
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/"
    else
        echo -e "${RED}❌${NC} $1/"
    fi
}

echo "📁 VÉRIFICATION DES DOSSIERS:"
echo "───────────────────────────────────────────────────────────────────────────────"
check_dir "src/app/layout/agent-layout"
check_dir "src/app/features/agent/dashboard/agent-dashboard"
check_dir "src/app/features/agent/clients"
check_dir "src/app/features/agent/kyc-validation"
check_dir "src/app/core/services"
echo ""

echo "📄 VÉRIFICATION DES FICHIERS:"
echo "───────────────────────────────────────────────────────────────────────────────"

echo ""
echo "🏗️ Layout Agent:"
check_file "src/app/layout/agent-layout/agent-layout.component.ts"
check_file "src/app/layout/agent-layout/agent-layout.component.html"
check_file "src/app/layout/agent-layout/agent-layout.component.scss"

echo ""
echo "📊 Dashboard Agent:"
check_file "src/app/features/agent/dashboard/agent-dashboard/agent-dashboard.component.ts"
check_file "src/app/features/agent/dashboard/agent-dashboard/agent-dashboard.component.html"
check_file "src/app/features/agent/dashboard/agent-dashboard/agent-dashboard.component.scss"

echo ""
echo "👥 Clients Management:"
check_file "src/app/features/agent/clients/agent-clients.component.ts"
check_file "src/app/features/agent/clients/agent-clients.component.html"
check_file "src/app/features/agent/clients/agent-clients.component.scss"
check_file "src/app/features/agent/clients/client-details-dialog/client-details-dialog.component.ts"
check_file "src/app/features/agent/clients/client-details-dialog/client-details-dialog.component.html"
check_file "src/app/features/agent/clients/client-details-dialog/client-details-dialog.component.scss"

echo ""
echo "📋 KYC Validation:"
check_file "src/app/features/agent/kyc-validation/kyc-validation.component.ts"
check_file "src/app/features/agent/kyc-validation/kyc-validation.component.html"
check_file "src/app/features/agent/kyc-validation/kyc-validation.component.scss"

echo ""
echo "🔧 Services:"
check_file "src/app/core/services/agent-mock-data.service.ts"
check_file "src/app/core/services/agent-proxy.service.ts"

echo ""
echo "🛣️ Routing:"
check_file "src/app/features/agent/agent-routing.module.ts"
check_file "src/app/app-routing-module.ts"

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "📊 RÉSUMÉ:"
echo "───────────────────────────────────────────────────────────────────────────────"
echo -e "Total vérifiés: $TOTAL"
echo -e "Trouvés: ${GREEN}$FOUND${NC}"
echo -e "Manquants: ${RED}$MISSING${NC}"
echo ""

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ TOUS LES FICHIERS SONT PRÉSENTS!${NC}"
    echo ""
    echo "Vous pouvez maintenant lancer:"
    echo "  npm start"
    echo "  ou"
    echo "  npx ng serve"
else
    echo -e "${RED}⚠️ CERTAINS FICHIERS MANQUENT!${NC}"
    echo "Veuillez vérifier la liste ci-dessus"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
