'use client'

import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

interface YouTubePlayerProps {
  youtubeId: string
  title: string
  customThumbnailUrl?: string | null
  isFeatured?: boolean
}

export default function YouTubePlayer({
  youtubeId,
  title,
  customThumbnailUrl,
  isFeatured = false,
}: YouTubePlayerProps) {
  return (
    <div className={`aspect-video w-full overflow-hidden${isFeatured ? ' rounded-xl' : ''}`}>
      <LiteYouTubeEmbed
        id={youtubeId}
        title={title}
        noCookie
        poster="hqdefault"
        thumbnail={customThumbnailUrl ?? undefined}
      />
    </div>
  )
}
