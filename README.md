# Criador de Cartelas de Bingo

Um site simples e prático para criar cartelas de bingo com palavras, ideal para chá de bebê, aniversários e brincadeiras em grupo.

## Funcionalidades

- **Lista de palavras** - Cole uma por linha. Quanto mais palavras, melhor para variar entre as cartelas
- **Tamanhos fixos** - 3x3, 4x4 ou 5x5
- **Quantidade de cartelas** - Gere várias de uma vez
- **Embaralhamento inteligente** - Tenta evitar repetições entre cartelas ao máximo
- **Casa livre personalizada** - Pode usar texto próprio ou escolher entre 5 ícones (Flor ✿, Coração ♥, Estrela ★, Bolinha ●, Círculo ○). Só aparece quando o grid for ímpar e a opção estiver marcada
- **Título editável** - Adicione um título no topo da cartela
- **Personalização completa** - Cores de fundo, bordas, texto, casa livre, fonte e tamanho da fonte
- **Pré-visualização** - Veja todas as cartelas antes de baixar
- **Download individual** - Baixe cada cartela em PNG (o botão não aparece na imagem)
- **Download em ZIP** - Baixe todas as cartelas juntas em um arquivo `.zip`

## Como usar

1. Abra o arquivo `index.html` no seu navegador
2. Cole suas palavras (uma por linha)
3. Escolha o tamanho do grid e a quantidade de cartelas
4. Configure a casa livre (se quiser) e personalize cores/fontes
5. Clique em **Gerar cartelas**
6. Baixe individualmente ou em **Baixar todas em ZIP**

## Tecnologias

- HTML, CSS e JavaScript puro
- [html2canvas](https://html2canvas.hertzen.com/) - Gera imagens PNG das cartelas
- [JSZip](https://stuk.github.io/jszip/) - Gera o arquivo ZIP
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Faz o download dos arquivos

## Prints

![Tela inicial do Criador de Cartelas de Bingo](./prints/tela-inicial.png)

![Configurações de casa livre personalizada](./prints/configuracao-casa-livre.png)

![Pré-visualização das cartelas geradas](./prints/preview-cartelas.png)

![Download individual e em ZIP](./prints/download-opcoes.png)

## Rodando localmente

Basta abrir o `index.html` diretamente no navegador. Não precisa instalar nada, tudo roda 100% local.
