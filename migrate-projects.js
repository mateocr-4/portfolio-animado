import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { data } from './src/lib/data.js';

const envFile = fs.readFileSync('.env.local', 'utf-8');
const envUrlMatch = envFile.match(/VITE_SUPABASE_URL=(.*)/);
const envKeyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = envUrlMatch ? envUrlMatch[1].trim() : '';
const supabaseAnonKey = envKeyMatch ? envKeyMatch[1].trim() : '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log("🚀 Iniciando migración de", data.projects.length, "proyectos locales hacia Supabase...");
    
    for (const p of data.projects) {
        const payload = {
            title: p.title,
            description: p.description,
            image_url: p.image || null,
            download_url: p.leadMagnet?.fileName || null,
            hardskills: p.tags || []
        };
        
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) {
            console.error("❌ Fallo al insertar:", p.title, "-", error.message);
        } else {
            console.log("✅ Insertado con éxito:", p.title);
        }
    }
    console.log("🎉 Migración completada. ¡Tus proyectos ya están en la base de datos!");
}

migrate();
