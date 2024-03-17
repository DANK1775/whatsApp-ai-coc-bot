require('dotenv').config()
const client = require('clash-of-clans-node');
const clanTag = '#G00VQRL0'

async function ligaInfo() {
    try {
        await client.login(process.env.TOKEN);
        let res = await client.getClanCurrentWarLeagueGroup(clanTag);
        let mensaje = ``
        let i = 0
        let info = {
            memberCount: 0,
            clanLvl: 0,
            clanName: '',
            th16: 0,
            th15: 0,
            th14: 0,
            th13: 0,
            th12: 0,
            th11: 0,
            lowth: 0,
        }

        res.clans.forEach(item => {
            info.memberCount = 0
            info.clanLvl = 0
            info.clanName = ''
            info.th16 = 0
            info.th15 = 0
            info.th14 = 0
            info.th13 = 0
            info.th12 = 0
            info.th11 = 0
            info.lowth = 0

            info.memberCount = item.members.length
            info.clanLvl = item.clanLevel
            info.clanName = item.name
            
            item.members.forEach(item2 => {
                switch (true) {
                    case item2.townHallLevel === 16:
                        info.th16++
                        break;
                    case item2.townHallLevel === 15:
                        info.th15++
                        break;
                    case item2.townHallLevel === 14:
                        info.th14++
                        break;
                    case item2.townHallLevel === 13:
                        info.th13++
                        break;
                    case item2.townHallLevel === 12:
                        info.th12++
                        break;
                    case item2.townHallLevel === 11:
                        info.th11++
                        break;
                    case item2.townHallLevel < 11:
                        info.lowth++
                        break;


                    default:
                        console.log('error')
                        break;
                }
            })
            let msg = `
        ------------------------------
        nombre de clan: ${info.clanName} lvl: ${info.clanLvl}
        numero de miembros: ${info.memberCount}
        TH16: ${info.th16} 
        TH15: ${info.th15} 
        TH14: ${info.th14} 
        TH13: ${info.th13} 
        TH12: ${info.th12} 
        TH11: ${info.th11} 
        TH < 11: ${info.lowth}
        ---------------------------------
        `
            mensaje += msg

        });
        return mensaje
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    ligaInfo
}