# Sistema de Fechamento — Planet Automotive Group

Fechamento diário e relatório semanal da oficina. Substitui a planilha semanal "Garage", que está travada por senha.

## O que faz

- **Dia:** cada ticket/invoice tem labor, peças e misc.
  - Tax de 6,25% só sobre as peças.
  - Custo das peças automático, editável: custo fixo do serviço + peças ÷ 1,40.
  - Pagamento em cash, cartão, cheque, in house ou dividido.
  - Também registra as inspeções e as entradas/saídas do caixa.
- **Semana:**
  - lucro da semana, payroll e deduções;
  - quantos invoices, inspeções e trocas de óleo;
  - quantas vezes cada serviço foi feito;
  - conferência do caixa e resumo por dia.
- **In House:** saldo de cada conta, atrasado das semanas anteriores, pagamentos recebidos e extrato.
- **Exportar:** PDF (dia, semana, in house) e Excel com várias abas.
- **Backup:** download/restauração em JSON e importação das planilhas `.xls` antigas (DAY(1)…DAY(7) + TOTALS).

## Cálculo (igual à planilha antiga)

| Item | Fórmula |
|---|---|
| Tax | Peças × 6,25% |
| Total invoice | Labor + Peças + Misc + Tax |
| Custo das peças | custo do serviço (ex.: SOC $95 → $31) + Peças ÷ 1,40 |
| Inspeções | qtd × $35, custo qtd × $12 (fora do total de invoices) |
| Lucro da semana | Total invoices + Misc cash in − Custo peças − Tax − Payroll − Deduções |

Todos os valores (tax, markup, preço e custo da inspeção, catálogo de serviços, contas in house e funcionários) podem ser alterados em **Ajustes**.

## Uso

O app é um site estático (`index.html`), sem build. Para publicar, ative o GitHub Pages: Settings → Pages → branch `main`, pasta `/`.

Para sincronizar entre aparelhos, cole a URL de um Firebase Realtime Database em **Ajustes → Banco de dados**. Os dados ficam em `/closing`. Sem Firebase, os dados ficam salvos só no aparelho; use o backup JSON.
