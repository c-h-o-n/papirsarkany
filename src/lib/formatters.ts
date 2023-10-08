import { Category } from '@prisma/client';
import { ProductCategoryMapLiterals } from './types';

export function currencyFormatter(value: number): string {
  const formatter = Intl.NumberFormat('hu', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export const ProductCategoryMap: Record<Category, ProductCategoryMapLiterals> = {
  Egyzsinoros: 'Egyzsinóros sárkány',
  PalcakRudak: 'Pálcák és rudak',
  Csovek: 'Csövek',
  Zsinorok: 'Zsinórok',
  Zsinortartok: 'Zsinórtartók',
} as const;
