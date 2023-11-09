import vue from '@vitejs/plugin-vue'
import ssr from 'vike/plugin'
import vercel from 'vite-plugin-vercel'
import {UserConfig} from 'vite'

const config: UserConfig = {
  plugins: [vue(), ssr(), vercel()],
}

export default config
