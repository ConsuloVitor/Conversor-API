const apiKey = '54ec18c9e428c4ad3763aea1';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Função para consulta à taxa de cambio via API
// ######################################################################################
async function getExchangeRate(daMoeda, paraMoeda){
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = response.json();

        if(data.result === "success"){
            return data.conversion_rate[paraMoeda];
        } else{
            throw new Error ('Erro ao buscar taxa de cambio');
        }
    }catch (error){
        console.error("Erro:", error);
        return null;
    }
}
// ######################################################################################