# FNCS — Pitchfólio 2026

Site estático, responsivo, com tela de carregamento, letras animadas, revelações durante a rolagem, cards 3D e surgimento dos personagens LEGO no canto inferior do card. Não precisa de build: basta abrir `index.html` no navegador ou fazer deploy da pasta no Vercel / GitHub Pages.

## Fotos reais
Coloque as fotos nestes caminhos (JPG):
- `assets/fotos/gustavo-luiz.jpg`
- `assets/fotos/gustavo-martins.jpg`
- `assets/fotos/joao-victor.jpg`
- `assets/fotos/ryan-lucas.jpg`

## Bonecos LEGO
Coloque os bonecos nestes caminhos (PNG de preferência com fundo transparente):
- `assets/legos/gustavo-luiz.png`
- `assets/legos/gustavo-martins.png`
- `assets/legos/joao-victor.png`
- `assets/legos/ryan-lucas.png`

Ao adicionar um arquivo, o site identifica automaticamente a imagem. Enquanto os arquivos não forem adicionados, exibe uma composição visual substituta e um boneco LEGO ilustrativo feito em CSS.

## Link oficial da apresentação
Abra `script.js` e configure `officialPresentationUrl: 'https://seu-site.vercel.app'` no começo do arquivo. Sem link, o botão aparece como "LINK EM BREVE" e não navega.

## Personalização
Cada integrante tem sua própria classe em `styles.css`: `.member-leader`, `.member-multitalent`, `.member-backend` e `.member-design`. Você pode alterar as cores em `--accent`, substituir descrições no `index.html` e acrescentar temas específicos quando quiser.

## Ordem do site
Capa animada (intro), Gustavo Luiz, Gustavo Martins, João Victor, Ryan Lucas e apresentação oficial. A capa é a abertura; as **cinco partes principais** são quatro integrantes + apresentação.

## Acessibilidade
Inclui navegação por teclado, suporte a toque nos cards e redução de animações conforme preferência do sistema.
