import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import themeReducer from './themeSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// RTK Queryu306eu30eau30b9u30cau30fcu3092u8a2du5b9a
setupListeners(store.dispatch)

// Reduxu306eu578bu5b9au7fa9
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
