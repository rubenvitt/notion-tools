import vue from '@vitejs/plugin-vue'
import vercel from 'vite-plugin-vercel'
import {UserConfig} from 'vite'
import {ssr} from "vike/dist/esm/node/plugin";
import {vitePluginSsrVercelPlugin} from "@vite-plugin-vercel/vike";

const config: UserConfig = {
    plugins: [vue(), ssr(), vercel(), vitePluginSsrVercelPlugin()],
}

export default config
