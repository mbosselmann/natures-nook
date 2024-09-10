export type Plant = {
  id: number;
  scientific_name: string;
  name: string;
  description: string;
  light_requirements: string[];
  water_requirements: string;
  care_level: string;
  sizes: {
    height: string;
    price: number;
    size: string;
  }[];
  tags: string[];
};

export const catalog: Plant[] = [
  {
    id: 1,
    name: 'Snake Plant',
    scientific_name: 'Sansevieria trifasciata',
    description:
      'A hardy, low-maintenance plant with upright, sword-like leaves. Great for beginners.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 15.99,
        height: '6-10 inches',
      },
      {
        size: 'Medium',
        price: 25.99,
        height: '12-18 inches',
      },
      {
        size: 'Large',
        price: 39.99,
        height: '24-30 inches',
      },
    ],
    tags: ['Air Purifying', 'Low Maintenance', 'Drought Tolerant'],
  },
  {
    id: 2,
    name: 'Spider Plant',
    scientific_name: 'Chlorophytum comosum',
    description:
      'A popular indoor plant with arching leaves and baby plantlets that dangle from the mother plant.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 9.99,
        height: '8-12 inches',
      },
      {
        size: 'Medium',
        price: 14.99,
        height: '14-18 inches',
      },
    ],
    tags: ['Pet Friendly', 'Air Purifying', 'Fast Growing'],
  },
  {
    id: 3,
    name: 'Peace Lily',
    scientific_name: 'Spathiphyllum wallisii',
    description:
      'Known for its elegant white flowers and ability to thrive in low light, the Peace Lily is both beautiful and easy to care for.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water weekly; keep soil consistently moist but not waterlogged.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 12.99,
        height: '10-15 inches',
      },
      {
        size: 'Large',
        price: 22.99,
        height: '20-24 inches',
      },
    ],
    tags: ['Air Purifying', 'Flowering', 'Shade Tolerant'],
  },
  {
    id: 4,
    name: 'Aloe Vera',
    scientific_name: 'Aloe barbadensis miller',
    description:
      'A succulent plant known for its medicinal properties, Aloe Vera is perfect for sunny windowsills.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 3 weeks; allow soil to dry out completely between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 10.99,
        height: '6-8 inches',
      },
      {
        size: 'Medium',
        price: 18.99,
        height: '10-12 inches',
      },
    ],
    tags: ['Medicinal', 'Drought Tolerant', 'Succulent'],
  },
  {
    id: 5,
    name: 'Monstera',
    scientific_name: 'Monstera deliciosa',
    description:
      'A striking plant with large, split leaves, Monstera adds a tropical vibe to any space.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 1-2 weeks; allow soil to dry out slightly between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 24.99,
        height: '14-20 inches',
      },
      {
        size: 'Large',
        price: 45.99,
        height: '30-36 inches',
      },
    ],
    tags: ['Tropical', 'Fast Growing', 'Statement Plant'],
  },
  {
    id: 6,
    name: 'Fiddle Leaf Fig',
    scientific_name: 'Ficus lyrata',
    description:
      'The Fiddle Leaf Fig is famous for its large, glossy leaves and can become the centerpiece of any room.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil evenly moist.',
    care_level: 'Challenging',
    sizes: [
      {
        size: 'Medium',
        price: 34.99,
        height: '18-24 inches',
      },
      {
        size: 'Large',
        price: 64.99,
        height: '36-48 inches',
      },
    ],
    tags: ['Statement Plant', 'Tropical', 'Decorative'],
  },
  {
    id: 7,
    name: 'Pothos',
    scientific_name: 'Epipremnum aureum',
    description:
      'An easy-care plant with trailing vines, Pothos is perfect for beginners and can thrive in various conditions.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water every 1-2 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '6-8 inches',
      },
      {
        size: 'Hanging Basket',
        price: 16.99,
        height: '10-12 inches',
      },
    ],
    tags: ['Air Purifying', 'Fast Growing', 'Low Maintenance'],
  },
  {
    id: 8,
    name: 'ZZ Plant',
    scientific_name: 'Zamioculcas zamiifolia',
    description:
      'A nearly indestructible plant with glossy leaves, the ZZ Plant is ideal for low-light areas.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out completely between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 19.99,
        height: '8-12 inches',
      },
      {
        size: 'Medium',
        price: 29.99,
        height: '16-20 inches',
      },
    ],
    tags: ['Low Maintenance', 'Drought Tolerant', 'Air Purifying'],
  },
  {
    id: 9,
    name: 'Philodendron',
    scientific_name: 'Philodendron hederaceum',
    description:
      'A versatile plant that can be grown as a climber or a trailing plant. It’s easy to care for and great for any room.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water every 1-2 weeks; allow soil to dry out slightly between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 16.99,
        height: '8-12 inches',
      },
      {
        size: 'Hanging Basket',
        price: 22.99,
        height: '12-16 inches',
      },
    ],
    tags: ['Air Purifying', 'Fast Growing', 'Low Maintenance'],
  },
  {
    id: 10,
    name: 'Boston Fern',
    scientific_name: 'Nephrolepis exaltata',
    description:
      'A classic fern with feathery, arching fronds, the Boston Fern is perfect for adding a touch of greenery indoors.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil consistently moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 13.99,
        height: '12-18 inches',
      },
      {
        size: 'Hanging Basket',
        price: 19.99,
        height: '18-24 inches',
      },
    ],
    tags: ['Air Purifying', 'Pet Friendly', 'Classic'],
  },
  {
    id: 11,
    name: 'Rubber Plant',
    scientific_name: 'Ficus elastica',
    description:
      'A striking plant with thick, glossy leaves, the Rubber Plant can grow into a tall, impressive indoor tree.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 22.99,
        height: '16-20 inches',
      },
      {
        size: 'Large',
        price: 49.99,
        height: '30-36 inches',
      },
    ],
    tags: ['Air Purifying', 'Decorative', 'Tropical'],
  },
  {
    id: 12,
    name: 'Jade Plant',
    scientific_name: 'Crassula ovata',
    description:
      'A popular succulent with fleshy, oval-shaped leaves, the Jade Plant is believed to bring good luck and prosperity.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out completely between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 14.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 24.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Succulent', 'Drought Tolerant', 'Easy Care'],
  },
  {
    id: 13,
    name: 'Calathea',
    scientific_name: 'Calathea orbifolia',
    description:
      'A stunning plant with large, striped leaves, Calathea is perfect for low-light areas.',
    light_requirements: ['Low indirect light', 'Medium indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil evenly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 18.99,
        height: '10-12 inches',
      },
      {
        size: 'Medium',
        price: 28.99,
        height: '14-18 inches',
      },
    ],
    tags: ['Pet Friendly', 'Shade Tolerant', 'Decorative'],
  },
  {
    id: 14,
    name: 'Chinese Money Plant',
    scientific_name: 'Pilea peperomioides',
    description:
      'A unique plant with pancake-shaped leaves, the Chinese Money Plant is said to bring prosperity and abundance.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water weekly; allow soil to dry out slightly between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 12.99,
        height: '6-8 inches',
      },
      {
        size: 'Medium',
        price: 19.99,
        height: '10-14 inches',
      },
    ],
    tags: ['Easy Care', 'Decorative', 'Pet Friendly'],
  },
  {
    id: 15,
    name: 'Croton',
    scientific_name: 'Codiaeum variegatum',
    description:
      'Known for its vibrant, multicolored leaves, Croton adds a bold splash of color to any space.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 14.99,
        height: '8-12 inches',
      },
      {
        size: 'Medium',
        price: 24.99,
        height: '14-20 inches',
      },
    ],
    tags: ['Colorful', 'Tropical', 'Decorative'],
  },
  {
    id: 16,
    name: 'Bird of Paradise',
    scientific_name: 'Strelitzia reginae',
    description:
      'A majestic plant with large leaves and bright, bird-like flowers, the Bird of Paradise makes a dramatic statement.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Challenging',
    sizes: [
      {
        size: 'Medium',
        price: 29.99,
        height: '18-24 inches',
      },
      {
        size: 'Large',
        price: 59.99,
        height: '36-48 inches',
      },
    ],
    tags: ['Tropical', 'Flowering', 'Statement Plant'],
  },
  {
    id: 17,
    name: 'Dracaena',
    scientific_name: 'Dracaena marginata',
    description:
      'A versatile and easy-care plant with narrow, arching leaves. It can grow tall and is great for corners.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 17.99,
        height: '12-16 inches',
      },
      {
        size: 'Medium',
        price: 29.99,
        height: '18-24 inches',
      },
      {
        size: 'Large',
        price: 49.99,
        height: '30-36 inches',
      },
    ],
    tags: ['Low Maintenance', 'Tropical', 'Air Purifying'],
  },
  {
    id: 18,
    name: 'Majesty Palm',
    scientific_name: 'Ravenea rivularis',
    description:
      'A graceful palm with feathery fronds, Majesty Palm is ideal for adding a tropical touch to your home.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 24.99,
        height: '20-24 inches',
      },
      {
        size: 'Large',
        price: 44.99,
        height: '36-48 inches',
      },
    ],
    tags: ['Tropical', 'Decorative', 'Statement Plant'],
  },
  {
    id: 19,
    name: 'Cactus',
    scientific_name: 'Cactaceae',
    description:
      'A resilient plant that comes in various shapes and sizes, Cacti are perfect for sunny spots and low-maintenance care.',
    light_requirements: ['Bright direct light'],
    water_requirements:
      'Water every 3-4 weeks; allow soil to dry out completely between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 14.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Drought Tolerant', 'Low Maintenance', 'Succulent'],
  },
  {
    id: 20,
    name: 'Air Plant',
    scientific_name: 'Tillandsia',
    description:
      'An epiphytic plant that doesn’t require soil, Air Plants are great for creative displays and easy to care for.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Mist weekly; soak in water for 2-3 hours every 2 weeks.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 6.99,
        height: '2-4 inches',
      },
      {
        size: 'Medium',
        price: 11.99,
        height: '4-6 inches',
      },
    ],
    tags: ['No Soil', 'Low Maintenance', 'Decorative'],
  },
  {
    id: 21,
    name: 'Dumb Cane',
    scientific_name: 'Dieffenbachia seguine',
    description:
      'A lush, tropical plant with large, variegated leaves. Dumb Cane adds a touch of the exotic to any room.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Medium',
        price: 11.99,
        height: '12-18 inches',
      },
      {
        size: 'Large',
        price: 24.99,
        height: '20-24 inches',
      },
    ],
    tags: ['Tropical', 'Decorative', 'Air Purifying'],
  },
  {
    id: 22,
    name: 'African Violet',
    scientific_name: 'Saintpaulia',
    description:
      'A beloved indoor plant with soft, velvety leaves and beautiful flowers. African Violets bloom year-round under the right conditions.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water weekly; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '6-8 inches',
      },
    ],
    tags: ['Flowering', 'Pet Friendly', 'Classic'],
  },
  {
    id: 23,
    name: 'Aglaonema',
    scientific_name: 'Aglaonema commutatum',
    description:
      'A hardy, tropical plant with striking variegated leaves. Aglaonema is great for low-light conditions.',
    light_requirements: ['Low light', 'Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 12.99,
        height: '8-12 inches',
      },
      {
        size: 'Medium',
        price: 19.99,
        height: '14-18 inches',
      },
    ],
    tags: ['Low Maintenance', 'Tropical', 'Air Purifying'],
  },
  {
    id: 24,
    name: 'Echeveria',
    scientific_name: 'Echeveria elegans',
    description:
      'A rosette-forming succulent with fleshy, spoon-shaped leaves that come in various colors.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 6.99,
        height: '3-5 inches',
      },
      {
        size: 'Medium',
        price: 11.99,
        height: '6-8 inches',
      },
    ],
    tags: ['Drought Tolerant', 'Colorful', 'Low Maintenance'],
  },
  {
    id: 25,
    name: 'Haworthia',
    scientific_name: 'Haworthia fasciata',
    description:
      'A small succulent with fleshy, dark green leaves that are banded with white, zebra-like stripes.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 5.99,
        height: '2-4 inches',
      },
      {
        size: 'Medium',
        price: 10.99,
        height: '5-7 inches',
      },
    ],
    tags: ['Pet Friendly', 'Low Maintenance', 'Drought Tolerant'],
  },
  {
    id: 26,
    name: 'Panda Plant',
    scientific_name: 'Kalanchoe tomentosa',
    description:
      'A unique succulent with fuzzy, silvery-green leaves edged with brown.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '8-10 inches',
      },
    ],
    tags: ['Unique Texture', 'Low Maintenance', 'Drought Tolerant'],
  },
  {
    id: 27,
    name: 'Sedum',
    scientific_name: 'Sedum morganianum',
    description:
      'A trailing succulent with long, hanging stems covered in small, fleshy leaves.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '6-8 inches',
      },
      {
        size: 'Medium',
        price: 14.99,
        height: '10-12 inches',
      },
    ],
    tags: ['Trailing', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    id: 28,
    name: 'String of Pearls',
    scientific_name: 'Senecio rowleyanus',
    description:
      'A trailing succulent with spherical, bead-like leaves that resemble a string of pearls.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 9.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 15.99,
        height: '8-10 inches',
      },
    ],
    tags: ['Trailing', 'Unique Form', 'Low Maintenance'],
  },
  {
    id: 29,
    name: 'Zebra Plant',
    scientific_name: 'Haworthiopsis attenuata',
    description:
      'A small succulent with thick, dark green leaves adorned with white horizontal stripes.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 5.99,
        height: '3-5 inches',
      },
      {
        size: 'Medium',
        price: 9.99,
        height: '6-8 inches',
      },
    ],
    tags: ['Pet Friendly', 'Low Maintenance', 'Drought Tolerant'],
  },
  {
    id: 30,
    name: 'Christmas Cactus',
    scientific_name: 'Schlumbergera bridgessii',
    description:
      'A popular holiday plant with segmented, flat stems and bright, tubular flowers.',
    light_requirements: ['Bright indirect light'],
    water_requirements: 'Water every 1-2 weeks; keep soil slightly moist.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '6-8 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '10-14 inches',
      },
    ],
    tags: ['Flowering', 'Pet Friendly', 'Holiday Plant'],
  },
  {
    id: 31,
    name: 'Burro’s Tail',
    scientific_name: 'Sedum burrito',
    description:
      'A trailing succulent with fleshy, plump leaves that form long, cascading stems.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Trailing', 'Unique Form', 'Drought Tolerant'],
  },
  {
    id: 32,
    name: 'Ghost Plant',
    scientific_name: 'Graptopetalum paraguayense',
    description:
      'A rosette-forming succulent with pale gray to pinkish leaves that form a lovely trailing plant.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 6.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 11.99,
        height: '7-10 inches',
      },
    ],
    tags: ['Trailing', 'Drought Tolerant', 'Colorful'],
  },
  {
    id: 33,
    name: 'String of Hearts',
    scientific_name: 'Ceropegia woodii',
    description:
      'A trailing plant with delicate heart-shaped leaves on thin, string-like stems.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 1-2 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 9.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 14.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Trailing', 'Unique Form', 'Low Maintenance'],
  },
  {
    id: 34,
    name: 'Tiger Jaws',
    scientific_name: 'Faucaria tigrina',
    description:
      'A small succulent with triangular leaves edged with soft spines resembling tiger jaws.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '2-4 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '5-7 inches',
      },
    ],
    tags: ['Unique Form', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    id: 35,
    name: 'Bear’s Paw',
    scientific_name: 'Cotyledon tomentosa',
    description:
      'A small, bushy succulent with fuzzy, bear paw-shaped leaves tipped with reddish teeth.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '3-5 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '6-8 inches',
      },
    ],
    tags: ['Unique Form', 'Drought Tolerant', 'Pet Friendly'],
  },
  {
    id: 36,
    name: 'Lithops',
    scientific_name: 'Lithops spp.',
    description:
      'A unique succulent that resembles small stones or pebbles to avoid predation.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water sparingly; allow soil to dry out completely between waterings.',
    care_level: 'Difficult',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '1-2 inches',
      },
      {
        size: 'Medium',
        price: 11.99,
        height: '2-3 inches',
      },
    ],
    tags: ['Unique Form', 'Low Maintenance', 'Drought Tolerant'],
  },
  {
    id: 37,
    name: 'Elephant Bush',
    scientific_name: 'Portulacaria afra',
    description:
      'A bushy succulent with small, round, fleshy leaves on red stems, resembling a miniature tree.',
    light_requirements: ['Bright indirect light', 'Full sun'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 6.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Pet Friendly', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    id: 38,
    name: 'Blue Chalk Sticks',
    scientific_name: 'Senecio serpens',
    description:
      'A spreading succulent with powdery blue, finger-like leaves that stand upright.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '6-10 inches',
      },
    ],
    tags: ['Drought Tolerant', 'Colorful', 'Low Maintenance'],
  },
  {
    id: 39,
    name: 'Crown of Thorns',
    scientific_name: 'Euphorbia milii',
    description:
      'A thorny succulent with bright green leaves and small clusters of flowers.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 1-2 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 9.99,
        height: '6-8 inches',
      },
      {
        size: 'Medium',
        price: 14.99,
        height: '10-12 inches',
      },
    ],
    tags: ['Flowering', 'Unique Form', 'Drought Tolerant'],
  },
  {
    id: 40,
    name: 'Calico Kitten',
    scientific_name: 'Crassula pellucida variegata',
    description:
      'A trailing succulent with heart-shaped leaves variegated in pink, cream, and green.',
    light_requirements: ['Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '6-10 inches',
      },
    ],
    tags: ['Trailing', 'Colorful', 'Low Maintenance'],
  },
  {
    id: 41,
    name: 'Ogre Ears',
    scientific_name: "Crassula ovata 'Gollum'",
    description:
      'A peculiar succulent with tubular, finger-like leaves that resemble ogre ears.',
    light_requirements: ['Bright indirect light', 'Full sun'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '3-5 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '5-8 inches',
      },
    ],
    tags: ['Unique Form', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    id: 42,
    name: 'Pig’s Ear',
    scientific_name: 'Cotyledon orbiculata',
    description:
      'A succulent with thick, rounded leaves that often have reddish edges, resembling pig’s ears.',
    light_requirements: ['Full sun', 'Bright indirect light'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '8-10 inches',
      },
    ],
    tags: ['Unique Form', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    id: 43,
    name: 'Fairy Castle Cactus',
    scientific_name: 'Acanthocereus tetragonus',
    description:
      'A columnar cactus with multiple branches that resemble the turrets of a castle.',
    light_requirements: ['Full sun'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Moderate',
    sizes: [
      {
        size: 'Small',
        price: 8.99,
        height: '4-6 inches',
      },
      {
        size: 'Medium',
        price: 13.99,
        height: '8-12 inches',
      },
    ],
    tags: ['Drought Tolerant', 'Unique Form', 'Low Maintenance'],
  },
  {
    id: 44,
    name: 'Moonstone',
    scientific_name: 'Pachyphytum oviferum',
    description:
      'A plump succulent with rounded, fleshy leaves that have a powdery blue-gray coating.',
    light_requirements: ['Bright indirect light', 'Full sun'],
    water_requirements:
      'Water every 2-3 weeks; allow soil to dry out between waterings.',
    care_level: 'Easy',
    sizes: [
      {
        size: 'Small',
        price: 7.99,
        height: '3-5 inches',
      },
      {
        size: 'Medium',
        price: 12.99,
        height: '5-8 inches',
      },
    ],
    tags: ['Drought Tolerant', 'Colorful', 'Low Maintenance'],
  },
];
