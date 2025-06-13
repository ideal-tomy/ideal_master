import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'dark' | 'light'

interface ThemeState {
  mode: ThemeMode
  isSpaceAnimationEnabled: boolean
  particleDensity: 'low' | 'medium' | 'high'
}

const initialState: ThemeState = {
  mode: 'dark', // デフォルトは宇宙的なダークテーマ
  isSpaceAnimationEnabled: true, // 宇宙アニメーションはデフォルトで有効
  particleDensity: 'medium', // パーティクル密度のデフォルト値
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
    toggleSpaceAnimation: (state) => {
      state.isSpaceAnimationEnabled = !state.isSpaceAnimationEnabled
    },
    setParticleDensity: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
      state.particleDensity = action.payload
    },
  },
})

export const { toggleThemeMode, setThemeMode, toggleSpaceAnimation, setParticleDensity } = themeSlice.actions

export default themeSlice.reducer
