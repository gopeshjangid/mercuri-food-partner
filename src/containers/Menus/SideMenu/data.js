export const sideCategories = [
  {
    name: 'Salad Sides',
    label: 'Label Salad',
    id: 1,
    items: [{
      name: 'Caesar Salad',
      additionalPrice: '2.99',
      itemCalories: '430',
      included: false,
      default: true
    }, {
      name: 'Steak Fries',
      additionalPrice: '',
      itemCalories: 350,
      included: true,
      default: false
    }]
  },
  {
    name: 'Hot Dog Sides',
    id: 2,
    label: 'Label Hot Dog',
    items: [{
      name: 'Caesar Salad 2',
      additionalPrice: '2.99',
      itemCalories: '430',
      included: false,
      default: true
    }, {
      name: 'Steak Fries 2',
      additionalPrice: '',
      itemCalories: 350,
      included: true,
      default: true
    }]
  },
  {
    name: 'Coffe',
    label: 'Label Coffe',
    id: 3,
    items: []
  }
]