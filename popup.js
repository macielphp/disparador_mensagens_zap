console.log("Script popup.js carregado");

// Array para armazenar os números
let numeros = JSON.parse(localStorage.getItem('numeros')) || [];
let envioIntervalo;

// Função para formatar o número
function formatarNumero(numero) {
    console.log("Formatando número:", numero);
    // Remove espaços, traços, parênteses e outros caracteres não numéricos
    let numeroFormatado = numero.replace(/[\s\-\(\)]/g, '');

    // Se o número não começar com "55", adiciona-o
    if (!numeroFormatado.startsWith('55')) {
        numeroFormatado = `55${numeroFormatado}`;
    }
    // Adiciona o sinal de + antes do número
    return `+${numeroFormatado}`;
}

// Função para validar o número de celular
function validarNumero(numero) {
    console.log("Validando número:", numero);
    // Expressão regular para validar o número de celular
    const regex = /^\+55\d{2}9?\d{8}$/;
    return regex.test(numero);
}

// Função para renderizar a lista de números
function renderizarLista() {
    console.log("Renderizando lista de números");
    const listaNumeros = document.querySelector('.secao_envio__lista-numeros');
    listaNumeros.innerHTML = ''; // Limpa a lista atual

    numeros.forEach(numero => {
        const item = document.createElement('li');
        item.className = 'lista-numeros__item';
        item.innerHTML = `<span>${numero}</span>
        <a class="btnRemoverNum" aria-label="Remover número">X</a>`;
        listaNumeros.appendChild(item);

        // Adiciona evento de remoção ao botão 'X'
        item.querySelector('.btnRemoverNum').addEventListener('click', () => {
            removerNumero(numero);
        });
    });
}

// Função para adicionar número à lista
function adicionarNumero(numero) {
    console.log("Adicionando número:", numero);
    if (validarNumero(numero)) {
        numeros.push(numero);
        localStorage.setItem('numeros', JSON.stringify(numeros));
        renderizarLista();
    } else {
        alert(`${numero} não é um número de celular válido`);
    }
}

// Função para remover número da lista
function removerNumero(numero) {
    console.log("Removendo número:", numero);
    numeros = numeros.filter(num => num !== numero);
    localStorage.setItem('numeros', JSON.stringify(numeros));
    renderizarLista();
}

// Função para enviar mensagens
function enviarMensagens() {
    console.log("Iniciando envio de mensagens");
    const mensagem = document.getElementById('mensagem').value;
    const intervalo = parseInt(document.getElementById('intervalo-envio').value) * 1000; // Converte para milissegundos

    if (!mensagem) {
        alert('Por favor, insira uma mensagem.');
        return;
    }

    if (isNaN(intervalo) || intervalo <= 0) {
        alert('Por favor, insira um intervalo válido.');
        return;
    }

    let index = 0;

    envioIntervalo = setInterval(() => {
        if (index < numeros.length) {
            console.log(`Enviando mensagem para ${numeros[index]}: ${mensagem}`);
            enviarMensagemParaNumero(numeros[index], mensagem);
            index++;
        } else {
            clearInterval(envioIntervalo);
        }
    }, intervalo);
}

// Função para esperar por um elemento no DOM
function esperarElemento(seletor, callback, intervalo = 100, tentativas = 50) {
    const verificarElemento = setInterval(() => {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            clearInterval(verificarElemento);
            callback(elemento);
        } else if (--tentativas <= 0) {
            clearInterval(verificarElemento);
            console.error(`Elemento ${seletor} não encontrado após várias tentativas.`);
        }
    }, intervalo);
}

// Função para enviar mensagem para um número específico
function enviarMensagemParaNumero(numero, mensagem) {
    console.log(`Tentando enviar mensagem para ${numero}`);
    // Espera pelo botão "Nova conversa"
    esperarElemento('button[title="Nova conversa"]', (novaConversaBtn) => {
        novaConversaBtn.click();
        console.log('Botão "Nova conversa" clicado.');

        // Insere o número no campo de pesquisa
        setTimeout(() => {
            const inputNumero = document.querySelector('div[aria-label="Pesquisar nome ou número"]');
            if (inputNumero) {
                inputNumero.textContent = numero;
                inputNumero.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`Número ${numero} inserido no campo de pesquisa.`);

                // Seleciona o contato
                setTimeout(() => {
                    const contato = document.querySelector(`span[title="${numero}"]`);
                    if (contato) {
                        contato.click();
                        console.log(`Contato ${numero} selecionado.`);

                        // Insere a mensagem no campo de texto
                        setTimeout(() => {
                            const inputMensagem = document.querySelector('div[contenteditable="true"][data-tab="6"]');
                            if (inputMensagem) {
                                inputMensagem.textContent = mensagem;
                                inputMensagem.dispatchEvent(new Event('input', { bubbles: true }));
                                console.log(`Mensagem "${mensagem}" inserida no campo de texto.`);

                                // Clica no botão de enviar
                                setTimeout(() => {
                                    const enviarBtn = document.querySelector('button[aria-label="Enviar"]');
                                    if (enviarBtn) {
                                        enviarBtn.click();
                                        console.log(`Mensagem enviada para ${numero}`);
                                    } else {
                                        console.error('Botão "Enviar" não encontrado.');
                                    }
                                }, 1000);
                            } else {
                                console.error('Campo de mensagem não encontrado.');
                            }
                        }, 1000);
                    } else {
                        console.error(`Contato ${numero} não encontrado.`);
                    }
                }, 2000);
            } else {
                console.error('Campo de pesquisa de número não encontrado.');
            }
        }, 2000);
    });
}

// Função para parar o envio de mensagens
function pararEnvio() {
    clearInterval(envioIntervalo);
}

// Evento para detectar a tecla "enter" no campo de número
document.getElementById('input-numero').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        const numeroFormatado = formatarNumero(this.value);
        if (numeroFormatado) {
            adicionarNumero(numeroFormatado);
            this.value = ''; // Limpa o campo de entrada
        }
    }
});

// Evento para iniciar o envio de mensagens
document.getElementById('btnDisparar').addEventListener('click', enviarMensagens);

// Evento para parar o envio de mensagens
document.getElementById('btnPararDisparo').addEventListener('click', pararEnvio);

// Seleciona os elementos
const inputCsv = document.getElementById('input-csv');
const labelCsv = document.getElementById('label-csv');

// Adiciona um evento para detectar a seleção de arquivo
inputCsv.addEventListener('change', function() {
    if (inputCsv.files.length > 0) {
        // Altera a cor de fundo do botão
        labelCsv.classList.add('carregado');
        // Aqui você pode adicionar a lógica para processar o arquivo, se necessário
    }
});

// Seleciona os elementos
const inputXlsx = document.getElementById('input-xlsx');
const labelXlsx = document.getElementById('label-xlsx');

// Adiciona um evento para detectar a seleção de arquivo
inputXlsx.addEventListener('change', function() {
    if (inputXlsx.files.length > 0) {
        // Altera a cor de fundo do botão
        labelXlsx.classList.add('carregado');
        // Aqui você pode adicionar a lógica para processar o arquivo, se necessário
    }
});

// Renderiza a lista ao carregar a página
renderizarLista();