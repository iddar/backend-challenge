const fetch = require('node-fetch')

/** @typedef {Object} user
 * @property {String} _id
 * @property {String} about
 * @property {String} address
 * @property {Number} age
 * @property {String} balance
 * @property {String} company
 * @property {String} email
 * @property {String} eyeColor
 * @property {String} favoriteFruit
 * @property {Array<friend>} friends
 * @property {String} greeting
 * @property {String} guid
 * @property {Number} index
 * @property {Boolean} isActive
 * @property {String} latitude
 * @property {String} longitude
 * @property {fullname} name
 * @property {String} phone
 * @property {String} picture
 * @property {Array<Number>} range
 * @property {String} registered
 * @property {Array<String>} tags
 */

 /** @typedef {Object} fullname
 * @property {String} first
 * @property {String} last
 */

 /** @typedef {Object} friend
 * @property {Number} id
 * @property {String} name
 */

module.exports = {
  /**
   * getAPI
   * @returns {Promise<Array<user>>}
   */
  async usersCollection () {
    const blob = await fetch('http://localhost:8000/')
    const data = await blob.json()
    console.log('hola soy data',data)
    return data
  }
}
//npm run dev # run the "dev" package script
// Digest: sha256:1fe27b334443793af98d7eb320ad6f9f30fcc9bc068f545cb46ec01cefe9c8ee
// Status: Downloaded newer image for postgres:latest
// docker.io/library/postgres:latest
// docker-compose up -d