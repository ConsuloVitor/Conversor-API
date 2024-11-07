const apiKey = '54ec18c9e428c4ad3763aea1'; 
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; 

// Função para consulta à taxa de câmbio via API
async function getExchangeRate(daMoeda, paraMoeda){
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json(); // Aqui foi adicionado 'await'
        
        if(data.result === "success"){
            return data.conversion_rates[paraMoeda]; // Corrigido para 'conversion_rates'
        } else {
            throw new Error('Erro ao buscar taxa de câmbio');
        }
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}

// Manipulador de evento para o formulário de conversão de moedas
document.getElementById('currency-converter').addEventListener('submit', async function(event){
    event.preventDefault();
    
    // Obter valores de entradas
    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;
    
    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);
    
    if(exchangeRate){
        const converteValue = valor * exchangeRate;
        const conversao = document.getElementById('conversao');
        
        // Atualizar o conteúdo da conversão
        conversao.textContent = `Resultado: ${converteValue.toFixed(2)} ${paraMoeda}`;
    } else {
        alert('Erro ao buscar a cotação. Tente novamente.');
    }
});
