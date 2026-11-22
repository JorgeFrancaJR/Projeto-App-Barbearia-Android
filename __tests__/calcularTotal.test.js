import { calcularTotal } from '../calcularTotal';

describe('Testes da função calcularTotal', () => {

  test('Calcula o preço de um serviço', () => {
    const servicos = [
      { nome: 'Corte', preco: 35 }
    ];

    const resultado = calcularTotal(servicos);

    console.log('-------------------------');
    console.log('Teste: Um serviço');
    console.log('Serviço: Corte');
    console.log('Valor calculado: R$', resultado);

    expect(resultado).toBe(35);
  });

  test('Calcula o preço de vários serviços', () => {
    const servicos = [
      { nome: 'Corte', preco: 35 },
      { nome: 'Barba', preco: 25 },
      { nome: 'Sobrancelha', preco: 10 }
    ];

    const resultado = calcularTotal(servicos);

    console.log('-------------------------');
    console.log('Teste: Vários serviços');
    console.log('Corte: R$ 35');
    console.log('Barba: R$ 25');
    console.log('Sobrancelha: R$ 10');
    console.log('Valor total calculado: R$', resultado);

    expect(resultado).toBe(70);
  });

  test('Retorna zero quando não existem serviços', () => {
    const servicos = [];

    const resultado = calcularTotal(servicos);

    console.log('-------------------------');
    console.log('Teste: Lista vazia');
    console.log('Valor calculado: R$', resultado);

    expect(resultado).toBe(0);
  });

});