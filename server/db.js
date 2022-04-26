const {Pool} = require('pg');

const pool = new Pool({
    user: 'qubpmhxqriuxta',
    host: 'ec2-52-48-159-67.eu-west-1.compute.amazonaws.com',
    database: 'd61t86uau2qukg',
    password: 'dec5c783c8b24bff8b66d66b833d2571a4a4ee49c1cabe8b2e4ca931b8b80707',
    port: 5432,
    // connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});


module.exports = pool;