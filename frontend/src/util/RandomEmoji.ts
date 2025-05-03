// ランダム絵文字を生成する関数
export const getRandomEmoji = (id: string | number): string => {
  const emojis = [
    "🚀",
    "💡",
    "⭐",
    "🎯",
    "🔥",
    "💎",
    "🌟",
    "🎨",
    "🔮",
    "🎪",
    "🌈",
    "⚡",
    "🎲",
    "🍀",
    "🎊",
  ];
  // IDをベースにした一貫性のあるランダム選択（UUIDに対応）
  let hash = 0;
  const str = String(id);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit整数に変換
  }
  const index = Math.abs(hash) % emojis.length;
  return emojis[index];
};
