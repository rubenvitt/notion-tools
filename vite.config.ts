import vue from '@vitejs/plugin-vue'
import vercel from 'vite-plugin-vercel'
import {UserConfig} from 'vite'
import ssr from 'vike/plugin'
import {vitePluginSsrVercelPlugin} from "@vite-plugin-vercel/vike";

const config: UserConfig = {
    plugins: [vue(), ssr({
        prerender: {
            partial: true
        }
    }), vercel(), vitePluginSsrVercelPlugin()],
}

export default config
