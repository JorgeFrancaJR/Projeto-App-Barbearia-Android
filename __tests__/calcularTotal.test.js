import { calcularTotal } from '../calcularTotal';

describe('Testes da função calcularTotal', () => {

  test('Calcula o preço de um serviço', () => {
    const servicos = [
      { nome: 'Corte', preco: 35 }
    ];

    expect(calcularTotal(servicos)).toBe(35);
  });

  test('Calcula o preço de vários serviços', () => {
    const servicos = [
      { nome: 'Corte', preco: 35 },
      { nome: 'Barba', preco: 25 },
      { nome: 'Sobrancelha', preco: 10 }
    ];

    expect(calcularTotal(servicos)).toBe(70);
  });

  test('Retorna zero quando não existem serviços', () => {
    const servicos = [];

    expect(calcularTotal(servicos)).toBe(0);
  });

});