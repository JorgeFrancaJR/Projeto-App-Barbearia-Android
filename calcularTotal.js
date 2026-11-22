export function calcularTotal(servicos) {
  if (!servicos || servicos.length === 0) {
    return 0;
  }

  return servicos.reduce((total, servico) => {
    return total + servico.preco;
  }, 0);
}