export interface CryptoAsset {
    id: string;
    name: string;
    symbol: string;
    balance: number; // Quantité de crypto possédée
    currentPrice: number; // Prix unitaire actuel en MAD
    totalValue: number; // Valeur totale en MAD (balance * currentPrice)
    change24h: number; // Variation en %
    iconName?: string; // Nom de l'icône (ex: 'currency_bitcoin')
    iconColor?: string; // Couleur de l'icône/bg
}
