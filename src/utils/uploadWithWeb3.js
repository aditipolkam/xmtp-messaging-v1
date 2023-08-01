import { Web3Storage } from 'web3.storage';

const apiToken= import.meta.env.VITE_WEB3_STORAGE_TOKEN
//console.log(apiToken)
const client = new Web3Storage({ token: apiToken });

export default async function uploadWithWeb3(file){
// Pack files into a CAR and send to web3.storage
const rootCid = await client.put([file]);
 return rootCid;
}