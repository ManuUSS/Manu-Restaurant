import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            createOrder( req, res );    
        break;
    
        default:
            return res.status(400).json({ message: 'Bad Request' });
    }

    res.status(200).json({ message: 'Example' });
}

const createOrder = ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { body } = req;

    res.status(201).json( body );
}   
