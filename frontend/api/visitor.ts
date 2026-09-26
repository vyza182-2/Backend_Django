type VisitorRequest = {
  method?: string;
  body?: {
    name?: string;
    mobile?: string;
    email?: string;
    website?: string;
  };
};

type VisitorResponse = {
  status: (code: number) => VisitorResponse;
  json: (body: { error?: string; ok?: boolean }) => void;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);

export default async function handler(req: VisitorRequest, res: VisitorResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name = "", mobile = "", email = "", website = "" } = req.body ?? {};

  if (website || name.trim().length < 2 || !/^[+0-9][0-9\s()-]{7,19}$/.test(mobile.trim()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "Invalid visitor details" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return res.status(500).json({ error: "Telegram integration is not configured" });
  }

  const message = [
    "New portfolio visitor",
    "",
    `Name: ${escapeHtml(name.trim())}`,
    `Mobile: ${escapeHtml(mobile.trim())}`,
    `Email: ${escapeHtml(email.trim())}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  });

  if (!telegramResponse.ok) {
    return res.status(502).json({ error: "Telegram notification failed" });
  }

  return res.status(200).json({ ok: true });
}
