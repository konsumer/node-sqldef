/* global describe, it, expect */

const sqldef = require('./')

const current = `
CREATE TABLE user (
   id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(128) DEFAULT 'konsumer'
 ) Engine=InnoDB DEFAULT CHARSET=utf8mb4;
`

const target = `
CREATE TABLE user (
   id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(128) DEFAULT 'konsumer',
   created_at DATETIME NOT NULL
 ) Engine=InnoDB DEFAULT CHARSET=utf8mb4;
`

describe('sqldef', () => {
  describe('mysql', () => {
    it('should be able to do a single-field subtractive diff', async () => {
      expect(await sqldef('mysql', current, target)).toBe('ALTER TABLE user DROP COLUMN created_at')
    })

    it('should be able to do a single-field subtractive diff', async () => {
      expect(await sqldef('mysql', current, target)).toBe('ALTER TABLE user DROP COLUMN created_at')
    })
  })

  describe('postgres', () => {
    it('should be able to do a single-field subtractive diff', async () => {
      expect(await sqldef('postgres', current, target)).toBe('ALTER TABLE user DROP COLUMN created_at')
    })

    it('should be able to do a single-field subtractive diff', async () => {
      expect(await sqldef('postgres', current, target)).toBe('ALTER TABLE user DROP COLUMN created_at')
    })
  })
})
