import mongoose from 'mongoose';
import { db } from '../../../database/';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'models';
import { IProduct } from '../../../interfaces/products';

type Data = 
| { message: string }
| IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProductBySlug( req, res );

        default: 
            return res.status(400).json({ message: 'Bad Request' })
    }

    
}   

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse ) =>  {
    
    const { slug } = req.query;

    await db.connect();

    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ){
        return res.status(400).json({ message: 'No hay prendas con - ' + slug });
    }

    return res.status(200).json( product )

}
