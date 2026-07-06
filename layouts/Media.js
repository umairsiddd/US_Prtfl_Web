import { useState } from "react";
import ImageFallback from "@layouts/components/ImageFallback";

const PlaceholderThumbnail = ({ title, episodeNumber }) => {
  const colors = [
    'from-blue-600 to-indigo-800',
    'from-emerald-600 to-teal-800',
    'from-purple-600 to-violet-800',
    'from-rose-600 to-pink-800',
    'from-amber-500 to-orange-700',
    'from-cyan-600 to-blue-800',
    'from-indigo-600 to-purple-800',
    'from-teal-600 to-emerald-800',
    'from-fuchsia-600 to-pink-800',
    'from-sky-600 to-cyan-800',
  ];
  const colorIndex = (title.length + (episodeNumber?.length || 0)) % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center p-3 sm:p-4 text-center`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 w-full h-full flex flex-col items-center justify-center border border-white/20">
        {episodeNumber && (
          <span className="text-white bg-white/20 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold mb-2">{episodeNumber}</span>
        )}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <h4 className="text-white font-bold text-[10px] sm:text-xs leading-tight line-clamp-2 sm:line-clamp-3">
          {title.replace(/^(S\d+EP\d+|Episode \d+)[:\s–-]+/i, '').trim()}
        </h4>
      </div>
    </div>
  );
};

const PodcastCard = ({ title, description, date, thumbnail, link, episodeNumber }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border dark:border-darkmode-border bg-white dark:bg-darkmode-theme-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {imageError ? (
          <PlaceholderThumbnail title={title} episodeNumber={episodeNumber} />
        ) : (
          <ImageFallback
            src={thumbnail}
            alt={title}
            fill={true}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4159A3] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-dark dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#4159A3] dark:group-hover:text-[#E5F4F4] transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
      </div>
    </a>
  );
};

const Media = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const podcastLink = "https://retrocausal.ai/podcast/";

  // Using i0.wp.com CDN URLs for reliable image loading
  const podcasts = [
    {
      title: "Manufacturing the Future Episode #49 with Zeeshan Zia, CEO & Co-founder",
      description: "Zeeshan Zia joined Epicor’s Manufacturing the Future podcast to discuss how AI copilots empower factory workers, cut scrap rates from 30% to 3%, and enable people-centric transformation in manufacturing.",
      date: "Feb 15, 2025",
      thumbnail: "https://img.youtube.com/vi/RFmZQaekP4s/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=RFmZQaekP4s"
    },
    {
      title: "Humans of AI with Zeeshan Zia (Retrocausal)",
      description: "Zeeshan Zia, CEO of Retrocausal, discusses applying AI to improve human work, lessons from research, leaving big tech to found a startup, and advice for new scientists.",
      date: "Oct 27, 2023",
      thumbnail: "https://vumbnail.com/879874921.jpg",
      link: "https://vimeo.com/879874921"
    },
    {
      title: "Increase manufacturing processes by 25% with AI, Opcenter and Retrocausual a Siemens Partner",
      description: "At Siemens Realize Live 2023, Zeeshan Zia discussed Retrocausal’s Siemens PLM integration, enabling one-click AI deployment that boosts efficiency by 25% and cuts scrap by 85%.",
      date: "June 27, 2023",
      thumbnail: "https://img.youtube.com/vi/zhP4XoaWKCU/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=zhP4XoaWKCU"
    },
    {
      title: "AI Copilots for Manufacturing Assembly Optimization",
      description: "Zeeshan Zia explains how AI co-pilots give frontline workers real-time guidance to cut errors and scrap by up to 90%, transforming manufacturing productivity and quality.",
      date: "May 25, 2023",
      thumbnail: "https://img.youtube.com/vi/oferQtX0zdU/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=oferQtX0zdU"
    },
    {
      title: "S2EP11 – From Factory Floor to AI-Powered Enterprise: Lessons from SAP's Stefan Groendahl",
      description: "From Factory Floor to AI-Powered Enterprise: Lessons from SAP's Stefan Groendahl Duration: 34 mins 08 secs Your Host Zeeshan Zia...",
      date: "July 26, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/07/Bonus-Episode-2-Fabio-Bottacci-YT-Thumbnail.png",
      episodeNumber: "S2 EP11"
    },
    {
      title: "S2EP10 – From IoT to GenAI: Fabio Bottacci on the Future of Industrial Innovation",
      description: "From IoT to GenAI: Fabio Bottacci on the Future of Industrial Innovation Duration: 33 mins 51 secs Your Host Zeeshan...",
      date: "July 18, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/07/Bonus-Episode-2-Fabio-Bottacci-YT-Thumbnail.png",
      episodeNumber: "S2 EP10"
    },
    {
      title: "S2EP9 – From Pilots to Scalable IIoT: Cisco's Kevin Wood on Building Secure Smart Factories",
      description: "From Pilots to Scalable IIoT: Cisco's Kevin Wood on Building Secure Smart Factories Duration: 29 mins 05 secs Your Host...",
      date: "July 9, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/07/YT-Thumbnail-Kevin-Wood.png",
      episodeNumber: "S2 EP9"
    },
    {
      title: "S2EP8 PART 2 of 2 – Scaling AI & Building Smart Factories: Prasad Satyavolu on the Future of Manufacturing",
      description: "S2EP9 – Scaling AI & Building Smart Factories: Prasad Satyavolu on the Future of Manufacturing Duration: 17 mins 12 secs...",
      date: "May 30, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/05/YT-Thumbnail-S2EP8-Prasad.png",
      episodeNumber: "S2 EP8 Pt.2"
    },
    {
      title: "S2EP8 PART 1 of 2 – Scaling AI & Building Smart Factories: Prasad Satyavolu on the Future of Manufacturing",
      description: "S2EP8 – Scaling AI & Building Smart Factories: Prasad Satyavolu on the Future of Manufacturing Duration: 23 mins 39 secs...",
      date: "May 23, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/05/YT-Thumbnail-S2EP8-Prasad.png",
      episodeNumber: "S2 EP8 Pt.1"
    },
    {
      title: "S2EP7 – How to Lead Smart Manufacturing in 2025: IT/OT Convergence, AI & Digital Transformation",
      description: "S2EP7 – How to Lead Smart Manufacturing in 2025: IT/OT Convergence, AI & Digital Transformation Duration: 29 mins 28 secs...",
      date: "May 2, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/05/YT-Thumbnail-S2EP7.png",
      episodeNumber: "S2 EP7"
    },
    {
      title: "S2EP6: Generative AI, Real-Time Data & Manufacturing—A Blueprint for the Future",
      description: "S2EP6: Generative AI, Real-Time Data & Manufacturing—A Blueprint for the Future Duration: 36 mins 47 secs Your Host Zeeshan Zia...",
      date: "April 18, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/04/YT-Thumbnail-S2EP6.png",
      episodeNumber: "S2 EP6"
    },
    {
      title: "S2EP5 – Transforming Manufacturing with AI & Cloud | Inside Google Cloud's Vision",
      description: "S2EP5 – Transforming Manufacturing with AI & Cloud | Inside Google Cloud's Vision Duration: 27 mins 02 secs Your Host...",
      date: "April 4, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/04/YT-Thumbnail-S2EP5-Luis-Solano.png",
      episodeNumber: "S2 EP5"
    },
    {
      title: "S2EP4 – Why MES Is the Backbone of Smart Manufacturing: MES vs. ERP Explained + Real-World ROI",
      description: "S2EP4 – Why MES Is the Backbone of Smart Manufacturing: MES vs. ERP Explained + Real-World ROI Duration: 34 mins...",
      date: "March 27, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/03/YT-Thumbnail-S2EP4-Matt-Barber.png",
      episodeNumber: "S2 EP4"
    },
    {
      title: "S2EP3 – The Future of Smart Manufacturing: AI, Cloud MES, and Digital Transformation",
      description: "S2EP3 – The Future of Smart Manufacturing: AI, Cloud MES, and Digital Transformation Duration: 34 mins 51 secs Your Host...",
      date: "March 21, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/03/YT-Thumbnail-Joe-Gerstl.png",
      episodeNumber: "S2 EP3"
    },
    {
      title: "S2EP2 – How AI and Data are Transforming Manufacturing: Insights from John Deere & Michelin",
      description: "S2E2 – How AI and Data are Transforming Manufacturing: Insights from John Deere & Michelin Duration: 36 mins 41 secs...",
      date: "March 14, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/03/YT-Thumbnail-Shiv-Trisal.png",
      episodeNumber: "S2 EP2"
    },
    {
      title: "S2EP1 – AI, IoT & Cloud: Transforming the Future of Manufacturing",
      description: "S1EP1 – AI, IoT & Cloud: Transforming the Future of Manufacturing Duration: 32 mins 54 secs Your Host Zeeshan Zia...",
      date: "March 8, 2025",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2025/03/YT-Thumbnail-Mark-Beckmann.png",
      episodeNumber: "S2 EP1"
    },
    {
      title: "Episode 10: Revolutionizing Manufacturing: Lean Principles & Mixed Model Design with Leonardo Group",
      description: "Episode 10: Revolutionizing Manufacturing – Lean Principles & Mixed Model Design with Leonardo Group Duration: 60 mins 04 secs Your...",
      date: "December 6, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/12/Video-thumbnail.png",
      episodeNumber: "S1 EP10"
    },
    {
      title: "Episode 9: Automation, Sustainability and Lean Transformation in the Digital Era with Greg Kinsey",
      description: "Episode 9: Automation, Sustainability and Lean Transformation in the Digital Era with Greg Kinsey Duration: 35 mins 37 secs Your...",
      date: "November 29, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/11/video-thumbnail-1.png",
      episodeNumber: "S1 EP9"
    },
    {
      title: "Episode 8: Exploring the Future of Lean with Dr. Adil Dalal",
      description: "Episode 8: Exploring the Future of Lean with Dr. Adil Dalal Duration: 35 mins 23 secs Your Host Zeeshan Zia...",
      date: "November 22, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/11/video-thumbnail-episode-8.png",
      episodeNumber: "S1 EP8"
    },
    {
      title: "Episode 7: Challenges and the Future of Production Scheduling with Dr. Prasad Velaga",
      description: "Episode 7: Challenges and the Future of Production Scheduling with Dr. Prasad Velaga Duration: 38 mins 47 secs Your Host...",
      date: "November 15, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/11/Video-thumbnail.png",
      episodeNumber: "S1 EP7"
    },
    {
      title: "Episode 6: Unlocking Quality, Standards, and Leadership Insights with Michel Baudin",
      description: "Episode 6: Unlocking Quality, Standards, and Leadership Insights with Michel Baudin Duration: 45 mins 48 secs Your Host Zeeshan Zia...",
      date: "November 8, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/11/episode-6-video-thumbnail.png",
      episodeNumber: "S1 EP6"
    },
    {
      title: "Episode 5: Redefine the Path to Quality through Adaptability and Teamwork with Eric Budd",
      description: "Episode 5: Redefine the Path to Quality through Adaptability and Teamwork with Eric Budd Duration: 50 mins 06 secs Your...",
      date: "November 1, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/11/episode-5-video-thumbnail.png",
      episodeNumber: "S1 EP5"
    },
    {
      title: "Episode 4: Mastering Lean Manufacturing, Conflict Resolution and Leadership with Kelly Mallery",
      description: "Episode 4: Mastering Lean Manufacturing, Conflict Resolution and Leadership with Kelly Mallery Duration: 32 mins 01 secs Your Host Zeeshan...",
      date: "October 25, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/10/episode-4-kelly-mallery-thumbnail.png",
      episodeNumber: "S1 EP4"
    },
    {
      title: "Episode 3: Implementing Lean Management in Complex Environments with Hide Oba",
      description: "Episode 3: Implementing Lean Management in Complex Environments with Hide Oba Duration: 32 mins 01 secs Your Host Zeeshan Zia...",
      date: "October 15, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/10/Green-Modern-Talk-Podcast-YouTube-Thumbnail-2.png",
      episodeNumber: "S1 EP3"
    },
    {
      title: "Episode 2: The Role of Culture and Collaboration in Lean Implementation with Beau Groover",
      description: "In the second episode of Factory Forward, host Zeeshan interviews Beau Groover, founder and president of the Effective Syndicate, a...",
      date: "September 22, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/09/Green-Modern-Talk-Podcast-YouTube-Thumbnail-1.png",
      episodeNumber: "S1 EP2"
    },
    {
      title: "Episode 1: Exploring Misconceptions about Lean with Bob Emiliani",
      description: "In the first episode of Factory Forward, Dr. Zeeshan Zia is renowned lean management expert Dr. Bob Emiliani sheds light...",
      date: "September 12, 2024",
      thumbnail: "https://i0.wp.com/retrocausal.ai/wp-content/uploads/2024/09/Green-Modern-Talk-Podcast-YouTube-Thumbnail.png",
      episodeNumber: "S1 EP1"
    }
  ];

  return (
    <section className="section mt-8 sm:mt-12 md:mt-16">
      <div className="container">
        <h1 className="section-title">
          {title}
        </h1>

        {/* Featured Videos */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.slice(0, 4).map((podcast, index) => (
              <PodcastCard
                key={`featured-${index}`}
                title={podcast.title}
                description={podcast.description}
                date={podcast.date}
                thumbnail={podcast.thumbnail}
                link={podcast.link || podcastLink}
                episodeNumber={podcast.episodeNumber}
              />
            ))}
          </div>
        </div>

        {/* Podcast Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#E8EBF5] dark:bg-[#2a3561] text-[#4159A3] dark:text-[#E5F4F4] mr-3 sm:mr-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white">
                Factory Forward Podcast
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stories, strategies, and solutions propelling factories forward
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.slice(4).map((podcast, index) => (
              <PodcastCard
                key={`podcast-${index}`}
                title={podcast.title}
                description={podcast.description}
                date={podcast.date}
                thumbnail={podcast.thumbnail}
                link={podcast.link || podcastLink}
                episodeNumber={podcast.episodeNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
