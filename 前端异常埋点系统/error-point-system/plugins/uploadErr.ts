let uploadErr = function({ lineno, colno, error: { stack }, message, filename }) {
    let str = window.btoa(
        JSON.stringify({
            lineno,
            colno,
            error: { stack },
            message,
            filename,
        })
    );
    let front_ip = "http://192.168.31.135:3000/error";
    // let front_ip = "http://location:3000/error";
    new Image().src = `${front_ip}?info=${str}`;
}

export default uploadErr