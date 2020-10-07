const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const customers = [
    {title : 'George', id: 1},
    {title : 'Josh', id: 2},
    {title : 'Tyler', id: 3},
    {title : 'Alice', id: 4},
    {title : 'Candice', id: 5},
]

app.get('/', (req, res) => {
    res.send('welcome to edureka rest api moron.');
});

app.get('/api/customers', (req,res)=> {
    res.send(customers);
});

app.get('/api/customers/:id', (req,res)=> {
    const customer =customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2> oops no id present</h2>');
    res.send('customer');
});

const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log('listen please !'));

//Create

app.post('/api/customers', (req,res) =>{

    const { error } =validateCustomer(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }


//Incerement the id

    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer,schema);
}

//Update

app.put('/api/customers/:id', (req,res) =>{
    const customer=customers.find(c=> c.id ===parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2>fuwehlfw</h2>');

    const {error} = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.title=req.body.title;
    res.send(customer);
});