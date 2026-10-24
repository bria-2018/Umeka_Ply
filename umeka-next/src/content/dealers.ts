/**
 * DEALER NETWORK
 * Add authorised dealers and distributors here. The Dealer Network page shows
 * a state filter and cards automatically. While this list is empty, the page
 * shows an "enquire to find your nearest dealer" state instead.
 */
export type Dealer = {
  name: string;
  type: 'Dealer' | 'Distributor';
  city: string;
  state: string;
  address?: string;
  phone?: string;
  mapUrl?: string;
};

export const dealers: Dealer[] = [
  // Example (remove the comment markers and fill in real details):
  // { name: 'ABC Plywood House', type: 'Dealer', city: 'Ahmedabad', state: 'Gujarat', address: '…', phone: '+91 …' },
];

/** Regions where the network is being built. Edit as coverage grows. (To be confirmed.) */
export const focusRegions = ['Gujarat', 'Western India'];
