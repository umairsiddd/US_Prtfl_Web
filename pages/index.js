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

const ConsultingProjectItem = ({ title, client, description, impact, tools }) => {
  return (
    <div className="mb-8 sm:mb-12">
      <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-1">{title}</h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic mb-3">{client}</p>
      <p className="text-sm sm:text-base text-text dark:text-darkmode-light mb-4">{description}</p>
      
      {impact && (
        <div className="mb-4">
          <p className="text-[15px] sm:text-base font-medium text-dark dark:text-white mb-1">Business Impact:</p>
          <p className="text-sm sm:text-[15px] text-text dark:text-darkmode-light border-l-2 border-primary pl-3">{impact}</p>
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full border border-blue-200/50 dark:border-blue-700/50 bg-blue-100/30 dark:bg-blue-900/30 backdrop-blur-md shadow-sm text-blue-800 dark:text-blue-200"
            >
              {tool}
            </span>
          ))}
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
      title="Umair Siddiqui"
      description="Umair Siddiqui - Dynamics 365 Finance & Operations Consultant. MBA Finance professional specializing in ERP consulting, business process optimization, and digital solutions."
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

        <div className="container w-full">
          <div className="row flex-wrap-reverse items-stretch justify-center lg:flex-row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] flex flex-col justify-center pb-8 lg:pb-12" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
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
              <div className="col-7 sm:col-6 lg:col-4 self-end pt-6 px-6 pb-0 sm:pt-8 sm:px-8 lg:pt-12 lg:px-12 flex items-end">
                <ImageFallback
                  className="mx-auto object-contain block align-bottom mb-[-30px] sm:mb-0"
                  src={banner.image}
                  width={380}
                  height={308}
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
                        className="flex items-center justify-center w-full max-w-[220px] h-20 sm:h-24 md:h-28 mr-auto sm:mx-auto mb-4 sm:mb-6 transition-all duration-300 rounded-2xl p-4 hover:scale-[1.03]"
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
                          className="object-contain w-auto h-10 sm:h-12 md:h-16 max-w-[160px] rounded-lg"
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
                        className="flex items-center justify-center w-full max-w-[220px] h-20 sm:h-24 md:h-28 mr-auto sm:mx-auto mb-4 sm:mb-6 transition-all duration-300 rounded-2xl p-4 hover:scale-[1.03]"
                        style={glassCardStyle}
                      >
                        <ImageFallback
                          src={item.logo}
                          alt={item.institution}
                          width={180}
                          height={180}
                          className="object-contain w-auto h-10 sm:h-12 md:h-16 max-w-[160px] rounded-lg"
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

      {/* Consulting Projects Section */}
      <section className="section pt-12 sm:pt-16 md:pt-[100px]">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-[60px] leading-normal sm:leading-[50px] md:leading-normal">
            Consulting Projects{" "}
            <Link href="/projects" className="pub-badge conference no-underline hover:opacity-80">
              See All...
            </Link>
          </h2>

          <ConsultingProjectItem
            title="ERP Security & Governance Framework"
            client="CLOUDCLIF — International Enterprise Client"
            description="Designed and implemented a comprehensive Security Roles & License Management Dashboard within D365 F&O, providing real-time visibility into user roles, duties, and licensing utilization. Configured granular security roles, duties, privileges, and access controls across finance operations."
            impact="Enabled executive leadership to optimize licensing costs and ensured 100% compliance with internal audit standards and data security protocols."
            tools={["D365 F&O", "X++", "SSRS", "Azure DevOps", "SQL", "ERP Governance"]}
          />

          <ConsultingProjectItem
            title="Financial Reporting Modernization (AX 2012 → D365 Finance)"
            client="CLOUDCLIF — Multi-Region Enterprise"
            description="Led the strategic migration and modernization of 100+ enterprise financial SSRS/Docentric reports from legacy Dynamics AX 2012 to Dynamics 365 Finance. Redesigned report templates across invoicing, inventory visibility, and sales analytics for clients in the US, Australia, New Zealand, and Saudi Arabia."
            impact="Improved financial data accuracy and reporting agility, reducing period-end closing time and strengthening decision-support analysis for executive leadership."
            tools={["D365 Finance", "AX 2012", "SSRS", "Docentric", "X++", "SQL", "FDD/TDD"]}
          />

          <ConsultingProjectItem
            title="D365 F&O ERP Implementation & Enhancement Projects (10+)"
            client="CLOUDCLIF — Multiple Clients (US, AU, NZ, KSA)"
            description="Delivered Microsoft Dynamics 365 Finance & Operations solutions across 10+ implementation, enhancement, and migration projects. Partnered with finance and business stakeholders to gather requirements, analyze operational challenges, and translate business needs into scalable ERP solutions."
            impact="Improved financial and operational processes across diverse business and regulatory environments, delivered through cross-functional collaboration with consultants, project managers, and business users."
            tools={["D365 F&O", "Business Central", "X++", "SQL", "FDD", "TDD", "Azure DevOps"]}
          />

          <ConsultingProjectItem
            title="Financial Systems Analysis & Process Auditing"
            client="EuSopht — Enterprise Clients (Karachi, Pakistan)"
            description="Evaluated existing financial ERP configurations to identify bottlenecks in invoice processing and financial reporting. Acted as the primary functional point of contact for clients, ensuring ERP customizations directly addressed business challenges. Conducted regular audits of financial outputs against internal accounting standards."
            impact="Improved data integrity, compliance posture, and audit-readiness of financial reporting systems across multiple client engagements."
            tools={["D365 F&O", "Financial Reporting", "Process Auditing", "Stakeholder Management"]}
          />

          <ConsultingProjectItem
            title="CRM & Marketing Sales Automation"
            client="Retrocausal.ai — Remote, USA"
            description="Architected an end-to-end lead management system in HubSpot, integrating custom web landing pages with automated nurturing workflows. Implemented Google Analytics 4, Google Tag Manager, and custom event tracking. Integrated HubSpot with GA4 for full-funnel lead attribution."
            impact="Streamlined the sales pipeline and increased lead qualification efficiency, providing the sales team with a data-backed customer journey view from first touch to conversion."
            tools={["HubSpot CRM", "Google Analytics 4", "Google Tag Manager", "WordPress", "JavaScript", "SEO"]}
          />

          <ConsultingProjectItem
            title="Digital Transformation: Pricing & Conversion Optimization"
            client="Retrocausal.ai — Kaizen Copilot Product"
            description="Developed a proprietary dynamic pricing calculator integrated with business logic, enabling prospects to receive instant, accurate cost estimates. Integrated the tool with HubSpot CRM to automatically capture prospect data and intent signals."
            impact="Significantly improved the customer acquisition process and shortened the sales cycle by delivering immediate pricing clarity to prospects at the top of the funnel."
            tools={["JavaScript", "HubSpot CRM", "WordPress", "GA4", "GTM"]}
          />

          <ConsultingProjectItem
            title="Corporate Website & Executive Portfolio Development"
            client="Retrocausal.ai — CEO Digital Brand"
            description="Worked directly with CEO Zeeshan Zia to develop, maintain, and continuously enhance the corporate website and executive portfolio. Designed and developed high-converting landing pages and research portals, improved website SEO, and managed third-party API integrations."
            impact="Strengthened the company's digital brand identity and executive online presence, supporting revenue growth initiatives through improved digital customer journeys."
            tools={["WordPress", "HTML", "CSS", "JavaScript", "Yoast SEO", "HubSpot", "DNS Management"]}
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
