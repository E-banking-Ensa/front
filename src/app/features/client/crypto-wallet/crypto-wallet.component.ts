import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { ClientDto } from '../../../core/models/ClientDto';

interface CryptoAsset {
  name: string;
  symbol: string;
  balanceMAD: number;
  balanceCrypto: number;
  price: number; // Prix en MAD
  change: number; // Pourcentage
  icon: string;
  iconColor: string;
}

interface Transaction {
  type: 'Achat' | 'Virement' | 'Conversion';
  description: string;
  date: Date;
  amount: number;
  currency: string;
  isPositive: boolean;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

@Component({
  selector: 'app-crypto-wallet',
  templateUrl: './crypto-wallet.component.html',
  styleUrls: ['./crypto-wallet.component.scss'],
  standalone: false
})
export class CryptoWalletComponent implements OnInit {
  currentClient: ClientDto | null = null;

  // Données mockées pour "Aperçu"
  portfolioValue = 11510.25;
  cryptoAssets: CryptoAsset[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      balanceMAD: 4539.00,
      price: 850000.00,
      balanceCrypto: 0.005340,
      change: 2.34,
      icon: 'currency_bitcoin', // Utilisation d'une icône Material Design par défaut ou image
      iconColor: '#F7931A'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      balanceMAD: 6971.25,
      price: 32500.00,
      balanceCrypto: 0.214500,
      change: -1.23,
      icon: 'bolt', // Pas d'icône ETH officielle dans Material Icons, 'bolt' ou 'change_history' peut faire l'affaire
      iconColor: '#627EEA'
    }
  ];

  // Données pour "Acheter"
  cryptosList = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Solana', symbol: 'SOL' }
  ];
  selectedCrypto = this.cryptosList[0];
  buyAmount: number | null = null;

  // Données pour "Transférer"
  transferRecipientId: string = '';
  transferAmount: number | null = null;
  selectedTransferCrypto = this.cryptosList[0];

  // Données pour "Convertir"
  convertAmount: number | null = null;
  selectedConvertCrypto = this.cryptosList[0];

  get estimatedConvertTotal(): number {
    if (!this.convertAmount) return 0;
    const asset = this.cryptoAssets.find(a => a.symbol === this.selectedConvertCrypto.symbol);
    return asset ? this.convertAmount * asset.price : 0;
  }

  // Données pour "Historique"
  transactions: Transaction[] = [
    {
      type: 'Achat',
      description: 'BITCOIN',
      date: new Date('2026-01-02'),
      amount: -850.00,
      currency: 'MAD',
      isPositive: false,
      icon: 'shopping_cart',
      iconBgColor: '#fce8e6', // Red light
      iconColor: '#d93025'    // Red
    },
    {
      type: 'Virement',
      description: 'Paiement fournisseur',
      date: new Date('2025-12-30'),
      amount: -1625.00,
      currency: 'MAD',
      isPositive: false,
      icon: 'north_east',
      iconBgColor: '#fce8e6',
      iconColor: '#d93025'
    },
    {
      type: 'Conversion',
      description: 'BITCOIN',
      date: new Date('2025-12-28'),
      amount: 425.00,
      currency: 'MAD',
      isPositive: true,
      icon: 'sync',
      iconBgColor: '#e6f4ea', // Green light
      iconColor: '#1e8e3e'    // Green
    }
  ];

  tabs = ['Aperçu', 'Acheter', 'Transférer', 'Convertir', 'Historique'];
  activeTab = 'Aperçu';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    // Récupération du client (similaire au dashboard)
    this.clientService.getCurrentClient().subscribe({
      next: (client) => {
        // Fallback si vide (car le service renvoie {} par défaut pour l'instant)
        if (!client || !client.clientId) {
          this.currentClient = this.createMockClientData();
        } else {
          this.currentClient = client;
        }
      },
      error: () => {
        this.currentClient = this.createMockClientData();
      }
    });

    // Si le service est synchrone/mocké et ne renvoie rien d'utile immédiatement
    if (!this.currentClient) {
      this.currentClient = this.createMockClientData();
    }
  }

  // Helper pour les données mockées du client si nécessaire
  private createMockClientData(): ClientDto {
    return {
      clientId: 'CL100001',
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      username: 'ahmed.ben.ali',
      email: 'ahmed.benali@example.com',
      phoneNumber: '',
      adresse: '',
      kycStatus: 'VERIFIED',
      status: 'ACTIVE',
      createdAt: new Date(),
      accounts: []
    } as ClientDto;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
