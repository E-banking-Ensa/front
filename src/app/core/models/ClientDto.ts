import { AccountDTO } from './AccountDTO';

export interface ClientDto{
  clientId:string;
  username:string;
  email:string;
  phoneNumber:string;
  adresse:string;
  firstName:string;
  lastName:string;
  kycStatus:string;
  createdAt:Date;
  status:string;
  accounts: AccountDTO[];
}

