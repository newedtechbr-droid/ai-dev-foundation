# Landing page · Viver de Coliving

Página de vendas estática (HTML + CSS + JS puro), pronta para o Cloudflare Pages. Não precisa de build.

## Antes de publicar: preencha `config.js`

| Campo | O que colocar |
| --- | --- |
| `checkoutCurso` | Link de checkout do Plano 1 (R$ 597) |
| `checkoutComunidade` | Link de checkout do Plano 2 (R$ 997) |
| `whatsappNumero` | Número com DDI e DDD, só dígitos. Ex.: `5548999999999` |

Enquanto os links estiverem vazios, os botões rolam até os planos. Parâmetros `utm_*`, `src`, `sck`, `fbclid` e `gclid` da URL são repassados automaticamente para o checkout.

## Publicar no Cloudflare Pages

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → este repositório.
2. Build command: vazio. Build output directory: `landing`.
3. Depois do primeiro deploy: Custom domains → adicione o seu domínio.

## Ver localmente

```bash
cd landing && python3 -m http.server 8080
```

Abra http://localhost:8080.
