const request = async (url) => {
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = res.json();
            return data;
        } else {
            const errorData = res.json();
            throw errorData;
        }
    } catch (e) {
        console.log(e);
    }
};

export default request;
