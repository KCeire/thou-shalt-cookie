// @ts-nocheck

function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  // Parse arrays from environment variables
  const screenshotUrls = process.env.NEXT_PUBLIC_APP_SCREENSHOT_URLS 
    ? process.env.NEXT_PUBLIC_APP_SCREENSHOT_URLS.split(',').map(url => url.trim())
    : [];
  
  const tags = process.env.NEXT_PUBLIC_APP_TAGS 
    ? process.env.NEXT_PUBLIC_APP_TAGS.split(',').map(tag => tag.trim())
    : [];

  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_APP_NAME,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON,
      imageUrl: process.env.NEXT_PUBLIC_APP_IMAGE_URL,
      buttonTitle: process.env.NEXT_PUBLIC_APP_BUTTON_TITLE,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      screenshotUrls,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags,
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
      castShareUrl: process.env.NEXT_PUBLIC_APP_CAST_SHARE_URL,
    }),
  });
} 