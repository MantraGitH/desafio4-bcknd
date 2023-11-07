import {Router} from 'express';
const router = Router();
import fs from 'fs';

async function loadProducts(){
    try {
        const productsData = await fs.promises.readFile('./src/data/products.json', 'utf-8');
        const productsJSON = JSON.parse(productsData);
        return productsJSON;
    } catch (error) {
        throw new Error (`Error al cargar los productos: ${error.message}`);
    }
}
const products = await loadProducts();

router.get('/home', async (req, res)=>{
    console.log('console.log 1:', products);
    res.render('home' , {products: products})
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})


export default router;