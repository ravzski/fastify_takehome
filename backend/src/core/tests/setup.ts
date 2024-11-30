import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn()
}))

beforeEach(() => {
  jest.clearAllMocks()
})

expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling
    return {
      pass,
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
    }
  },
})

// Global test timeout
jest.setTimeout(10000)

export const prismaMock = mockDeep<PrismaClient>()
export type PrismaMock = DeepMockProxy<PrismaClient>