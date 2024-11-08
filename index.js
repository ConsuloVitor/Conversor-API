const apiKey = '54ec18c9e428c4ad3763aea1'; 
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; 

// Função para consulta à taxa de câmbio via API
async function getExchangeRate(daMoeda, paraMoeda) {
    try {
        const response = await fetch(`${apiURL}${daMoeda}`);
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();

        if (data.result === 'success' && data.conversion_rates) {
            return data.conversion_rates[paraMoeda];
        } else {
            throw new Error('Erro ao buscar taxa de câmbio');
        }
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}

// Manipulador de evento para o formulário de conversão de moedas
document.getElementById('currency-converter').addEventListener('submit', async function (event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);

    if (exchangeRate) {
        const converteValue = valor * exchangeRate;
        const result = document.getElementById('result'); // Alterado de 'conversao' para 'result'
        
        // Verifica se o elemento 'result' existe antes de tentar modificar o texto
        if (result) {
            result.textContent = `Resultado: ${converteValue.toFixed(2)} ${paraMoeda}`;
        } else {
            console.error('Elemento #result não encontrado');
        }
    } else {
        alert('Erro ao buscar a cotação. Tente novamente.');
    }
});
