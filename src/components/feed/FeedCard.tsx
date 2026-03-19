'use client';

import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { FeedPost } from '@/types';

interface FeedCardProps {
  post: FeedPost;
  userName: string;
  userAvatar: string;
  verified?: boolean;
}

export default function FeedCard({
  post,
  userName,
  userAvatar,
  verified = false,
}: FeedCardProps) {
  const { t, language } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const bgImage =
    post.media.length > 0
      ? post.media[0].url
      : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';

  const isSpace = post.type === 'space';
  const caption = language === 'th' ? post.captionTh : post.caption;

  return (
    <div className="relative h-screen w-full snap-start snap-always flex-shrink-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Top: User info */}
      <div className="absolute top-14 left-4 z-10 flex items-center gap-3">
        <div className="h-11 w-11 rounded-full border-2 border-white overflow-hidden">
          <img
            src={userAvatar}
            alt={userName}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold text-sm">{userName}</span>
            {verified && <BadgeCheck className="h-4 w-4 text-blue-400" />}
          </div>
          <span
            className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${
              isSpace
                ? 'bg-blue-500/90 text-white'
                : 'bg-orange-500/90 text-white'
            }`}
          >
            {isSpace
              ? language === 'th'
                ? 'พื้นที่ว่าง'
                : 'Space Available'
              : language === 'th'
                ? 'มองหาพื้นที่'
                : 'Looking for Space'}
          </span>
        </div>
      </div>

      {/* Right side floating buttons */}
      <div className="absolute right-3 bottom-56 z-10 flex flex-col items-center gap-5">
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <div
            className={`rounded-full p-2.5 backdrop-blur-sm ${
              liked ? 'bg-red-500/80' : 'bg-white/20'
            }`}
          >
            <Heart
              className={`h-6 w-6 ${liked ? 'text-white fill-white' : 'text-white'}`}
            />
          </div>
          <span className="text-white text-xs font-medium">{likeCount}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="rounded-full p-2.5 bg-white/20 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">
            {post.comments.length}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="rounded-full p-2.5 bg-white/20 backdrop-blur-sm">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{post.shares}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="rounded-full p-2.5 bg-white/20 backdrop-blur-sm">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-[10px] font-medium">
            {language === 'th' ? 'แผนที่' : 'Map'}
          </span>
        </button>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-24">
        {/* Caption */}
        <p className="text-white text-sm leading-relaxed mb-3 max-w-[80%]">
          {caption}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Smart Info Overlay */}
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 mb-3">
          {isSpace ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                  {t('property.price')}
                </div>
                <div className="text-white font-bold text-lg">
                  {formatPrice(post.matchScore ? post.matchScore * 500 : 35000)}
                  <span className="text-white/70 text-xs font-normal">
                    /{language === 'th' ? 'เดือน' : 'mo'}
                  </span>
                </div>
              </div>
              <div className="text-center px-4 border-l border-white/20">
                <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                  {t('property.size')}
                </div>
                <div className="text-white font-bold">
                  45{' '}
                  <span className="text-white/70 text-xs font-normal">
                    {language === 'th' ? 'ตร.ม.' : 'sqm'}
                  </span>
                </div>
              </div>
              {post.matchScore && (
                <div className="text-center px-4 border-l border-white/20">
                  <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                    {language === 'th' ? 'คะแนน' : 'Match'}
                  </div>
                  <div className="text-green-400 font-bold">
                    {post.matchScore}%
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                  {language === 'th' ? 'ธุรกิจ' : 'Business'}
                </div>
                <div className="text-white font-bold text-sm">
                  {post.tags[0] || 'Cafe'}
                </div>
              </div>
              <div className="text-center px-4 border-l border-white/20">
                <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                  {language === 'th' ? 'งบประมาณ' : 'Budget'}
                </div>
                <div className="text-white font-bold text-sm">
                  {formatPrice(30000)}-{formatPrice(80000)}
                </div>
              </div>
              <div className="text-center pl-4 border-l border-white/20">
                <div className="text-white/70 text-[10px] uppercase tracking-wider mb-0.5">
                  {language === 'th' ? 'พื้นที่' : 'Area'}
                </div>
                <div className="text-white font-bold text-sm">
                  {language === 'th' ? 'สุขุมวิท' : 'Sukhumvit'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.98]">
          {isSpace
            ? language === 'th'
              ? 'ดูรายละเอียด'
              : 'View Listing'
            : t('feed.matchMe')}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
