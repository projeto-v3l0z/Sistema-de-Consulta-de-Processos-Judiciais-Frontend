import { NextResponse } from 'next/server';

const mockData = [
  {
    id: 1,
    numero: '0001-23.2025.8.26.0100',
    documento: '123.456.789-00',
    situacao: 'Ativo',
    dataAbertura: '2025-01-15',
    partes: 'Fulano vs Beltrano',
    valor: 'R$ 1.000,00'
  },
  {
    id: 2,
    numero: '0002-23.2025.8.26.0100',
    documento: '12.345.678/0001-99',
    situacao: 'Arquivado',
    dataAbertura: '2025-02-10',
    partes: 'Empresa X vs Empresa Y',
    valor: 'R$ 5.000,00'
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // filtrar por query, tribunal, etc.
  const query = searchParams.get('query');
  if (!query) {
    return NextResponse.json([]);
  }
  return NextResponse.json(mockData);
}
