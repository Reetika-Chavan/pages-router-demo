import * as contentstack from 'contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

export const Stack = contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  live_preview: {
    enable: true,
    management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN!,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST!, // e.g. dev11-rest-preview.csnonprod.com
  },
})

// ✅ Set host for dev11 CDN separately
Stack.setHost(process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST!) // e.g. dev11-cdn.csnonprod.com

ContentstackLivePreview.init({
  enable: true,
  stackSdk: Stack,
  ssr: true,
  clientUrlParams: {
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST!, // dev11-cdn.csnonprod.com or your Launch site
  },
})
