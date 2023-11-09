export type {PageContextServer}
export type {PageContextClient}
export type {PageContext}
export type {PageProps}

import type {PageContextBuiltInServer, PageContextBuiltInClientWithServerRouting} from 'vike/types'
// import type { PageContextBuiltInClient } from 'vike/client/router' // When using Client Routing
import type {ComponentPublicInstance} from 'vue'

type Page = ComponentPublicInstance // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type PageProps = {}

export type PageContextCustom = {
    Page: Page
    pageProps?: PageProps
    urlPathname: string
    query: Record<string, string>
    exports: {
        documentProps?: {
            title?: string
            description?: string
        }
    }
}

type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClientWithServerRouting<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer
