export const fetchQuoteData = async () => {
  // Simulate a mock API call
  return {
    header: {
      quoteName: '',
      billContact: '',
      shipContact: '',
      shippingMethod: '',
      customerPO: '',
      expirationDate: new Date().toISOString().slice(0, 10)
    },
    items:  [
    { "id": 1, "name": "Item 1", "description": "Description 1" },
    { "id": 2, "name": "Item 2", "description": "Description 2" }
    ]
  };
};
