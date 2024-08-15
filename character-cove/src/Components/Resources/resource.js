import React from 'react'
import './resource.css'

const Resource = () => {
    // Data structure to store the resources grouped by categories
  const resources = {
    'General OC Resources': [
      { name: 'Personality Traits', url: 'https://www.yourdictionary.com/articles/examples-personality-traits', icon: '🔗' },
      { name: 'Human Face Claims', url: 'https://www.instagram.com/fchelping/', icon: '👤' },
      { name: 'Animal Face Claims', url: 'https://pin.it/5lKEmlNt3', icon: '👤' },
      { name: 'Doc Resources', url: 'https://www.tumblr.com/tragedynoir/716616400061497344/about-welcome-to-tragedynoir-a-blog-dedicated-to?source=share', icon: '📄' },
    ],
    'Humanoid OC Resources': [
      { name: 'Conventional Naming', url: 'https://www.behindthename.com/', icon: '🔗' },
      { name: 'Boy Names', url: 'https://www.familyeducation.com/baby-names/boy', icon: '🔗' },
      { name: 'Girl Names', url: 'https://www.familyeducation.com/baby-names/girl', icon: '🔗' },
      { name: 'Unique Naming', url: 'https://www.thebump.com/b/unique-baby-names', icon: '🔗' },
      { name: 'Surnames', url: 'https://surnames.behindthename.com/', icon: '🔗' },
      { name: 'Decades Clothing', url: 'https://fashionhistory.fitnyc.edu/source-database/', icon: '🔗' },
    ],
    'Animal OC Resources': [
      { name: 'Conventional Naming', url: 'https://mythopedia.com/name-generator/creature-names', icon: '🔗' },
      { name: 'Unique Naming', url: 'https://www.rocklou.com/creaturenamegenerator', icon: '🔗' },
      { name: 'Mythical Species', url: 'https://parade.com/1056247/marynliles/mythical-creatures/', icon: '🔗' },
      { name: 'Legendary Species', url: 'https://en.wikipedia.org/wiki/List_of_legendary_creatures_by_type', icon: '🔗' },
      { name: 'Introduced Species', url: 'https://en.wikipedia.org/wiki/List_of_introduced_species', icon: '🔗' },

    ],
    'Universe Resources': [
      { name: 'Naming Generator', url: 'https://www.fantasynamegenerators.com/realm-names.php', icon: '🔗' },
      { name: 'Map Making', url: 'https://inkarnate.com/', icon: '🗺️' },
      { name: 'General Worldbuilding', url: 'https://www.reddit.com/r/worldbuilding/comments/5fd2qp/template_resources/', icon: '🌍' },
    ],
  };

  return (
    <div className="resource-list-container">
      {Object.keys(resources).map((category, index) => (
        <div key={index} className="resource-category">
          <h2 className="resource-category-title">{category}</h2>
          <ul className="resource-items">
            {resources[category].map((resource, idx) => (
              <li key={idx} className="resource-item">
                <span className="resource-icon">{resource.icon}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Resource