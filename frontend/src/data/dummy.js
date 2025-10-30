export const experiences = [
  {
    id: '1',
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    price: 999,
    img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=60',
    excerpt: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    about:
      'Scenic routes, trained guides, and safety briefings. Helmet and Life jackets included along with an expert.',
    slots: {
      '2025-10-22': [
        { time: '07:00 am', spotsLeft: 4, soldOut: false },
        { time: '09:00 am', spotsLeft: 2, soldOut: false },
        { time: '11:00 am', spotsLeft: 5, soldOut: false },
        { time: '13:00 pm', spotsLeft: 0, soldOut: true }
      ],
      '2025-10-23': [
        { time: '09:00 am', spotsLeft: 3, soldOut: false },
        { time: '11:00 am', spotsLeft: 6, soldOut: false }
      ]
    }
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
    excerpt: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    about: 'Sunrise hike with guided route and breakfast at the top.',
    slots: {
      '2025-10-22': [{ time: '05:30 am', spotsLeft: 8, soldOut: false }]
    }
  }
];