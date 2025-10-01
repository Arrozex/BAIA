module.exports = async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_API_KEY;   // 從 Vercel 環境變數讀取
  const CALENDAR_ID = "aforgame77@gmail.com";   // 你的日曆 ID

  const timeMin = new Date().toISOString();
  const timeMax = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID
  )}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&showDeleted=false&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.items || []);
  } catch (error) {
    res.status(500).json({ error: "抓取失敗", detail: error.message });
  }
};
