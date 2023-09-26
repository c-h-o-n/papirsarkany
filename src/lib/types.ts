import { Products } from '@prisma/client'

export type Kite = Products & {
  category: 'Egyzsinoros'
  properties: {
    isBeginner: boolean,
    size: string,
    material: string,
    windSpeed: string,
  }
} 

export type Rods = Products & {
  properties: {
  }
}