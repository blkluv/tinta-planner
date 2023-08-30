"use server"

import { Lead } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getClientById } from "@/app/(server-side)/services/getClients";
import { LeadFormValues } from "./main-form";
import { createLead, deleteLead, editLead, getData, getLead, updateStatus } from "@/services/leadService";

export type DataLead = {
    id: string
    company: string
    status: string
    priority: string
    value: number
    contactName: string
    contactEmail: string
    contactPhone: string
    lastContact: Date | null
    clientId: number
    clientSlug: string
    serviceId: string
    serviceName: string
    serviceEmoji: string
    createdAt: Date
    updatedAt: Date
    website: string
    linkedin: string
    instagram: string
    twitter: string
}
  

export async function getDataLead(id: string): Promise<DataLead | null>{
    const lead= await getLead(id)
    if (!lead) return null
    const client= lead.client
    if (!client) return null

    const data: DataLead= getData(lead, lead.service, client.slug)
    return data
}

export async function create(data: LeadFormValues): Promise<Lead | null> {       
    const created= await createLead(data)

    const client= await getClientById(created.clientId)
    if (!client) return created

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return created
}
  
export async function update(id: string, data: LeadFormValues): Promise<Lead | null> {  
    const edited= await editLead(id, data)    

    const client= await getClientById(edited.clientId)
    if (!client) return edited

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    
    return edited
}

export async function updateStatusAction(id: string, status: string): Promise<Lead | null> {  
    const updated= await updateStatus(id, status)
    if (!updated) return updated

    const client= await getClientById(updated.clientId)
    if (!client) return updated

    revalidatePath(`/agency/${client.slug}/crm/leads`)
    
    return updated
}


export async function eliminate(id: string): Promise<Lead | null> {    
    const deleted= await deleteLead(id)

    if (!deleted?.clientId) return deleted

    const client= await getClientById(deleted.clientId)
    if (!client) return deleted

    revalidatePath(`/agency/${client.slug}/crm/leads`)

    return deleted
}

