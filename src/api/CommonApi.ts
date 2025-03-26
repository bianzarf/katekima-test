import axios from 'axios'

async function getData(url: string, params: object ): Promise<void> {
    try {
        var resp = await axios.get(url, { params }).then(res => {
            return res
        }).catch(async (error) => {
            if(error.response) return error.response
            else return error
        })

        return resp
    } catch (error) {
        console.log(error)
        // return null;
    }
}

async function postData(url: string, data: object ): Promise<void> {
    try {
        var resp = await axios.post(url, data).then(res => {
            return res
        }).catch(async (error) => {
            if(error.response) return error.response
            else return error
        })

        return resp
    } catch (error) {
        console.log(error)
        // return null;
    }
}
async function putData(url: string, data: object ): Promise<void> {
    try {
        var resp = await axios.put(url, data).then(res => {
            return res
        }).catch(async (error) => {
            if(error.response) return error.response
            else return error
        })

        return resp
    } catch (error) {
        console.log(error)
        // return null;
    }
}

export { getData, postData, putData }