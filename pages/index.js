import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { useTheme } from "next-themes";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
const { blog_folder, pagination } = config.settings;

// Publication Item Component with dropdown
const PublicationItem = ({ authors, title, venue, year, badge, pdfUrl, abstract, bibtex, videoUrl }) => {
  const [showDownload, setShowDownload] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);

  const handleDownloadClick = () => {
    setShowDownload(!showDownload);
    if (!showDownload) {
      setShowAbstract(false);
      setShowBibtex(false);
    }
  };

  const handleAbstractClick = () => {
    setShowAbstract(!showAbstract);
    if (!showAbstract) {
      setShowDownload(false);
      setShowBibtex(false);
    }
  };

  const handleBibtexClick = () => {
    setShowBibtex(!showBibtex);
    if (!showBibtex) {
      setShowDownload(false);
      setShowAbstract(false);
    }
  };

  const anyDropdownOpen = showDownload || showAbstract || showBibtex;

  return (
    <div className="mb-6 sm:mb-8 md:mb-[70px]">
      <p className="text-sm sm:text-base text-text dark:text-darkmode-light mb-2 sm:mb-3">{authors}</p>
      <p className="text-sm sm:text-base font-bold text-dark dark:text-white mb-2 sm:mb-3">{title}</p>
      <p className="text-sm sm:text-base text-text dark:text-darkmode-light italic mb-2 sm:mb-3">
        {venue} {year} <span className="pub-badge conference ml-1 sm:ml-2">{badge}</span>
      </p>

      {/* Buttons Row */}
      <div className={`flex flex-wrap gap-2 ${!anyDropdownOpen ? 'mb-8 sm:mb-12 md:mb-[70px]' : 'mb-2'}`}>
        {/* Download Button */}
        <button
          onClick={handleDownloadClick}
          className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${showDownload
            ? "bg-[#4159A3] text-white"
            : "bg-[#4159A3] text-white hover:bg-[#354a8a]"
            }`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${showDownload ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Abstract Button */}
        <button
          onClick={handleAbstractClick}
          className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${showAbstract
            ? "bg-[#4159A3] text-white"
            : "bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb]"
            }`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Abstract
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${showAbstract ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* BibTeX Button */}
        <button
          onClick={handleBibtexClick}
          className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ${showBibtex
            ? "bg-[#4159A3] text-white"
            : "bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb]"
            }`}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          BibTeX
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-200 ${showBibtex ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Video Button */}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 bg-[#E5F4F4] text-black hover:bg-[#d0ebeb] dark:bg-[#E5F4F4] dark:text-black dark:hover:bg-[#d0ebeb] no-underline"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Video
          </a>
        )}
      </div>

      {/* Download Dropdown */}
      {showDownload && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-6 sm:mb-8 md:mb-[70px] bg-[#E8EBF5] dark:bg-[#2a3561] border-l-4 border-[#4159A3] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#4159A3] dark:text-[#E5F4F4] mb-2 sm:mb-3">Downloads</h4>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-[#4159A3] bg-white dark:bg-[#4159A3] dark:text-white border border-[#4159A3] rounded hover:bg-[#4159A3] hover:text-[#f0f0f0] dark:hover:bg-[#354a8a] dark:hover:text-[#f0f0f0] active:text-[#e8e8e8] transition-colors duration-200 no-underline"
          >
            <svg className="w-3 h-3 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Paper (PDF)
          </a>
        </div>
      )}

      {/* Abstract Dropdown */}
      {showAbstract && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-6 sm:mb-8 md:mb-[70px] bg-[#E8EBF5] dark:bg-[#E8EBF5] border-l-4 border-[#4159A3] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#4159A3] dark:text-[#4159A3] mb-2">Abstract</h4>
          <p className="text-xs sm:text-sm text-black dark:text-black leading-relaxed whitespace-pre-wrap">
            {abstract}
          </p>
        </div>
      )}

      {/* BibTeX Dropdown */}
      {showBibtex && (
        <div className="mt-2 sm:mt-3 p-3 sm:p-4 mb-6 sm:mb-8 md:mb-[70px] bg-gray-700 dark:bg-gray-800 border-l-4 border-[#E5F4F4] rounded-r-md">
          <h4 className="text-xs sm:text-sm font-bold text-[#E5F4F4] mb-2">BibTeX</h4>
          <pre className="text-[10px] sm:text-xs text-white font-mono overflow-x-auto whitespace-pre-wrap">
            {bibtex}
          </pre>
        </div>
      )}
    </div>
  );
};

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
  experience,
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const glassCardStyle = {
    background: isDark
      ? 'rgba(255, 255, 255, 0.10)'
      : 'rgba(30, 70, 180, 0.12)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(173, 216, 255, 0.25)',
    boxShadow: '0 4px 20px rgba(173, 216, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  };

  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base
      title="Zeeshan Zia"
      description="Zeeshan Zia - President of Retrocausal. Building AI systems for visual activity understanding in industrial environments. 50+ peer-reviewed papers, 25+ patents."
    >
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-7" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4 text-justify")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-5">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={450}
                  height={365}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience?.enable && (
        <section className="section pt-12 sm:pt-16 md:pt-[100px]">
          <div className="container">
            {/* Industry */}
            {experience.industry && (
              <div className="mb-10 sm:mb-16 md:mb-20">
                <h2 className="section-title mb-8 sm:mb-12 md:mb-[70px]">{experience.industry.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                  {experience.industry.items.map((item, index) => (
                    <div key={index} className="text-left sm:text-center">
                      <h4 className="font-bold text-dark dark:text-white text-base sm:text-base mb-1">
                        {item.company}
                      </h4>
                      <p className="text-sm sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
                        {item.location}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-28 sm:h-32 md:h-40 flex items-center justify-start sm:justify-center mb-4 sm:mb-6 transition-all duration-300 rounded-2xl p-4 hover:scale-[1.03]"
                        style={glassCardStyle}
                      >
                        <ImageFallback
                          src={
                            mounted && (theme === "dark" || resolvedTheme === "dark") && item.logo_dark
                              ? item.logo_dark
                              : item.logo
                          }
                          alt={item.company}
                          width={180}
                          height={180}
                          className="object-contain w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-lg"
                          style={{ borderRadius: '8px' }}
                        />
                      </a>
                      <p className="text-sm sm:text-base text-primary font-medium">
                        {item.role}
                      </p>
                      <p className="text-sm sm:text-sm text-gray-500 dark:text-gray-400 italic">
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academia */}
            {experience.academia && (
              <div>
                <h2 className="section-title mb-8 sm:mb-12 md:mb-[70px]">{experience.academia.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                  {experience.academia.items.map((item, index) => (
                    <div key={index} className="text-left sm:text-center">
                      <h4 className="font-bold text-dark dark:text-white text-base sm:text-base mb-1">
                        {item.degree}
                      </h4>
                      <p className="text-sm sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
                        {item.institution}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-28 sm:h-32 md:h-40 flex items-center justify-start sm:justify-center mb-4 sm:mb-6 transition-all duration-300 rounded-2xl p-4 hover:scale-[1.03]"
                        style={glassCardStyle}
                      >
                        <ImageFallback
                          src={item.logo}
                          alt={item.institution}
                          width={180}
                          height={180}
                          className="object-contain w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-lg"
                          style={{ borderRadius: '8px' }}
                        />
                      </a>
                      <p className="text-sm sm:text-sm text-gray-500 dark:text-gray-400">
                        {item.location}
                      </p>
                      <p className="text-sm sm:text-sm text-primary italic">
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Selected Recent Publications Section */}
      <section className="section pt-12 sm:pt-16 md:pt-[100px]">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-[60px] leading-normal sm:leading-[50px] md:leading-normal">
            Selected Recent Publications{" "}
            <Link href="/publications" className="pub-badge conference no-underline hover:opacity-80">
              See All...
            </Link>
          </h2>

          {/* 2026 */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-dark dark:text-darkmode-light">2026</h3>

          <PublicationItem
            authors="Fawad J. Fateh, Umer Ahmed, Hamza Khan, M. Zeeshan Zia, Quoc-Huy Tran"
            title="Video LLMs for Temporal Reasoning in Long Videos."
            venue="ACL"
            year="2026"
            badge="Conference"
            pdfUrl="https://arxiv.org/abs/2412.02930"
            videoUrl="https://youtu.be/lEUluMdNHcc"
            abstract="We introduce TemporalVLM, a video large language model designed for temporal reasoning and fine-grained understanding in long videos. The model incorporates a time-aware clip encoder that divides long videos into short-term clips and jointly encodes frames with timestamps to capture time-sensitive local features. These features are then aggregated using a bidirectional long short-term memory (BiLSTM) module to model long-range temporal dependencies and global context. To facilitate evaluation, we present IndustryASM, a large-scale dataset of industry assembly processes with action labels and timestamps annotated by industrial engineers. Extensive experiments demonstrate that TemporalVLM outperforms prior video LLMs across multiple temporal reasoning tasks, including dense video captioning, temporal video grounding, video highlight detection, and temporal action segmentation. To the best of our knowledge, this work is the first to integrate LSTMs into video large language models."
            bibtex={`@inproceedings{fateh26temporalvlm,
 author = {Fawad J. Fateh and Umer Ahmed and Hamza Khan and M. Zeeshan Zia and Quoc-Huy Tran},
 title = {Video LLMs for Temporal Reasoning in Long Videos},
 booktitle = {ACL},
 year = {2026}
}`}
          />

          <PublicationItem
            authors="Syed Ahmed Mahmood, Ali Shah Ali, Umer Ahmed, Fawad Javed Fateh, M. Zeeshan Zia, Quoc-Huy Tran"
            title="Procedure Learning via Regularized Gromov-Wasserstein Optimal Transport."
            venue="WACV"
            year="2026"
            badge="Conference"
            pdfUrl="https://arxiv.org/abs/2507.15540"
            videoUrl="https://youtu.be/UuTeflDyF-g"
            abstract="This paper studies self-supervised procedure learning, which aims to discover key steps and their ordering from a collection of unlabeled instructional videos. Prior approaches typically rely on frame-to-frame video alignment, but their performance degrades in the presence of order variations, background or redundant frames, and repeated actions. To address these challenges, the proposed method introduces a self-supervised framework based on a fused Gromov-Wasserstein optimal transport formulation with a structural prior for temporal alignment. However, optimizing temporal alignment alone can lead to degenerate solutions where frame embeddings collapse into a single cluster. To prevent this, the framework integrates a contrastive regularization that encourages embedding diversity across frames. Extensive experiments on egocentric and third-person benchmarks demonstrate that the proposed regularized Gromov-Wasserstein optimal transport approach outperforms prior methods, including OPEL, while using a unified loss formulation that avoids balancing multiple competing objectives."
            bibtex={`@inproceedings{mahmood25procedure,
 author = {Syed Ahmed Mahmood and Ali Shah Ali and Umer Ahmed and Fawad Javed Fateh and M. Zeeshan Zia and Quoc-Huy Tran},
 title = {Procedure Learning via Regularized Gromov-Wasserstein Optimal Transport},
 booktitle = {WACV},
 year = {2026}
}`}
          />

          {/* 2025 */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 mt-6 sm:mt-8 md:mt-10 text-dark dark:text-darkmode-light">2025</h3>



          <PublicationItem
            authors="Ali Shah Ali, Syed Ahmed Mahmood, Mubin Saeed, Andrey Konin, M. Zeeshan Zia, Quoc-Huy Tran"
            title="Joint Self-Supervised Video Alignment and Action Segmentation."
            venue="ICCV"
            year="2025"
            badge="Conference"
            pdfUrl="https://arxiv.org/abs/2503.16832"
            videoUrl="https://youtu.be/dGT6UvGZQwI?si=VsvslcYMFLvmycFM"
            abstract="This paper introduces a unified self-supervised framework for jointly performing video alignment and action segmentation using optimal transport. The proposed approach formulates self-supervised video alignment through a fused Gromov–Wasserstein optimal transport model with structural priors, enabling efficient GPU-based training and rapid convergence. Building upon this, the method is extended into a unified optimal transport formulation that simultaneously addresses frame-to-frame video alignment and frame-to-action segmentation within a single model. The joint approach reduces both training time and memory requirements compared to training separate models for each task. Extensive experiments across multiple video alignment and action segmentation benchmarks demonstrate state-of-the-art performance in video alignment and superior results in action segmentation. To the best of our knowledge, this is the first work to unify self-supervised video alignment and action segmentation within a single learning framework."
            bibtex={`@inproceedings{ali25joint,
 author = {Ali Shah Ali and Syed Ahmed Mahmood and Mubin Saeed and Andrey Konin and M. Zeeshan Zia and Quoc-Huy Tran},
 title = {Joint Self-Supervised Video Alignment and Action Segmentation},
 booktitle = {ICCV},
 year = {2025}
}`}
          />
        </div>
      </section>

      {/* Home main - HIDDEN
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-8">
              {featured_posts.enable && (
                <div className="section">
                  {markdownify(featured_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border p-6 dark:border-darkmode-border">
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>
                      <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0 md:col-6">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post, i, arr) => (
                            <div
                              className={`mb-6 flex items-center pb-6 ${
                                i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                              }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <ImageFallback
                                  className="mr-3 h-[85px] rounded object-cover"
                                  src={post.frontmatter.image}
                                  alt={post.frontmatter.title}
                                  width={105}
                                  height={85}
                                />
                              )}
                              <div>
                                <h3 className="h5 mb-2">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                <p className="inline-flex items-center font-bold">
                                  <FaRegCalendar className="mr-1.5" />
                                  {dateFormat(post.frontmatter.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>
      */}
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion, experience } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      experience: experience || null,
      categories: categoriesWithPostsCount,
    },
  };
};
