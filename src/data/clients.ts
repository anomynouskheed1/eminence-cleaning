import { supabase } from "@/lib/supabase";

export interface Client {
    id: string;
    name: string;
    logo?: string;
    displayOrder: number;
    published: boolean;
}

function mapRow(row: any): Client {
    return {
        id: row.id,
        name: row.name,
        logo: row.logo ?? undefined,
        displayOrder: row.display_order,
        published: row.published,
    };
}

export async function getAllClients(): Promise<Client[]> {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Error fetching clients:", error);
        return [];
    }
    return data.map(mapRow);
}