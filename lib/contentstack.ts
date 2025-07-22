import * as contentstack from 'contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

export const Stack = contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  live_preview: {
    enable: true,
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN!,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST!, 
  },
  fetchOptions: {
    debug: true,
    logHandler: (level, message) => {
      console.log(`[Contentstack SDK][${level}]`, message);
    },
    timeout: 30000 // Set a custom timeout if needed
  }
})

// host for dev11 CDN 
Stack.setHost(process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST!) 

ContentstackLivePreview.init({
  enable: true,
  stackSdk: Stack,
  ssr: true,
  clientUrlParams: {
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST!, 
  },
})
