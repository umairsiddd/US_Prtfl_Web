import { markdownify } from "@lib/utils/textConverter";

const AwardCard = ({ icon, title, description, status, url }) => {
  const content = (
    <>
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#E8EBF5] dark:bg-[#2a3561] text-[#4159A3] dark:text-[#E5F4F4] mb-3 sm:mb-4 md:mb-5">
        {icon}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-dark dark:text-white mb-2 sm:mb-3">
          {title}
          {status && (
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
              [{status}]
            </span>
          )}
        </h3>
        {description && (
          <p className="text-text dark:text-darkmode-light text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </>
  );

  const containerClasses = "mb-4 sm:mb-6 rounded-lg border border-border p-4 sm:p-6 md:p-8 dark:border-darkmode-border bg-white dark:bg-darkmode-theme-dark shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center min-h-[200px] sm:min-h-[240px] md:min-h-[280px]";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${containerClasses} hover:border-[#4159A3] dark:hover:border-[#E5F4F4] transition-colors cursor-pointer no-underline`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
};

const Awards = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  // Award icons as SVG components
  const FellowshipIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const MedalIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );

  const TrophyIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const AwardIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );

  const AcademicIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );

  const CodeIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  const GlobeIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const awards = [
    {
      icon: AwardIcon,
      title: "CAMPS Innovation Award (2025)",
      description: "Retrocausal won the Center of Advanced Manufacturing Puget Sound (CAMPS) Innovation Award for 2025 while I was CEO.",
      url: "https://www.linkedin.com/posts/the-center-for-advanced-manufacturing-puget-sound_%F0%9D%90%82%F0%9D%90%80%F0%9D%90%8C%F0%9D%90%8F%F0%9D%90%92-%F0%9D%90%88%F0%9D%90%A7%F0%9D%90%A7%F0%9D%90%A8%F0%9D%90%AF%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A8%F0%9D%90%A7-%F0%9D%90%80%F0%9D%90%B0%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%9D-activity-7403111903809761280-lLaJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABSvdx0BfohRbh3GhQOD7uwjEP2QiSidcHs"
    },
    {
      icon: TrophyIcon,
      title: "America’s Greatest Startup Workplaces (2025)",
      description: "Four star rating for Retrocausal’s healthy work-life balance while offering strong benefits and career growth opportunities.",
      url: "https://rankings.newsweek.com/americas-greatest-startup-workplaces-2025"
    },
    {
      icon: TrophyIcon,
      title: "CB Insights’ AI 100 (2024)",
      description: "Retrocausal picked as a top-100 AI startup.",
      url: "https://www.cbinsights.com/research/report/artificial-intelligence-top-startups-2024/"
    },
    {
      icon: AwardIcon,
      title: "CB Insights’ Advanced Manufacturing 50 (2022)",
      description: "Retrocausal picked as a top-50 Advanced Manufacturing company out of 6000.",
      url: "https://www.cbinsights.com/research/report/top-advanced-manufacturing-startups-2022/"
    },
    {
      icon: TrophyIcon,
      title: "Best Startup Award (2021)",
      description: "Edge AI and Vision Alliance Startup Competition (Judges Award and Audience Award)",
      url: "https://www.edge-ai-vision.com/2021/05/the-edge-ai-and-vision-alliance-announces-the-2021-vision-tank-start-up-competition-winners-at-the-embedded-vision-summit/"
    },
    {
      icon: TrophyIcon,
      title: "ISMAR Best Demonstration Award (2020)",
      description: "RetroActivity: Rapidly Deployable Live Task Guidance Experiences",
      url: "https://ismar2020.ismar.net/awards/index.html"
    },
    {
      icon: AwardIcon,
      title: "NASA JPL SBIR grant (2020)",
      description: "Principal Investigator with Exploratory Medical Capabilities (ExMC) laboratories",
      url: "https://techport.nasa.gov/projects/102543"
    },
    {
      icon: FellowshipIcon,
      title: "NTNU Onsager Fellowship in Robotic Vision",
      description: "Tenure-track faculty position + 2 PhD studentships at NTNU in Trondheim, Norway",
      status: "passed"
    },
    {
      icon: MedalIcon,
      title: "ETH Medal 2014",
      description: "Outstanding doctoral dissertation (~top 5% of all PhD theses at ETH-Zurich)",
      status: null
    },
    {
      icon: TrophyIcon,
      title: "Best PhD Student Award",
      description: "By IAPR, out of ~130 pre-screened candidates at ICVSS 2012",
      status: null
    },
    {
      icon: AwardIcon,
      title: "Qualcomm Innovation Fellowship (QInF) 2012",
      description: "Worth 10,000 EUR on my research proposal",
      status: null
    },
    {
      icon: TrophyIcon,
      title: "Best Paper Award",
      description: "For my 3dRR 2011 paper by Microsoft Research",
      status: null
    },
    {
      icon: AcademicIcon,
      title: "2nd Position in Bachelor of Engineering (Electronics)",
      description: "Out of 140 students in programme at NEDUET (99.7th percentile overall amongst ~1500 students in Engineering faculty)",
      status: null
    },
    {
      icon: CodeIcon,
      title: "National Software Competitions",
      description: "Prizes at six national level software competitions/olympiads (1998-2001)",
      status: null
    },
    {
      icon: GlobeIcon,
      title: "International Programming Olympiads",
      description: "Member of Pakistan-I team at three international programming olympiads (SEARCC ISSC 2000-02 in Singapore/Philippines/New Zealand)",
      status: null
    }
  ];

  return (
    <section className="section mt-8 sm:mt-12 md:mt-16">
      <div className="container">
        <h1 className="section-title">
          {title}
        </h1>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:mt-8 md:mt-12">
          {awards.map((award, index) => (
            <AwardCard
              key={index}
              icon={award.icon}
              title={award.title}
              description={award.description}
              status={award.status}
              url={award.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
