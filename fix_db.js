import pg from 'pg';
const { Client } = pg;

async function fix() {
  const client = new Client({ connectionString: 'postgres://postgres:!@PostgresDB_Nrt_Inc@31.97.63.93:5432/aashayein' });
  try {
    await client.connect();
    
    // Drop ALL dynamic_pages related tables
    const tablesRes = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
        AND (tablename LIKE 'dynamic_pages%' OR tablename LIKE '_dynamic_pages%');
    `);
    
    for (let row of tablesRes.rows) {
      console.log('Dropping table:', row.tablename);
      await client.query(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE`);
    }
    
    // Drop ALL dynamic_pages related enum types
    const typesRes = await client.query(`
      SELECT typname 
      FROM pg_type 
      WHERE typname LIKE 'enum_dynamic_pages%' 
         OR typname LIKE 'enum__dynamic_pages%';
    `);
    
    for (let row of typesRes.rows) {
      console.log('Dropping type:', row.typname);
      await client.query(`DROP TYPE IF EXISTS "${row.typname}" CASCADE`);
    }
    
    console.log('Done! All dynamic_pages tables and enums cleared. Now run: npm run dev');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

fix();
