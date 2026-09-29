export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  isLive: boolean;
}

export interface YouTubeResponse {
  videos: YouTubeVideo[];
  isLiveNow: boolean;
  liveVideoUrl?: string;
  source: "api" | "rss" | "fallback";
}

const DEFAULT_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "UC-ibberesende-placeholder";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Fallback estático caso tanto a API quanto o RSS falhem.
 */
export const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "fallback-1",
    title: "Culto de Celebração e Adoração — Ao Vivo",
    description: "Assista à nossa última transmissão ao vivo na Igreja Batista Bethel em Resende.",
    publishedAt: new Date().toISOString(),
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://youtube.com/@ibberesende",
    isLive: false,
  },
  {
    id: "fallback-2",
    title: "Escola Bíblica Dominical — Crescendo na Palavra",
    description: "Estudo bíblico e comunhão para todas as idades.",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    thumbnailUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://youtube.com/@ibberesende",
    isLive: false,
  },
  {
    id: "fallback-3",
    title: "Culto de Oração e Esperança",
    description: "Momentos de oração pelos lares, enfermos e pedidos da igreja.",
    publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://youtube.com/@ibberesende",
    isLive: false,
  },
  {
    id: "fallback-4",
    title: "Mensagem Pastoral — Uma Igreja Feita de Pessoas",
    description: "Acompanhe a reflexão da Palavra de Deus compartilhada no último domingo.",
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://youtube.com/@ibberesende",
    isLive: false,
  },
];

/**
 * Busca vídeos via YouTube Data API v3.
 * Usa ISR com revalidação de 1800 segundos (30 minutos).
 */
async function fetchFromYouTubeApi(channelId: string, apiKey: string): Promise<YouTubeVideo[] | null> {
  try {
    // 1. Obter a playlist de uploads do canal (ou ID de uploads comum UU...)
    // Se o canal id começar com UC, o uploads id é UU + id sem UC
    const uploadsPlaylistId = channelId.startsWith("UC") ? "UU" + channelId.substring(2) : null;

    if (!uploadsPlaylistId) {
      return null;
    }

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${uploadsPlaylistId}&key=${apiKey}`;
    const res = await fetch(playlistUrl, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.warn(`[YouTube API] playlistItems failed with status ${res.status}`);
      return null;
    }

    const playlistData = await res.json();
    const items = playlistData.items || [];
    const videoIds: string[] = items
      .map((item: any) => item.contentDetails?.videoId)
      .filter(Boolean);

    if (videoIds.length === 0) {
      return null;
    }

    // 2. Buscar detalhes dos vídeos (para checar liveStreamingDetails e status de ao vivo)
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds.join(",")}&key=${apiKey}`;
    const videosRes = await fetch(videosUrl, {
      next: { revalidate: 1800 },
    });

    if (!videosRes.ok) {
      console.warn(`[YouTube API] videos.list failed with status ${videosRes.status}`);
      return null;
    }

    const videosData = await videosRes.json();
    const rawVideos = videosData.items || [];

    const parsedVideos: YouTubeVideo[] = rawVideos.slice(0, 4).map((v: any) => {
      const isLive =
        v.snippet?.liveBroadcastContent === "live" ||
        (v.liveStreamingDetails?.actualStartTime && !v.liveStreamingDetails?.actualEndTime);

      const id = v.id;
      return {
        id,
        title: v.snippet?.title || "Transmissão IBBE",
        description: v.snippet?.description || "",
        publishedAt: v.snippet?.publishedAt || new Date().toISOString(),
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${id}`,
        isLive: Boolean(isLive),
      };
    });

    return parsedVideos.length > 0 ? parsedVideos : null;
  } catch (error) {
    console.warn("[YouTube API] Exception during fetch:", error);
    return null;
  }
}

/**
 * Fallback via RSS Feed público do YouTube.
 * Parsing sem dependência externa, usando regex simples para XML.
 */
async function fetchFromRssFeed(channelId: string): Promise<YouTubeVideo[] | null> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(rssUrl, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.warn(`[YouTube RSS] Feed request failed with status ${res.status}`);
      return null;
    }

    const xml = await res.text();
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries: string[] = [];
    let match;
    while ((match = entryRegex.exec(xml)) !== null && entries.length < 4) {
      entries.push(match[1]);
    }

    if (entries.length === 0) {
      return null;
    }

    const videos: YouTubeVideo[] = entries.map((entry) => {
      const videoIdMatch = /<yt:videoId>(.*?)<\/yt:videoId>/.exec(entry);
      const titleMatch = /<title>(.*?)<\/title>/.exec(entry);
      const publishedMatch = /<published>(.*?)<\/published>/.exec(entry);

      const id = videoIdMatch ? videoIdMatch[1].trim() : "video";
      const title = titleMatch ? titleMatch[1].replace("<![CDATA[", "").replace("]]>", "").trim() : "Transmissão IBBE";
      const publishedAt = publishedMatch ? publishedMatch[1].trim() : new Date().toISOString();

      return {
        id,
        title,
        description: "Assista à mensagem e culto gravado em nosso canal oficial.",
        publishedAt,
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${id}`,
        isLive: false,
      };
    });

    return videos;
  } catch (error) {
    console.warn("[YouTube RSS] Exception parsing RSS feed:", error);
    return null;
  }
}

/**
 * Função principal consumida pela aplicação:
 * Retorna as lives mais recentes com cascata de fallback:
 * 1. YouTube Data API v3 (se chave configurada)
 * 2. RSS público do Canal
 * 3. Fallback estático estruturado (o site nunca quebra)
 */
export async function getLatestLives(): Promise<YouTubeResponse> {
  const channelId = DEFAULT_CHANNEL_ID;

  // 1. Tentar API v3 se a chave estiver presente e o channelId for real
  if (YOUTUBE_API_KEY && channelId && !channelId.includes("placeholder")) {
    const apiVideos = await fetchFromYouTubeApi(channelId, YOUTUBE_API_KEY);
    if (apiVideos && apiVideos.length > 0) {
      const liveVideo = apiVideos.find((v) => v.isLive);
      return {
        videos: apiVideos,
        isLiveNow: Boolean(liveVideo),
        liveVideoUrl: liveVideo?.videoUrl,
        source: "api",
      };
    }
  }

  // 2. Tentar RSS Público
  if (channelId && !channelId.includes("placeholder")) {
    const rssVideos = await fetchFromRssFeed(channelId);
    if (rssVideos && rssVideos.length > 0) {
      return {
        videos: rssVideos,
        isLiveNow: false,
        source: "rss",
      };
    }
  }

  // 3. Fallback Seguro
  return {
    videos: FALLBACK_VIDEOS,
    isLiveNow: false,
    source: "fallback",
  };
}
