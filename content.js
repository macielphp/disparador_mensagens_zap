//aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script de conteúdo carregado no WhatsApp Web");

    //Função para enviar uma mensagem
    function enviarMensagem(texto) {

        // Selecionar a caixa de mensagem (o seletor pode variar com atualizações do WhatsApp Web)
        const caixaMensagem = document.querySelector('[contenteditable="true"]');
        if (caixaMensagem) {
            caixaMensagem.focus();
            //Inserio texto na Caixa
            document.execCommand('insertText', false, texto);

            // Tenta encontrar o botão de envio (geralmente identificado por um ícone  de envio)
            const botaoEnviar = document.querySelector('span[data-icon="send"]');
            if (botaoEnviar) {
                botaoEnviar.click();
                console.log(`Mensagem enviada: ${texto}`);
            } else {
                console.error("Botão de envio não encontrado");	
            }

            
        }
    }

    // Aguarda alguns segundos para garantir que os elementos carregam
    setTimeout(() => {
        enviarMensagem("Olá, tudo bem?");   
    }, 5000);
})