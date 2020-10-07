const request = require('supertest')
const app = require('../index')

describe('Test Challenge', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  test('API Status', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })

  test('Get user by id (happy path)', async () => {
    const userID = '5f7e0b7e27b5e689c1bc4095'
    const res = await request(app).get(`/users/${userID}`)
    expect(res.status).toBe(200)
    expect(res.body).toMatchSnapshot()
  })

  test.skip('Get user by id', async () => {
    const userID = '5f7e0b7e7f4f4669ef583263'
    const res = await request(app).get(`/users/${userID}`)
    expect(res.status).toBe(200)
    expect(res.body['_id']).toBe(userID)
  })

  test('Filter by Eye color', async () => {
    const userIDValid = '5f7e0b7eafac24349430d444'
    const userIDInvalid = '5f7e0b7ee6aede5fab6850c6'
    const color = 'blue'
    
    const res = await request(app).get(`/users?eyeColor=${color}`)
    expect(res.status).toBe(200)
    
    const valid = res.body.find(u => u['_id'] === userIDValid)
    expect(valid['_id']).toBe(userIDValid)
    
    const invalid = res.body.find(u => u['_id'] === userIDInvalid)
    expect(invalid).toBe(undefined)
  })

  test('Filter by tags', async () => {
    const userIDValid = '5f7e0b7e2c9a3d011186e284'
    const tags = 'officia'
    
    const res = await request(app).get(`/users?tags=${tags}`)
    expect(res.status).toBe(200)
    
    const valid = res.body.find(u => u['_id'] === userIDValid)
    expect(valid['_id']).toBe(userIDValid)
  })
})
