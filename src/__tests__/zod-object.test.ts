import { it, describe, expect } from 'vitest'

import { z } from '../zod-schemas'

describe('Object Schema', () => {
  it('should validate an object', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })
    expect(personSchema.parse({ name: 'Alice', age: 30 })).toEqual({
      name: 'Alice',
      age: 30,
    })
  })

  it('should throw an error for a non-object', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })
    expect(() => personSchema.parse('not an object')).toThrow('Not an object')
  })

  it('should throw an error for a missing field', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })

    expect(() => personSchema.parse({ name: 'Alice' })).toThrow(
      'Missing field age'
    )
  })

  it('should handle nested objects', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.number(),
      }),
    })

    expect(
      personSchema.parse({
        name: 'Alice',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'NY',
          zip: 12345,
        },
      })
    ).toEqual({
      name: 'Alice',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        zip: 12345,
      },
    })
  })
})
