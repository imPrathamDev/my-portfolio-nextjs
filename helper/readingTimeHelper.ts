export default function readingTime(content: string) {
  const totalWords = content.split(" ").length;
  const wpm = 225;
  return Math.ceil(totalWords / wpm);
}
