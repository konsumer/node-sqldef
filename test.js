/* global describe, it, expect */

const sqldef = require('./')

const current = `
CREATE TABLE user (
   id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(128) DEFAULT 'konsumer',
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
  it('should be able to do a basic diff for mysql', async () => {
    expect(await sqldef('mysql', current, target)).toBe('ALTER TABLE user ADD COLUMN created_at datetime NOT NULL ;')
  })
})
