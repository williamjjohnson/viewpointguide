import Airtable from 'airtable'

export default async function handler(req, res) {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_TOKEN
  }).base('appHgMDzbmVdLV2yH')

  const records = await base('obs')
    .select()
    .firstPage()

  res.status(200).json(
    records.map(r => ({
      id: r.id,
      fields: r.fields
    }))
  )
}
