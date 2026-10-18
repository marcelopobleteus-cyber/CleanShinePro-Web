// Lo que incluye cada servicio. La fuente es CleaningIQ (Pricing › Add-ons, columna services.includes, migracion 0061):
// la pagina la pide al abrir (getServiceIncludes). Esta copia es solo el respaldo para la pagina pre-renderizada
// y por si CleaningIQ no responde; se mantiene igual a la de CleaningIQ.
import { useEffect, useState } from 'react';
import { getServiceIncludes } from '../services/cleaningiq';

const L = (en, es) => ({ en, es });

export const FALLBACK_INCLUDES = {
    'residential.standard': [
        L('Dust furniture, shelves and decor', 'Sacudir muebles, repisas y adornos'),
        L('Clean mirrors and glass surfaces', 'Limpiar espejos y superficies de vidrio'),
        L('Vacuum carpets and mop floors', 'Aspirar alfombras y trapear pisos'),
        L('Empty trash and replace liners', 'Vaciar basureros y cambiar bolsas'),
        L('Kitchen: countertops, sink and stovetop', 'Cocina: mesones, lavaplatos y cubierta de la estufa'),
        L('Kitchen: outside of appliances and cabinets', 'Cocina: exterior de electrodomésticos y gabinetes'),
        L('Bathrooms: toilet, shower/tub, sink, mirrors and faucets', 'Baños: inodoro, ducha o tina, lavamanos, espejos y llaves'),
        L('Bedrooms: make beds', 'Dormitorios: hacer las camas'),
    ],
    'residential.deep': [
        L('Everything in Standard Cleaning', 'Todo lo de la limpieza estándar'),
        L('Baseboards, door frames and window frames by hand', 'Zócalos, marcos de puertas y de ventanas a mano'),
        L('Ceiling fans and light fixtures', 'Ventiladores de techo y lámparas'),
        L('Blinds, slat by slat', 'Persianas, lámina por lámina'),
        L('Cobwebs in corners and ceilings', 'Telarañas en esquinas y techos'),
        L('Bathroom tile and grout scrubbed', 'Azulejos y juntas del baño restregados'),
        L('Light switches and door handles', 'Interruptores y manillas de puertas'),
        L('Inside oven and microwave (1 kitchen)', 'Horno y microondas por dentro (1 cocina)'),
    ],
    'residential.move_out': [
        L('Everything in Deep Cleaning', 'Todo lo de la limpieza profunda'),
        L('Inside all cabinets and drawers', 'Dentro de todos los gabinetes y cajones'),
        L('Inside fridge, oven and microwave (1 kitchen)', 'Refrigerador, horno y microondas por dentro (1 cocina)'),
        L('Inside closets and wardrobes', 'Dentro de clósets y roperos'),
        L('Window tracks', 'Rieles de ventanas'),
        L('Final check: no trash or items left behind', 'Revisión final: sin basura ni objetos olvidados'),
    ],
    'residential.construction': [
        L('Fine dust removed from all surfaces, walls and ceilings (HEPA vacuum)', 'Polvo fino en todas las superficies, paredes y techos (aspiradora HEPA)'),
        L('Labels, protective plastic and tape removed', 'Retiro de etiquetas, plásticos protectores y cinta'),
        L('Paint splatter, putty and glue removed from floors and glass', 'Retiro de pintura, masilla y pegamento de pisos y vidrios'),
        L('Vents and visible ducts dusted', 'Rejillas y ductos visibles sin polvo'),
        L('Kitchen and bathrooms cleaned', 'Limpieza de cocina y baños'),
        L('Floors vacuumed and mopped', 'Pisos aspirados y trapeados'),
    ],
    short_term: [
        L('Full clean of kitchen, bathrooms, bedrooms and living areas', 'Limpieza completa de cocina, baños, dormitorios y áreas comunes'),
        L('Wash and change sheets and towels (on-site washer and dryer)', 'Lavar y cambiar sábanas y toallas (con la lavadora y secadora de la propiedad)'),
        L('Wash the dishes', 'Lavar los platos'),
        L('Inside microwave', 'Microondas por dentro'),
        L('Remove leftover food from the fridge', 'Sacar la comida que quedó en el refrigerador'),
        L('Restock toilet paper, soap, shampoo and coffee (host supplies)', 'Reponer papel higiénico, jabón, champú y café (insumos del anfitrión)'),
        L('Stage pillows, towels and remote', 'Ordenar cojines, toallas y control remoto'),
        L('Check for damage and forgotten items and report to the host', 'Revisar daños y objetos olvidados e informar al anfitrión'),
        L('Disinfect high-touch points', 'Desinfectar los puntos de mayor contacto'),
    ],
    'commercial.office': [
        L('Empty trash at desks and common areas', 'Vaciar basureros de escritorios y áreas comunes'),
        L('Restrooms disinfected and restocked', 'Baños desinfectados y con insumos repuestos'),
        L('Break room and kitchen', 'Sala de descanso y cocina'),
        L('Entrance glass doors', 'Puertas de vidrio de la entrada'),
        L('Disinfect high-touch points (handles, switches)', 'Desinfectar puntos de contacto (manillas, interruptores)'),
        L('Vacuum and mop hallways and reception', 'Aspirar y trapear pasillos y recepción'),
    ],
    'commercial.medical': [
        L('Exam and treatment room surfaces and high-touch points disinfected', 'Desinfección de superficies y puntos de contacto en salas de atención'),
        L('Waiting room: chairs, counters and glass', 'Sala de espera: sillas, mesones y vidrios'),
        L('Restrooms disinfected and restocked', 'Baños desinfectados y con insumos repuestos'),
        L('Empty regular trash (no medical or sharps waste)', 'Vaciar basura común (sin residuos médicos ni cortopunzantes)'),
        L('Floors vacuumed and mopped with disinfectant', 'Pisos aspirados y trapeados con desinfectante'),
    ],
    'commercial.retail': [
        L('Sales floor vacuumed and mopped', 'Piso de ventas aspirado y trapeado'),
        L('Entrance doors, windows and display glass', 'Puertas de entrada, ventanas y vitrinas'),
        L('Shelves and displays dusted', 'Repisas y exhibidores sin polvo'),
        L('Checkout counters disinfected', 'Cajas desinfectadas'),
        L('Fitting rooms and restrooms', 'Probadores y baños'),
        L('Empty trash', 'Vaciar basureros'),
    ],
    'commercial.construction': [
        L('Construction dust removed from surfaces, fixtures and vents', 'Polvo de obra en superficies, artefactos y rejillas'),
        L('Stickers, tape and protective film removed', 'Retiro de adhesivos, cinta y película protectora'),
        L('Windows, glass and frames', 'Ventanas, vidrios y marcos'),
        L('Restrooms and break areas', 'Baños y áreas de descanso'),
        L('Floors vacuumed and mopped', 'Pisos aspirados y trapeados'),
        L('Small debris and trash bagged (no hauling of large debris)', 'Escombro menor y basura embolsados (sin retiro de escombro grande)'),
    ],
};

// Clave del servicio, igual que engine_key en CleaningIQ
export const includesKey = (main, sub) => (main === 'short_term' || !sub ? main : `${main}.${sub}`);

// Lista de CleaningIQ (al abrir la pagina) con el respaldo mientras llega
export function useServiceIncludes() {
    const [map, setMap] = useState(FALLBACK_INCLUDES);
    useEffect(() => {
        let alive = true;
        getServiceIncludes().then((m) => { if (alive && m && Object.keys(m).length) setMap({ ...FALLBACK_INCLUDES, ...m }); }).catch(() => {});
        return () => { alive = false; };
    }, []);
    return map;
}

export const textOf = (item, lang) => (typeof item === 'string' ? item : (lang === 'es' ? item?.es || item?.en : item?.en)) || '';
