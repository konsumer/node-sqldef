/* global describe, it, expect */

const sqldef = require('./')

describe('sqldef', () => {
  it('should be able to do a basic diff', async () => {
    expect(await sqldef('postgres', 'A', 'B')).toBe('postgres')
  })
})
