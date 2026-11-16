# Landing Central de Conversas · Vercel

## Arquivos
```
index.html        página
api/lead.js       recebe o formulário e repassa para o webhook
api/config.js     entrega o ID do vídeo para a página
```
Suba a pasta inteira, com a pasta `api/`. Sem ela o formulário e o vídeo não funcionam.

## Variáveis de ambiente (Vercel → Project → Settings → Environment Variables)

| Nome          | Exemplo                                  | Para quê                                 |
|---------------|------------------------------------------|------------------------------------------|
| `WEBHOOK_URL` | `https://seu-n8n.com/webhook/abc123`     | Para onde os leads são enviados (POST JSON) |
| `YOUTUBE_ID`  | `iSxgJweqAx0`                            | Vídeo do topo da página                  |

Depois de criar ou alterar uma variável, faça um **Redeploy** para ela valer.

## Como testar
1. Abra a página publicada: o vídeo deve aparecer com a capa.
2. Preencha o formulário: deve aparecer "Recebemos seus dados!" e o lead chegar no webhook.
3. Se der erro, veja em Vercel → Project → Logs. A mensagem "WEBHOOK_URL não configurada" indica que falta a variável.

## Outras configurações (dentro do index.html, bloco CONFIG)
- `WHATSAPP_NUMBER`: número com DDI e DDD, só os números, para os botões de WhatsApp.
- `MOSTRAR_BLACK` / `BLACK_FIM`: liga, desliga e define o fim da faixa de Black Friday.
