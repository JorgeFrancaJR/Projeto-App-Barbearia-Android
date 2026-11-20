export function calcularTotal(servicos) {
  return servicos.reduce(
    (total, servico) => total + servico.preco,
    0
  );
}