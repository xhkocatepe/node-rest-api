/** Getir Database Connection Information */
const server = 'ds249623.mlab.com:49623';
const db = 'getir-case-study';
const user = 'dbUser';
const password = 'dbPassword1';

const sUrl = `mongodb://${user}:${password}@${server}/${db}`;
const oDBInfo = { url: sUrl };

module.exports = oDBInfo;