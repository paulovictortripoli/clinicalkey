'use server'
import axios from 'axios'
import * as crypto from 'crypto'

export async function sapLoginClient (cpf: string, password: string) {
  const credentials = `{"CompanyDB": "${process.env.NEXT_SAP_COMPANY_DB}",   "UserName": "${process.env.NEXT_SAP_COMPANY_USERNAME}"}`

  const servicePassword = process.env.NEXT_SAP_COMPANY_PASSWORD!
  const serviceLayer = process.env.NEXT_SAP_SERVICE_LAYER!

  const encodedCredentials = btoa(`${credentials}:${servicePassword}`)

  const md5 = crypto.createHash('md5').update(password).digest('hex')
  const md5Password = md5.toUpperCase()
  const cpfNumber = Number(cpf)

  try {
    const response = await axios.get(`${serviceLayer}/b1s/v2/sml.svc/INO_ASSOCIANTES_FROM_LOGINParameters(CPF_IN='${cpfNumber}',PASS_IN='${md5Password}')/INO_ASSOCIANTES_FROM_LOGIN`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    })

    return response.data
  } catch (error: any) {
    return error
  }
}
