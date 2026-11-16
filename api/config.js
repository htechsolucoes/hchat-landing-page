// Entrega para a página as configurações que ficam nas variáveis de ambiente do Vercel.
// Só coloque aqui o que pode ser público (o ID do vídeo é público).

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json({
    youtubeId: (process.env.YOUTUBE_ID || "").trim(),
  });
};
