const logradouroC = document.querySelector("#logradouro");
const complementoC = document.querySelector("#complemento");
const bairroC = document.querySelector("#bairro");
const localidadeC = document.querySelector("#localidade");


// Função para buscar o CEP e atualizar a interface
async function buscarCep() {
    // Obtém o valor do campo de entrada do CEP
    const cep = document.getElementById('cep').value;
    const cepValue = document.getElementById('cep-value');
    const erroMsg = document.getElementById('erro'); // Elemento para exibir mensagens de erro
    const dados = document.getElementById('dados'); // Elemento para exibir os dados
    const showWarning = (msg) => {
        document.querySelector("#aviso").innerHTML = msg
    }
    


    // Limpa mensagens de erro e dados anteriores
    erroMsg.innerHTML = '';
    dados.innerHTML = '';

    // Verifica se o CEP tem 8 dígitos
    if (cep.length === 8) {
        try {
            showWarning("Carregando...")
            // Faz a requisição para a API de CEP
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
          

            // Verifica se houve um erro na resposta
            if (data.erro) {
                showWarning("")
                container.style.display = "none";
                erroMsg.textContent = 'CEP não encontrado';
            } else {
                cepValue.classList.add('cep-color');
                // Atualiza os elementos com os dados retornados
                cepValue.textContent = ` CEP: ${data.cep}`
                logradouroC.textContent = ` ${data.logradouro}`;
                complementoC.textContent = `Complemento: ${data.complemento || 'N/A'}`;
                bairroC.textContent = `${data.bairro}`;
                localidadeC.textContent = `${data.localidade} - ${data.uf}`;
                showWarning("")

                // Exibe o container com os dados do CEP
                container.style.display = "flex";
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            showWarning("")
            container.style.display = "none";
            erroMsg.textContent = 'Erro ao buscar o CEP';
        }
    } else {
        showWarning("")
        erroMsg.textContent = 'CEP deve ter 8 dígitos e ser numérico';
    }

}

// Seleciona o container e o botão
const container = document.querySelector(".container");
const addBtn = document.querySelector("#btn");

// Adiciona um evento de clique ao botão
addBtn.addEventListener("click", () => {
    // Chama a função para buscar o CEP  
    buscarCep();
    cep.value = "";
    container.style.display = "none";
});

cep.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        buscarCep();
        cep.value = "";
        container.style.display = "none";
    }
});
