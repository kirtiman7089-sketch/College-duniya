const mongoose = require('mongoose');
const Product = require('./Models/Product');

const products = [
    {
        name:'Iphone',
        img:"https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        price:125000,
        desc:'Teri Aukkat se Bhar hai nhi le payega',
    },
    {
        name:'Food',
        img:"https://images.unsplash.com/photo-1706586348467-5c1593cd0aad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
        price:12000,
        desc: 'Tere Ko nhi milega ye khana',
    },
    {
        name:'IPad',
        img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
        price:150000,
        desc:'Appel hai bhai bhut mengha hai',
    },
    {
        name:'Wine Bottel',
        img:"https://plus.unsplash.com/premium_photo-1679245158200-d7b700044832?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
        price:'50000',
        desc:'Pela bhai pela free ka maal hai',
    },
    {
        name:'Airpods',
        img:"https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
        price:35000,
        desc:'Karid lega kya dekh mat',
    }
];

async function seedDB(){
   await Product.insertMany(products);
    console.log("Data Seeded Successfully");
}

module.exports  = seedDB;