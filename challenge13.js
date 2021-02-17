
const fs = require('fs');
const { on } = require('process');
const data = fs.readFileSync('data1.json', 'utf8')
const qna = JSON.parse(data)
const text = process.argv.slice(2)
const newbe = text.slice(1).toString()
const path = require('path')

switch (process.argv.slice(2)[0]) {
    case 'help':

        console.log(">>> JS TODO <<<\n$ node todo.js <command>\n$ node todo.js list\n$ node todo.js task <task_id>")
        console.log("$ node todo.js add <task_content>\n$ node todo.js delete <task_id\n$ node todo.js complete <task_id>\n$ node todo.js uncomplete <task_id>\n$ node todo.js list:outstanding asc|desc\n$ node todo.js tag <tag_name_2>...<tag_name_N>\n$ node todo.js filter:<tag_name>")

        break;
    case 'add':
        let fts = ""
        for (let i = 0; i < newbe.length; i++) {
            if (newbe[i] == ",") {
                fts += " "
            } else {
                fts += newbe[i]
            }
        }
        console.log(`"${fts}" telah ditambahkan`);
        qna.push({ do: "[ ]" + fts, tag: [] })
        const tsk = JSON.stringify(qna)
        fs.writeFileSync('./data1.json', JSON.stringify(qna))
        break;
    case 'list':
        console.log('Daftar pekerjaan')
        if (qna.length > 0) {
            for (let g = 0; g < qna.length; g++) {
                console.log(`${g + 1}. ${qna[g].do}.`)
            }
        } else {
            console.log("Anda belum menambahkan daftar pekerjaan")
        }
        break;
    case 'delete':
        for (let j = 0; j < qna.length; j++) {
            if (newbe == j + 1) {
                JSON.stringify(qna.splice(j, 1))
                fs.writeFileSync('data1.json', JSON.stringify(qna))
                console.log('telah dihapus dari daftar');
            }
        }

        break;
    case 'complete':
        console.log('Daftar pekerjaan')
        for (let m = 0; m < qna.length; m++) {
            if (newbe == m + 1) {
                let cpt = qna[m].do.replace('[ ]', '[x]')
                let hshs = data.replace(`${qna[m].do}`, `${cpt}`)
                fs.writeFileSync('data1.json', hshs)
                console.log(`${m + 1}.${qna[m].do}. telah selesai`)
            }
        }
        break;
    case 'uncomplete':
        console.log('Daftar pekerjaan')
        for (let n = 0; n < qna.length; n++) {
            if (newbe == n + 1) {
                let cpu = qna[n].do.replace('[x]', '[ ]')
                let kpu = data.replace(`${qna[n].do}`, `${cpu}`)
                fs.writeFileSync('data1.json', kpu)
                console.log(`${n + 1}.${qna[n].do}.status telah selesai di batalkan`)
            }
        }
        break;
    case 'list:complete':
        console.log('Daftar pekerjaan')
        let ojek = ''
        if (qna.length >= 0) {
            for (let du = 0; du < qna.length; du++) {
                if (JSON.stringify(qna[du].do).includes('[ ]')) {
                    ojek += qna[du].do
                } else {
                    console.log(`${du + 1}. ${JSON.stringify(qna[du].do)}.`)
                }

            }
        }
        break;
    case 'list:outstanding':
        console.log('Daftar pekerjaan')
        let ojk = ''
        if (qna.length >= 0) {
            for (let d = 0; d < qna.length; d++) {
                if (JSON.stringify(qna[d].do).includes('[x]')) {
                    ojk += qna[d].do
                } else {
                    console.log(`${d + 1}. ${JSON.stringify(qna[d].do)}.`)
                }

            }
        }
        break;
    case 'tag':
        process.argv.slice(2).splice(2).forEach((item, index) => {
            qna[newbe[0] - 1].tag.push(item)
            let bho = JSON.stringify(qna)
            fs.writeFileSync('data1.json', bho)
        });
        console.log(`Tag "${newbe.slice(2)}" telah ditambahkan.`);
        break;

    default:
        if (text[0].slice(0, 7) == "filter:") {
            for (let index = 0; index < qna.length; index++) {
                if (JSON.stringify(qna[index].tag).includes(text[0].slice(7))) {
                    console.log(`${index+1}.${qna[index].do}`)
                }
            }

        } else {
            console.log(">>> JS TODO <<<\n$ node todo.js <command>\n$ node todo.js list\n$ node todo.js task <task_id>")
            console.log("$ node todo.js add <task_content>\n$ node todo.js delete <task_id\n$ node todo.js complete <task_id>\n$ node todo.js uncomplete <task_id>\n$ node todo.js list:outstanding asc|desc\n$ node todo.js tag <tag_name_2>...<tag_name_N>\n$ node todo.js filter:<tag_name>")
        }
        break;
}

