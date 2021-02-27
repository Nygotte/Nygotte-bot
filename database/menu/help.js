const help = (pushname, prefix, botName, ownerName, reqXp, uangku) => {
        return `
Olá ${pushname}, eu sou ${botName}!

Estou aqui para facilitar a criação de adesivos para WhatsApp, sem precisar de sair do próprio WhatsApp!

Consigo atuar em grupos ou em conversas privadas! 

E além de conseguir fazer os adesivos convencionais, também sou capaz de fazer adesivos animados. 

Pelos nosso testes suportamos vídeos até com *10 segundos* de duração. 

Para começar, basta digitar algumas dos seguintes opções:

-> $help/$ajuda:
Use quando precisa de ajuda.
			
-> $makersticker/$sticker:
Para usar o criador de adesivo, você precisa antes de enviar o vídeo, gif ou foto adicionar a legenda: $makersticker. 
			
-> $criador:
Criador do bot. ¯|_(ツ)_|¯ 

Algum problema? 
Entre em contato com o suporte:
https://bit.ly/3jkc0uH

Por: ${ownerName}`
}
exports.help = help
