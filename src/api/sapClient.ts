import axios from 'axios';
import CryptoJS from 'crypto-js'; 

export async function sapLoginClient(cpf: string, password: string) {
  const credentials = `{"CompanyDB": "SBO_SBCPRD",   "UserName": "manager"}`;
  //const credentials = `{"CompanyDB": "${process.env.REACT_APP_SAP_COMPANY_DB}",   "UserName": "${process.env.REACT_APP_SAP_COMPANY_USERNAME}"}`;
  const servicePassword = "sap@123"; //process.env.REACT_APP_SAP_COMPANY_PASSWORD!;
  const serviceLayer = "https://saphasbc-sl.skyinone.net:50000"; //process.env.REACT_APP_SAP_SERVICE_LAYER!;
  
  const encodedCredentials = btoa(`${credentials}:${servicePassword}`);

  
  const md5Password = CryptoJS.MD5(password).toString().toUpperCase(); // Gera o hash MD5 da senha
  const cpfNumber = Number(cpf);

  try {
    console.log('Service Layer:', serviceLayer);
    console.log('Service L2:', process.env.REACT_APP_SAP_SERVICE_LAYER!);
  console.log('Service s:', servicePassword);
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${serviceLayer}/b1s/v2/sml.svc/INO_ASSOCIANTES_FROM_LOGINParameters(CPF_IN='${cpfNumber}',PASS_IN='${md5Password}')/INO_ASSOCIANTES_FROM_LOGIN`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    });

    return response.data; 
  } catch (error: any) {
    throw new Error('Erro ao tentar fazer login.'); 
  }
}
