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

  const sapUrl = "https://saphasbc-sl.skyinone.net:50000/b1s/v2/sml.svc/INO_ASSOCIANTES_FROM_LOGINParameters(CPF_IN='88116263404',PASS_IN='DFE0E3B49D849211922CF47D5ECC9533')/INO_ASSOCIANTES_FROM_LOGIN";
const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(sapUrl)}`;


    const response = await axios.get(
      allOriginsUrl
      //`https://cors-anywhere.herokuapp.com/${serviceLayer}/b1s/v2/sml.svc/INO_ASSOCIANTES_FROM_LOGINParameters(CPF_IN='${cpfNumber}',PASS_IN='${md5Password}')/INO_ASSOCIANTES_FROM_LOGIN`
      , {
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    });

    return response.data; 
  } catch (error: any) {
    throw new Error('Erro ao tentar fazer login.'); 
  }
}
