// Recebe o formulário da landing e repassa os dados para o webhook.
// O endereço do webhook fica na variável de ambiente WEBHOOK_URL do Vercel,
// então ele não aparece no código da página.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL não configurada no Vercel");
    return res.status(500).json({ ok: false, error: "Webhook não configurado" });
  }

  // O Vercel já converte o JSON do corpo; se vier como texto, converte aqui
  let lead = req.body;
  if (typeof lead === "string") {
    try { lead = JSON.parse(lead); } catch (e) { lead = null; }
  }
  if (!lead || typeof lead !== "object" || !lead.nome || !lead.whatsapp) {
    return res.status(400).json({ ok: false, error: "Dados inválidos" });
  }

  // Dados extras que só o servidor sabe
  const payload = {
    ...lead,
    ip: String(req.headers["x-forwarded-for"] || "").split(",")[0].trim(),
    recebido_em: new Date().toISOString(),
  };

  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      console.error("Webhook respondeu", resp.status, await resp.text().catch(() => ""));
      return res.status(502).json({ ok: false, error: "Falha no webhook" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao chamar o webhook:", err);
    return res.status(502).json({ ok: false, error: "Falha no webhook" });
  }
};
