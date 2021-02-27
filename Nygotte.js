//starts
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    processTime,
} = require('@adiwajshing/baileys')

// Load Js File
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')

// Load Npm Package
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')
const cd = 4.32e+7
const crypto = require('crypto')
const qrcode = require("qrcode-terminal")
const axios = require('axios')

const samih = JSON.parse(fs.readFileSync('./database/simi.json'))
const option = JSON.parse(fs.readFileSync('./options/option.json'))

const {
    botName,
    ownerName,
    BarBarKey,
    ownerNumbers
} = option

// Load Menu File
const { help } = require('./database/menu/help')
const { criador } = require('./database/menu/criador')

// Load Vcard Contact

prefix = '$'
finish = '✅ Pronto'

// Functions

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./auth.json') && client.loadAuthInfo('./auth.json')
	client.on('connecting', () => {
		start('2', 'Estabelecendo conexão...')
	})
	client.on('open', () => {
		success('2', 'Conexão bem sucedida!')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./auth.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
        

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = moment.tz('Asia/Jakarta').format('DD,MM,YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
                        const tescuk = ["0@s.whatsapp.net"]
                        const q = args.join(' ')

			mess = {
				wait: '⏱️ Processando... ',
				error: {
					stick: '‼️ Ocorreu um erro ao converter. ',
				} 
			}
			
			const isGroup = from.endsWith('@g.us')
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const isSimi = isGroup ? samih.includes(from) : false
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const getNumber = sender.split('@')[0]
			

			const reply = (teks) => {
				client.sendMessage(from, teks, text)
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
                        const sendImage = (teks) => {
		                client.sendMessage(from, teks, image, {quoted:mek})
		        }
		        const costum = (pesan, tipe, target, target2) => {
			        client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			    const cmdLogUser = (getNumber, command, pushname) => {
      		  return `[ *LOG* ]

Commando: $${command}
por: ${getNumber}(${pushname}).`

			}
			    const cmdLogGroup = (getNumber, command, pushname, groupName) => {
      		  return `[ *LOG* ]

Commando: $${command}
por: ${getNumber}(${pushname})
em: ${groupName}.`

			}
			const userRequest = (getNumber, pushname) => {
      		  return `[ *!* ]
      
Requisição 
de: ${getNumber}(${pushname}). `
			}
			const userFinish = (getNumber, pushname) => {
      		  return `[ *!* ]
      
Finalizado a requisição
de: ${getNumber}(${pushname}). `
			}
			const groupRequest = (getNumber, pushname, groupName) => {
      		  return `[ *!* ]
      
Requisição
de: ${getNumber}(${pushname})
em: ${groupName}.`
			}
			const groupFinish = (getNumber, pushname, groupName) => {
      		  return `[ *!* ]
      
Finalizado a requisição 
de: ${getNumber}(${pushname})
em: ${groupName}.`
			}
		        const sendPtt = (teks) => {
		                client.sendMessage(from, audio, mp3, {quoted:mek})
		        }
		

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			// Privado
			if (!isGroup && isCmd) client.sendMessage('558781394948@s.whatsapp.net', cmdLogUser(getNumber, command, pushname), text)
			if (isCmd && isGroup) client.sendMessage('558781394948@s.whatsapp.net', cmdLogGroup(getNumber, command, pushname, groupName), text)
			
                     // Load Commands
			switch(command) {
				
				case 'ajuda':
                case 'help':
				client.sendMessage(from, { url: 'database/media/help.jpg' }, image, {caption: help(pushname, prefix, botName, ownerName) })
                break
				
                case 'criador':
                client.sendMessage(from, criador(pushname, botName, ownerName), text)
                break
                
                case 'sendallmsg':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return reply('[ ! ] sem argumentos definidos! ') 
					anu = await client.chats.all()
					for (let _ of anu) {
						sendMess(_.jid, `*[AVISO]*\n\n${body.slice(4)}`)
						}
						reply('Enviado com sucesso')
               		break
               
                case 'latencia': 
               		if (getNumber = 1) {
					
					reply('is true')
					userLimit = 0 ;
					
				}
               		const timestamp = speed();
                       const latensi = speed() - timestamp
                       client.updatePresence(from, Presence.composing) 
				       uptime = process.uptime()
                       client.sendMessage(from, `Latência: ${latensi.toFixed(4)} milissegundos.`, text)
                       break
				
				case 'sticker':
				case 'makersticker':
				if (!isMedia) {
					
					client.sendMessage(from, `https://wa.me/p/4142298995780225/15512226262 \n\nOlá ${pushname}! \n\nNa dúvida segue o exemplo acima.` , text)
					
				} 
				
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
					const media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					client.sendMessage(from, '⚙️ Processando... ', text)
					
					await ffmpeg(`./${media}`).input(media).on('start', function (cmd) {
						
						reply('Então, estamos com uma demanda muito grande, desejo que tenha paciência se que caso seu adesivos demore mande-o novamente.') 
						
						if (isCmd && isGroup) client.sendMessage('558781394948@s.whatsapp.net', groupRequest(getNumber, pushname, groupName), text)
						if (!isGroup && isCmd) client.sendMessage('558781394948@s.whatsapp.net', userRequest(getNumber, pushname), text)
							
							})
							
							.on('error', function (err) {
								
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
								
							})
							
							.on('end', function () {
								
								if (isCmd && isGroup) client.sendMessage('558781394948@s.whatsapp.net', groupFinish(getNumber, pushname, groupName), text)
								if (!isGroup && isCmd) client.sendMessage('558781394948@s.whatsapp.net', userFinish(getNumber, pushname), text)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: { key: { fromMe: false, participant: `${tescuk}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
								
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(ran)
							
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
							
						   const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						   const media = await client.downloadAndSaveMediaMessage(encmedia)
						   ran = getRandom('.webp')
						   client.sendMessage(from, '⚙️ Processando... ', text)
						   client.sendMessage(from, 'Esse processo demora um pouco, por favor tenha paciência.\nEnquanto isso visite nosso Instagram: https://bit.ly/3jkc0uH', text)
						   reply('Então, estamos com uma demanda muito grande, desejo que tenha paciência se que caso seu adesivos demore mande-o novamente.') 
						   await ffmpeg(`./${media}`).inputFormat(media.split('.')[1]).on('start', function (cmd) {
							    
								if (isCmd && isGroup) client.sendMessage('558781394948@s.whatsapp.net', groupRequest(getNumber, pushname, groupName), text)
								if (!isGroup && isCmd) client.sendMessage('558781394948@s.whatsapp.net', userRequest(getNumber, pushname), text)
								
							})
							
							.on('error', function (err) {
								
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.stick)
								
							})
							
							.on('end', function () {
								
								if (isCmd && isGroup) client.sendMessage('558781394948@s.whatsapp.net', groupFinish(getNumber, pushname, groupName), text)
								if (!isGroup && isCmd) client.sendMessage('558781394948@s.whatsapp.net', userFinish(getNumber, pushname), text)
								
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: { key: { fromMe: false, participant: `${tescuk}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
								
							})
							
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(ran)
							
						}
						
						break
						
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()