/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  someSidebar: {
    stook: [
      'stook/intro',
      'stook/quick-start',
      'stook/share-state',
      'stook/custom-hooks',
      'stook/use-store',
      'stook/mutate',
      'stook/get-state',
      'stook/typescript',
      'stook/test',
      'stook/faq',
    ],

    'stook-devtools': ['devtools/intro'],

    'stook-rest': [
      'rest/intro',
      'rest/quick-start',
      'rest/config',
      'rest/useFetch',
      'rest/useUpdate',
      'rest/dependent',
      'rest/share-state',
      'rest/custom-hooks',
      'rest/fetch',
      'rest/refetch',
      'rest/middleware',
    ],
    'stook-graphql': [
      'graphql/intro',
      'graphql/quick-start',
      'graphql/config',
      'graphql/useQuery',
      'graphql/useMutation',
      'graphql/query',
      'graphql/middleware',
    ],
  },
}
