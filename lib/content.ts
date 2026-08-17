// ============================================================================
//  THE PEOPLE BEHIND THE DEGREE  —  CONTENT CONFIGURATION
// ----------------------------------------------------------------------------
//  This is the ONLY file you need to personalize.
//  Everything shown across the experience pulls from here.
//
//  Replace anything in [BRACKETS] with your own words.
//  Never invent personal facts — only the graduate knows the real stories.
// ============================================================================

export interface Milestone {
  year: string;
  title: string;
  description: string;
  reflection: string;
}

export interface GiftItem {
  concept: string;
  message: string[];
}

export interface UnsaidStatement {
  text: string;
}

export interface Lesson {
  title: string;
  note: string;
}

export interface ParentSection {
  name: string;
  openingLine: string;
  highlight: string;
  letterTitle: string;
  memories: { label: string; placeholder: string }[];
  finalMessage: string;
}

export interface TributeContent {
  graduateName: string;
  parents: {
    mother: ParentSection;
    father: ParentSection;
  };
  milestones: Milestone[];
  gifts: GiftItem[];
  unsaid: UnsaidStatement[];
  lessons: Lesson[];
  finalMessage: string;
}

export const tributeContent: TributeContent = {
  // ---------------------------------------------------------------- GRADUATE
  graduateName: 'Ekundayo King',

  // ----------------------------------------------------------------- PARENTS
  parents: {
    mother: {
      name: 'Ekundayo Folake',
      openingLine:
        'There are things I could spend hours trying to explain, but eventually every explanation comes back to the same thing:',
      highlight: 'YOU WERE THERE.',
      letterTitle: 'For Mom',
      memories: [
        { label: 'A memory I keep coming back to', placeholder: '[WRITE A REAL MEMORY HERE]' },
        { label: 'Something you taught me without words', placeholder: '[WRITE WHAT SHE TAUGHT YOU]' },
        { label: 'A sacrifice I only understood later', placeholder: '[DESCRIBE A SACRIFICE SHE MADE]' },
        { label: 'A moment that still makes me smile', placeholder: '[WRITE A FUNNY OR WARM MEMORY]' },
        { label: 'Something I want you to know', placeholder: '[WRITE SOMETHING YOU WANT HER TO KNOW]' },
      ],
      finalMessage: '[WRITE YOUR FINAL MESSAGE TO MOM]',
    },
    father: {
      name: 'Ekundayo Olalekan',
      openingLine:
        'I don\u2019t know if I have ever properly explained what it means to have someone believe in you.',
      highlight: 'Not just when you\u2019re winning.\nEspecially when you\u2019re not.',
      letterTitle: 'For Dad',
      memories: [
        { label: 'A lesson you taught me', placeholder: '[WRITE A LESSON HE TAUGHT YOU]' },
        { label: 'A sacrifice I didn\u2019t see at the time', placeholder: '[DESCRIBE A SACRIFICE HE MADE]' },
        { label: 'Advice I still carry', placeholder: '[WRITE ADVICE HE GAVE YOU]' },
        { label: 'A moment that still makes me smile', placeholder: '[WRITE A FUNNY OR WARM MEMORY]' },
        { label: 'Something I want you to know', placeholder: '[WRITE SOMETHING YOU WANT HIM TO KNOW]' },
      ],
      finalMessage: '[WRITE YOUR FINAL MESSAGE TO DAD]',
    },
  },

  // --------------------------------------------------------------- MILESTONES
  // The journey. Keep these in chronological order.
  milestones: [
    {
      year: '[YEAR]',
      title: 'The beginning',
      description: 'The day everything started.',
      reflection:
        'You had no idea who I would become. You showed up anyway. That was the first decision that made everything else possible.',
    },
    {
      year: '[YEAR]',
      title: 'First day of school',
      description: 'A small hand in a bigger world.',
      reflection:
        'I don\u2019t remember what you were thinking that morning. Maybe you were excited. Maybe you were nervous. Maybe you were wondering who I would become. But I know one thing. You showed up.',
    },
    {
      year: '[YEAR]',
      title: 'A childhood that held',
      description: 'The years that shaped how I see the world.',
      reflection:
        'You built a world where I could be curious without being afraid. I didn\u2019t know then how rare that was. I know it now.',
    },
    {
      year: '[YEAR]',
      title: 'Secondary school',
      description: 'Finding out what I was made of.',
      reflection:
        'There were days I doubted myself. You never did. Or if you did, you never let me see it.',
    },
    {
      year: '[YEAR]',
      title: 'University',
      description: 'The door you helped me walk through.',
      reflection:
        'This wasn\u2019t just my threshold. It was the one you spent years clearing the way toward.',
    },
    {
      year: '[YEAR]',
      title: 'The hard season',
      description: 'The period I almost gave up.',
      reflection:
        'You didn\u2019t fix it for me. You didn\u2019t try to. You just stayed close enough that I never felt I was carrying it alone.',
    },
    {
      year: '[YEAR]',
      title: 'Finding Computer Science',
      description: 'The moment the path became clear.',
      reflection:
        'When I told you what I wanted to study, you didn\u2019t ask whether it was practical. You asked what I loved about it. That answer told me everything.',
    },
    {
      year: '[YEAR]',
      title: 'Graduation',
      description: 'The day a degree became more than a piece of paper.',
      reflection:
        'They called my name. I walked across a stage. But the applause I heard in my heart was yours.',
    },
  ],

  // ------------------------------------------------------- THE THINGS YOU GAVE
  gifts: [
    {
      concept: 'Sacrifice',
      message: [
        'Some things you gave me had a price.',
        'I may not have understood the price at the time.',
        'But I understand it now.',
        'Every opportunity has a story behind it.',
        'And behind many of mine were two people willing to give more than I knew how to ask for.',
      ],
    },
    {
      concept: 'Patience',
      message: [
        'You waited for me.',
        'Through the slow lessons. Through the mistakes I made twice. Through the years I couldn\u2019t see what you could see.',
        'You never rushed me into becoming someone I wasn\u2019t ready to be.',
      ],
    },
    {
      concept: 'Love',
      message: [
        'Not the loud kind.',
        'The kind that shows up in packed lunches and quiet worries and staying up until I got home safe.',
        'The kind that doesn\u2019t need to announce itself because it never left.',
      ],
    },
    {
      concept: 'Protection',
      message: [
        'You shielded me from things I still don\u2019t know about.',
        'And you let me fall just enough to learn how to stand back up.',
        'That balance is something I may never fully master. But I learned it watching you.',
      ],
    },
    {
      concept: 'Opportunity',
      message: [
        'You opened doors you never got to walk through yourself.',
        'And you never once made me feel guilty for walking through them.',
      ],
    },
    {
      concept: 'Discipline',
      message: [
        'You taught me that showing up matters more than showing off.',
        'That consistency is quieter than talent, and more valuable.',
        'I carried that into every late night of code that wouldn\u2019t compile.',
      ],
    },
    {
      concept: 'Courage',
      message: [
        'You didn\u2019t tell me to be brave.',
        'You showed me what brave looks like.',
        'And then you let me find my own version of it.',
      ],
    },
    {
      concept: 'Guidance',
      message: [
        'You didn\u2019t give me a map.',
        'You taught me how to read one.',
        'And when I chose a road you wouldn\u2019t have picked, you wished me well and watched me go.',
      ],
    },
    {
      concept: 'Faith',
      message: [
        'You believed in me before I had given you anything to believe in.',
        'That kind of faith isn\u2019t reasonable.',
        'It\u2019s the most unreasonable, generous, life-changing thing anyone has ever done for me.',
      ],
    },
    {
      concept: 'Home',
      message: [
        'You made \u201Chome\u201D mean something.',
        'Not a place. A feeling.',
        'The feeling that no matter how far I go, there is a door that is always open and two people who are always glad I came back.',
      ],
    },
  ],

  // -------------------------------------------------- THINGS I NEVER SAID ENOUGH
  unsaid: [
    { text: 'Thank you for believing in me when I wasn\u2019t sure about myself.' },
    { text: 'Thank you for making sacrifices I didn\u2019t fully understand at the time.' },
    { text: 'Thank you for being proud of me before I had anything impressive to show.' },
    { text: 'Thank you for letting me become my own person without ever making me feel alone.' },
    { text: 'Thank you for making \u201Chome\u201D mean something.' },
    { text: 'Thank you for the things you never asked to be thanked for.' },
  ],

  // ------------------------------------------------------ WHAT I CARRY FORWARD
  lessons: [
    { title: 'Be persistent.', note: 'The bug gets fixed. Eventually.' },
    { title: 'Be kind.', note: 'Everyone is debugging something you can\u2019t see.' },
    { title: 'Work hard.', note: 'Talent is a head start. Effort is the whole race.' },
    { title: 'Keep learning.', note: 'The field changes. So does life. Stay curious.' },
    { title: 'Don\u2019t give up.', note: 'You taught me this before I ever wrote a line of code.' },
    { title: 'Take care of people.', note: 'Code is for machines. Care is for humans.' },
    { title: 'Stay humble.', note: 'There is always someone who knows more. That\u2019s a gift.' },
    { title: 'Keep going.', note: 'The next chapter doesn\u2019t write itself.' },
  ],

  // --------------------------------------------------------------- FINAL WORDS
  finalMessage: 'Thank you for helping me become who I am.',
};

// ----------------------------------------------------------- EASTER EGG BINARY
// "I LOVE YOU" in 8-bit ASCII binary, grouped by character.
export const loveBinary: string =
  '01001001 00100000 01001100 01001111 01010110 01000101 00100000 01011001 01001111 01010101';

export const loveBinaryDecoded: string = 'I LOVE YOU.';
