import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import vercel from 'vite-plugin-vercel'
import vercelSsr from '@magne4000/vite-plugin-vercel-ssr'
import {UserConfig} from 'vite'

const config: UserConfig = {
  plugins: [vue(), ssr(), vercel(), vercelSsr()],
}

export default config
