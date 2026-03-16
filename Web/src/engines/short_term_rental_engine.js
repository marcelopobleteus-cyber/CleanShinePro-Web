/**
 * Short-Term Rental Engine (STR / Airbnb Specialist Turnover)
 * Realistic Operational Refactor v2.0 + Reactive Add-On Pricing
 */

// ─── STR Add-On Catalog ──────────────────────────────────────────────────────
// Each add-on is defined in labor_hours and materials_cost ONLY.
// No flat price injection — all pricing goes through the margin model.
export const STR_ADDONS = [
    {
        id: 'str_fridge',
        name: 'Interior Fridge Deep Clean',
        label: 'Interior Fridge',
        labor_hours: 0.50,
        materials_cost: 3,
        price_display: '+$~20'
    },
    {
        id: 'str_oven',
        name: 'Interior Oven Detail',
        label: 'Interior Oven',
        labor_hours: 0.60,
        materials_cost: 4,
        price_display: '+$~24'
    },
    {
        id: 'str_pet',
        name: 'Pet Hair & Dander Treatment',
        label: 'Pet Hair Treatment',
        labor_hours: 0.80,
        materials_cost: 5,
        price_display: '+$~34'
    },
    {
        id: 'str_windows',
        name: 'Interior Window Cleaning',
        label: 'Interior Windows',
        labor_hours: 0.70,
        materials_cost: 2,
        price_display: '+$~28'
    },
    {
        id: 'str_patio',
        name: 'Patio / Balcony Sweep & Wipe',
        label: 'Patio / Balcony',
        labor_hours: 0.40,
        materials_cost: 1,
        price_display: '+$~16'
    },
    {
        id: 'str_cabinets',
        name: 'Interior Cabinet Wipe-Down',
        label: 'Int. Cabinets',
        labor_hours: 0.80,
        materials_cost: 3,
        price_display: '+$~32'
    }
];

// ─── Core Engine Calculator ───────────────────────────────────────────────────
export const calculateSTREngine = (config) => {
    const { sqft, levels = 1, crewSize = 2, isRecurring, selectedAddons = [] } = config;

    const BASE_WAGE = 19;
    const REAL_HOURLY_COST = BASE_WAGE * 1.12;
    const OVERHEAD_RATE = 0.15;
    const materialsPercent = 0.10;
    const margin = isRecurring ? 0.30 : 0.22;
    const FIXED_RESTOCK_FEE = 12;

    // 1. Productivity: 300 sqft/h per cleaner
    const base_hours = sqft / (crewSize * 300);

    // 2. Operational buffers
    const laundry_eff = 0.40 * 0.6;              // 0.24h parallel efficiency model
    const level_adjustment = levels > 1 ? 0.25 * (levels - 1) : 0;  // 0.25h per extra level
    const restock_buffer = 0.30;
    const inspection_buffer = 0.20;

    const operational_duration = base_hours + laundry_eff + level_adjustment + restock_buffer + inspection_buffer;
    const rounded_base_duration = Math.round(operational_duration * 10) / 10;

    // 3. Add-on hours (summed from catalog, not flat $)
    const addon_hours = selectedAddons.reduce((sum, id) => {
        const found = STR_ADDONS.find(a => a.id === id);
        return sum + (found ? found.labor_hours : 0);
    }, 0);

    const addon_materials = selectedAddons.reduce((sum, id) => {
        const found = STR_ADDONS.find(a => a.id === id);
        return sum + (found ? found.materials_cost : 0);
    }, 0);

    // 4. Total duration and person-hours
    const estimated_duration = rounded_base_duration + addon_hours;
    const total_labor_hours = estimated_duration * crewSize;

    // 5. Cost model (margin preserved)
    const laborCost = total_labor_hours * REAL_HOURLY_COST;
    const materials = (laborCost * materialsPercent) + addon_materials;
    const overhead = laborCost * OVERHEAD_RATE;
    const operatingCost = laborCost + materials + overhead + FIXED_RESTOCK_FEE;
    const basePrice = operatingCost / (1 - margin);

    return {
        // Billing engine compatibility
        laborHours: total_labor_hours,
        materialsPercent,
        margin,
        engineName: 'Short-Term Rental Engine V4.0 (True Margin Model)',
        fixedFees: FIXED_RESTOCK_FEE,

        // Diagnostics / UI
        base_hours: base_hours.toFixed(2),
        addon_hours: addon_hours.toFixed(2),
        operational_adjusted_hours: estimated_duration.toFixed(2),
        crew_size: crewSize,
        estimated_duration: estimated_duration.toFixed(2),

        // Pricing state (single source of truth)
        pricingState: {
            base_hours: parseFloat(base_hours.toFixed(2)),
            addon_hours: parseFloat(addon_hours.toFixed(2)),
            total_hours: parseFloat(estimated_duration.toFixed(2)),
            labor_cost: parseFloat(laborCost.toFixed(2)),
            operating_cost: parseFloat(operatingCost.toFixed(2)),
            final_price: Math.ceil(basePrice),
            deposit_amount: Math.ceil(basePrice * 0.35)
        }
    };
};
