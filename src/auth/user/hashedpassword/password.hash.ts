const bcrypt = require('bcryptjs')


export const hashPassword = async (password: string)=>{
    const salt = 10;
    const hashpass = await bcrypt.hash(password, salt)
    return hashpass
}

export const comparedHashPassword = async (password: string, hashed: string): Promise<Boolean>=>{
    const comparepass = await bcrypt.compare(password, hashed);
    return comparepass;
}