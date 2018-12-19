
import config from './config'

const request = {
    get: (url) => {
        //console.log(url)
        return fetch(url)
            .catch(err => { console.log(err) })
            .then((response) => response.json())
    },
    post: async (url, data, token) => {
        url = config.HOST + '/' + url
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'customer',
            'Accept-Language': 'vi'
        }
        console.log(`\n %c-----------------------------[ POST ]-------------------------------------- \n [` + url + ` ] \n `, 'color:red;font-size:15px', headers, data, ' \n----------------------------------------------------------------------------- \n');
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            console.log('All Response', response)
            console.log(`\n %c-----------------------------[ RESPONSE ]------------------------------------ \n [` + url + ` ] \n `, 'color:green;font-size:15px', 'Data Post', data, `\n`, ' Respone  ', JSON.parse(response._bodyInit), ' \n----------------------------------------------------------------------------- \n');
            return response.json()
        } catch (error) {
            console.log('err', error)
        }
    }
}

export default request