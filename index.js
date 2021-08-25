const FB = require('fb');
const { default: fb } = require('fb/lib/fb');
const fs = require('fs')
const {ACCES_TOKEN, PAGE_ID} = require('./setting')

//const ACCESS_TOKEN = 'EAApIwtpQLXUBAGVbYvbE8aQZBeI8Axv5kXvQaCGXEkgu90drvpuaAFRcrlMSqhL2Ou4O4ZA0Reitbi0fTOvhvsDpPpxO8fvg24nOjenLjlQeCBsCkuKCPJjltE0ivkLJ3wNvjpErxLRZCrQuyYGJ2BMfjm4NyTZAX79rezMpd9MNhb11fM7K';

const main = async () => {

    await FB.setAccessToken(ACCES_TOKEN);

    // await FB.getLoginUrl({
    //     scope: 'email,pages_messaging,pages_metadata,pages_read_engagement,manage_pages',
    //     client_id: '556713692384098'
    // });

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
            .catch()

    }

    let ids = await getIds()

    console.log('ahhh', ids)

    const getConvo = async (ids) => {
        let c = []
        await Promise.all(
            ids.map(async response => {
                await FB.api(
                    response,
                    'GET',
                    {
                        "fields": "messages{message,to,from}",
                        "access_token": "EAApIwtpQLXUBAGVbYvbE8aQZBeI8Axv5kXvQaCGXEkgu90drvpuaAFRcrlMSqhL2Ou4O4ZA0Reitbi0fTOvhvsDpPpxO8fvg24nOjenLjlQeCBsCkuKCPJjltE0ivkLJ3wNvjpErxLRZCrQuyYGJ2BMfjm4NyTZAX79rezMpd9MNhb11fM7K"
                    }).then(
                        (response) => {
                            // console.log('response2', response)

                            let { messages } = response
                            messages.data.map(x => {
                                c.push({
                                    "message": x.message,
                                    "from": x.from.name,
                                    "to": x.to.data[0].name
                                })

                                //     console.log('convo',convo)
                            })

                            //return JSON.stringify(respon

                        }


                    )
                    .catch()


            }
            )

        )

        return c
    }

    //console.log('final', await getConvo(ids))

    let final = await getConvo(ids)


   // console.log('final', JSON.stringify(final,null,' '))

    let dataToWrite = JSON.stringify(final,null,' ')
    fs.writeFile('data.json', dataToWrite, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}


main()
