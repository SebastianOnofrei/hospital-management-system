import "./AboutUs.css";

// Data Arrays
const heroData = {
  title: "Lorem Ipsum Dolor",
  subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
};

const storyParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
  "Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
];

const statsData = [
  { value: "100+", label: "Lorem Ipsum" },
  { value: "250+", label: "Dolor Sit" },
  { value: "99%", label: "Amet Consectetur" },
  { value: "24/7", label: "Adipiscing Elit" }
];

const valuesData = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    linkText: "Lorem Link",
    linkUrl: "#"
  },
  {
    id: 2,
    title: "Dolor Sit",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    linkText: "Lorem Link",
    linkUrl: "#"
  },
  {
    id: 3,
    title: "Amet Consectetur",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    linkText: "Lorem Link",
    linkUrl: "#"
  }
];

const AboutUs = () => {
  return (
    <section className="about-us-container">
      {/* Hero / Header Section */}
      <div className="about-us-hero">
        <h1>{heroData.title}</h1>
        <p className="hero-subtitle">{heroData.subtitle}</p>
      </div>

      {/* Main Story & Image Section */}
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Lorem Ipsum</h2>
          {storyParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <a href="#more">Lorem Link</a>
        </div>
        <div className="about-us-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
            alt="Lorem Ipsum" 
            className="about-us-image"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="about-us-stats">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Core Values Section */}
      <div className="about-us-values">
        <h2>Lorem Ipsum Dolor</h2>
        <div className="values-grid">
          {valuesData.map((item) => (
            <div key={item.id} className="value-card">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href={item.linkUrl}>{item.linkText}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;