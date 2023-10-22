const getNumber = () => {
    return 123;
}

const getString = () => {
    return "Hello Node36";
}

// ES module -> ECMAScrip module
export {getNumber, getString};

// commonjs module
// module.exports = { getNumber, getString}
