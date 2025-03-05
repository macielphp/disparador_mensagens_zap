# Disparo de mensagens no WhatssApp Web

## Passo-a-passo de criação
1. Configurar o Manifesto da Extensão: Crie um arquivo manifest.json para definir as configurações da sua extensão, como nome, versão, permissões e scripts que serão injetados.

2. Injetar Scripts no WhatsApp Web: Use scripts de conteúdo para interagir com a página do WhatsApp Web. Esses scripts podem acessar e manipular o DOM da página.

3. Adicionar Funcionalidades: Desenvolva as funcionalidades específicas, como enviar mensagens automáticas, extrair informações, etc.

4. Testar a Extensão: Carregue a extensão no Chrome em modo de desenvolvedor para testá-la e depurá-la.

5. Publicar (Opcional): Se desejar, você pode publicar a extensão na Chrome Web Store.

### Passo 1: Configurar o Manifesto da Extensão
Para criar o arquivo `manifest.json` para sua extensão, siga estes passos:

1. **Crie o Arquivo**: No diretório raiz do seu repositório (dentro do VS Code), crie um novo arquivo chamado `manifest.json`.

2. **Defina a Versão do Manifesto**: Atualmente, o Chrome recomenda usar o `manifest_version` 3 para novas extensões. Isso determina a estrutura e as APIs disponíveis.

3. **Adicione Informações Básicas**: Inclua campos como `name`, `version` e `description` para identificar e descrever sua extensão.

4. **Configure as Permissões e Scripts**:
   - **Permissões**: Liste as permissões necessárias para a extensão (por exemplo, acesso à aba ativa ou à API de scripts).
   - **Host Permissions**: Especifique os sites em que sua extensão será executada (neste caso, o WhatsApp Web).
   - **Content Scripts**: Defina os scripts que serão injetados nas páginas correspondentes à URL especificada.

5. **Exemplo de `manifest.json`**:

```json
{
  "manifest_version": 3,
  "name": "Disparador de Mensagens WhatsApp",
  "version": "1.0",
  "description": "Extensão para enviar mensagens no WhatsApp Web.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://web.whatsapp.com/*"
  ],
  "content_scripts": [
    {
      "matches": ["https://web.whatsapp.com/*"],
      "js": ["content.js"]
    }
  ]
}
```

**Explicação dos Campos**:
- **manifest_version**: Indica que estamos usando a versão 3 do manifesto.
- **name** e **version**: Identificam a sua extensão e a versão atual.
- **description**: Uma breve descrição do que a extensão faz.
- **permissions**: 
  - `"activeTab"` permite acessar a aba ativa.
  - `"scripting"` é necessária para usar a API de scripts da extensão.
- **host_permissions**: Restringe a execução da extensão ao domínio do WhatsApp Web.
- **content_scripts**: Especifica que o script `content.js` será injetado em todas as páginas que correspondam à URL `https://web.whatsapp.com/*`.

6. **Personalize Conforme Necessário**:  
   - Se precisar de outros scripts ou permissões, adicione-os no arquivo.
   - Lembre-se de criar o arquivo `content.js` (ou outro nome escolhido) e colocá-lo no mesmo diretório ou na pasta correta.

Após criar e salvar o `manifest.json`, você pode carregar sua extensão no Chrome em **chrome://extensions** utilizando o modo de desenvolvedor para testá-la e fazer os ajustes necessários.

## Passo 2: Injetar Scripts no WhatsApp Web
Para injetar scripts no WhatsApp Web, você precisará criar um arquivo de conteúdo (por exemplo, `content.js`) que será automaticamente inserido na página conforme definido no seu `manifest.json`. Esse script de conteúdo terá acesso ao DOM da página e poderá realizar ações como ler, modificar elementos ou simular cliques.

### Passo a Passo para Criar e Injetar o Script

1. **Crie o Arquivo `content.js`**:  
   No mesmo repositório onde está o seu `manifest.json`, crie um arquivo chamado `content.js`.

2. **Adicione um Código Básico**:  
   Nesse arquivo, você pode escrever o código que manipula a página. Por exemplo, para simular o envio de uma mensagem, você pode usar seletores para encontrar a caixa de mensagem e o botão de enviar. Lembre-se de que o WhatsApp Web é dinâmico, então pode ser necessário aguardar que os elementos apareçam ou usar observadores para detectar mudanças no DOM.

3. **Exemplo de Código em `content.js`**:

   ```js
   // Aguarda o carregamento do DOM
   document.addEventListener('DOMContentLoaded', () => {
     console.log("Script de conteúdo carregado no WhatsApp Web");
     
     // Função para enviar uma mensagem
     function enviarMensagem(texto) {
       // Seleciona a caixa de mensagem (o seletor pode variar com atualizações do WhatsApp)
       const caixaMensagem = document.querySelector('[contenteditable="true"]');
       if (caixaMensagem) {
         caixaMensagem.focus();
         // Insere o texto na caixa
         document.execCommand('insertText', false, texto);
         
         // Tenta encontrar o botão de envio (geralmente identificado por um ícone de envio)
         const botaoEnviar = document.querySelector('span[data-icon="send"]');
         if (botaoEnviar) {
           botaoEnviar.click();
           console.log(`Mensagem enviada: ${texto}`);
         } else {
           console.error("Botão de enviar não encontrado!");
         }
       } else {
         console.error("Caixa de mensagem não encontrada!");
       }
     }
     
     // Aguarda alguns segundos para garantir que os elementos carregaram
     setTimeout(() => {
       enviarMensagem("Olá, esta é uma mensagem automática!");
     }, 5000);
   });
   ```

   **Observações Importantes**:
   - **Sincronização**: O WhatsApp Web carrega elementos de forma assíncrona. Se os elementos não estiverem disponíveis imediatamente, pode ser útil usar `setTimeout` ou um `MutationObserver` para detectar quando eles aparecem.
   - **Seletor do DOM**: Os seletores usados (como `[contenteditable="true"]` e `span[data-icon="send"]`) podem mudar com atualizações do WhatsApp. Se os elementos não forem encontrados, será necessário inspecionar a página para atualizar os seletores.
   - **Debug**: Utilize o console do navegador para verificar mensagens e eventuais erros. Isso ajudará a ajustar os seletores e a lógica do script conforme necessário.

4. **Teste a Extensão**:  
   Após criar o `content.js`, certifique-se de que o `manifest.json` esteja configurado para injetá-lo nas páginas do WhatsApp Web. Em seguida, carregue sua extensão no Chrome em **chrome://extensions** no modo de desenvolvedor e teste se o script está sendo executado conforme o esperado.

Com esses passos, você terá injetado um script de conteúdo no WhatsApp Web, permitindo interagir com a página e automatizar ações, como enviar mensagens. Se precisar de funcionalidades mais complexas, considere implementar técnicas de sincronização mais robustas (como `MutationObserver`) para lidar com a natureza dinâmica do site.


## Passo 3: Adicionar Funcionalidades



## Passo 4: Testar a Extensão



## Passo 5: Publicar