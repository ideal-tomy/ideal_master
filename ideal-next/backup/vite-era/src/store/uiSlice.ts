import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isNavOpen: boolean
  isLoading: boolean
  activeSection: string
  scrollProgress: number
}

const initialState: UIState = {
  isNavOpen: false,
  isLoading: false,
  activeSection: 'home',
  scrollProgress: 0,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen
    },
    setNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload
    },
  },
})

export const { toggleNav, setNavOpen, setLoading, setActiveSection, setScrollProgress } = uiSlice.actions

export default uiSlice.reducer
