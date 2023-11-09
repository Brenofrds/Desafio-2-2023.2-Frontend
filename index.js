$(document).ready( function () {
    //Tem vezes que eu consigo usar o JQuery e tem vezes que não funciona
    //Obtendo referência para esses elementos
    const ufSelect = document.getElementById('uf');
    const municipiosContainer = document.getElementById('municipios-container');

    // Endpoint da API do IBGE para os estados e municípios
    const ibgeApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
    const ibgeMunicipiosApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

    // Função para preencher o select com os estados
    function carregarEstados() {
        // Faz a requisição à API do IBGE
        fetch(ibgeApi)
            //Convertendo a resposta para JSON
            .then(res => res.json())
            .then(dados => {
                // Preenche o select com os estados
                dados.forEach(estado => {
                    //Elemento option para o Select
                    const option = document.createElement('option');
                    // Atribui a sigla do estado como valor da opção só para ficar organizado
                    option.value = estado.sigla;
                    // Atribui o nome do estado como conteúdo da opção
                    option.textContent = estado.nome;
                    ufSelect.appendChild(option);
                });
            })
    }

    // Função para carregar os municípios
    function carregarMunicipios(uf) {
        //Toda vez que essa função é chamada, limpa o container para receber os municípios de outro estado
        municipiosContainer.innerHTML = '';

        // Faz a requisição à API do IBGE, carrega a "UF" de acordo com qual foi selecionada
        fetch(`${ibgeMunicipiosApi}${uf}/municipios`)
            //Convertendo a resposta para JSON
            .then(res => res.json())
            .then(municipios => {
                // Cria elementos para exibir os municípios em uma grade
                const table = document.createElement('table');
                //Variavel para representar
                let row;

                municipios.forEach((municipio, index) => {
                    // Inicia uma nova linha a cada 3 municípios
                    if (index % 3 === 0) {
                        row = table.insertRow();
                    }

                    // Adiciona uma célula à linha atual
                    const cell = row.insertCell();
                    cell.textContent = `${municipio.nome}`;
                });

                // Adiciona a tabela ao container
                municipiosContainer.appendChild(table);
            })
            
    }

    // Adiciona um evento de mudança ao select de estados
    ufSelect.addEventListener('change', function () {
        // Obtém a UF selecionada a partir do valor do select
        const ufSelecionada = ufSelect.value;
        carregarMunicipios(ufSelecionada);
    });

    //Chamei a função para ela já ta carregada desde o começo 
    carregarEstados();
});