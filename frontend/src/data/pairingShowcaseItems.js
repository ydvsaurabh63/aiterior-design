export const pairingScenarios = [
  {
    id: 'chairs',
    tag: 'Which chairs go here?',
    roomType: 'Dining Room',
    label: 'Dining Chairs',
    items: [
      {
        id: 'lisabo-chair',
        name: 'LISABÖ Dining Chair',
        brand: 'IKEA',
        dimensions: '18 × 20 × 31"',
        price: '$75',
        thumbnail: '/chairs-preview/thumb_lisabo.png',
        roomImage: '/chairs-preview/dining_room_lisabo.jpg',
        tag: 'Which chairs go here?',
        description: 'Light ash veneer Scandinavian dining chair with upholstered pad.'
      },
      {
        id: 'groton-chair',
        name: 'Groton Dining Chair',
        brand: 'amazon',
        dimensions: '18 × 21 × 37"',
        price: '$110',
        thumbnail: '/chairs-preview/thumb_groton.png',
        roomImage: '/chairs-preview/dining_room_groton.jpg',
        defaultSelected: true,
        tag: 'Which chairs go here?',
        description: 'Classic solid wood slat-back chair in espresso dark walnut finish.'
      },
      {
        id: 'corrigan-chair',
        name: 'Corrigan Studio Chair',
        brand: 'Wayfair',
        dimensions: '22 × 22 × 30"',
        price: '$145',
        thumbnail: '/chairs-preview/thumb_corrigan.png',
        roomImage: '/chairs-preview/dining_room_corrigan.jpg',
        tag: 'Which chairs go here?',
        description: 'Mid-century modern curved cream upholstered chair with walnut legs.'
      }
    ]
  },
  {
    id: 'rugs',
    tag: 'Which rug goes here?',
    roomType: 'Living Room',
    label: 'Living Room Rugs',
    items: [
      {
        id: 'cream-shag-rug',
        name: 'Cozy Plush Shag Rug',
        brand: 'RUGGABLE',
        dimensions: '8\' × 10\'',
        price: '$289',
        thumbnail: '/rugs-preview/thumb_cream.jpg',
        roomImage: '/rugs-preview/room_cream.jpg',
        defaultSelected: true,
        tag: 'Which rug goes here?',
        description: 'Warm cream high-pile plush texture designed for cozy family lounging.'
      },
      {
        id: 'charcoal-distressed-rug',
        name: 'Abstract Charcoal Area Rug',
        brand: 'LULU & GEORGIA',
        dimensions: '8\' × 10\'',
        price: '$345',
        thumbnail: '/rugs-preview/thumb_charcoal.jpg',
        roomImage: '/rugs-preview/room_charcoal.jpg',
        tag: 'Which rug goes here?',
        description: 'Modern slate grey and cream abstract distressed design with woven patina.'
      },
      {
        id: 'blue-vintage-rug',
        name: 'Vintage Medallion Indigo Rug',
        brand: 'SAFAVIEH',
        dimensions: '8\' × 10\'',
        price: '$260',
        thumbnail: '/rugs-preview/thumb_blue.jpg',
        roomImage: '/rugs-preview/room_blue.jpg',
        tag: 'Which rug goes here?',
        description: 'Timeless Persian-inspired faded indigo floral medallion with subtle border.'
      }
    ]
  }
];

// Backward-compatible exports
export const chairPairingItems = pairingScenarios[0].items;
export const rugPairingItems = pairingScenarios[1].items;
