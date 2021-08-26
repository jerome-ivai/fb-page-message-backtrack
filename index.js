const FB = require('fb');
const fs = require('fs')
const { ACCESS_TOKEN, PAGE_ID } = require('./setting')

const main = async () => {

    await FB.setAccessToken(ACCESS_TOKEN);

    const getIds = () => {
        let data = []
        return FB.api(
            `/${PAGE_ID}`,
            'GET',
            { "fields": "conversations" }
        ).then((response) => {
            console.log('response', response)
            let { conversations } = response
            conversations.data.map(x => {
                data.push(x.id)

            })
            return data
        })
            .catch((error)=>{
                console.log('error', error)
            })

    }

    let ids = await getIds()

    const getConvo = async (ids) => {
        let c = []
        await Promise.all(
            ids.map(async response => {
                await FB.api(
                    response,
                    'GET',
                    {
                        "fields": "messages{message,to,from}",
                        "access_token": ACCESS_TOKEN
                    }).then(
                        (response) => {

                            let { messages } = response
                            messages.data.map(x => {
                                c.push({
                                    "message": x.message,
                                    "from": x.from.name,
                                    "to": x.to.data[0].name
                                })
                            })
                        }
                    )
                    .catch((error)=>{
                        console.log('error', error)
                    })
            }
            )
        )

        return c
    }

    let final = await getConvo(ids)

    // console.log('final', JSON.stringify(final,null,' '))

    let dataToWrite = JSON.stringify(final, null, ' ')
     fs.writeFile('data.json', dataToWrite, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

}


main()
