export const fortunes = [
  "To HODL or not to HODL, that is the question 🎭",
  "All that glisters is not gold... but Bitcoin might be ✨",
  "A fool and his crypto are soon parted 🃏",
  "Thou dost buy high and sell low, as is tradition 📉",
  "Fair is foul, and foul is fair, in the crypto market's lair 🌪️",
  "What's done cannot be undone... unless thou hast thy seed phrase 🔐",
  "The course of true love never did run smooth, nor crypto prices 💔",
  "Some are born great, some achieve greatness, some buy shitcoins 🚀",
  "Neither a borrower nor a lender be, but DeFi lending is tempting 🏦",
  "This above all: to thine own keys be true 🗝️",
  "Lord, what fools these mortals be when they ape into meme coins! 🐒",
  "All the world's a stage, and all crypto traders merely players 🎪",
  "Better three hours too soon than a minute too late to buy the dip 📈",
  "Brevity is the soul of wit, and thy portfolio 📊",
  "There is method in madness, but not in thy trading strategy 🤪",
  "The lady doth protest too much, methinks... about her paper hands 📃",
  "Double, double toil and trouble; crypto burn and portfolio bubble! 🔥",
  "Now is the winter of our discontent... made glorious summer by ETH 🌞",
  "A rose by any other name would smell as sweet, but rugpulls still stink 🌹",
  "Cowards die many times before their deaths; diamond hands die but once 💎",
  "If music be the food of love, play on; if hopium be the food of hodlers... 🎵",
  "Give every man thy ear, but few thy voice, and none thy private keys 👂",
  "The fault, dear Brutus, is not in our stars, but in our stop losses ⭐",
  "To be, or not to be liquidated, that is the question ⚰️",
  "Wherefore art thou, moon? Deny thy bear market and refuse thy name! 🌙",
  "A horse! A horse! My kingdom for a horse... or one Bitcoin 🐎",
  "Et tu, Brute? Even you sold at the bottom? 🗡️",
  "Cry 'Havoc!' and let slip the dogs of FOMO 🐕",
  "Friends, Romans, countrymen, lend me your ears... and your leverage 👥",
  "Beware the Ides of March... and all other trading days 📅"
];

export function getRandomFortune(): string {
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

export function getFortuneOfTheDay(): string {
  // Use date as seed for consistent daily fortune
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fortunes[seed % fortunes.length];
} 