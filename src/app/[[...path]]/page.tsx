import { CmsPage, getServerClient } from '@remkoj/optimizely-cms-nextjs'
import createFactory from '@/components'
import { getContentByPath } from '@/gql'

const { CmsPage:OptimizelyPage, generateMetadata, generateStaticParams } = CmsPage.createPage(createFactory(), {
    //@ts-expect-error We have the actual types on this query, not on the generic one
    getContentByPath,
    client: () => {
        const client = getServerClient()
        client.updateFlags({
            queryCache: false // We're depending on @recursive & cursors, which don't work with the queryCache
        })
        return client
    }
})

export const fetchCache = "force-no-store";
export const revalidate = 0;
export { generateStaticParams, generateMetadata };
export default OptimizelyPage;