import { createSlice } from '@reduxjs/toolkit';

// Define initial state
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Adds a plant item to the cart. If the plant already exists, increase the quantity.
    addItem: (state, action) => {
      const plant = action.payload;

      // Check if the plant is already in the cart
      const existingPlant = state.items.find(item => item.name === plant.name);

      if (existingPlant) {
        // If plant exists, update the quantity
        existingPlant.quantity += 1;
      } else {
        // If plant does not exist, add it to the cart with quantity = 1
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    
    // Removes a plant item from the cart based on its name
    removeItem: (state, action) => {
      const plantName = action.payload;

      // Filter out the plant item with the given name
      state.items = state.items.filter(item => item.name !== plantName);
    },
    
    // Updates the quantity of a specific plant in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      // Find the item in the cart
      const plant = state.items.find(item => item.name === name);

      if (plant) {
        // Update the quantity of the plant
        plant.quantity = quantity;
      }
    },
  },
});

// Export action creators for use in other components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer to be used in the store
export default CartSlice.reducer;
