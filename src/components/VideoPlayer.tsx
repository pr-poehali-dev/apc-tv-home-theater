import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import type Player from 'video.js/dist/types/player';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ src, poster, title, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        children: [
          'playToggle',
          'volumePanel',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'progressControl',
          'remainingTimeDisplay',
          'playbackRateMenuButton',
          'chaptersButton',
          'subtitlesButton',
          'captionsButton',
          'qualitySelector',
          'pictureInPictureToggle',
          'fullscreenToggle',
        ],
      },
      html5: {
        vhs: {
          overrideNative: true,
        },
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
      },
    });

    player.src({
      src: src,
      type: 'application/x-mpegURL',
    });

    if (poster) {
      player.poster(poster);
    }

    player.on('fullscreenchange', () => {
      setIsFullscreen(player.isFullscreen());
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gold">{title}</h2>
              <p className="text-sm text-muted-foreground">Премиум качество • Все кодеки поддерживаются</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-7xl">
            <div data-vjs-player>
              <video
                ref={videoRef}
                className="video-js vjs-big-play-centered vjs-theme-fantasy"
                playsInline
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Info" size={16} />
                <span>Источники: ZONA, Viewbox, Lampa</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} className="text-gold" />
                <span>4K Ultra HD • HDR10 • Dolby Atmos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vjs-theme-fantasy {
          --vjs-theme-fantasy--primary: #D4AF37;
          --vjs-theme-fantasy--secondary: #8B0000;
        }
        
        .vjs-theme-fantasy .vjs-control-bar {
          background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6));
          backdrop-filter: blur(10px);
        }
        
        .vjs-theme-fantasy .vjs-big-play-button {
          background-color: rgba(212, 175, 55, 0.9);
          border: none;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          line-height: 100px;
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
          transition: all 0.3s ease;
        }
        
        .vjs-theme-fantasy .vjs-big-play-button:hover {
          background-color: rgba(212, 175, 55, 1);
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.7);
        }
        
        .vjs-theme-fantasy .vjs-big-play-button .vjs-icon-placeholder:before {
          color: #000;
          font-size: 48px;
        }
        
        .vjs-theme-fantasy .vjs-play-progress {
          background-color: var(--vjs-theme-fantasy--primary);
        }
        
        .vjs-theme-fantasy .vjs-volume-level {
          background-color: var(--vjs-theme-fantasy--primary);
        }
        
        .vjs-theme-fantasy .vjs-slider {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .vjs-theme-fantasy .vjs-control:hover {
          color: var(--vjs-theme-fantasy--primary);
        }
        
        .vjs-theme-fantasy .vjs-progress-holder .vjs-play-progress:before {
          color: var(--vjs-theme-fantasy--primary);
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
        
        .vjs-theme-fantasy .vjs-loading-spinner {
          border-color: var(--vjs-theme-fantasy--primary);
        }
        
        .vjs-theme-fantasy .vjs-menu li.vjs-selected {
          background-color: var(--vjs-theme-fantasy--primary);
          color: #000;
        }
      `}</style>
    </div>
  );
}
