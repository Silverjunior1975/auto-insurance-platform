import type DatabaseCtor from "better-sqlite3";

type SqliteDatabase = InstanceType<typeof DatabaseCtor>;
import { neon } from "@neondatabase/serverless";
import { mkdirSync } from "fs";
import { existsSync } from "fs";
import path from "path";

import { Lead, LeadInput, LeadStatus } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const dbFile = path.join(dataDir, "leads.db");
const databaseUrl = process.env.DATABASE_URL;
const usePostgres = Boolean(databaseUrl);
const sql = databaseUrl ? neon(databaseUrl) : null;

let postgresReady: Promise<void> | null = null;
let sqliteReady = false;
let sqliteDb: SqliteDatabase | null = null;

async function ensureSqliteDb(): Promise<SqliteDatabase> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production. Configure Postgres for deployed environments.");
  }

  if (sqliteDb) {
    return sqliteDb;
  }

  const { default: BetterSqlite } = await import("better-sqlite3");

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const db = new BetterSqlite(dbFile);
  if (!sqliteReady) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        car_year INTEGER NOT NULL,
        car_make TEXT NOT NULL,
        car_model TEXT NOT NULL,
        current_insurance TEXT NOT NULL,
        need_sr22 TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    sqliteReady = true;
  }
  sqliteDb = db;
  return db;
}

async function ensurePostgresDb() {
  if (!sql) return;
  if (!postgresReady) {
    postgresReady = sql`
      CREATE TABLE IF NOT EXISTS leads (
        id BIGSERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        car_year INTEGER NOT NULL,
        car_make TEXT NOT NULL,
        car_model TEXT NOT NULL,
        current_insurance TEXT NOT NULL,
        need_sr22 TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `.then(() => undefined);
  }
  await postgresReady;
}

const leadSelect = `
  SELECT
    id,
    full_name as fullName,
    phone,
    email,
    zip_code as zipCode,
    car_year as carYear,
    car_make as carMake,
    car_model as carModel,
    current_insurance as currentInsurance,
    need_sr22 as needSr22,
    status,
    created_at as createdAt
  FROM leads
`;

interface PgLeadRow {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  carYear: number;
  carMake: string;
  carModel: string;
  currentInsurance: "Yes" | "No";
  needSr22: "Yes" | "No";
  status: LeadStatus;
  createdAt: string | Date;
}

export async function createLead(input: LeadInput): Promise<number> {
  const normalized = {
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    zipCode: input.zipCode.trim(),
    carYear: input.carYear,
    carMake: input.carMake.trim(),
    carModel: input.carModel.trim(),
    currentInsurance: input.currentInsurance,
    needSr22: input.needSr22
  };

  if (usePostgres && sql) {
    await ensurePostgresDb();
    const rows = (await sql`
      INSERT INTO leads (
        full_name, phone, email, zip_code, car_year, car_make, car_model, current_insurance, need_sr22, status
      ) VALUES (
        ${normalized.fullName}, ${normalized.phone}, ${normalized.email}, ${normalized.zipCode}, ${normalized.carYear},
        ${normalized.carMake}, ${normalized.carModel}, ${normalized.currentInsurance}, ${normalized.needSr22}, 'New'
      )
      RETURNING id
    `) as Array<{ id: number }>;
    return rows[0].id;
  }

  const db = await ensureSqliteDb();
  const stmt = db.prepare(`
      INSERT INTO leads (
        full_name,
        phone,
        email,
        zip_code,
        car_year,
        car_make,
        car_model,
        current_insurance,
        need_sr22,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')
    `);
  const result = stmt.run(
    normalized.fullName,
    normalized.phone,
    normalized.email,
    normalized.zipCode,
    normalized.carYear,
    normalized.carMake,
    normalized.carModel,
    normalized.currentInsurance,
    normalized.needSr22
  );
  return Number(result.lastInsertRowid);
}

export async function getLeads(): Promise<Lead[]> {
  if (usePostgres && sql) {
    await ensurePostgresDb();
    const rows = (await sql`
      SELECT
        id,
        full_name as "fullName",
        phone,
        email,
        zip_code as "zipCode",
        car_year as "carYear",
        car_make as "carMake",
        car_model as "carModel",
        current_insurance as "currentInsurance",
        need_sr22 as "needSr22",
        status,
        created_at as "createdAt"
      FROM leads
      ORDER BY created_at DESC, id DESC
    `) as PgLeadRow[];
    return rows.map((row) => ({ ...row, createdAt: new Date(row.createdAt).toISOString() })) as Lead[];
  }

  const db = await ensureSqliteDb();
  const stmt = db.prepare(`${leadSelect} ORDER BY datetime(created_at) DESC, id DESC`);
  return stmt.all() as Lead[];
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<void> {
  if (usePostgres && sql) {
    await ensurePostgresDb();
    await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
    return;
  }

  const db = await ensureSqliteDb();
  const stmt = db.prepare("UPDATE leads SET status = ? WHERE id = ?");
  stmt.run(status, id);
}
