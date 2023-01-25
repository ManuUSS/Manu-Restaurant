import { db } from 'database';
import { User } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { jasonwebtoken } from 'utils';

type Data = 
| { message: string }
| { 
    token: string, 
    user: {
        email: string,
        name: string,
        role: string
    } 
}

export default function handler ( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'POST': 
            return registerUser( req, res );

        default:
            res.status( 400 ).json({ message: 'Bad Request' })
    }
}

const registerUser = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { email, password, name } = req.body as { email: string, password: string, name: string } ;

    if( password.length < 6 ) return res.status( 400 ).json({ message: 'La contraseña debe ser mayor a 6 caracteres' });
    
    if( name.length < 2 ) return res.status( 400 ).json({ message: 'El nombre debe ser de mínimo 2 caracteres' });

    
    await db.connect();
    const user = await User.findOne({ email });

    if( user ) {
        await db.disconnect();
        return res.status( 400 ).json({ message: 'Correo ya registrado' });
    } 
    
    const newUser = new User ({
        email: email.toLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name,
    })

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch ( error ) {
        return res.status( 500 ).json({ message: 'Revisar Logs del servidor' });
    }

    const { _id, role } = newUser;
    
    await db.disconnect();
    const token = jasonwebtoken.signToken( _id, email );

    return res.status(200).json({
        token,
        user: {
            email, 
            role, 
            name
        }
    })

}
