'use server'

import { redirect } from 'next/navigation'

export async function checkout(data: FormData){
    redirect(`/checkout?age-division=${data.get('age-division')}&name=${data.get('name')}&team-name=${data.get('team-name')}&number-of-stickers=${data.get('number-of-stickers')}`)
}