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



## Passo 3: Adicionar Funcionalidades



## Passo 4: Testar a Extensão



## Passo 5: Publicar