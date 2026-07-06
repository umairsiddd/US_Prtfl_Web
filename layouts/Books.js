import { markdownify } from "@lib/utils/textConverter";
import ImageFallback from "@layouts/components/ImageFallback";

const PlaceholderCover = ({ title, author }) => {
  // Generate a consistent color based on the title
  const colors = [
    'from-blue-600 to-blue-800',
    'from-emerald-600 to-emerald-800',
    'from-purple-600 to-purple-800',
    'from-rose-600 to-rose-800',
    'from-amber-600 to-amber-800',
    'from-cyan-600 to-cyan-800',
    'from-indigo-600 to-indigo-800',
    'from-teal-600 to-teal-800',
  ];
  const colorIndex = title.length % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center p-4 text-center`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full h-full flex flex-col items-center justify-center border border-white/20">
        <h4 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-4">
          {title}
        </h4>
        <div className="w-8 h-0.5 bg-white/50 my-2"></div>
        <p className="text-white/80 text-xs line-clamp-2">
          {author}
        </p>
      </div>
    </div>
  );
};

const BookCard = ({ title, author, cover, usePlaceholder }) => {
  return (
    <div className="group rounded-lg border border-border dark:border-darkmode-border bg-white dark:bg-darkmode-theme-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[2/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {usePlaceholder ? (
          <PlaceholderCover title={title} author={author} />
        ) : (
          <ImageFallback
            src={cover}
            alt={title}
            fill={true}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-sm font-bold text-dark dark:text-white mb-1 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {author}
        </p>
      </div>
    </div>
  );
};

const Books = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  const books = [
    {
      title: "Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      cover: "https://covers.openlibrary.org/b/isbn/0345391802-L.jpg"
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      cover: "https://covers.openlibrary.org/b/isbn/0198788606-L.jpg"
    },
    {
      title: "Outliers",
      author: "Malcolm Gladwell",
      cover: "https://covers.openlibrary.org/b/isbn/0316017930-L.jpg"
    },
    {
      title: "Predictably Irrational",
      author: "Dan Ariely",
      cover: "https://covers.openlibrary.org/b/isbn/0061353248-L.jpg"
    },
    {
      title: "Blink",
      author: "Malcolm Gladwell",
      cover: "https://covers.openlibrary.org/b/isbn/0316010669-L.jpg"
    },
    {
      title: "Coders at Work",
      author: "Peter Seibel",
      cover: "https://covers.openlibrary.org/b/isbn/1430219483-L.jpg"
    },
    {
      title: "Sophie's World",
      author: "Jostein Gaarder",
      cover: "https://covers.openlibrary.org/b/isbn/0374530718-L.jpg"
    },
    {
      title: "Business Adventures",
      author: "John Brooks",
      cover: "https://covers.openlibrary.org/b/isbn/1497644895-L.jpg"
    },
    {
      title: "The Unplanned Revolution",
      author: "Arif Hasan",
      cover: "/images/books/unplanned-revolution.jpg"
    },
    {
      title: "The Society of Mind",
      author: "Marvin Minsky",
      cover: "https://covers.openlibrary.org/b/isbn/0671657135-L.jpg"
    },
    {
      title: "I Think, Therefore I Am",
      author: "Lesley Levene",
      cover: "/images/books/i-think-therefore-i-am.jpg"
    },
    {
      title: "What Got You Here Won't Get You There",
      author: "Marshall Goldsmith",
      cover: "https://covers.openlibrary.org/b/isbn/1401301304-L.jpg"
    },
    {
      title: "Superintelligence: Paths, Dangers, Strategies",
      author: "Nick Bostrom",
      cover: "https://covers.openlibrary.org/b/isbn/0198739834-L.jpg"
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      cover: "https://covers.openlibrary.org/b/isbn/1451648537-L.jpg"
    },
    {
      title: "David and Goliath",
      author: "Malcolm Gladwell",
      cover: "https://covers.openlibrary.org/b/isbn/0316204366-L.jpg"
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      cover: "https://covers.openlibrary.org/b/isbn/0060555661-L.jpg"
    },
    {
      title: "Hyperspace",
      author: "Michio Kaku",
      cover: "https://covers.openlibrary.org/b/isbn/0385477058-L.jpg"
    },
    {
      title: "Why the Allies Won",
      author: "Richard Overy",
      cover: "/images/books/why-the-allies-won.jpg"
    },
    {
      title: "Avoid Boring People",
      author: "James D. Watson",
      cover: "https://covers.openlibrary.org/b/isbn/0375412840-L.jpg"
    },
    {
      title: "Brief Candle in the Dark",
      author: "Richard Dawkins",
      cover: "https://covers.openlibrary.org/b/isbn/0062288431-L.jpg"
    },
    {
      title: "Copenhagen",
      author: "Michael Frayn",
      cover: "https://covers.openlibrary.org/b/isbn/0385720793-L.jpg"
    },
    {
      title: "The Innovator's Dilemma",
      author: "Clayton M. Christensen",
      cover: "https://covers.openlibrary.org/b/isbn/0062060244-L.jpg"
    },
    {
      title: "Surely You're Joking, Mr. Feynman!",
      author: "Richard Feynman",
      cover: "https://covers.openlibrary.org/b/isbn/0393316041-L.jpg"
    },
    {
      title: "The Technological Singularity",
      author: "Murray Shanahan",
      cover: "https://covers.openlibrary.org/b/isbn/0262527804-L.jpg"
    },
    {
      title: "The Cogwheel Brain",
      author: "Doron Swade",
      cover: "https://covers.openlibrary.org/b/isbn/0349112398-L.jpg"
    },
    {
      title: "The Master Algorithm",
      author: "Pedro Domingos",
      cover: "https://covers.openlibrary.org/b/isbn/0465065708-L.jpg"
    },
    {
      title: "The Blank Slate",
      author: "Steven Pinker",
      cover: "https://covers.openlibrary.org/b/isbn/0142003344-L.jpg"
    },
    {
      title: "A Fire Upon The Deep",
      author: "Vernor Vinge",
      cover: "https://covers.openlibrary.org/b/isbn/0812515285-L.jpg"
    },
    {
      title: "Fast Times at Fairmont High",
      author: "Vernor Vinge",
      cover: "https://covers.openlibrary.org/b/isbn/0312875843-L.jpg"
    },
    {
      title: "The Mythical Man-Month",
      author: "Frederick P. Brooks",
      cover: "https://covers.openlibrary.org/b/isbn/0201835959-L.jpg"
    },
    {
      title: "Profits of Science",
      author: "Robert Teitelman",
      cover: "https://books.google.com/books/content?id=_eseAQAAIAAJ&printsec=frontcover&img=1&zoom=1"
    },
    {
      title: "True Names",
      author: "Vernor Vinge",
      cover: "https://covers.openlibrary.org/b/isbn/0312862075-L.jpg"
    },
    {
      title: "Mastering the VC Game",
      author: "Jeffrey Bussgang",
      cover: "https://covers.openlibrary.org/b/isbn/1591843251-L.jpg"
    },
    {
      title: "Last and First Men",
      author: "Olaf Stapledon",
      cover: "https://covers.openlibrary.org/b/isbn/0486466825-L.jpg"
    },
    {
      title: "Liar's Poker",
      author: "Michael Lewis",
      cover: "https://covers.openlibrary.org/b/isbn/039333869X-L.jpg"
    },
    {
      title: "The Diamond Age",
      author: "Neal Stephenson",
      cover: "https://covers.openlibrary.org/b/isbn/0553380966-L.jpg"
    },
    {
      title: "The Glass Bead Game",
      author: "Hermann Hesse",
      cover: "https://covers.openlibrary.org/b/isbn/0312278497-L.jpg"
    },
    {
      title: "The Righteous Mind",
      author: "Jonathan Haidt",
      cover: "https://covers.openlibrary.org/b/isbn/0307455777-L.jpg"
    },
    {
      title: "Slicing Pie",
      author: "Mike Moyer",
      cover: "https://covers.openlibrary.org/b/isbn/0615700624-L.jpg"
    },
    {
      title: "On Writing",
      author: "Stephen King",
      cover: "https://covers.openlibrary.org/b/isbn/1439156816-L.jpg"
    },
    {
      title: "The Gene: An Intimate History",
      author: "Siddhartha Mukherjee",
      cover: "https://covers.openlibrary.org/b/isbn/1476733503-L.jpg"
    },
    {
      title: "Lucky Or Smart?",
      author: "Bo Peabody",
      cover: "https://covers.openlibrary.org/b/isbn/1400066727-L.jpg"
    },
    {
      title: "Chaos Monkeys",
      author: "Antonio Garcia Martinez",
      cover: "https://covers.openlibrary.org/b/isbn/0062458191-L.jpg"
    },
    {
      title: "Founders at Work",
      author: "Jessica Livingston",
      cover: "https://covers.openlibrary.org/b/isbn/1430210788-L.jpg"
    },
    {
      title: "Getting to Yes",
      author: "Roger Fisher",
      cover: "https://covers.openlibrary.org/b/isbn/0143118757-L.jpg"
    },
    {
      title: "The Undercover Economist",
      author: "Tim Harford",
      cover: "https://covers.openlibrary.org/b/isbn/0345494016-L.jpg"
    },
    {
      title: "The Vanishing Middle Class",
      author: "Peter Temin",
      cover: "https://covers.openlibrary.org/b/isbn/0262036150-L.jpg"
    },
    {
      title: "Renegades of the Empire",
      author: "Michael Drummond",
      cover: "https://covers.openlibrary.org/b/isbn/0609605364-L.jpg"
    },
    {
      title: "Talking Nets",
      author: "James A. Anderson",
      cover: "https://covers.openlibrary.org/b/isbn/0262511118-L.jpg"
    },
    {
      title: "A Random Walk Down Wall Street",
      author: "Burton G. Malkiel",
      cover: "https://covers.openlibrary.org/b/isbn/0393330338-L.jpg"
    },
    {
      title: "American Prometheus",
      author: "Kai Bird & Martin J. Sherwin",
      cover: "https://covers.openlibrary.org/b/isbn/0375726268-L.jpg"
    },
    {
      title: "Mathematics and the Imagination",
      author: "Edward Kasner",
      cover: "https://covers.openlibrary.org/b/isbn/0486417034-L.jpg"
    },
    {
      title: "Idea Man",
      author: "Paul Allen",
      cover: "https://covers.openlibrary.org/b/isbn/1591845378-L.jpg"
    },
    {
      title: "The Foundation Trilogy",
      author: "Isaac Asimov",
      cover: "https://covers.openlibrary.org/b/isbn/0553293354-L.jpg"
    },
    {
      title: "The Dragons of Eden",
      author: "Carl Sagan",
      cover: "https://covers.openlibrary.org/b/isbn/0345346297-L.jpg"
    },
    {
      title: "Confessions of an Economic Hit Man",
      author: "John Perkins",
      cover: "https://covers.openlibrary.org/b/isbn/0452287081-L.jpg"
    },
    {
      title: "The Ascent of Money",
      author: "Niall Ferguson",
      cover: "https://covers.openlibrary.org/b/isbn/0143116177-L.jpg"
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      cover: "https://covers.openlibrary.org/b/isbn/0062316095-L.jpg"
    },
    {
      title: "WTF: What's the Future and Why It's Up to Us",
      author: "Tim O'Reilly",
      cover: "https://books.google.com/books/content?id=zMo-DwAAQBAJ&printsec=frontcover&img=1&zoom=1"
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      cover: "https://covers.openlibrary.org/b/isbn/0060850523-L.jpg"
    },
    {
      title: "Boss Life",
      author: "Paul Downs",
      cover: "https://covers.openlibrary.org/b/isbn/0399185291-L.jpg"
    },
    {
      title: "Snow Crash",
      author: "Neal Stephenson",
      cover: "https://covers.openlibrary.org/b/isbn/0553380958-L.jpg"
    },
    {
      title: "The Wright Brothers",
      author: "David McCullough",
      cover: "https://covers.openlibrary.org/b/isbn/1476728747-L.jpg"
    },
    {
      title: "The Three-Body Problem",
      author: "Cixin Liu",
      cover: "https://covers.openlibrary.org/b/isbn/0765382032-L.jpg"
    },
    {
      title: "Shoe Dog",
      author: "Phil Knight",
      cover: "https://covers.openlibrary.org/b/isbn/1501135910-L.jpg"
    },
    {
      title: "Still Surprised",
      author: "Warren Bennis",
      cover: "https://covers.openlibrary.org/b/isbn/0470432381-L.jpg"
    },
    {
      title: "Rogue Warrior",
      author: "Richard Marcinko",
      cover: "https://covers.openlibrary.org/b/isbn/0671795937-L.jpg"
    },
    {
      title: "Creativity, Inc.",
      author: "Ed Catmull & Amy Wallace",
      cover: "https://covers.openlibrary.org/b/isbn/0812993012-L.jpg"
    },
    {
      title: "Flash Boys",
      author: "Michael Lewis",
      cover: "https://covers.openlibrary.org/b/isbn/0393351599-L.jpg"
    },
    {
      title: "The Language Instinct",
      author: "Steven Pinker",
      cover: "https://covers.openlibrary.org/b/isbn/0061336467-L.jpg"
    },
    {
      title: "Lust for Life",
      author: "Irving Stone",
      cover: "https://covers.openlibrary.org/b/isbn/0452262496-L.jpg"
    },
    {
      title: "Bad Blood",
      author: "John Carreyrou",
      cover: "https://covers.openlibrary.org/b/isbn/152473165X-L.jpg"
    },
    {
      title: "When Genius Failed",
      author: "Roger Lowenstein",
      cover: "https://covers.openlibrary.org/b/isbn/0375758259-L.jpg"
    },
    {
      title: "The Farmer from Merna",
      author: "Karl Schriftgiesser",
      cover: "/images/books/farmer-from-merna.jpg"
    },
    {
      title: "Secrets of Sand Hill Road",
      author: "Scott Kupor",
      cover: "/images/books/secrets-of-sand-hill-road.jpg"
    },
    {
      title: "Car Guys vs. Bean Counters",
      author: "Bob Lutz",
      cover: "/images/books/car-guys-vs-bean-counters.jpg"
    },
    {
      title: "Born Standing Up",
      author: "Steve Martin",
      cover: "https://covers.openlibrary.org/b/isbn/1416553657-L.jpg"
    },
    {
      title: "Onward",
      author: "Howard Schultz",
      cover: "/images/books/onward.jpg"
    },
    {
      title: "God's Debris",
      author: "Scott Adams",
      cover: "https://covers.openlibrary.org/b/isbn/0740747878-L.jpg"
    },
    {
      title: "Brick by Brick",
      author: "David Robertson & Bill Breen",
      cover: "/images/books/brick-by-brick.jpg"
    },
    {
      title: "Who Is Michael Ovitz?",
      author: "Michael Ovitz",
      cover: "https://covers.openlibrary.org/b/isbn/1591845548-L.jpg"
    },
    {
      title: "The Hard Thing About Hard Things",
      author: "Ben Horowitz",
      cover: "https://covers.openlibrary.org/b/isbn/0062273205-L.jpg"
    },
    {
      title: "Capitalism Without Capital",
      author: "Jonathan Haskel & Stian Westlake",
      cover: "/images/books/capitalism-without-capital.jpg"
    },
    {
      title: "The Idea Factory",
      author: "Jon Gertner",
      cover: "https://covers.openlibrary.org/b/isbn/0143122797-L.jpg"
    },
    {
      title: "Predictable Revenue",
      author: "Aaron Ross",
      cover: "https://covers.openlibrary.org/b/isbn/0984380213-L.jpg"
    },
    {
      title: "Predictable Prospecting",
      author: "Marylou Tyler & Jeremy Donovan",
      cover: "/images/books/predictable-prospecting.jpg"
    },
    {
      title: "Positioning: The Battle For Your Mind",
      author: "Al Ries & Jack Trout",
      cover: "https://covers.openlibrary.org/b/isbn/0071373586-L.jpg"
    },
    {
      title: "Lean Customer Development",
      author: "Cindy Alvarez",
      cover: "https://covers.openlibrary.org/b/isbn/1449356354-L.jpg"
    },
    {
      title: "Running Lean",
      author: "Ash Maurya",
      cover: "https://covers.openlibrary.org/b/isbn/1449305172-L.jpg"
    },
    {
      title: "SPIN Selling",
      author: "Neil Rackham",
      cover: "https://covers.openlibrary.org/b/isbn/0070511136-L.jpg"
    },
    {
      title: "Win Bigly",
      author: "Scott Adams",
      cover: "/images/books/win-bigly.jpg"
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://covers.openlibrary.org/b/isbn/0441172717-L.jpg"
    },
    {
      title: "Leonardo da Vinci",
      author: "Walter Isaacson",
      cover: "https://covers.openlibrary.org/b/isbn/1501139150-L.jpg"
    },
    {
      title: "Barbarian Days",
      author: "William Finnegan",
      cover: "https://covers.openlibrary.org/b/isbn/0143109391-L.jpg"
    },
    {
      title: "Loonshots",
      author: "Safi Bahcall",
      cover: "https://covers.openlibrary.org/b/isbn/1250185963-L.jpg"
    },
    {
      title: "How I Raised Myself From Failure To Success In Selling",
      author: "Frank Bettger",
      cover: "https://covers.openlibrary.org/b/isbn/067179437X-L.jpg"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">
          {title}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              cover={book.cover}
              usePlaceholder={book.usePlaceholder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
