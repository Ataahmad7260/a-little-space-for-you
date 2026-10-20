export interface Poem {
  id: string;
  title: string;
  subtitle: string;
  lines: string[];
  meaning: string;
  tag: string;
  accentColor?: string;
}

export interface StarMessage {
  id: number;
  message: string;
  iconName: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  caption: string;
  tag: string;
}

export interface SiteContent {
  siteConfig: {
    title: string;
    recipientName: string;
    authorSignature: string;
    bgMusicTitle: string;
    customAudioUrl?: string;
  };
  hero: {
    typewriterLines: string[];
    buttonText: string;
    subtext: string;
  };
  poetrySection: {
    sectionTitle: string;
    sectionSubtitle: string;
    poems: Poem[];
  };
  surpriseSection: {
    openWhenSad: {
      envelopeLabel: string;
      title: string;
      letter: string[];
      note: string;
    };
    catchAStar: {
      title: string;
      subtitle: string;
      stars: StarMessage[];
      completedRewardMessage: string;
    };
    memoryWall: {
      title: string;
      subtitle: string;
      addPrompt: string;
      initialMemories: MemoryItem[];
    };
  };
  finalPage: {
    title: string;
    subtitle: string;
    poemLines: string[];
    signoff: string;
    restartButtonText: string;
  };
}

export const content: SiteContent = {
  siteConfig: {
    title: "A Little Space for You ♡",
    recipientName: "My Dearest Friend",
    authorSignature: "Made with words, especially for you. ♡",
    bgMusicTitle: "Nocturne in Lavender (Ambient Piano)",
    // You can optionally add a direct URL to an MP3 here, or leave empty to use our generative ambient piano synthesizer
    customAudioUrl: "",
  },
  hero: {
    typewriterLines: [
      "In a world of passing faces,",
      "Some souls feel like familiar places."
    ],
    buttonText: "There's Something for You ♡",
    subtext: "A quiet digital universe created just for you. Take your time and wander softly."
  },
  poetrySection: {
    sectionTitle: "Words I Never Said",
    sectionSubtitle: "Some feelings don't need loud declarations — they only need a safe, quiet place to breathe.",
    poems: [
      {
        id: "somewhere-between-us",
        title: "Somewhere Between Us",
        subtitle: "A silent understanding",
        lines: [
          "Not every bond demands a name,",
          "Not every warmth requires a flame.",
          "Some people simply come to stay,",
          "And make the silence feel okay."
        ],
        meaning: "For the quiet comfort of existing together without needing to explain anything at all.",
        tag: "Comfort",
        accentColor: "#B8A9CD"
      },
      {
        id: "a-little-reminder",
        title: "A Little Reminder",
        subtitle: "For the overcast afternoons",
        lines: [
          "When days grow heavy, skies turn grey,",
          "I hope your smile still finds its way.",
          "And when the world forgets your worth,",
          "Remember, you are someone's warmth."
        ],
        meaning: "Because even on days when you feel unnoticed, your quiet kindness carries light to others.",
        tag: "Reassurance",
        accentColor: "#E8B4C8"
      },
      {
        id: "unspoken",
        title: "Unspoken",
        subtitle: "Whispered to the night sky",
        lines: [
          "Some words are better left unsaid,",
          "Yet find their home inside our head.",
          "And somewhere in the quiet blue,",
          "A little thought returns to you."
        ],
        meaning: "Gentle thoughts that drift into the night sky, silently rooting for your happiness.",
        tag: "Gratitude",
        accentColor: "#FFE8A3"
      },
      {
        id: "your-existence",
        title: "Your Existence",
        subtitle: "The beauty of simply being",
        lines: [
          "You need not shine like distant stars,",
          "Or hide the beauty in your scars.",
          "The world is brighter than you knew,",
          "Simply because it carries you."
        ],
        meaning: "You never need to put on a show or prove your worth. Being you is already more than enough.",
        tag: "Grace",
        accentColor: "#F5F0FF"
      }
    ]
  },
  surpriseSection: {
    openWhenSad: {
      envelopeLabel: "For when days feel a little heavier than usual",
      title: "Open When You're Sad",
      letter: [
        "Even the moon disappears sometimes,",
        "Yet nobody questions its return.",
        "You are allowed to have darker nights,",
        "Without forgetting how to shine."
      ],
      note: "Close your eyes for three seconds. Take a gentle breath in, and let it go. You don't have to carry every storm alone."
    },
    catchAStar: {
      title: "Catch a Star",
      subtitle: "Click the shimmering stars scattered across the celestial sky to reveal gentle affirmations.",
      stars: [
        { id: 1, message: "You bring a quiet peace into rooms simply by being there.", iconName: "Sparkles" },
        { id: 2, message: "Your genuine kindness doesn't go unnoticed, even when people forget to say it.", iconName: "Heart" },
        { id: 3, message: "It is completely okay to rest without needing to earn it.", iconName: "Moon" },
        { id: 4, message: "You have navigated through 100% of your hardest days so far.", iconName: "Sun" },
        { id: 5, message: "Somewhere in the world, someone smiled because of something you did.", iconName: "Smile" },
        { id: 6, message: "You don't need to know the entire staircase to take the next gentle step.", iconName: "Compass" },
        { id: 7, message: "Your laughter is one of the most sincere, comforting sounds.", iconName: "Music" },
        { id: 8, message: "You deserve the very same patience and gentle love you shower onto others.", iconName: "Flower2" }
      ],
      completedRewardMessage: "You've caught all the stars in this sky. Make a silent wish tonight — may the universe hold it gently for you. ✨"
    },
    memoryWall: {
      title: "Memory Wall",
      subtitle: "Quiet snapshots of shared laughter, quiet hours, and moments worth holding onto.",
      addPrompt: "Have a favorite moment or photo you'd like to remember? Pin it here.",
      initialMemories: [
        {
          id: "mem-1",
          title: "Underneath the Starry Sky",
          date: "A quiet summer evening",
          location: "By the calm water",
          image: "/images/memory-lake.jpg",
          caption: "Sitting by the calm lake, watching constellations drift by. Time felt completely paused.",
          tag: "Starlight"
        },
        {
          id: "mem-2",
          title: "Raindrops & Warm Coffee",
          date: "An overcast Sunday",
          location: "Our favorite corner table",
          image: "/images/memory-cafe.jpg",
          caption: "Steaming mugs, quiet laughter, and watching raindrops slide down the window pane.",
          tag: "Warmth"
        },
        {
          id: "mem-3",
          title: "Lavender Fields at Dusk",
          date: "Golden hour sunset",
          location: "The hill trail",
          image: "/images/memory-hills.jpg",
          caption: "Fireflies waking up in the lavender valley as the sun dipped behind the purple ridges.",
          tag: "Sunset"
        }
      ]
    }
  },
  finalPage: {
    title: "Before You Leave",
    subtitle: "A closing bloom of gratitude",
    poemLines: [
      "If life were a book of endless pages,",
      "And people were words I came across,",
      "You'd be the line I'd read twice,",
      "Afraid its meaning might get lost."
    ],
    signoff: "Made with words, especially for you. ♡",
    restartButtonText: "Read It Again"
  }
};
